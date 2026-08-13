/**
 * ==========================================================================
 * ANDINITOS WEB - ADMIN PANEL LOGIC
 * ==========================================================================
 */

// Configuración de Firebase (Debe coincidir con script.js)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT-default-rtdb.firebaseio.com",
    projectId: "YOUR_PROJECT",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

let db = null;
let isFirebaseConnected = false;
let orders = {};
let storeStatus = {
    isOpen: true,
    useManualSchedule: false,
    openHour: "07:00",
    closeHour: "20:00"
};
let soundEnabled = true;
let audioContext = null;
let lastOrdersSignature = "";

// Base de Datos de Productos (Coincide con script.js)
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
            image: "images/JUGOS.png"
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

// Inicializar base de datos
function initDatabase() {
    if (typeof firebase !== 'undefined' && firebaseConfig.apiKey !== "YOUR_API_KEY") {
        try {
            firebase.initializeApp(firebaseConfig);
            db = firebase.database();
            isFirebaseConnected = true;
            console.log("AndinitosAdmin: Conectado a Firebase Realtime Database.");
            
            // Escuchar órdenes
            db.ref("orders").on("value", (snapshot) => {
                const data = snapshot.val();
                const oldOrderCount = Object.keys(orders).length;
                orders = data || {};
                
                // Si hay una nueva orden y el sonido está activo, reproducir alerta
                const newOrderCount = Object.keys(orders).length;
                if (newOrderCount > oldOrderCount && oldOrderCount > 0) {
                    playAlertSound();
                }

                renderDashboard();
            });

            // Escuchar estado de la tienda
            db.ref("storeSettings/status").on("value", (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    storeStatus = data;
                    const toggle = document.getElementById("store-status-toggle");
                    if (toggle) toggle.checked = storeStatus.isOpen;
                    updateStatusTextUI();
                }
            });

            // Escuchar y sincronizar catálogo de productos
            db.ref("products").on("value", (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    menuDatabase = data;
                    renderAdminProducts();
                }
            });

        } catch (error) {
            console.error("Error al conectar con Firebase, usando modo simulador:", error);
            initMockMode();
        }
    } else {
        console.log("AndinitosAdmin: Firebase no configurado. Iniciando en modo simulador (LocalStorage).");
        initMockMode();
    }
}

// --------------------------------------------------------------------------
// MOCK/LOCAL STORAGE FALLBACK (Para pruebas locales inmediatas)
// --------------------------------------------------------------------------

function initMockMode() {
    // Cargar catálogo de productos de LocalStorage y FUSIONAR con los datos por defecto
    const localProducts = localStorage.getItem("andinitos_products");
    if (localProducts) {
        try {
            const parsed = JSON.parse(localProducts);
            // Fusionar: para cada categoría, usar localStorage solo si tiene datos válidos
            // Si localStorage tiene una categoría vacía o en formato inválido, usar el default
            Object.keys(menuDatabase).forEach(catKey => {
                const localCat = parsed[catKey];
                const isValidArray = Array.isArray(localCat) && localCat.length > 0;
                const isValidObj = localCat && typeof localCat === 'object' && !Array.isArray(localCat) && Object.keys(localCat).length > 0;
                if (isValidArray || isValidObj) {
                    menuDatabase[catKey] = localCat;
                }
                // Si está vacío o falta, mantener el default hardcodeado
            });
            // Persistir el dato fusionado (con jugos incluidos)
            localStorage.setItem("andinitos_products", JSON.stringify(menuDatabase));
        } catch (e) {
            // Error de parseo: usar default en memoria y limpiar
            localStorage.removeItem("andinitos_products");
            localStorage.setItem("andinitos_products", JSON.stringify(menuDatabase));
        }
    } else {
        // Primera vez: guardar los datos por defecto incluyendo jugos
        localStorage.setItem("andinitos_products", JSON.stringify(menuDatabase));
    }
    renderAdminProducts();

    // Cargar órdenes iniciales o de almacenamiento local
    const storedOrders = getStoredOrders();
    if (storedOrders && Object.keys(storedOrders).length > 0) {
        orders = storedOrders;
    } else {
        orders = generateMockOrders();
        saveMockOrders();
    }

    // Cargar estado de la tienda
    const localStoreStatus = localStorage.getItem("andinitos_mock_status");
    if (localStoreStatus) {
        try {
            storeStatus = {
                ...storeStatus,
                ...JSON.parse(localStoreStatus)
            };
        } catch (e) {
            storeStatus = {
                isOpen: true,
                useManualSchedule: false,
                openHour: "07:00",
                closeHour: "20:00"
            };
        }
    }

    // Configurar toggle inicial
    const toggle = document.getElementById("store-status-toggle");
    if (toggle) toggle.checked = storeStatus.isOpen;
    updateStatusTextUI();

    window.addEventListener("storage", (event) => {
        if (event.key !== "andinitos_orders" && event.key !== "andinitos_mock_orders") return;

        const incomingOrders = getStoredOrders();
        if (!incomingOrders) return;

        orders = incomingOrders;
        playAlertSound();
        renderDashboard();
    });

    setInterval(() => {
        const incomingOrders = getStoredOrders();
        if (!incomingOrders) return;

        const nextSignature = JSON.stringify(incomingOrders);
        if (nextSignature !== lastOrdersSignature) {
            lastOrdersSignature = nextSignature;
            orders = incomingOrders;
            playAlertSound();
            renderDashboard();
        }
    }, 1500);
    
    lastOrdersSignature = JSON.stringify(getStoredOrders() || {});

    // Render inicial
    renderDashboard();
}

