/**
 * Létrehoz egy dinamikus űrlapot
 * @returns {HTMLFormElement} A létrehozott űrlap elem
 */
function generateForm() { // Függvény, amely létrehoz egy dinamikus űrlapot
    const form = document.createElement('form'); // Form elemet létrehozása
    form.id = 'form'; // Beállítja az űrlap id-ját form-ra
    form.action = '#'; // Beállítja az űrlap action attribútumát

    const fields = [ // Definiálja az űrlap mezőinek adatait egy tömbben
        {
            label: 'Korszak megnevezés:', // A mező felirat szövege
            type: 'text', // A mező típusa: szöveges input
            id: 'korszak', // Egyedi azonosító a mezőhöz
            errorText: 'Hiba: Kérjük, adja meg a korszakot!'
        },
        {
            label: '1. esemény évszám:',
            type: 'text',
            id: 'evszam1',
            errorText: 'Hiba: Kérjük, adja meg az első évszámot!'
        },
        {
            label: '1. esemény megnevezés:',
            type: 'text',
            id: 'megnev1',
            errorText: 'Hiba: Kérjük, adja meg az első eseményt!'
        },
        {
            label: '1. esemény tananyag:',
            type: 'select', // A mező típusa legördülő lista
            id: 'tan1',
            errorText: 'Hiba: Kérjük, adja meg az első tananyagot!',
            options: [ // Opciók a legördülő listához
                { value: '', text: '' },
                { value: 'magyar', text: 'Magyar történelem' },
                { value: 'egyetemes', text: 'Egyetemes történelem' }
            ]
        },
        {
            label: '2. esemény évszám:',
            type: 'text',
            id: 'evszam2',
            errorText: 'Hiba: Kérjük, adja meg a második évszámot!'
        },
        {
            label: '2. esemény megnevezés:',
            type: 'text',
            id: 'megnev2',
            errorText: 'Hiba: Kérjük, adja meg a második eseményt!'
        },
        {
            label: '2. esemény tananyag:',
            type: 'select',
            id: 'tan2',
            errorText: 'Hiba: Kérjük, adja meg a második tananyagot!',
            options: [
                { value: '', text: '' },
                { value: 'magyar', text: 'Magyar történelem' },
                { value: 'egyetemes', text: 'Egyetemes történelem' }
            ]
        }
    ];

    for (let i = 0; i < fields.length; i++) { // Végigiterál a fields tömb minden elemén, hogy létrehozza az egyes űrlap mezőket
        const field = fields[i]; // Az aktuális mező adatai
        const div = document.createElement('div'); // Létrehoz egy div elemet, amely tartalmazza a mezőhöz tartozó elemeket

        const label = document.createElement('label'); // Létrehoz egy label elemet a mezőhöz
        label.htmlFor = field.id; // Összekapcsolja a label-t a megfelelő elem azonosítójával
        label.textContent = field.label; // Beállítja a label szövegét a megadott felirattal
        div.appendChild(label); // Hozzáadja a label elemet a div-hez
        div.appendChild(document.createElement('br')); // Új sort ad hozzá a tagoltság érdekében

        if (field.type === 'select') { // Ellenőrzi, hogy a mező típusa "select"-e
            const select = document.createElement('select'); // Létrehoz egy select elemet
            select.id = field.id; // Beállítja a select elem azonosítóját
            select.name = field.id // Beállítja a select elem name attribútumát

            for (let j = 0; j < field.options.length; j++) { // Végigiterál a select elemhez tartozó opciókon
                const option = document.createElement('option'); // Létrehoz egy option elemet
                option.value = field.options[j].value; // Beállítja az option értékét
                option.innerText = field.options[j].text; // Beállítja az option szövegét
                select.appendChild(option); // Hozzáadja az option elemet a select-hez
            }
            div.appendChild(select); // Hozzáadja a select elemet a div-hez
        } else { // Ha a mező típusa nem select, akkor input elemet hoz létre
            const input = document.createElement('input'); 
            input.type = field.type; // Beállítja az input típusát
            input.id = field.id; // Beállítja az input azonosítóját
            input.name = field.id; // Beállítja az input name attribútumát
            div.appendChild(input); // Hozzáadja az input elemet a div-hez
        }

        const errorDiv = document.createElement('div'); // Létrehoz egy div elemet, amely a hibák megjelenítésére szolgál
        errorDiv.className = 'error-message'; // Beállítja az osztályt a CSS stílusok miatt
        errorDiv.id = 'error-' + field.id; // Egyedi azonosítót ad a hibajelzés div-nek
        errorDiv.innerText = field.errorText; // Beállítja a hibaüzenet szövegét
        errorDiv.style.display = 'none'; // Alapértelmezettként elrejti a hibajelzést
        div.appendChild(errorDiv); // Hozzáadja a hibajelzés div-et a mezőt tartalmazó div-hez

        // Sortörések beszúrása a tagoltság érdekében
        div.appendChild(document.createElement('br'));
        div.appendChild(document.createElement('br'));

         // Az adott div hozzáadása az űrlaphoz
        form.appendChild(div);
    }
    const submit = document.createElement('button'); // Létrehoz egy submit gombot
    submit.type = 'submit'; // Beállítja, hogy a gomb az űrlap elküldését végzi
    submit.innerHTML = "Hozzáadás"; // A gomb feliratának beállítása
    form.appendChild(submit); // Hozzáadja a gombot az űrlaphoz

    document.body.appendChild(form); // űrlap hozzáadása a body-hez
    return form; // Visszaadja a létrehozott űrlap elem referenciáját
}

