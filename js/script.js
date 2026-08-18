/**
 * ==========================================================================
 * ANDINITOS WEB - CLIENT LOGIC & SHOPPING CART
 * ==========================================================================
 */

// Base de Datos de Productos
// Orden oficial de categorías (garantiza el orden correcto incluso con Firebase)
const CATEGORY_ORDER = ['pasteles', 'pasteles_al_barril', 'bebidas', 'jugos_naturales', 'malteadas', 'combos'];

let menuDatabase = {
    pasteles: [
        {
            id: "P1",
            name: "Pastel de Carne Molida",
            price: 7500,
            desc: "Delicioso pastel tradicional relleno de carne molida seleccionada y sazonada.",
            image: "images/CARNE MOLIDA.png"
        },
        {
            id: "P2",
            name: "Pastel de Jamón y Queso",
            price: 7000,
            desc: "Clásica combinación de jamón premium y queso mozzarella derretido.",
            image: "images/JAMON Y QUESI.png"
        },
        {
            id: "P3",
            name: "Pastel de Pollo",
            price: 7500,
            desc: "Pastel relleno de jugosa pechuga de pollo desmechada y guisada con amor.",
            image: "images/POLLO.png"
        },
        {
            id: "P4",
            name: "Palito de Queso",
            price: 6500,
            desc: "Deditos de queso crujientes por fuera y súper derretidos por dentro.",
            image: "images/PALITO DE QUESO.png"
        },
        {
            id: "P5",
            name: "Pastel de Salchicha y Queso",
            price: 7000,
            desc: "Salchicha seleccionada acompañada de queso mozzarella hilado.",
            image: "images/SALCHICHA Y QUESO.png"
        },
        {
            id: "P6",
            name: "Pastel de Queso",
            price: 6500,
            desc: "Sabor tradicional y simple con abundante queso campesino de la mejor calidad.",
            image: "images/QUESO.jpeg"
        },
        {
            id: "P7",
            name: "Pastel de Guayaba y Queso",
            price: 7000,
            desc: "La perfecta combinación dulce y salada de bocadillo de guayaba y queso fundido.",
            image: "images/GUAYABA Y QUESO.png"
        },
        {
            id: "P8",
            name: "Pastel Hawaiano",
            price: 7500,
            desc: "Relleno tropical de jamón, queso mozzarella y dulces trozos de piña calada.",
            image: "images/HAWAIANO.png"
        },
        {
            id: "PP1",
            name: "Pastel de Arroz con Carne",
            price: 9000,
            desc: "El tradicional pastel andino con arroz aliñado y carne guisada.",
            image: "images/ARROZ CON CARNE.png"
        },
        {
            id: "PP3",
            name: "Pastel de Chicharrón y Queso",
            price: 10000,
            desc: "Pastel relleno de chicharrón crocante sazonado y queso derretido.",
            image: "images/CHICHARRON Y QUESO.png"
        },
        {
            id: "PP5",
            name: "Pastel Pollo Champiñones",
            price: 9000,
            desc: "Pollo desmechado bañado en una salsa cremosa de champiñones seleccionados.",
            image: "images/POLLO CHAMPIÑONES.png"
        },
        {
            id: "PP6",
            name: "Pastel Pollo Tocineta",
            price: 9000,
            desc: "Pechuga de pollo desmechada con trozos crujientes de tocineta ahumada y queso.",
            image: "images/POLLO TOCINETA.png"
        },
        {
            id: "PP7",
            name: "Pastel Ranchero",
            price: 9500,
            desc: "Relleno especial de chorizo picado, maíz dulce, salchicha y queso fundido.",
            image: "images/RANCHERO.png"
        }
    ],
    pasteles_al_barril: [
        {
            id: "PP2",
            name: "Pastel de Chicharrón al Barril y Queso",
            price: 11000,
            desc: "Exclusivo chicharrón crujiente preparado al barril con queso mozzarella fundido.",
            image: "images/CHICHARRON AL BARRIL Y QUESO.png"
        },
        {
            id: "PP4",
            name: "Pastel de Pierna de Cerdo al Barril y Queso",
            price: 11000,
            desc: "Suave pierna de cerdo ahumada al barril combinada con queso fundido.",
            image: "images/PIERNA DE CERDO AL BARRIL Y QUESO.png"
        }
    ],
    bebidas: [
        {
            id: "B1",
            name: "Milo de 16oz",
            price: 11000,
            desc: "Refrescante y fría bebida achocolatada Milo de 16oz.",
            image: "images/MALTEADA DE MILO.jpeg"
        },
        {
            id: "B2",
            name: "Toddy de 16oz",
            price: 11000,
            desc: "Refrescante y fría bebida achocolatada Toddy de 16oz.",
            image: "images/MALTEADA DE TODDY.jpeg"
        }
    ],
    jugos_naturales: [
        {
            id: "J1",
            name: "Jugo de Mora",
            isJugo: true,
            priceAgua: 9000,
            priceLeche: 11000,
            desc: "Natural de mora, dulce y con el sabor típico de los frutos andinos.",
            image: "images/JUGOS.png"
        },
        {
            id: "J2",
            name: "Jugo de Maracuyá",
            isJugo: true,
            priceAgua: 9000,
            priceLeche: 11000,
            desc: "Tropical y refrescante, el maracuyá en su punto justo de acidez.",
            image: "images/JUGOS.png"
        },
        {
            id: "J3",
            name: "Jugo de Fresa",
            isJugo: true,
            priceAgua: 9000,
            priceLeche: 11000,
            desc: "Fresas frescas licuadas al momento para un sabor inigualable.",
            image: "images/JUGOS.png"
        },
        {
            id: "J4",
            name: "Jugo de Guánabana",
            isJugo: true,
            priceAgua: 9000,
            priceLeche: 11000,
            desc: "Cremoso y aromático, la guánabana en todo su esplendor tropical.",
            image: "images/JUGOS.png"
        },
        {
            id: "J5",
            name: "Frutos Amarillos",
            isJugo: true,
            priceAgua: 9000,
            priceLeche: 11000,
            desc: "Mezcla especial de frutas amarillas de temporada, llenas de vitaminas.",
            image: "images/JUGOS.png"
        },
        {
            id: "J6",
            name: "Frutos Rojos",
            isJugo: true,
            priceAgua: 9000,
            priceLeche: 11000,
            desc: "Combinación de mora, fresa y frutas rojas, antioxidante y delicioso.",
            image: "images/JUGOS.png"
        },
        {
            id: "J7",
            name: "Jugo de Mango",
            isJugo: true,
            priceAgua: 9000,
            priceLeche: 11000,
            desc: "Mango fresco del trópico colombiano, dulce y con cuerpo cremoso.",
            image: "images/logo.png"
        }
    ],
    malteadas: [
        {
            id: "M1",
            name: "Malteada de Cocosette",
            price: 14000,
            desc: "Cremosa malteada preparada con galleta Cocosette original y coco rallado.",
            image: "images/MALETADA DE COCOSSETTE.png"
        },
        {
            id: "M2",
            name: "Malteada de Arequipe",
            price: 13000,
            desc: "Deliciosa combinación de helado premium y arequipe tradicional colombiano.",
            image: "images/MALTEADA DE AREQUIPE.png"
        },
        {
            id: "M3",
            name: "Malteada de Frutos Rojos",
            price: 13500,
            desc: "Refrescante y dulce malteada con salsa artesanal de fresas, moras y arándanos.",
            image: "images/MALTEADA DE FRUTOS ROJOS.png"
        },
        {
            id: "M4",
            name: "Malteada de Milo",
            price: 12500,
            desc: "La favorita de la casa, con abundante Milo en polvo y helado de vainilla.",
            image: "images/MALTEADA DE MILO.jpeg"
        },
        {
            id: "M5",
            name: "Malteada de Oreo",
            price: 13500,
            desc: "Cremosa malteada con trozos crocantes de galleta Oreo y salsa de chocolate.",
            image: "images/MALTEADA DE OREO.png"
        },
        {
            id: "M6",
            name: "Malteada de Toddy",
            price: 13000,
            desc: "Exclusivo sabor andino preparado con auténtica bebida achocolatada Toddy.",
            image: "images/MALTEADA DE TODDY.jpeg"
        }
    ],
    combos: [
        {
            id: "C1",
            name: "Combo Trío Dulzura",
            price: 21000,
            desc: "2 palitos de queso y 1 malteada a elección del cliente.",
            image: "images/TRIO DULZURA.png"
        },
        {
            id: "C2",
            name: "Combo Trío Sensación",
            price: 23000,
            desc: "2 pasteles (hasta $7.500 c/u) y 1 malteada a elección del cliente.",
            image: "images/TRIO SENSACION.png"
        }
    ]
};