function getStoredOrders() {
    const key = "andinitos_orders";
    const legacy = "andinitos_mock_orders";
    const raw = localStorage.getItem(key) || localStorage.getItem(legacy);
    if (!raw) return null;
    try {
        const parsed = JSON.parse(raw);
        return parsed && typeof parsed === 'object' ? parsed : null;
    } catch (e) {
        return null;
    }
}

function saveMockOrders() {
    localStorage.setItem("andinitos_mock_orders", JSON.stringify(orders));
    localStorage.setItem("andinitos_orders", JSON.stringify(orders));
}

function saveMockStatus() {
    const nextStatus = {
        ...storeStatus,
        isOpen: Boolean(storeStatus.isOpen),
        useManualSchedule: Boolean(storeStatus.useManualSchedule),
        openHour: storeStatus.openHour || "07:00",
        closeHour: storeStatus.closeHour || "20:00"
    };
    localStorage.setItem("andinitos_mock_status", JSON.stringify(nextStatus));
    storeStatus = nextStatus;
}

function generateMockOrders() {
    return {
        "order_1": {
            id: "order_1",
            clientName: "Luis Martínez",
            type: "domicilio",
            address: "Carrera 43A #12-45, Apto 502",
            payment: "nequi",
            notes: "Por favor enviar salsas extra.",
            items: [
                { productId: "P1", name: "Pastel de Carne Molida", quantity: 2, price: 7500 },
                { productId: "PP2", name: "Pastel de Chicharrón al Barril y Queso", quantity: 1, price: 11000 },
                { productId: "M1", name: "Malteada de Cocosette", quantity: 1, price: 14000 }
            ],
            total: 40000,
            status: "pendiente",
            timestamp: Date.now() - 600000 // Hace 10 min
        },
        "order_2": {
            id: "order_2",
            clientName: "Carolina Gómez",
            type: "recoger",
            address: "",
            payment: "bancolombia",
            notes: "Estaré allá en 15 minutos.",
            items: [
                { productId: "P7", name: "Pastel de Guayaba y Queso", quantity: 3, price: 7000 },
                { productId: "M6", name: "Malteada de Toddy", quantity: 1, price: 13000 }
            ],
            total: 34000,
            status: "preparando",
            timestamp: Date.now() - 300000 // Hace 5 min
        }
    };
}

function addNewMockOrder() {
    const clients = ["Mateo Alzate", "Sandra Restrepo", "Juan Camilo", "Felipe Restrepo", "Valeria Vélez"];
    const productPool = [
        { id: "P1", name: "Pastel de Carne Molida", price: 7500 },
        { id: "PP2", name: "Pastel de Chicharrón al Barril y Queso", price: 11000 },
        { id: "M5", name: "Malteada de Oreo", price: 13500 },
        { id: "P8", name: "Pastel Hawaiano", price: 7500 },
        { id: "C1", name: "Combo Trío Dulzura", price: 21000 }
    ];

    const randomClient = clients[Math.floor(Math.random() * clients.length)];
    const randomProduct = productPool[Math.floor(Math.random() * productPool.length)];
    const qty = Math.floor(Math.random() * 3) + 1;
    const orderId = "order_" + Date.now();

    orders[orderId] = {
        id: orderId,
        clientName: randomClient,
        type: Math.random() > 0.3 ? "domicilio" : "recoger",
        address: "Calle " + (Math.floor(Math.random() * 80) + 1) + " # " + (Math.floor(Math.random() * 50) + 1) + " - " + (Math.floor(Math.random() * 90) + 1),
        payment: Math.random() > 0.5 ? "nequi" : "efectivo",
        notes: Math.random() > 0.7 ? "Tocar el timbre fuerte." : "",
        items: [
            { productId: randomProduct.id, name: randomProduct.name, quantity: qty, price: randomProduct.price }
        ],
        total: randomProduct.price * qty,
        status: "pendiente",
        timestamp: Date.now()
    };

    saveMockOrders();
    playAlertSound();
    renderDashboard();
}

