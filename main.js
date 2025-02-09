const formElement = generateForm(); // Meghívjuk a generateForm függvényt és az eredményt elmentjük a formElement változóba

const table = document.createElement('table'); // Létrehozunk egy táblázatot  
document.body.appendChild(table); // Hozzáadjuk az oldalhoz

const tableData = [ // Eredeti adatok, egy objektum egy korszak adataival
    {
        korszak: 'XVI. század', // Korszak neve
        evszam1: '1514', // Első esemény évszáma
        esemeny1: 'Dózsa-féle parasztháború',  // Első esemény neve
        tananyag1: 'magyar', // Első esemény tananyaga
        evszam2: '1519-1522', // Második esemény évszáma
        esemeny2: 'Magellán körülhajózza a földet', // Második esemény neve
        tananyag2: 'egyetemes' // Második esemény tananyaga
    },
    {
        korszak: 'XVII. század',
        evszam1: '1664',
        esemeny1: 'vasvári béke',
        tananyag1: 'magyar'
    },
    {
        korszak: 'XVIII. század',
        evszam1: '1701-1714',
        esemeny1: 'spanyol örökösödési háború',
        tananyag1: 'egyetemes',
        evszam2: '1703-1711',
        esemeny2: 'Rákóczi szabadságharc',
        tananyag2: 'magyar'
    },
    {
        korszak: 'XIX. század',
        evszam1: '1812',
        esemeny1: 'Napóleon oroszországi hadjárata',
        tananyag1: 'egyetemes',
        evszam2: '1809',
        esemeny2: 'győri csata',
        tananyag2: 'magyar'
    }
];

generateTable(tableData,table); // Megjelenítjük a táblázatot

formElement.addEventListener('submit', function (e) {
    e.preventDefault(); // Megakadályozzuk az űrlap alapértelmezett viselkedését

    // Első esemény mezők lekérése  
    const korszakEl = document.getElementById('korszak');
    const evszam1El = document.getElementById('evszam1');
    const megnev1El = document.getElementById('megnev1');
    const tan1El = document.getElementById('tan1');

    // Második esemény mezők lekérése  
    const evszam2El = document.getElementById('evszam2');
    const megnev2El = document.getElementById('megnev2');
    const tan2El = document.getElementById('tan2');

    // Hibaüzenetek elemeinek lekérése az űrlapból  
    const korszak1Error = document.getElementById('error-korszak');
    const evszam1Error = document.getElementById('error-evszam1');
    const megnev1Error = document.getElementById('error-megnev1');
    const tan1Error = document.getElementById('error-tan1');

    // Elrejti az összes hibajelzéshez tartozó elemet
    var errors = [korszak1Error, evszam1Error, megnev1Error, tan1Error];
    for (let i = 0; i < errors.length; i++) {
    errors[i].style.display = 'none';
  }
    // Egyenként validáljuk a kötelező mezőket a segédfüggvény segítségével
    const validKorszak = validateField(korszakEl, korszak1Error);
    const validEvszam1 = validateField(evszam1El, evszam1Error);
    const validMegnev1 = validateField(megnev1El, megnev1Error);
    const validTan1 = validateField(tan1El, tan1Error);


    // Ha bármelyik validáció sikertelen, kilépünk az eseménykezelőből
    if (!(validKorszak && validEvszam1 && validMegnev1 && validTan1)) {
        return;
    }

    if (!complexValidation(evszam2El, megnev2El, tan2El)) {
        return;
    }

    // Új objektum létrehozása az első esemény adataival  
    const newElement = {
        korszak: korszakEl.value, // Korszak név  
        evszam1: evszam1El.value, // Első esemény évszáma  
        esemeny1: megnev1El.value, // Első esemény neve  
        tananyag1: tan1El.value // Első esemény tananyaga  
    };

    // Ha a második esemény összes mezője ki van töltve, hozzáadjuk az objektumhoz
    if (evszam2El.value && megnev2El.value && tan2El.value) {
        newElement.evszam2 = evszam2El.value;
        newElement.esemeny2 = megnev2El.value;
        newElement.tananyag2 = tan2El.value;
    }

    tableData.push(newElement); // Hozzáadjuk az új objektumot az adatok tömbjéhez 
    table.innerHTML = ''; // Töröljük a táblázatot
    generateTable(tableData,table); // Frissítjük a táblázatot  

    // Ürítjük az űrlap mezőket  
    var inputs = [korszakEl, evszam1El, megnev1El, tan1El, evszam2El, megnev2El, tan2El];
    for(let i = 0;i<inputs.length;i++){
        inputs[i].value = '';
    }
});