// Configuración de WhatsApp y tienda
const STORE_WHATSAPP = "573182856886"; // Número de WhatsApp del negocio
let storeOpenOverride = null; // null = automático, true = abierto, false = cerrado
let storeSettings = {
    isOpen: true,
    useManualSchedule: false,
    openHour: "07:00",
    closeHour: "20:00"
};

// Estado de la aplicación
let cart = [];
let activeCategory = "todos";

// Firebase Configuración
const firebaseConfig = {
    apiKey: "AIzaSyAUMS-ZPgKdxlYriinF_WSM80VYu2Ct2Yw",
    authDomain: "andinitos.firebaseapp.com",
    databaseURL: "https://andinitos-default-rtdb.firebaseio.com",
    projectId: "andinitos",
    storageBucket: "andinitos.firebasestorage.app",
    messagingSenderId: "783238716577",
    appId: "1:783238716577:web:d8e9496a90f19a666424e0"
};

let db = null;
let isFirebaseConnected = false;

// Inicialización de la base de datos
function initDatabase() {
    if (typeof firebase !== 'undefined' && firebaseConfig.apiKey !== "YOUR_API_KEY") {
        try {
            firebase.initializeApp(firebaseConfig);
            db = firebase.database();
            isFirebaseConnected = true;
            console.log("AndinitosDB: Conectado a Firebase Realtime Database.");

            // Escuchar cambios de estado de la tienda (Abierto/Cerrado por administrador)
            db.ref("storeSettings/status").on("value", (snapshot) => {
                const status = snapshot.val();
                if (status) {
                    storeOpenOverride = status.isOpen;
                    storeSettings = {
                        ...storeSettings,
                        ...status
                    };
                    updateStoreStatusUI();
                }
            });

            // Escuchar y sincronizar catálogo de productos desde Firebase
            db.ref("products").on("value", (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    menuDatabase = data;
                    renderProducts();
                }
            });
        } catch (error) {
            console.error("Error al inicializar Firebase:", error);
            syncProductsDatabase();
        }
    } else {
        console.log("AndinitosDB: Usando lógica local offline (Firebase no configurado).");
        updateStoreStatusUI();
        syncProductsDatabase();
    }
}

// Default fallback para bebidas
const DEFAULT_BEBIDAS = [
    {
        id: "B1",
        name: "Milo de 16oz",
        price: 11000,
        desc: "Refrescante y fría bebida achocolatada Milo de 16oz.",
        image: "images/MALTEADA DE MILO.jpeg",
        available: true
    },
    {
        id: "B2",
        name: "Toddy de 16oz",
        price: 11000,
        desc: "Refrescante y fría bebida achocolatada Toddy de 16oz.",
        image: "images/MALTEADA DE TODDY.jpeg",
        available: true
    }
];

// Garantizar que la categoría bebidas exista y contenga productos
function ensureBebidasExist(dbObj) {
    if (!dbObj || typeof dbObj !== 'object') return false;
    const catData = dbObj.bebidas;
    let list = [];
    if (Array.isArray(catData)) {
        list = catData;
    } else if (catData && typeof catData === 'object') {
        list = Object.values(catData).filter(v => v && typeof v === 'object');
    }
    if (list.length === 0) {
        dbObj.bebidas = DEFAULT_BEBIDAS;
        return true;
    }
    dbObj.bebidas = list;
    return false;
}

// Sincronizar catálogo con origen local o Firebase
function syncProductsDatabase() {
    if (isFirebaseConnected && db) {
        db.ref("products").on("value", (snapshot) => {
            const data = snapshot.val();
            if (data) {
                menuDatabase = data;
                const wasFixed = ensureBebidasExist(menuDatabase);
                if (wasFixed) {
                    db.ref("products/bebidas").set(DEFAULT_BEBIDAS);
                }
            } else {
                ensureBebidasExist(menuDatabase);
            }
            renderProducts();
        });
    } else {
        // Intentar leer de localStorage y FUSIONAR con los datos por defecto
        const localData = localStorage.getItem("andinitos_products");
        if (localData) {
            try {
                const parsed = JSON.parse(localData);
                Object.keys(menuDatabase).forEach(catKey => {
                    const localCat = parsed[catKey];
                    const isValidArray = Array.isArray(localCat) && localCat.length > 0;
                    const isValidObj = localCat && typeof localCat === 'object'
                        && !Array.isArray(localCat) && Object.keys(localCat).length > 0;
                    if (isValidArray || isValidObj) {
                        menuDatabase[catKey] = localCat;
                    }
                });
                ensureBebidasExist(menuDatabase);
                localStorage.setItem("andinitos_products", JSON.stringify(menuDatabase));
            } catch (e) {
                console.warn("AndinitosDB: Error al parsear localStorage, usando base de datos por defecto.");
                localStorage.removeItem("andinitos_products");
                ensureBebidasExist(menuDatabase);
            }
        } else {
            ensureBebidasExist(menuDatabase);
            localStorage.setItem("andinitos_products", JSON.stringify(menuDatabase));
        }
        renderProducts();
    }
}