// --------------------------------------------------------------------------
// LÓGICA DE ALERTA DE AUDIO SIN ARCHIVOS EXTERNOS (Sintetizador Web Audio API)
// --------------------------------------------------------------------------

function playAlertSound() {
    if (!soundEnabled) return;

    try {
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }

        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }

        // Crear sonido tipo campana (Chime) agradable
        const now = audioContext.currentTime;
        
        // Oscilador 1 (Tono principal alto)
        const osc1 = audioContext.createOscillator();
        const gain1 = audioContext.createGain();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(880, now); // Nota A5
        osc1.frequency.exponentialRampToValueAtTime(1320, now + 0.15); // Nota E6
        
        // Oscilador 2 (Tono armónico medio)
        const osc2 = audioContext.createOscillator();
        const gain2 = audioContext.createGain();
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(440, now); // Nota A4
        
        // Envolvente de Ganancia para desvanecimiento suave
        gain1.gain.setValueAtTime(0.3, now);
        gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.6);
        
        gain2.gain.setValueAtTime(0.15, now);
        gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.8);

        // Conectar
        osc1.connect(gain1);
        gain1.connect(audioContext.destination);
        osc2.connect(gain2);
        gain2.connect(audioContext.destination);

        // Reproducir y detener
        osc1.start(now);
        osc1.stop(now + 0.6);
        osc2.start(now);
        osc2.stop(now + 0.8);

    } catch (e) {
        console.warn("No se pudo reproducir la alarma de audio:", e);
    }
}

// --------------------------------------------------------------------------
// RENDERIZADO Y CONTROL DE FLUJO DEL DASHBOARD
// --------------------------------------------------------------------------

function updateStatusTextUI() {
    const textSpan = document.getElementById("store-status-text");
    const dot = document.getElementById("store-status-dot");
    const toggle = document.getElementById("store-status-toggle");
    const manualToggle = document.getElementById("store-hours-force");
    const openInput = document.getElementById("store-open-time");
    const closeInput = document.getElementById("store-close-time");

    if (toggle) toggle.checked = Boolean(storeStatus.isOpen);
    if (manualToggle) manualToggle.checked = Boolean(storeStatus.useManualSchedule);
    if (openInput) openInput.value = storeStatus.openHour || "07:00";
    if (closeInput) closeInput.value = storeStatus.closeHour || "20:00";

    const modeText = storeStatus.useManualSchedule ? "HORARIO MANUAL" : "HORARIO AUTOMÁTICO";
    if (storeStatus.isOpen) {
        if (textSpan) textSpan.innerText = `TIENDA ABIERTA • ${modeText}`;
        if (dot) dot.className = "indicator-dot";
    } else {
        if (textSpan) textSpan.innerText = `TIENDA CERRADA • ${modeText}`;
        if (dot) dot.className = "indicator-dot closed";
    }
}

// Actualizar estado de la orden
window.updateOrderStatus = function(orderId, nextStatus) {
    if (isFirebaseConnected && db) {
        db.ref(`orders/${orderId}/status`).set(nextStatus)
            .then(() => console.log(`Orden ${orderId} actualizada a ${nextStatus}.`))
            .catch(err => console.error("Error al actualizar estado en Firebase:", err));
    } else {
        if (orders[orderId]) {
            orders[orderId].status = nextStatus;
            saveMockOrders();
            renderDashboard();
        }
    }
};

window.deleteOrder = function(orderId) {
    if (!orders[orderId]) return;

    const shouldDelete = window.confirm("¿Seguro que deseas eliminar este pedido del panel?");
    if (!shouldDelete) return;

    delete orders[orderId];
    saveMockOrders();
    renderDashboard();
};