/**
 *  Létrehoz egy táblázat fejlécet a megadott táblázathoz
 * @param {HTMLTableElement} table A táblázat, amelyhez a fejlécet hozzáadja
 */
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

/**
 * Generálja a táblázatot a megadott adatok alapján
 * @param {Array<Object>} data A táblázat sorainak adatait tartalmazó tömb
 * @param {HTMLElement} table A táblázat HTML eleme, amelybe renderelünk
 */
function generateTable(data,table) { // Függvény deklaráció, mely egy data nevű paramétert vár, ez tartalmazza a táblázat sorainak adatait
    table.innerHTML = ''; // Táblázat törlése  
    generateTableHeader(table); // Fejléc generálása a függvény segítségével 

    const tableBody = document.createElement('tbody'); // Új tbody létrehozása  
    table.appendChild(tableBody); // tbody hozzáadása a táblázathoz  

    for (const item of data) { // For of ciklussal iterálunk az adatokon  
        const row = document.createElement('tr'); // Új sor az első eseményhez  
        tableBody.appendChild(row); // Sor hozzáadása a tbody-hoz  

        const korszakCell = document.createElement('td'); // Korszak cella létrehozása  
        korszakCell.innerHTML = item.korszak; // Cellába írjuk a korszak nevét  
        korszakCell.rowSpan = item.evszam2 ? 2 : 1; // Ha van második esemény, rowspan 2, egyébként 1  
        row.appendChild(korszakCell); // Korszak cella hozzáadása az első sorhoz  

        const evszam1Cell = document.createElement('td'); // Első esemény évszám cella  
        evszam1Cell.innerHTML = item.evszam1; // Cella tartalma  
        row.appendChild(evszam1Cell); // Hozzáadjuk a sorhoz  

        const esemeny1Cell = document.createElement('td'); // Első esemény neve cella  
        esemeny1Cell.innerHTML = item.esemeny1; // Cella tartalma  
        row.appendChild(esemeny1Cell); // Hozzáadjuk a sorhoz  

        const tananyag1Cell = document.createElement('td'); // Első esemény tananyag cella  
        tananyag1Cell.innerHTML = item.tananyag1; // Cella tartalma  
        row.appendChild(tananyag1Cell); // Hozzáadjuk a sorhoz  

        if (item.evszam2) { // Ha létezik második esemény  
            const row2 = document.createElement('tr');  // Új sor létrehozása a második eseményhez  
            tableBody.appendChild(row2); // Hozzáadjuk az új sort a tbody-hoz  

            const evszam2Cell = document.createElement('td'); // Második esemény évszám cella  
            evszam2Cell.innerHTML = item.evszam2; // Cella tartalma  
            row2.appendChild(evszam2Cell); // Hozzáadjuk a sorhoz  

            const esemeny2Cell = document.createElement('td'); // Második esemény neve cella  
            esemeny2Cell.innerHTML = item.esemeny2; // Cella tartalma  
            row2.appendChild(esemeny2Cell); // Hozzáadjuk a sorhoz  

            const tananyag2Cell = document.createElement('td'); // Második esemény tananyag cella  
            tananyag2Cell.innerHTML = item.tananyag2; // Cella tartalma  
            row2.appendChild(tananyag2Cell); // Hozzáadjuk a sorhoz  
        }
    }
}

/**
 * Validálja az adott űrlap mezőt
 * @param {HTMLInputElement} inputElement Az űrlap mező eleme
 * @param {HTMLElement} errorElement A mezőhöz tartozó hibaüzenetet tartalmazó elem
 * @returns {boolean} True, ha a mező nem üres, különben false
 */
function validateField(inputElement, errorElement) { // Validációs segédfüggvény: paraméterként kapja az input elemet és a hozzá tartozó hibaüzenet elemet
    errorElement.style.display = 'none'; // Először alaphelyzetbe állítjuk a hibaüzenetet
    if (inputElement.value === "") { // Ha az input mező üres, akkor megjelenítjük a hibaüzenetet és false értékkel térünk vissza
        errorElement.style.display = 'block';
        return false;
    }
    return true;
}

/**
 * Komplex validációt végez a második esemény mezőin
 * @param {HTMLInputElement} evszam2Element A második esemény évszám mezője
 * @param {HTMLInputElement} megnev2Element A második esemény megnevezés mezője
 * @param {HTMLSelectElement} tan2Element A második esemény tananyag mezője
 * @returns {boolean} True, ha a szükséges mezők kitöltöttek, különben false
 */
function complexValidation(evszam2Element, megnev2Element, tan2Element) {
    // Hibaüzenetek elemeinek lekérése az űrlapból
    const evszam2Error = document.getElementById('error-evszam2');
    const megnev2Error = document.getElementById('error-megnev2');
    const tan2Error = document.getElementById('error-tan2');

    // Hibajelzések lenullázása a második esemény mezőihez
    var errors = [evszam2Error, megnev2Error, tan2Error];
    for (let i = 0; i < errors.length; i++) {
    errors[i].style.display = 'none';
  }

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