// --------------------------------------------------------------------------
// LÓGICA DE HORARIOS Y FESTIVOS EN COLOMBIA
// --------------------------------------------------------------------------

// Algoritmo de Butcher-Meeus para calcular el Domingo de Pascua (Easter)
function getEasterSunday(year) {
    const a = year % 19;
    const b = Math.floor(year / 100);
    const c = year % 100;
    const d = Math.floor(b / 4);
    const e = b % 4;
    const f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4);
    const k = c % 4;
    const L = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * L) / 451);
    const month = Math.floor((h + L - 7 * m + 114) / 31);
    const day = ((h + L - 7 * m + 114) % 31) + 1;
    return new Date(year, month - 1, day);
}

// Verifica si una fecha específica en Colombia es día festivo
function isColombianHoliday(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    // Festivos fijos (Meses son 0-indexados)
    const fixedHolidays = [
        { m: 0, d: 1 },   // Año Nuevo (1 Ene)
        { m: 4, d: 1 },   // Día del Trabajo (1 May)
        { m: 6, d: 20 },  // Grito de Independencia (20 Jul)
        { m: 7, d: 7 },   // Batalla de Boyacá (7 Ago)
        { m: 11, d: 8 },  // Inmaculada Concepción (8 Dic)
        { m: 11, d: 25 }  // Navidad (25 Dic)
    ];

    // Verificar festivos fijos
    if (fixedHolidays.some(h => h.m === month && h.d === day)) return true;

    // Festivos con ley Emiliani (Se trasladan al siguiente lunes)
    const emilianiHolidays = [
        { m: 0, d: 6 },   // Reyes Magos (6 Ene)
        { m: 2, d: 19 },  // San José (19 Mar)
        { m: 5, d: 29 },  // San Pedro y San Pablo (29 Jun)
        { m: 7, d: 15 },  // Asunción de la Virgen (15 Ago)
        { m: 9, d: 12 },  // Día de la Raza (12 Oct)
        { m: 10, d: 1 },  // Todos los Santos (1 Nov)
        { m: 10, d: 11 }  // Independencia de Cartagena (11 Nov)
    ];

    const getNextMonday = (d) => {
        const result = new Date(d.getTime());
        const dayOfWeek = result.getDay();
        if (dayOfWeek === 1) return result; // Ya es lunes
        const diff = (8 - dayOfWeek) % 7 || 7;
        result.setDate(result.getDate() + diff);
        return result;
    };

    // Verificar festivos con traslado de Emiliani
    for (const h of emilianiHolidays) {
        const baseDate = new Date(year, h.m, h.d);
        const actualHoliday = getNextMonday(baseDate);
        if (actualHoliday.getMonth() === month && actualHoliday.getDate() === day) {
            return true;
        }
    }

    // Festivos relativos a Pascua (Semana Santa y otros lunes)
    const easter = getEasterSunday(year);
    const addDays = (baseDate, days) => {
        const result = new Date(baseDate.getTime());
        result.setDate(result.getDate() + days);
        return result;
    };

    const JuevesSanto = addDays(easter, -3);
    const ViernesSanto = addDays(easter, -2);
    const Ascension = getNextMonday(addDays(easter, 40));
    const CorpusChristi = getNextMonday(addDays(easter, 60));
    const SagradoCorazon = getNextMonday(addDays(easter, 68));

    const easterHolidays = [JuevesSanto, ViernesSanto, Ascension, CorpusChristi, SagradoCorazon];
    if (easterHolidays.some(h => h.getMonth() === month && h.getDate() === day)) return true;

    return false;
}

// Obtiene la hora actual en la zona horaria de Colombia (UTC-5)
function getColombiaTime() {
    const now = new Date();
    // Obtener UTC en milisegundos
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    // Aplicar offset de Colombia (UTC-5)
    return new Date(utc + (3600000 * -5));
}

// Evalúa si la tienda está abierta según el horario tradicional de Andinitos
function isStoreOpenAutomatically() {
    const colDate = getColombiaTime();
    const day = colDate.getDay(); // 0 = Domingo, 1 = Lunes...
    const hours = colDate.getHours();
    const minutes = colDate.getMinutes();
    const timeInMinutes = (hours * 60) + minutes;

    const isHoliday = isColombianHoliday(colDate);

    // Horarios en minutos
    const openWeekday = 7 * 60; // 7:00 AM
    const closeWeekday = 20 * 60; // 8:00 PM

    const openSundayHoliday = 7 * 60; // 7:00 AM
    const closeSundayHoliday = 14 * 60; // 2:00 PM

    if (day === 0 || isHoliday) {
        // Domingos y Festivos: 7:00 AM - 2:00 PM
        return timeInMinutes >= openSundayHoliday && timeInMinutes < closeSundayHoliday;
    } else {
        // Lunes a Sábado: 7:00 AM - 8:00 PM
        return timeInMinutes >= openWeekday && timeInMinutes < closeWeekday;
    }
}

function loadStoreSettings() {
    const localData = localStorage.getItem("andinitos_mock_status");
    if (localData) {
        try {
            const parsed = JSON.parse(localData);
            storeSettings = {
                ...storeSettings,
                ...parsed
            };
        } catch (error) {
            console.warn("No se pudo cargar la configuración guardada de la tienda.", error);
        }
    }
    return storeSettings;
}