window.printOrderTicket = function(orderId) {
    const order = orders[orderId];
    if (!order) return;

    const itemRows = order.items.map(item => {
        const itemTotal = item.quantity * item.price;
        return `
            <tr>
                <td>${item.quantity}x ${item.name}</td>
                <td>${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(itemTotal)}</td>
            </tr>
        `;
    }).join("");

    const ticketHtml = `
        <html>
            <head>
                <title>Ticket - ${order.id}</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 24px; color: #1f2937; }
                    .ticket { max-width: 420px; margin: 0 auto; border: 1px solid #d1d5db; border-radius: 12px; padding: 18px; }
                    h1 { text-align: center; font-size: 24px; margin-bottom: 8px; }
                    .meta { font-size: 12px; line-height: 1.6; margin-bottom: 16px; }
                    table { width: 100%; border-collapse: collapse; margin-top: 10px; }
                    th, td { padding: 8px 4px; border-bottom: 1px solid #e5e7eb; text-align: left; }
                    .total { font-weight: 700; font-size: 16px; margin-top: 14px; text-align: right; }
                    .notes { margin-top: 12px; font-size: 12px; }
                </style>
            </head>
            <body>
                <div class="ticket">
                    <h1>Andinitos</h1>
                    <div class="meta">
                        <div><strong>Pedido:</strong> #${String(order.id).slice(-6).toUpperCase()}</div>
                        <div><strong>Cliente:</strong> ${order.clientName}</div>
                        <div><strong>Tipo:</strong> ${order.type === 'domicilio' ? 'Domicilio' : 'Recoger'}</div>
                        <div><strong>Dirección:</strong> ${order.address || 'Recoger en el local'}</div>
                        <div><strong>Pago:</strong> ${order.payment}</div>
                    </div>
                    <table>
                        <thead>
                            <tr><th>Producto</th><th>Total</th></tr>
                        </thead>
                        <tbody>${itemRows}</tbody>
                    </table>
                    <div class="total">Total: ${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(order.total)}</div>
                    ${order.notes ? `<div class="notes"><strong>Notas:</strong> ${order.notes}</div>` : ''}
                </div>
            </body>
        </html>
    `;

    const printWindow = window.open('', '_blank', 'width=420,height=700');
    if (!printWindow) {
        alert("El navegador bloqueó la ventana de impresión. Permite pop-ups para imprimir el ticket.");
        return;
    }

    printWindow.document.write(ticketHtml);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
};

window.openOrderEditor = function(orderId) {
    const order = orders[orderId];
    if (!order) return;

    const modal = document.createElement("div");
    modal.className = "order-editor-backdrop";

    const buildProductList = () => {
        const productOptions = [];
        Object.keys(menuDatabase).forEach(catKey => {
            const items = Array.isArray(menuDatabase[catKey]) ? menuDatabase[catKey] : [];
            items.forEach(product => {
                if (!product || !product.id) return;
                productOptions.push({
                    id: product.id,
                    name: product.name,
                    category: catKey,
                    isJugo: Boolean(product.isJugo),
                    priceAgua: Number(product.priceAgua || 0),
                    priceLeche: Number(product.priceLeche || 0),
                    price: Number(product.price || 0)
                });
            });
        });
        return productOptions;
    };

    const renderEditor = () => {
        const total = order.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
        order.total = total + (order.type === 'domicilio' ? (order.deliveryFee || 0) : 0);

        const lines = order.items.map((item, index) => `
            <div class="order-item-edit-row">
                <span class="order-item-name">${item.name}</span>
                <div class="order-qty-controls">
                    <button type="button" class="qty-btn" data-index="${index}" data-action="minus">-</button>
                    <span class="qty-value">${item.quantity}</span>
                    <button type="button" class="qty-btn" data-index="${index}" data-action="plus">+</button>
                </div>
                <button type="button" class="qty-remove" data-index="${index}" data-action="remove">Quitar</button>
            </div>
        `).join("");

        const productCatalog = buildProductList();
        const productOptions = productCatalog.map(product => {
            const basePrice = product.isJugo ? (product.priceAgua || product.priceLeche || 0) : product.price;
            return `<option value="${product.id}">${product.name} - ${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(basePrice)}</option>`;
        }).join("");

        modal.innerHTML = `
            <div class="order-editor-modal">
                <div class="order-editor-header">
                    <h3>Editar pedido #${String(order.id).slice(-6).toUpperCase()}</h3>
                    <button type="button" class="btn-close-editor" data-action="close">×</button>
                </div>

                <div class="order-editor-form">
                    <label>
                        <span>Nombre</span>
                        <input id="edit-order-name" type="text" value="${(order.clientName || '').replace(/"/g, '&quot;')}" />
                    </label>
                    <label>
                        <span>Dirección</span>
                        <input id="edit-order-address" type="text" value="${(order.address || '').replace(/"/g, '&quot;')}" />
                    </label>
                    <label>
                        <span>Notas</span>
                        <textarea id="edit-order-notes">${(order.notes || '').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</textarea>
                    </label>
                </div>

                <div class="order-editor-add-product">
                    <h4>Agregar producto al pedido</h4>
                    <div class="order-editor-add-controls">
                        <select id="edit-order-product-select">${productOptions}</select>
                        <input id="edit-order-product-qty" type="number" min="1" value="1" />
                        <button type="button" class="btn-action btn-accept" data-action="add-product">Agregar</button>
                    </div>
                </div>

                <div class="order-editor-items">
                    ${lines || '<p class="empty-column-state">Este pedido ya no tiene productos.</p>'}
                </div>

                <div class="order-editor-total">
                    <span>Total estimado:</span>
                    <strong>${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(order.total)}</strong>
                </div>

                <div class="order-editor-actions">
                    <button type="button" class="btn-action btn-cancel" data-action="close">Cancelar</button>
                    <button type="button" class="btn-action btn-accept" data-action="save">Guardar cambios</button>
                </div>
            </div>
        `;

        modal.querySelectorAll('[data-action="plus"]').forEach(btn => {
            btn.addEventListener('click', () => {
                const index = Number(btn.dataset.index);
                order.items[index].quantity += 1;
                renderEditor();
            });
        });

        modal.querySelectorAll('[data-action="minus"]').forEach(btn => {
            btn.addEventListener('click', () => {
                const index = Number(btn.dataset.index);
                if (order.items[index].quantity > 1) {
                    order.items[index].quantity -= 1;
                    renderEditor();
                }
            });
        });

        modal.querySelectorAll('[data-action="remove"]').forEach(btn => {
            btn.addEventListener('click', () => {
                const index = Number(btn.dataset.index);
                order.items.splice(index, 1);
                renderEditor();
            });
        });

        modal.querySelectorAll('[data-action="add-product"]').forEach(btn => {
            btn.addEventListener('click', () => {
                const selector = document.getElementById('edit-order-product-select');
                const qtyInput = document.getElementById('edit-order-product-qty');
                if (!selector || !qtyInput) return;

                const selectedId = selector.value;
                const quantity = Number(qtyInput.value || 1);
                const product = buildProductList().find(item => item.id === selectedId);
                if (!product || quantity < 1) return;

                const juiceBase = product.isJugo ? "agua" : null;
                const unitPrice = product.isJugo
                    ? (juiceBase === "leche" ? (product.priceLeche || product.priceAgua || 0) : (product.priceAgua || product.priceLeche || 0))
                    : (product.price || 0);

                order.items.push({
                    productId: product.id,
                    name: product.name,
                    quantity: quantity,
                    notes: "",
                    price: unitPrice
                });

                renderEditor();
            });
        });

        modal.querySelectorAll('[data-action="close"]').forEach(btn => {
            btn.addEventListener('click', () => modal.remove());
        });

        modal.querySelectorAll('[data-action="save"]').forEach(btn => {
            btn.addEventListener('click', () => {
                const nameInput = document.getElementById('edit-order-name');
                const addressInput = document.getElementById('edit-order-address');
                const notesInput = document.getElementById('edit-order-notes');

                order.clientName = nameInput ? nameInput.value.trim() || order.clientName : order.clientName;
                order.address = addressInput ? addressInput.value.trim() || order.address : order.address;
                order.notes = notesInput ? notesInput.value.trim() : order.notes;
                order.items = order.items.filter(item => item.quantity > 0);

                if (order.items.length === 0) {
                    delete orders[orderId];
                } else {
                    const itemTotal = order.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
                    order.total = itemTotal + (order.type === 'domicilio' ? (order.deliveryFee || 0) : 0);
                }

                saveMockOrders();
                renderDashboard();
                modal.remove();
            });
        });
    };

    renderEditor();
    document.body.appendChild(modal);
};

