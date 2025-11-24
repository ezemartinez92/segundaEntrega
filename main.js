let seccionProductos= document.getElementById("seccionProductos");
seccionProductos.innerHTML= "<h2>Productos Destacados</h2><p>Aquí van los productos destacados.</p>";

const zapatos = [
    {
        id: 1,
        nombre: "Zapatillas Urbanas",
        precio: 25000,
        descripcion: "Zapatillas cómodas para uso diario con suela de goma."
    },
    {
        id: 2,
        nombre: "Botas de Cuero",
        precio: 48000,
        descripcion: "Botas resistentes de cuero genuino para todo terreno."
    },
    {
        id: 3,
        nombre: "Sandalias Verano",
        precio: 15000,
        descripcion: "Sandalias livianas y frescas ideales para días calurosos."
    },
    {
        id: 4,
        nombre: "Zapatos Deportivos",
        precio: 32000,
        descripcion: "Calzado deportivo con soporte para actividades físicas."
    }
];

// Mostrar productos
zapatos.forEach((zapato) => {
    let cardZapato = document.createElement("article");
    cardZapato.classList.add("card");

    cardZapato.innerHTML = `
        <h3>${zapato.nombre}</h3>
        <p>${zapato.descripcion}</p>
        <p>Precio: $${zapato.precio}</p>
        <button id="btnAgregar${zapato.id}">Agregar al Carrito</button>
    `;

    seccionProductos.appendChild(cardZapato);   

    // Evento del botón
    let botonAgregar = document.getElementById(`btnAgregar${zapato.id}`);
    botonAgregar.addEventListener("click", () => {
        agregarAlCarrito(zapato);
    });
});

// Carrito vacío
let carrito = [];

// Elemento donde se mostrará el carrito
let seccionCarrito = document.getElementById("carrito");
let seccionTotal = document.getElementById("totalCarrito");

// Función para renderizar el carrito en la página
function renderCarrito() {
    seccionCarrito.innerHTML = "<h2>Carrito de Compras</h2>";

    if (carrito.length === 0) {
        seccionCarrito.innerHTML += "<p>El carrito está vacío.</p>";
         seccionTotal.innerHTML = "";
        return;
    }

    carrito.forEach((item) => {
        let itemCarrito = document.createElement("div");
        itemCarrito.classList.add("item-carrito");

        itemCarrito.innerHTML = `
            <p><strong>${item.nombre}</strong> - $${item.precio}</p>
        `;

        seccionCarrito.appendChild(itemCarrito);
    });
    renderTotal();
}

function renderTotal() {
    let total = carrito.reduce((suma, producto) => suma + producto.precio, 0);

    seccionTotal.innerHTML = `
        <h2>Total del Carrito</h2>
        <p><strong>Total a pagar:</strong> $${total}</p>
    `;
}

// Función para agregar productos al carrito
function agregarAlCarrito(zapato) {
    carrito.push(zapato);
    renderCarrito(); // Mostrar el carrito actualizado
}