// Verifica el estado final combinando horario automático y override de administrador
function checkStoreOpen() {
    const settings = loadStoreSettings();
    if (settings.useManualSchedule) {
        return Boolean(settings.isOpen);
    }

    if (storeOpenOverride !== null) {
        return Boolean(storeOpenOverride);
    }

    const currentMinutes = (() => {
        const now = getColombiaTime();
        return (now.getHours() * 60) + now.getMinutes();
    })();

    const parseTime = (value) => {
        const [hours, minutes] = (value || "07:00").split(":").map(Number);
        return (hours || 0) * 60 + (minutes || 0);
    };

    const openMinutes = parseTime(settings.openHour);
    const closeMinutes = parseTime(settings.closeHour);

    if (closeMinutes <= openMinutes) {
        return currentMinutes >= openMinutes || currentMinutes < closeMinutes;
    }

    return currentMinutes >= openMinutes && currentMinutes < closeMinutes;
}

// Actualiza el banner e información del estado de la tienda
function updateStoreStatusUI() {
    const isOpen = checkStoreOpen();
    const dot = document.getElementById("status-dot");
    const text = document.getElementById("status-text");

    if (isOpen) {
        if (dot) dot.className = "status-dot";
        if (text) text.innerText = "Abierto Ahora";
    } else {
        if (dot) dot.className = "status-dot closed";
        if (text) text.innerText = "Cerrado temporalmente";
    }
}

// --------------------------------------------------------------------------
// LOGICA DE CARRITO Y RENDERIZADO
// --------------------------------------------------------------------------

// Cargar catálogo de productos por categoría (Renderizado en Acordeón)
function renderProducts() {
    const accordionContainer = document.getElementById("menu-accordion-container");
    if (!accordionContainer) {
        console.error("AndinitosDB: No se encontró #menu-accordion-container en el DOM.");
        return;
    }
    accordionContainer.innerHTML = "";

    // Diccionario de íconos para cada categoría
    const categoryIcons = {
        pasteles: "🥟",
        pasteles_al_barril: "🔥",
        bebidas: "🧃",
        malteadas: "🥤",
        jugos_naturales: "🍓",
        combos: "🎉"
    };

    // Helper: convierte un valor (array o objeto Firebase) a array seguro
    function toArray(val) {
        if (!val) return [];
        if (Array.isArray(val)) return val;
        // Firebase a veces guarda arrays como objetos {"0":{...}, "1":{...}}
        if (typeof val === 'object') {
            return Object.values(val).filter(v => v && typeof v === 'object');
        }
        return [];
    }

    let anyRendered = false;

    CATEGORY_ORDER.forEach((catKey, index) => {
        const products = toArray(menuDatabase[catKey]);
        if (products.length === 0) return;

        anyRendered = true;
        const catLabel = catKey.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase());
        const icon = categoryIcons[catKey] || "🍽️";

        const accordion = document.createElement("div");
        // El primer acordeón estará abierto por defecto
        accordion.className = `category-accordion ${index === 0 ? 'open' : ''}`;
        accordion.id = `accordion-${catKey}`;

        // Generar HTML de productos
        let productsHtml = "";
        products.forEach(p => {
            if (!p || !p.id) return;

            const isAvailable = p.available !== false;

            if (p.isJugo) {
                // --- Tarjeta especial para jugos con doble precio ---
                const precioAgua = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(p.priceAgua || 9000);
                const precioLeche = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(p.priceLeche || 11000);
                productsHtml += `
                    <div class="product-card ${isAvailable ? '' : 'product-card--unavailable'} product-card--jugo">
                        <div class="product-img-wrapper">
                            <img src="${p.image || 'images/JUGOS.png'}" alt="${p.name || ''}" class="product-img" loading="lazy" onerror="this.src='images/logo.png'">
                        </div>
                        <div class="product-info">
                            <span class="product-category">${catLabel}</span>
                            <h3 class="product-name">${p.name || ''}</h3>
                            <p class="product-desc">${p.desc || ''}</p>
                            <div class="jugo-dual-price">
                                <div class="jugo-price-row">
                                    <span class="jugo-price-label">&#x1F4A7; En Agua</span>
                                    <span class="product-price jugo-price-val">${precioAgua}</span>
                                </div>
                                <div class="jugo-price-row">
                                    <span class="jugo-price-label">&#x1F95B; En Leche</span>
                                    <span class="product-price jugo-price-val">${precioLeche}</span>
                                </div>
                            </div>
                            <div class="product-controls" style="margin-top: 14px;">
                                <button class="btn-add-card" style="flex:1; width:100%;" onclick="openJugoModal('${p.id}')" ${isAvailable ? '' : 'disabled'}>
                                    ${isAvailable ? '&#x1F379; Personalizar' : 'No disponible'}
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            } else {
                // --- Tarjeta normal ---
                const priceFormatted = new Intl.NumberFormat('es-CO', {
                    style: 'currency',
                    currency: 'COP',
                    minimumFractionDigits: 0
                }).format(p.price || 0);

                productsHtml += `
                    <div class="product-card ${isAvailable ? '' : 'product-card--unavailable'}">
                        <div class="product-img-wrapper">
                            <img src="${p.image || 'images/logo.png'}" alt="${p.name || ''}" class="product-img" loading="lazy" onerror="this.src='images/logo.png'">
                        </div>
                        <div class="product-info">
                            <span class="product-category">${catLabel}</span>
                            <h3 class="product-name">${p.name || ''}</h3>
                            <p class="product-desc">${p.desc || ''}</p>
                            <div class="product-footer">
                                <span class="product-price">${priceFormatted}</span>
                            </div>
                            <div class="product-controls">
                                <div class="product-qty-selector">
                                    <button class="card-qty-btn" onclick="decrementCardQty('${p.id}')" aria-label="Disminuir cantidad">-</button>
                                    <span class="card-qty-value" id="card-qty-${p.id}">1</span>
                                    <button class="card-qty-btn" onclick="incrementCardQty('${p.id}')" aria-label="Aumentar cantidad">+</button>
                                </div>
                                <button class="btn-add-card" onclick="addCardToCart('${p.id}', '${catKey}')" ${isAvailable ? '' : 'disabled'}>
                                    ${isAvailable ? 'Agregar' : 'No disponible'}
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            }
        });

        accordion.innerHTML = `
            <button class="accordion-header" onclick="toggleAccordion('${catKey}')">
                <span class="accordion-title">${icon} ${catLabel}</span>
                <span class="accordion-chevron">▼</span>
            </button>
            <div class="accordion-content-wrapper">
                <div class="accordion-content-inner">
                    <div class="accordion-products-container">
                        <div class="products-grid">
                            ${productsHtml}
                        </div>
                    </div>
                </div>
            </div>
        `;

        accordionContainer.appendChild(accordion);
    });

    if (!anyRendered) {
        accordionContainer.innerHTML = `
            <div style="text-align:center; padding: 60px 20px; color: var(--on-surface-variant);">
                <div style="font-size: 48px; margin-bottom: 16px;">🥟</div>
                <p style="font-size: 18px; font-weight: 600;">Cargando el menú...</p>
                <p style="font-size: 14px; margin-top: 8px;">Si el problema persiste, recarga la página.</p>
            </div>
        `;
    }
}