// Renderizar el Dashboard
function renderDashboard() {
    const listPendientes = document.getElementById("list-pendientes");
    const listPreparando = document.getElementById("list-preparando");
    const listDespachados = document.getElementById("list-despachados");

    // Limpiar listas
    if (listPendientes) listPendientes.innerHTML = "";
    if (listPreparando) listPreparando.innerHTML = "";
    if (listDespachados) listDespachados.innerHTML = "";

    // Contadores
    let countPendientes = 0;
    let countPreparando = 0;
    let countDespachados = 0;
    let totalSalesToday = 0;

    // Convertir órdenes en un array ordenado por tiempo desc
    const orderList = Object.values(orders).sort((a, b) => b.timestamp - a.timestamp);

    orderList.forEach(order => {
        // Calcular ventas completadas hoy
        if (order.status === "completado") {
            totalSalesToday += order.total;
            return;
        }
        if (order.status === "cancelado") {
            return;
        }

        const orderCard = document.createElement("div");
        orderCard.className = "order-card";
        
        // Formatear items del pedido
        let itemsHtml = "";
        order.items.forEach(item => {
            itemsHtml += `<li><span>${item.quantity}x ${item.name} ${item.notes ? `(${item.notes})` : ""}</span></li>`;
        });

        // Formatear precio total
        const totalFormatted = new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
        }).format(order.total);

        // Formatear fecha/hora
        const timeString = new Date(order.timestamp).toLocaleTimeString('es-CO', {
            hour: '2-digit',
            minute: '2-digit'
        });

        // Generar botones según el estado actual
        let actionButtons = "";
        if (order.status === "pendiente") {
            actionButtons = `
                <button class="btn-action btn-accept" onclick="updateOrderStatus('${order.id}', 'preparando')">Aceptar</button>
                <button class="btn-action btn-cancel" onclick="updateOrderStatus('${order.id}', 'cancelado')">Rechazar</button>
            `;
        } else if (order.status === "preparando") {
            const btnText = order.type === "domicilio" ? "Enviar" : "Listo para Entrega";
            actionButtons = `
                <button class="btn-action btn-deliver" onclick="updateOrderStatus('${order.id}', 'despachado')">${btnText}</button>
                <button class="btn-action btn-cancel" onclick="updateOrderStatus('${order.id}', 'cancelado')">Cancelar</button>
            `;
        } else if (order.status === "despachado") {
            actionButtons = `
                <button class="btn-action btn-complete" onclick="updateOrderStatus('${order.id}', 'completado')">Finalizar</button>
            `;
        }

        const secondaryActions = `
            <div class="order-secondary-actions">
                <button class="btn-mini" onclick="printOrderTicket('${order.id}')">Ticket</button>
                <button class="btn-mini" onclick="openOrderEditor('${order.id}')">Editar</button>
                <button class="btn-mini btn-mini-delete" onclick="deleteOrder('${order.id}')">Eliminar</button>
            </div>
        `;

        orderCard.innerHTML = `
            <div class="order-card-header">
                <span class="order-id">#${order.id.slice(-6).toUpperCase()}</span>
                <span class="order-time">${timeString}</span>
            </div>
            <h3 class="order-client">${order.clientName}</h3>
            <div class="order-type">
                ${order.type === 'domicilio' ? '🛵 Domicilio' : '🛍️ Recoger'} 
                ${order.address ? `• ${order.address}` : ''}
            </div>
            <ul class="order-items-list">
                ${itemsHtml}
            </ul>
            ${order.notes ? `<div class="order-notes">💬 ${order.notes}</div>` : ""}
            <div class="order-total-row">
                <span>Total:</span>
                <span>${totalFormatted}</span>
            </div>
            <div class="order-actions">
                ${actionButtons}
            </div>
            ${secondaryActions}
        `;

        // Ubicar en su columna respectiva
        if (order.status === "pendiente") {
            listPendientes.appendChild(orderCard);
            countPendientes++;
        } else if (order.status === "preparando") {
            listPreparando.appendChild(orderCard);
            countPreparando++;
        } else if (order.status === "despachado") {
            listDespachados.appendChild(orderCard);
            countDespachados++;
        }
    });

    // Rellenar estados vacíos
    if (countPendientes === 0 && listPendientes) {
        listPendientes.innerHTML = `<div class="empty-column-state">No hay pedidos pendientes.</div>`;
    }
    if (countPreparando === 0 && listPreparando) {
        listPreparando.innerHTML = `<div class="empty-column-state">No hay pedidos preparándose.</div>`;
    }
    if (countDespachados === 0 && listDespachados) {
        listDespachados.innerHTML = `<div class="empty-column-state">No hay pedidos listos/en ruta.</div>`;
    }

    // Actualizar insignias de cantidad en las cabeceras
    const badgePendientes = document.getElementById("badge-pendientes");
    const badgePreparando = document.getElementById("badge-preparando");
    const badgeDespachados = document.getElementById("badge-despachados");

    if (badgePendientes) badgePendientes.innerText = countPendientes;
    if (badgePreparando) badgePreparando.innerText = countPreparando;
    if (badgeDespachados) badgeDespachados.innerText = countDespachados;

    // Actualizar métricas generales
    const valVentas = document.getElementById("val-ventas");
    const valPendientes = document.getElementById("val-pendientes");
    const valProgreso = document.getElementById("val-progreso");

    const totalSalesFormatted = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    }).format(totalSalesToday);

    if (valVentas) valVentas.innerText = totalSalesFormatted;
    if (valPendientes) valPendientes.innerText = countPendientes;
    if (valProgreso) valProgreso.innerText = countPreparando + countDespachados;
}

