const tableData = [  // Eredeti adatok, egy objektum egy korszak adataival
    {
        korszak: 'XVI. század',               // Korszak neve
        evszam1: '1514',                      // Első esemény évszáma
        esemeny1: 'Dózsa-féle parasztháború',  // Első esemény neve
        tananyag1: 'magyar',                  // Első esemény tananyaga
        evszam2: '1519-1522',                 // Második esemény évszáma
        esemeny2: 'Magellán körülhajózza a földet', // Második esemény neve
        tananyag2: 'egyetemes'                // Második esemény tananyaga
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

function generateTableHeader(table) {
    const tableHeader = document.createElement('thead'); // Létrehozunk egy thead elemet, ami a táblázat fejlécét fogja tartalmazni
    const headerRow = document.createElement('tr'); // Létrehozunk egy tr elemet, amely egy sort jelent a fejlécben
    tableHeader.appendChild(headerRow); // Hozzáadjuk a sor elemet a thead elemhez
    const headers = ['Korszak', 'Évszám', 'Esemény', 'Tananyag']; // Létrehozunk egy tömböt a fejléc cellák címkéivel
    for (const header of headers) { // Végigiterálunk a headers tömb minden elemén
        const th = document.createElement('th'); // Létrehozunk egy th elemet, amely egy fejléc cellát jelent
        th.innerHTML = header; // Beállítjuk a th elem belső tartalmát a header változó értékére
        headerRow.appendChild(th);  // Hozzáadjuk a th elemet a fejléc sorhoz
    }
    table.appendChild(tableHeader); // Végül hozzáadjuk a teljes thead elemet a megadott táblázathoz
}

const table = document.createElement('table'); // Létrehozunk egy táblázatot  
document.body.appendChild(table);            // Hozzáadjuk az oldalhoz  

function generateTable() {
    table.innerHTML = '';                      // Táblázat törlése  
    generateTableHeader(table); // Fejléc generálása a függvény segítségével 

    const tableBody = document.createElement('tbody'); // Új tbody létrehozása  
    table.appendChild(tableBody);              // tbody hozzáadása a táblázathoz  

    for (const item of tableData) {            // For of ciklussal iterálunk az adatokon  
        const row = document.createElement('tr');    // Új sor az első eseményhez  
        tableBody.appendChild(row);                  // Sor hozzáadása a tbody-hoz  

        const korszakCell = document.createElement('td'); // Korszak cella létrehozása  
        korszakCell.innerHTML = item.korszak;             // Cellába írjuk a korszak nevét  
        korszakCell.rowSpan = item.evszam2 ? 2 : 1;         // Ha van második esemény, rowspan 2, egyébként 1  
        row.appendChild(korszakCell);                     // Korszak cella hozzáadása az első sorhoz  

        const evszam1Cell = document.createElement('td'); // Első esemény évszám cella  
        evszam1Cell.innerHTML = item.evszam1;             // Cella tartalma  
        row.appendChild(evszam1Cell);                     // Hozzáadjuk a sorhoz  

        const esemeny1Cell = document.createElement('td'); // Első esemény neve cella  
        esemeny1Cell.innerHTML = item.esemeny1;           // Cella tartalma  
        row.appendChild(esemeny1Cell);                    // Hozzáadjuk a sorhoz  

        const tananyag1Cell = document.createElement('td'); // Első esemény tananyag cella  
        tananyag1Cell.innerHTML = item.tananyag1;         // Cella tartalma  
        row.appendChild(tananyag1Cell);                   // Hozzáadjuk a sorhoz  

        if (item.evszam2) {                               // Ha létezik második esemény  
            const row2 = document.createElement('tr');  // Új sor létrehozása a második eseményhez  
            tableBody.appendChild(row2);                  // Hozzáadjuk az új sort a tbody-hoz  

            const evszam2Cell = document.createElement('td'); // Második esemény évszám cella  
            evszam2Cell.innerHTML = item.evszam2;            // Cella tartalma  
            row2.appendChild(evszam2Cell);                   // Hozzáadjuk a sorhoz  

            const esemeny2Cell = document.createElement('td'); // Második esemény neve cella  
            esemeny2Cell.innerHTML = item.esemeny2;          // Cella tartalma  
            row2.appendChild(esemeny2Cell);                  // Hozzáadjuk a sorhoz  

            const tananyag2Cell = document.createElement('td'); // Második esemény tananyag cella  
            tananyag2Cell.innerHTML = item.tananyag2;        // Cella tartalma  
            row2.appendChild(tananyag2Cell);                 // Hozzáadjuk a sorhoz  
        }
    }
}

generateTable(); // Megjelenítjük a táblázatot

function validateField(inputElement,errorElement) { // Validációs segédfüggvény: paraméterként kapja az input elemet és a hozzá tartozó hibaüzenet elemet
    errorElement.style.display = 'none'; // Először alaphelyzetbe állítjuk a hibaüzenetet
    if(inputElement.value === "") { // Ha az input mező üres, akkor megjelenítjük a hibaüzenetet és false értékkel térünk vissza
        errorElement.style.display = 'block';
        return false;
    }
    return true;
}

function complexValidation(evszam2Element, megnev2Element, tan2Element) {
    // Hibaüzenetek elemeinek lekérése az űrlapból
    const evszam2Error = document.getElementById('error-evszam2');
    const megnev2Error = document.getElementById('error-megnev2');
    const tan2Error = document.getElementById('error-tan2');
    
    // Hibajelzések lenullázása a második esemény mezőihez
    evszam2Error.style.display = 'none';
    megnev2Error.style.display = 'none';
    tan2Error.style.display = 'none';
    
    // Ellenőrizzük, hogy legalább egy mező ki van-e töltve
    const optionalFilled = evszam2Element.value || megnev2Element.value || tan2Element.value;
    // Ellenőrizzük, hogy valamelyik mező hiányzik-e
    const optionalIncomplete = !evszam2Element.value || !megnev2Element.value || !tan2Element.value;
    
    // Ha van kitöltött mező, de nem mindegyik, megjelenítjük a hibákat
    if (optionalFilled && optionalIncomplete) {
        if (!evszam2Element.value) {
            evszam2Error.style.display = 'block';
        }
        if (!megnev2Element.value) {
            megnev2Error.style.display = 'block';
        }
        if (!tan2Element.value) {
            tan2Error.style.display = 'block';
        }
        return false;
    }
    return true;
}

const form = document.getElementById('form'); // Lekérjük az űrlapot  
form.addEventListener('submit', function (e) {
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
    korszak1Error.style.display = 'none';
    evszam1Error.style.display = 'none';
    megnev1Error.style.display = 'none';
    tan1Error.style.display = 'none';

    // Egyenként validáljuk a kötelező mezőket a segédfüggvény segítségével
    const validKorszak = validateField(korszakEl,korszak1Error);
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
        korszak: korszakEl.value,     // Korszak név  
        evszam1: evszam1El.value,      // Első esemény évszáma  
        esemeny1: megnev1El.value,     // Első esemény neve  
        tananyag1: tan1El.value        // Első esemény tananyaga  
    };

    // Ha a második esemény összes mezője ki van töltve, hozzáadjuk az objektumhoz
    if (evszam2El.value && megnev2El.value && tan2El.value) {
        newElement.evszam2 = evszam2El.value;
        newElement.esemeny2 = megnev2El.value;
        newElement.tananyag2 = tan2El.value;
    }

    tableData.push(newElement); // Hozzáadjuk az új objektumot az adatok tömbjéhez  
    generateTable(); // Frissítjük a táblázatot  

    // Ürítjük az űrlap mezőket  
    korszakEl.value = '';
    evszam1El.value = '';
    megnev1El.value = '';
    tan1El.value = '';
    evszam2El.value = '';
    megnev2El.value = '';
    tan2El.value = '';
});