// Alternar apertura de acordeón
window.toggleAccordion = function (catKey) {
    const accordion = document.getElementById(`accordion-${catKey}`);
    if (accordion) {
        accordion.classList.toggle("open");
    }
};

// Abrir acordeón y hacer scroll suave (Para enlaces rápidos)
window.openAccordion = function (catKey) {
    const accordion = document.getElementById(`accordion-${catKey}`);
    if (accordion) {
        accordion.classList.add("open");

        // Esperar un instante para que el navegador inicie el scroll
        setTimeout(() => {
            accordion.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 50);
    }
};

// Incrementar cantidad en la tarjeta del producto
window.incrementCardQty = function (productId) {
    const span = document.getElementById(`card-qty-${productId}`);
    if (span) {
        let qty = parseInt(span.innerText) || 1;
        qty++;
        span.innerText = qty;
    }
};

// Disminuir cantidad en la tarjeta del producto
window.decrementCardQty = function (productId) {
    const span = document.getElementById(`card-qty-${productId}`);
    if (span) {
        let qty = parseInt(span.innerText) || 1;
        if (qty > 1) {
            qty--;
            span.innerText = qty;
        }
    }
};

// Agregar producto al carrito leyendo la cantidad seleccionada en su tarjeta
window.addCardToCart = function (productId, category) {
    const span = document.getElementById(`card-qty-${productId}`);
    const qtyToAdd = span ? (parseInt(span.innerText) || 1) : 1;

    // Si la tienda está cerrada, advertir pero permitir preparar pedido
    const isOpen = checkStoreOpen();
    if (!isOpen) {
        alert("Nota: Actualmente estamos CERRADOS. Puedes armar tu pedido para enviarlo tan pronto abramos.");
    }

    // Interceptar si es un combo para mostrar el modal de personalización
    if (productId === "C1" || productId === "C2") {
        const product = (menuDatabase[category] || []).find(p => p && p.id === productId);
        if (product && product.available === false) {
            alert("Este combo no está disponible actualmente.");
            return;
        }
        if (span) span.innerText = "1";
        openComboModal(productId, category, qtyToAdd);
        return;
    }

    // Buscar el producto de forma segura (soporta formato array y objeto Firebase)
    const catProducts = menuDatabase[category];
    const productsArray = Array.isArray(catProducts)
        ? catProducts
        : (catProducts && typeof catProducts === 'object' ? Object.values(catProducts) : []);
    const product = productsArray.find(p => p && p.id === productId);
    if (!product) {
        console.warn(`AndinitosDB: Producto ${productId} no encontrado en categoría ${category}`);
        return;
    }

    if (product.available === false) {
        alert("Este producto no está disponible en este momento.");
        return;
    }

    const existingItem = cart.find(item => item.product.id === productId);
    if (existingItem) {
        existingItem.quantity += qtyToAdd;
    } else {
        cart.push({
            product: product,
            quantity: qtyToAdd,
            customId: productId,
            notes: ""
        });
    }

    // Resetear cantidad en la tarjeta de nuevo a 1
    if (span) span.innerText = "1";

    saveCart();
    renderCart();
    openCartSidebar();
};

// Variables de estado para el modal de combo personalizado
let currentComboId = null;
let currentComboCategory = null;
let currentComboQty = 1;

// Variable de estado para el modal de jugos
let currentJugoId = null;

// Abrir el modal de personalización de combos
window.openComboModal = function (productId, category, qty) {
    const product = (menuDatabase[category] || []).find(p => p && p.id === productId);
    if (product && product.available === false) {
        alert("Este combo no está disponible ahora mismo.");
        return;
    }

    currentComboId = productId;
    currentComboCategory = category;
    currentComboQty = qty;

    const modal = document.getElementById("combo-modal");
    const titleEl = document.getElementById("combo-modal-title");
    const descEl = document.getElementById("combo-modal-desc");
    const container = document.getElementById("combo-options-container");

    if (!modal || !titleEl || !descEl || !container) return;

    container.innerHTML = "";

    // Listar sabores de malteadas
    const malteadaOptions = menuDatabase.malteadas.map(m => m.name);

    if (productId === "C1") {
        titleEl.innerText = "Personaliza tu Combo Trío Dulzura";
        descEl.innerText = "Este combo incluye 2 Palitos de Queso y 1 Malteada. Selecciona el sabor de tu malteada:";

        const group = document.createElement("div");
        group.className = "combo-option-group";
        group.innerHTML = `
            <label>Sabor de Malteada</label>
            <select id="select-malteada" class="combo-select" required>
                ${malteadaOptions.map(m => `<option value="${m}">${m}</option>`).join("")}
            </select>
        `;
        container.appendChild(group);
    } else if (productId === "C2") {
        titleEl.innerText = "Personaliza tu Combo Trío Sensación";
        descEl.innerText = "Este combo incluye 2 Pasteles (hasta $7.500 c/u) y 1 Malteada. Selecciona tus opciones:";

        // Filtrar pasteles elegibles (precio <= 7500)
        const eligiblePasteles = [];
        Object.keys(menuDatabase).forEach(key => {
            if (key === "pasteles" || key === "pasteles_al_barril") {
                menuDatabase[key].forEach(p => {
                    if (p.price <= 7500) {
                        eligiblePasteles.push(p.name);
                    }
                });
            }
        });

        // Primer Pastel
        const group1 = document.createElement("div");
        group1.className = "combo-option-group";
        group1.innerHTML = `
            <label>Primer Pastel</label>
            <select id="select-pastel-1" class="combo-select" required>
                ${eligiblePasteles.map(p => `<option value="${p}">${p}</option>`).join("")}
            </select>
        `;
        container.appendChild(group1);

        // Segundo Pastel
        const group2 = document.createElement("div");
        group2.className = "combo-option-group";
        group2.innerHTML = `
            <label>Segundo Pastel</label>
            <select id="select-pastel-2" class="combo-select" required>
                ${eligiblePasteles.map(p => `<option value="${p}">${p}</option>`).join("")}
            </select>
        `;
        container.appendChild(group2);

        // Malteada
        const group3 = document.createElement("div");
        group3.className = "combo-option-group";
        group3.innerHTML = `
            <label>Sabor de Malteada</label>
            <select id="select-malteada" class="combo-select" required>
                ${malteadaOptions.map(m => `<option value="${m}">${m}</option>`).join("")}
            </select>
        `;
        container.appendChild(group3);
    }

    modal.classList.add("open");
};

// Cerrar el modal de combos
window.closeComboModal = function () {
    const modal = document.getElementById("combo-modal");
    if (modal) modal.classList.remove("open");
    currentComboId = null;
    currentComboCategory = null;
};

// Abrir el modal de personalización de jugos
window.openJugoModal = function (productId) {
    currentJugoId = productId;

    // Buscar el producto en jugos_naturales
    const jugosList = Array.isArray(menuDatabase.jugos_naturales)
        ? menuDatabase.jugos_naturales
        : Object.values(menuDatabase.jugos_naturales || {});
    const jugo = jugosList.find(j => j && j.id === productId);
    if (!jugo) return;

    const modal = document.getElementById("jugo-modal");
    const titleEl = document.getElementById("jugo-modal-title");
    if (!modal || !titleEl) return;

    titleEl.innerText = jugo.name;

    // Limpiar selecciones previas
    const radios = modal.querySelectorAll("input[type='radio']");
    radios.forEach(r => r.checked = false);

    modal.classList.add("open");
};

// Cerrar el modal de jugos
window.closeJugoModal = function () {
    const modal = document.getElementById("jugo-modal");
    if (modal) modal.classList.remove("open");
    currentJugoId = null;
};

// Añadir producto al carrito
window.addToCart = function (productId, category) {
    // Si la tienda está cerrada, advertir pero permitir preparar pedido
    const isOpen = checkStoreOpen();
    if (!isOpen) {
        alert("Nota: Actualmente estamos CERRADOS. Puedes armar tu pedido para enviarlo tan pronto abramos.");
    }

    const product = menuDatabase[category].find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.product.id === productId);

    if (product.isJugo) {
        // Para jugos se requiere personalización opcional
        const base = confirm("¿Deseas tu jugo en LECHE?\n(Aceptar = Leche / Cancelar = Agua)");
        const baseSelected = base ? "en Leche" : "en Agua";
        const customId = `${productId}-${baseSelected}`;

        const existingJugo = cart.find(item => item.customId === customId);
        if (existingJugo) {
            existingJugo.quantity++;
        } else {
            cart.push({
                product: product,
                quantity: 1,
                customId: customId,
                notes: `Base: ${baseSelected}`
            });
        }
    } else {
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({
                product: product,
                quantity: 1,
                customId: productId,
                notes: ""
            });
        }
    }

    saveCart();
    renderCart();
    openCartSidebar();
};

