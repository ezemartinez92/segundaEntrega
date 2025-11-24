let seccionProductos= document.getElementById("seccionProductos");
seccionProductos.innerHTML= "<h2>Productos Destacados</h2><p>Aquí van los productos destacados.</p>";

//Creo mi array de productos (Zapatos)
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

// Inicializo el Carrito vacío
let carrito = [];

// Asigno las secciones del DOM
let seccionCarrito = document.getElementById("carrito");
let seccionTotal = document.getElementById("totalCarrito");
let botonVaciar = document.getElementById("btnVaciarCarrito");

// Recupero el carrito guardado en localStorage
let carritoGuardado = JSON.parse(localStorage.getItem("carrito"));
if (carritoGuardado) {
    carrito = carritoGuardado;
    renderCarrito();
}

// AGREGAR PRODUCTO
function agregarAlCarrito(zapato) {
    carrito.push(zapato);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderCarrito();
}

// ELIMINAR PRODUCTO
function eliminarProducto(index) {
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderCarrito();
}

// VACIAR CARRITO
botonVaciar.addEventListener("click", () => {
    carrito = [];
    localStorage.removeItem("carrito");
    renderCarrito();
});

// MOSTRAR CARRITO
function renderCarrito() {
    seccionCarrito.innerHTML = "<h2>Carrito de Compras</h2>";

    if (carrito.length === 0) {
        seccionCarrito.innerHTML += "<p>El carrito está vacío.</p>";
        seccionTotal.innerHTML = "";
        return;
    }

    carrito.forEach((item, index) => {
        let itemCarrito = document.createElement("div");
        itemCarrito.classList.add("item-carrito");

        itemCarrito.innerHTML = `
            <p><strong>${item.nombre}</strong> - $${item.precio}</p>
            <button class="btnEliminar" data-index="${index}">Eliminar</button>
        `;

        seccionCarrito.appendChild(itemCarrito);
    });

    // Activar botones eliminar
    document.querySelectorAll(".btnEliminar").forEach((boton) => {
        boton.addEventListener("click", (e) => {
            let index = e.target.getAttribute("data-index");
            eliminarProducto(index);
        });
    });

    renderTotal();
}

// MOSTRAR TOTAL
function renderTotal() {
    let total = carrito.reduce((suma, producto) => suma + producto.precio, 0);

    seccionTotal.innerHTML = `
        <h2>Total del Carrito</h2>
        <p><strong>Total a pagar:</strong> $${total}</p>
    `;
}

// MOSTRAR PRODUCTOS
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

    let botonAgregar = document.getElementById(`btnAgregar${zapato.id}`);
    botonAgregar.addEventListener("click", () => {
        agregarAlCarrito(zapato);
    });
});