// Configurar escuchas del panel admin
function setupAdminListeners() {
    // Escuchar toggle de tienda
    const storeToggle = document.getElementById("store-status-toggle");
    if (storeToggle) {
        storeToggle.addEventListener("change", (e) => {
            const isOpen = e.target.checked;
            storeStatus.isOpen = isOpen;

            if (isFirebaseConnected && db) {
                db.ref("storeSettings/status").set({
                    isOpen: isOpen,
                    useManualSchedule: storeStatus.useManualSchedule,
                    openHour: storeStatus.openHour,
                    closeHour: storeStatus.closeHour,
                    lastUpdated: firebase.database.ServerValue.TIMESTAMP
                });
            } else {
                saveMockStatus();
                updateStatusTextUI();
            }
        });
    }

    const manualScheduleToggle = document.getElementById("store-hours-force");
    if (manualScheduleToggle) {
        manualScheduleToggle.addEventListener("change", (e) => {
            storeStatus.useManualSchedule = e.target.checked;
            if (isFirebaseConnected && db) {
                db.ref("storeSettings/status").set({
                    isOpen: storeStatus.isOpen,
                    useManualSchedule: storeStatus.useManualSchedule,
                    openHour: storeStatus.openHour,
                    closeHour: storeStatus.closeHour,
                    lastUpdated: firebase.database.ServerValue.TIMESTAMP
                });
            } else {
                saveMockStatus();
                updateStatusTextUI();
            }
        });
    }

    const openTimeInput = document.getElementById("store-open-time");
    if (openTimeInput) {
        openTimeInput.addEventListener("change", (e) => {
            storeStatus.openHour = e.target.value || "07:00";
            if (isFirebaseConnected && db) {
                db.ref("storeSettings/status").set({
                    isOpen: storeStatus.isOpen,
                    useManualSchedule: storeStatus.useManualSchedule,
                    openHour: storeStatus.openHour,
                    closeHour: storeStatus.closeHour,
                    lastUpdated: firebase.database.ServerValue.TIMESTAMP
                });
            } else {
                saveMockStatus();
                updateStatusTextUI();
            }
        });
    }

    const closeTimeInput = document.getElementById("store-close-time");
    if (closeTimeInput) {
        closeTimeInput.addEventListener("change", (e) => {
            storeStatus.closeHour = e.target.value || "20:00";
            if (isFirebaseConnected && db) {
                db.ref("storeSettings/status").set({
                    isOpen: storeStatus.isOpen,
                    useManualSchedule: storeStatus.useManualSchedule,
                    openHour: storeStatus.openHour,
                    closeHour: storeStatus.closeHour,
                    lastUpdated: firebase.database.ServerValue.TIMESTAMP
                });
            } else {
                saveMockStatus();
                updateStatusTextUI();
            }
        });
    }

    // Escuchar botón de sonido
    const soundBtn = document.getElementById("sound-btn");
    if (soundBtn) {
        soundBtn.addEventListener("click", () => {
            soundEnabled = !soundEnabled;
            soundBtn.innerHTML = soundEnabled 
                ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline-block;vertical-align:middle;margin-right:4px;"><path d="M11 5L6 9H2v6h4l5 4V5zM15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14"/></svg> Sonido Activo` 
                : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline-block;vertical-align:middle;margin-right:4px;"><path d="M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6"/></svg> Sonido Silenciado`;
            
            // Activar AudioContext si estaba inactivo por restricciones del navegador
            if (soundEnabled && !audioContext) {
                audioContext = new (window.AudioContext || window.webkitAudioContext)();
            }
        });
    }
}

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
    initDatabase();
    setupAdminListeners();
});