// Modificar cantidad
window.updateQty = function (customId, delta) {
    const item = cart.find(item => item.customId === customId);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
        cart = cart.filter(item => item.customId !== customId);
    }

    saveCart();
    renderCart();
};

// Eliminar ítem
window.removeCartItem = function (customId) {
    cart = cart.filter(item => item.customId !== customId);
    saveCart();
    renderCart();
};

// Renderizar contenido del carrito
function formatCOP(value) {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(value || 0);
}

function getSelectedDeliveryFee() {
    const zoneSelect = document.getElementById("form-zone");
    if (!zoneSelect) return 0;
    const selectedOption = zoneSelect.options[zoneSelect.selectedIndex];
    if (!selectedOption) return 0;
    return Number(selectedOption.dataset.price || 0) || 0;
}

function updateCartTotalsUI() {
    const cartTotalText = document.getElementById("cart-total-price");
    const cartDeliveryText = document.getElementById("cart-delivery-price");
    const cartGrandTotalText = document.getElementById("cart-grand-total");
    const deliveryRow = document.getElementById("delivery-row");

    const subtotal = cart.reduce((sum, item) => sum + (Number(item.product.price) * Number(item.quantity || 1)), 0);
    const deliveryFee = getSelectedDeliveryFee();
    const total = subtotal + deliveryFee;

    if (cartTotalText) cartTotalText.innerText = formatCOP(subtotal);
    if (cartDeliveryText) cartDeliveryText.innerText = formatCOP(deliveryFee);
    if (cartGrandTotalText) cartGrandTotalText.innerText = formatCOP(total);

    if (deliveryRow) {
        deliveryRow.style.display = cart.length > 0 ? "flex" : "none";
    }
}

function renderCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartCountBadge = document.getElementById("cart-badge");
    const cartTotalText = document.getElementById("cart-total-price");

    if (!cartItemsContainer) return;

    // Contar total de ítems
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCountBadge) {
        cartCountBadge.innerText = totalItems;
        cartCountBadge.style.display = totalItems > 0 ? "flex" : "none";
    }

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart-state">
                <div class="empty-cart-icon">🛒</div>
                <p>Tu carrito está vacío</p>
                <p style="font-size: 13px; margin-top: 8px;">¡Agrega deliciosos pasteles y malteadas!</p>
            </div>
        `;
        if (cartTotalText) cartTotalText.innerText = "$0";
        const cartDeliveryText = document.getElementById("cart-delivery-price");
        const cartGrandTotalText = document.getElementById("cart-grand-total");
        if (cartDeliveryText) cartDeliveryText.innerText = "$0";
        if (cartGrandTotalText) cartGrandTotalText.innerText = "$0";
        const deliveryRow = document.getElementById("delivery-row");
        if (deliveryRow) deliveryRow.style.display = "none";
        return;
    }

    cartItemsContainer.innerHTML = "";
    let subtotal = 0;

    cart.forEach(item => {
        const itemTotal = item.product.price * item.quantity;
        subtotal += itemTotal;

        const priceFormatted = formatCOP(item.product.price);

        const card = document.createElement("div");
        card.className = "cart-item";
        card.innerHTML = `
            <img src="${item.product.image}" alt="${item.product.name}" class="cart-item-img" onerror="this.src='images/logo.png'">
            <div class="cart-item-details">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 8px;">
                    <h4 class="cart-item-name">${item.product.name}</h4>
                    <button class="cart-item-remove" onclick="removeCartItem('${item.customId}')" aria-label="Eliminar">&times;</button>
                </div>
                ${item.notes ? `<p style="font-size: 12px; color: var(--secondary); margin-bottom: 4px;">${item.notes}</p>` : ""}
                <p class="cart-item-price">${priceFormatted}</p>
                <div class="cart-item-qty-control">
                    <button class="qty-btn" onclick="updateQty('${item.customId}', -1)">-</button>
                    <span class="qty-val">${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQty('${item.customId}', 1)">+</button>
                </div>
            </div>
        `;
        cartItemsContainer.appendChild(card);
    });

    updateCartTotalsUI();
}

// --------------------------------------------------------------------------
// EVENTOS Y MODALES
// --------------------------------------------------------------------------

function openCartSidebar() {
    const sidebar = document.getElementById("cart-sidebar");
    const overlay = document.getElementById("cart-overlay");
    if (sidebar) sidebar.classList.add("open");
    if (overlay) overlay.classList.add("open");
}

function closeCartSidebar() {
    const sidebar = document.getElementById("cart-sidebar");
    const overlay = document.getElementById("cart-overlay");
    if (sidebar) sidebar.classList.remove("open");
    if (overlay) overlay.classList.remove("open");
}

// Guardar y cargar del almacenamiento local
function saveCart() {
    localStorage.setItem("andinitos_cart", JSON.stringify(cart));
}

function generateOrderId() {
    return `order_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function persistOrderToLocalStorage(order) {
    const key = "andinitos_orders";
    const legacyKey = "andinitos_mock_orders";
    const current = JSON.parse(localStorage.getItem(key) || "{}");
    current[order.id] = order;
    localStorage.setItem(key, JSON.stringify(current));
    localStorage.setItem(legacyKey, JSON.stringify(current));
}

function loadCart() {
    const local = localStorage.getItem("andinitos_cart");
    if (local) {
        try {
            cart = JSON.parse(local);
        } catch (e) {
            cart = [];
        }
    }
}

function setupThemeProposalButtons() {
    const body = document.body;
    const buttons = document.querySelectorAll('[data-theme-option]');

    const applyTheme = (theme) => {
        body.setAttribute('data-theme', theme);
        buttons.forEach((button) => {
            const isActive = button.dataset.themeOption === theme;
            button.classList.toggle('active', isActive);
        });
    };

    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            applyTheme(button.dataset.themeOption);
        });
    });

    const initialTheme = body.dataset.theme || 'minimal';
    applyTheme(initialTheme);
}

