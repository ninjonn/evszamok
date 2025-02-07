const tableData = [
    { field1: 'XVI. század', field2: '1514', field3: 'Dózsa-féle parasztháború', field4: 'magyar' },
    { field1: '', field2: '1519-1522', field3: 'Magellán körülhajózza a földet', field4: 'egyetemes' },
    { field1: 'XVII. század', field2: '1664', field3: 'vasvári béke', field4: 'magyar' },
    { field1: 'XVIII. század', field2: '1701-1714', field3: 'spanyol örökösödési háború', field4: 'egyetemes' },
    { field1: '', field2: '1703-1711', field3: 'Rákóczi szabadságharc', field4: 'magyar' },
    { field1: 'XIX. század', field2: '1812', field3: 'Napóleon oroszországi hadjárata', field4: 'egyetemes' },
    { field1: '', field2: '1809', field3: 'győri csata', field4: 'magyar' }
]; // A táblázat adatait tartalmazó tömb  

const table = document.createElement('table'); // Létrehozunk egy új table elemet  
document.body.appendChild(table); // Hozzáadjuk a táblázatot az oldalhoz  

const tableHeader = document.createElement('thead'); // Létrehozzuk a táblázat fejlécét  
const headerRow = document.createElement('tr'); // Létrehozunk egy fejléc sort  
table.appendChild(tableHeader); // A fejlécet hozzáadjuk a táblázathoz  
tableHeader.appendChild(headerRow); // A fejléc sorát a fejléc elemhez adjuk  

const headers = ['Korszak', 'Évszám', 'Esemény', 'Tananyag']; // A táblázat fejléc celláinak nevei  
for (let i = 0; i < headers.length; i++) {
    const th = document.createElement('th'); // Létrehozunk egy th elemet  
    th.innerHTML = headers[i]; // A fejléc cella tartalmát beállítjuk  
    headerRow.appendChild(th); // Hozzáadjuk a fejléc cellát a fejléc sorhoz  
}

function generateTable() {
    table.innerHTML = ''; // Töröljük a táblázat tartalmát  
    table.appendChild(tableHeader); // Újra hozzáadjuk a fejlécet  

    const tableBody = document.createElement('tbody'); // Létrehozunk egy tbody elemet  
    table.appendChild(tableBody); // A tbody-t hozzáadjuk a táblázathoz  

    for (let i = 0; i < tableData.length; i++) {
        const currentElement = tableData[i]; // Az aktuális sort tartalmazó objektum  
        const row = document.createElement('tr'); // Létrehozunk egy új sort  
        tableBody.appendChild(row); // A sort hozzáadjuk a táblázat törzséhez  

        if (currentElement.field1 !== '') { // Ha az első oszlop nem üres
            let rowspan = 1; // Kezdetben egy sor tartozik hozzá  
            for (let j = i + 1; j < tableData.length; j++) {
                if (tableData[j].field1 === '') {
                    rowspan++;
                } else {
                    break;
                }
            } // Megszámoljuk, hogy hány további sor tartozik ugyanahhoz a korszakhoz  

            const cell1 = document.createElement('td'); // Létrehozunk egy új cellát a korszakhoz  
            cell1.innerHTML = currentElement.field1; // A cellába beírjuk a korszak nevét  
            if (rowspan > 1) {
                cell1.rowSpan = rowspan;
            } // Ha több sorhoz tartozik, akkor beállítjuk a rowspan értékét  
            row.appendChild(cell1); // A cellát hozzáadjuk a sorhoz  
        }

        const cell2 = document.createElement('td'); // Létrehozunk egy cellát az évszámnak  
        cell2.innerHTML = currentElement.field2; // Beállítjuk az évszámot  
        row.appendChild(cell2); // Hozzáadjuk a cellát a sorhoz  

        const cell3 = document.createElement('td'); // Létrehozunk egy cellát az eseményhez  
        cell3.innerHTML = currentElement.field3 || '-'; // Ha üres, akkor '-' jelenik meg  
        row.appendChild(cell3); // A cellát hozzáadjuk a sorhoz  

        const cell4 = document.createElement('td'); // Létrehozunk egy cellát a tananyaghoz  
        cell4.innerHTML = currentElement.field4 || '-'; // Ha üres, akkor '-' jelenik meg  
        row.appendChild(cell4); // A cellát hozzáadjuk a sorhoz  
    }
}

generateTable(); // Meghívjuk a függvényt, hogy megjelenjen a táblázat  

const form = document.getElementById('form'); // Lekérjük az űrlapot  
form.addEventListener('submit', function (e) {
    e.preventDefault(); // Megakadályozzuk az alapértelmezett küldést  

    const korszakEl = document.getElementById('korszak'); // Korszak mező  
    const evszam1El = document.getElementById('evszam1'); // 1. esemény évszám mező  
    const megnev1El = document.getElementById('megnev1'); // 1. esemény neve mező  
    const tan1El = document.getElementById('tan1'); // 1. esemény tananyag mező  

    const evszam2El = document.getElementById('evszam2'); // 2. esemény évszám mező  
    const megnev2El = document.getElementById('megnev2'); // 2. esemény neve mező  
    const tan2El = document.getElementById('tan2'); // 2. esemény tananyag mező  

    let valid = true; // Kezdetben feltételezzük, hogy minden rendben van  

    if (korszakEl.value === "") {
        valid = false;
    } // Ha üres a korszak, hibás az űrlap  

    if (evszam1El.value === "") { valid = false; } // Ha üres az első évszám, hibás az űrlap  

    if (megnev1El.value === "") {
        valid = false;
    } // Ha üres az első esemény, hibás az űrlap  

    if (tan1El.value === "") {
        valid = false;
    } // Ha üres az első tananyag, hibás az űrlap  

    if (!valid) { return; } // Ha hibás az űrlap, kilépünk  

    const event1 = {
        field1: korszakEl.value,
        field2: evszam1El.value,
        field3: megnev1El.value,
        field4: tan1El.value
    }; // Létrehozzuk az első eseményt és hozzáadjuk a tömbhöz  
    tableData.push(event1);

    if (evszam2El.value !== "" || megnev2El.value !== "" || tan2El.value !== "") {
        const event2 = {
            field1: "",
            field2: evszam2El.value,
            field3: megnev2El.value,
            field4: tan2El.value
        }; // Ha van második esemény, létrehozzuk és hozzáadjuk  
        tableData.push(event2);
    }

    generateTable(); // Frissítjük a táblázatot  

    korszakEl.value = ''; // Mezők ürítése  
    evszam1El.value = '';
    megnev1El.value = '';
    tan1El.value = '';
    evszam2El.value = '';
    megnev2El.value = '';
    tan2El.value = '';
});