// ==========================================================================
// RENDERIZADO Y GESTIÓN DE PRODUCTOS EN EL PANEL ADMINISTRADOR
// ==========================================================================

function renderAdminProducts() {
    const container = document.getElementById("admin-products-container");
    if (!container) return;
    container.innerHTML = "";

    Object.keys(menuDatabase).forEach(catKey => {
        const catLabel = catKey.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase());
        const products = Array.isArray(menuDatabase[catKey]) ? menuDatabase[catKey] : [];

        const group = document.createElement("div");
        group.className = "admin-category-group";
        group.innerHTML = `<h3 class="admin-category-title">${catLabel}</h3>`;

        const list = document.createElement("div");
        list.className = "admin-products-list";

        products.forEach(p => {
            const row = document.createElement("div");
            row.className = "admin-product-row";

            const dualPriceMarkup = p.isJugo ? `
                <div class="admin-input-group price-group">
                    <label>Agua (COP)</label>
                    <input type="number" class="admin-input-text" id="price-a-${p.id}" value="${p.priceAgua || 9000}">
                </div>
                <div class="admin-input-group price-group">
                    <label>Leche (COP)</label>
                    <input type="number" class="admin-input-text" id="price-l-${p.id}" value="${p.priceLeche || 11000}">
                </div>
            ` : `
                <div class="admin-input-group price-group">
                    <label>Precio (COP)</label>
                    <input type="number" class="admin-input-text" id="price-${p.id}" value="${p.price || 0}">
                </div>
            `;

            row.innerHTML = `
                <img src="${p.image || 'images/logo.png'}" alt="${p.name}" class="admin-prod-img-preview" id="preview-${p.id}" onerror="this.src='images/logo.png'">
                
                <div class="admin-prod-info">
                    <div class="admin-input-group name-group">
                        <label>Nombre del Producto</label>
                        <input type="text" class="admin-input-text" id="name-${p.id}" value="${p.name || ''}">
                    </div>

                    ${dualPriceMarkup}

                    <div class="admin-input-group desc-group">
                        <label>Descripción</label>
                        <textarea class="admin-input-text" id="desc-${p.id}" rows="2">${(p.desc || '').replace(/"/g, '&quot;')}</textarea>
                    </div>

                    <div class="admin-input-group image-group">
                        <label>Ruta de la Imagen</label>
                        <input type="text" class="admin-input-text" id="image-${p.id}" value="${p.image || ''}">
                    </div>

                    <div class="admin-toggle-group">
                        <label class="admin-toggle-label">Disponibilidad</label>
                        <div class="admin-toggle-status ${p.available === false ? 'unavailable' : 'available'}">
                            <label class="admin-switch">
                                <input type="checkbox" id="available-${p.id}" ${p.available === false ? '' : 'checked'}>
                                <span class="slider"></span>
                            </label>
                            <span>${p.available === false ? 'No disponible' : 'Disponible'}</span>
                        </div>
                    </div>
                </div>

                <div class="admin-prod-actions">
                    <div class="admin-file-wrapper">
                        <span class="btn-file-select">Examinar...</span>
                        <input type="file" class="admin-file-input" accept="image/*" onchange="handleAdminImageSelect(this, '${p.id}')">
                    </div>
                    <button class="btn-save-prod" onclick="saveAdminProduct('${p.id}', '${catKey}')">
                        Guardar
                    </button>
                </div>
            `;
            list.appendChild(row);
        });

        group.appendChild(list);
        container.appendChild(group);
    });
}