// Configurar escuchas de eventos
function setupEventListeners() {
    // Escuchar scroll para cambiar estilo de header
    window.addEventListener("scroll", () => {
        const header = document.querySelector(".header");
        if (header) {
            if (window.scrollY > 20) {
                header.classList.add("header-scrolled");
            } else {
                header.classList.remove("header-scrolled");
            }
        }
    });

    // Abrir/Cerrar carrito
    const cartToggle = document.getElementById("cart-toggle");
    if (cartToggle) {
        cartToggle.addEventListener("click", openCartSidebar);
    }

    const cartClose = document.getElementById("cart-close-btn");
    if (cartClose) {
        cartClose.addEventListener("click", closeCartSidebar);
    }

    const cartOverlay = document.getElementById("cart-overlay");
    if (cartOverlay) {
        cartOverlay.addEventListener("click", closeCartSidebar);
    }

    // Formulario de Checkout (Envío de pedido a WhatsApp)
    const checkoutForm = document.getElementById("checkout-form");
    if (checkoutForm) {
        checkoutForm.addEventListener("submit", (e) => {
            e.preventDefault();

            if (cart.length === 0) {
                alert("Tu carrito está vacío. Agrega productos antes de realizar el pedido.");
                return;
            }

            const name = document.getElementById("form-name").value.trim();
            const phone = document.getElementById("form-phone").value.trim();
            const address = document.getElementById("form-address").value.trim();
            const zoneSelect = document.getElementById("form-zone");
            const zoneValue = zoneSelect ? zoneSelect.value : "";
            const payment = document.getElementById("form-payment").value;
            const notes = document.getElementById("form-notes").value.trim();

            if (!name) {
                alert("Por favor ingresa tu nombre completo.");
                return;
            }

            if (!phone) {
                alert("Por favor ingresa tu número de celular.");
                return;
            }

            if (!zoneValue) {
                alert("Selecciona tu zona de entrega o recoge en el local.");
                return;
            }

            if (!address && zoneValue !== "recoger" && zoneValue !== "fuera-envigado") {
                alert("Por favor ingresa la dirección completa.");
                return;
            }

            const deliveryFee = getSelectedDeliveryFee();
            const selectedZone = zoneSelect ? zoneSelect.options[zoneSelect.selectedIndex] : null;
            const zoneLabel = selectedZone ? selectedZone.text.replace(/\s*-\s*\$\d[\d.]*$/g, "").trim() : "";

            // Crear mensaje de WhatsApp formateado
            let message = `*🥟 NUEVO PEDIDO - ANDINITOS WEB *\n`;
            message += `===============================\n`;
            message += `👤 *Cliente:* ${name}\n`;
            message += `📱 *Celular:* ${phone}\n`;
            message += `🚚 *Zona:* ${zoneLabel}\n`;
            message += `📍 *Dirección:* ${address || "Recoger en el local"}\n`;
            message += `💳 *Método de Pago:* ${payment.toUpperCase()}\n`;
            if (notes) {
                message += `📝 *Notas:* ${notes}\n`;
            }
            message += `===============================\n\n`;
            message += `📋 *PRODUCTOS:*\n`;

            let subtotal = 0;
            cart.forEach(item => {
                const itemTotal = item.product.price * item.quantity;
                subtotal += itemTotal;

                const itemPriceFormatted = formatCOP(item.product.price);

                message += `• ${item.quantity}x ${item.product.name} ${item.notes ? `(${item.notes})` : ""} - c/u ${itemPriceFormatted}\n`;
            });

            const orderId = generateOrderId();
            const total = subtotal + deliveryFee;
            const totalFormatted = formatCOP(total);
            const normalizedOrder = {
                id: orderId,
                clientName: name,
                type: zoneValue === "recoger" ? "recoger" : "domicilio",
                address: address || "Recoger en el local",
                phone: phone,
                zone: zoneLabel,
                deliveryFee: deliveryFee,
                payment: payment,
                notes: notes,
                items: cart.map(item => ({
                    productId: item.product.id,
                    name: item.product.name,
                    quantity: item.quantity,
                    notes: item.notes,
                    price: item.product.price
                })),
                total: total,
                status: "pendiente",
                timestamp: Date.now()
            };

            message += `\n🚚 *Domicilio:* ${formatCOP(deliveryFee)}\n`;
            message += `\n💰 *Total a pagar:* ${totalFormatted}\n`;
            message += `===============================\n`;
            message += `💻 _Enviado desde Andinitos Web_`;

            persistOrderToLocalStorage(normalizedOrder);

            // Codificar y redireccionar
            const url = `https://api.whatsapp.com/send?phone=${STORE_WHATSAPP}&text=${encodeURIComponent(message)}`;

            // Si Firebase está conectado, guardar pedido en la base de datos para la vista del administrador
            if (isFirebaseConnected && db) {
                const newOrderRef = db.ref("orders").push();
                newOrderRef.set({
                    id: newOrderRef.key,
                    clientName: name,
                    type: zoneValue === "recoger" ? "recoger" : "domicilio",
                    address: address,
                    phone: phone,
                    zone: zoneLabel,
                    deliveryFee: deliveryFee,
                    payment: payment,
                    notes: notes,
                    items: cart.map(item => ({
                        productId: item.product.id,
                        name: item.product.name,
                        quantity: item.quantity,
                        notes: item.notes,
                        price: item.product.price
                    })),
                    total: total,
                    status: "pendiente",
                    timestamp: firebase.database.ServerValue.TIMESTAMP
                }).then(() => {
                    console.log("Pedido guardado en Firebase.");
                }).catch(err => {
                    console.error("Error al guardar pedido en Firebase:", err);
                });
            }

            // Vaciar carrito
            cart = [];
            saveCart();
            renderCart();
            closeCartSidebar();

            // Abrir WhatsApp en otra pestaña
            window.open(url, "_blank");
        });
    }

    const zoneSelect = document.getElementById("form-zone");
    const addressInput = document.getElementById("form-address");
    if (zoneSelect && addressInput) {
        const syncZoneFlow = () => {
            if (zoneSelect.value === "recoger") {
                addressInput.placeholder = "No requerido para recoger en el local";
                addressInput.disabled = true;
                addressInput.value = "";
                addressInput.required = false;
            } else {
                addressInput.placeholder = "Tu dirección completa";
                addressInput.disabled = false;
                addressInput.required = true;
            }
            updateCartTotalsUI();
        };

        zoneSelect.addEventListener("change", syncZoneFlow);
        syncZoneFlow();
    }

    // Formulario de Combo Personalizado (Confirmación e inyección al carrito)
    const comboForm = document.getElementById("combo-form");
    if (comboForm) {
        comboForm.addEventListener("submit", (e) => {
            e.preventDefault();
            if (!currentComboId || !currentComboCategory) return;

            const product = menuDatabase[currentComboCategory].find(p => p.id === currentComboId);
            if (!product) return;

            let notes = "";
            if (currentComboId === "C1") {
                const malteada = document.getElementById("select-malteada").value;
                notes = `Malteada: ${malteada}`;
            } else if (currentComboId === "C2") {
                const p1 = document.getElementById("select-pastel-1").value;
                const p2 = document.getElementById("select-pastel-2").value;
                const malteada = document.getElementById("select-malteada").value;
                notes = `Pasteles: ${p1} y ${p2}. Malteada: ${malteada}`;
            }

            // Crear ID único de carrito según la personalización para que no colisionen
            const customId = `${currentComboId}-${notes.replace(/[^a-zA-Z0-9]/g, "-")}`;
            const existingItem = cart.find(item => item.customId === customId);
            if (existingItem) {
                existingItem.quantity += currentComboQty;
            } else {
                cart.push({
                    product: product,
                    quantity: currentComboQty,
                    customId: customId,
                    notes: notes
                });
            }

            closeComboModal();
            saveCart();
            renderCart();
            openCartSidebar();
        });
    }

    // Formulario de Jugos Naturales (Base + Azúcar)
    const jugoForm = document.getElementById("jugo-form");
    if (jugoForm) {
        jugoForm.addEventListener("submit", (e) => {
            e.preventDefault();
            if (!currentJugoId) return;

            const baseRadio = jugoForm.querySelector("input[name='jugo-base']:checked");
            const azucarRadio = jugoForm.querySelector("input[name='jugo-azucar']:checked");

            if (!baseRadio) {
                alert("Por favor selecciona si deseas el jugo en Agua o en Leche.");
                return;
            }
            if (!azucarRadio) {
                alert("Por favor indica si lo deseas Con Azúcar o Sin Azúcar.");
                return;
            }

            const base = baseRadio.value;         // "agua" | "leche"
            const azucar = azucarRadio.value;     // "con azúcar" | "sin azúcar"

            // Buscar el jugo
            const jugosList = Array.isArray(menuDatabase.jugos_naturales)
                ? menuDatabase.jugos_naturales
                : Object.values(menuDatabase.jugos_naturales || {});
            const jugo = jugosList.find(j => j && j.id === currentJugoId);
            if (!jugo) { closeJugoModal(); return; }

            // Precio según base
            const price = base === "leche" ? (jugo.priceLeche || 11000) : (jugo.priceAgua || 9000);
            const baseLabel = base === "leche" ? "en Leche" : "en Agua";
            const notes = `${baseLabel} • ${azucar}`;
            const customId = `${currentJugoId}-${base}-${azucar.replace(/\s/g, '')}`;

            // Crear objeto de producto con precio correcto para el carrito
            const jugoParaCarrito = {
                id: customId,
                name: jugo.name,
                price: price,
                image: jugo.image || "images/logo.png",
                isJugo: true
            };

            const existingItem = cart.find(item => item.customId === customId);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    product: jugoParaCarrito,
                    quantity: 1,
                    customId: customId,
                    notes: notes
                });
            }

            closeJugoModal();
            saveCart();
            renderCart();
            openCartSidebar();
        });
    }

}

// Inicialización de la aplicación
document.addEventListener("DOMContentLoaded", () => {
    initDatabase();       // Llama syncProductsDatabase() -> renderProducts() internamente
    loadCart();
    renderCart();
    setupThemeProposalButtons();
    setupEventListeners();

    // Intervalo para verificar el estado de la tienda cada minuto
    setInterval(updateStoreStatusUI, 60000);
});

// Escuchar cambios de LocalStorage en otras pestañas en tiempo real
window.addEventListener("storage", (e) => {
    if (e.key === "andinitos_products") {
        try {
            menuDatabase = JSON.parse(e.newValue);
            renderProducts();
        } catch (err) { }
    }
    if (e.key === "andinitos_mock_status") {
        try {
            const status = JSON.parse(e.newValue);
            storeOpenOverride = status.isOpen;
            updateStoreStatusUI();
        } catch (err) { }
    }
});