// Redimensionar y comprimir una imagen a Base64 manteniendo mejor calidad visual
function compressImage(file, callback) {
    const reader = new FileReader();
    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement("canvas");
            let width = img.width;
            let height = img.height;

            const MAX_SIZE = 1200;
            if (width > height) {
                if (width > MAX_SIZE) {
                    height = Math.round((height * MAX_SIZE) / width);
                    width = MAX_SIZE;
                }
            } else {
                if (height > MAX_SIZE) {
                    width = Math.round((width * MAX_SIZE) / height);
                    height = MAX_SIZE;
                }
            }

            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext("2d");
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = "high";
            ctx.drawImage(img, 0, 0, width, height);

            const mimeType = file.type && file.type.includes("png") ? "image/png" : "image/jpeg";
            const quality = mimeType === "image/png" ? 0.95 : 0.88;
            const dataUrl = canvas.toDataURL(mimeType, quality);
            callback(dataUrl);
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
}

// Manejar la selección de archivos locales
window.handleAdminImageSelect = function(input, productId) {
    if (input.files && input.files[0]) {
        const file = input.files[0];
        
        // 1. Mostrar opacidad para indicar procesamiento
        const previewImg = document.getElementById(`preview-${productId}`);
        if (previewImg) {
            previewImg.style.opacity = "0.5";
        }

        // 2. Comprimir y convertir a Base64
        compressImage(file, function(base64Data) {
            if (previewImg) {
                previewImg.src = base64Data;
                previewImg.style.opacity = "1";
            }

            const pathInput = document.getElementById(`image-${productId}`);
            if (pathInput) {
                pathInput.value = base64Data;
            }
        });
    }
};

// Guardar producto
window.saveAdminProduct = function(productId, catKey) {
    const nameInput = document.getElementById(`name-${productId}`);
    const imageInput = document.getElementById(`image-${productId}`);
    const descInput = document.getElementById(`desc-${productId}`);
    const availableInput = document.getElementById(`available-${productId}`);

    if (!nameInput || !imageInput || !descInput) return;

    const name = nameInput.value.trim();
    const image = imageInput.value.trim();
    const desc = descInput.value.trim();
    const available = availableInput ? availableInput.checked : true;

    if (!name) {
        alert("El nombre del producto es obligatorio.");
        return;
    }

    const product = menuDatabase[catKey].find(p => p.id === productId);
    if (product) {
        product.name = name;
        product.desc = desc;
        product.image = image;
        product.available = available;

        if (product.isJugo) {
            const aguaInput = document.getElementById(`price-a-${productId}`);
            const lecheInput = document.getElementById(`price-l-${productId}`);
            product.priceAgua = Number(aguaInput?.value || 0);
            product.priceLeche = Number(lecheInput?.value || 0);
        } else {
            const priceInput = document.getElementById(`price-${productId}`);
            product.price = Number(priceInput?.value || 0);
        }

        if (isFirebaseConnected && db) {
            db.ref(`products/${catKey}`).set(menuDatabase[catKey])
                .then(() => {
                    alert(`✅ "${name}" actualizado con éxito en la base de datos.`);
                })
                .catch(err => {
                    console.error("Error al guardar en Firebase:", err);
                    alert("Error al actualizar producto en la base de datos.");
                });
        } else {
            localStorage.setItem("andinitos_products", JSON.stringify(menuDatabase));
            alert(`✅ "${name}" actualizado con éxito localmente.\nLos cambios se reflejarán inmediatamente en las pestañas abiertas.`);
            renderAdminProducts();
        }
    }
};
