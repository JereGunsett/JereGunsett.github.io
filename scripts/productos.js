
const contenedorProductoEcommerce = document.querySelector('.contenedor-ecommerce');
const detalleProducto = document.querySelector('#detalle-producto');
const iconoCierreDetalleProducto = document.querySelector('.producto-detalle-cierre');
const iconoFiltroDeProductos = document.querySelector('.filtro-button');
const filtroModal = document.querySelector('.filtro-modal');
const botonDeCierreFiltro = document.querySelector('.close-button');


iconoCierreDetalleProducto.addEventListener('click', cerrarDetalleProducto);

iconoFiltroDeProductos.addEventListener('click', abrirFiltroDeProductos);
botonDeCierreFiltro.addEventListener('click', cerrarFiltroDeProductos);

// Abrir el detalle del producto al hacer click en la imagen de este
function abrirDetalleProducto(producto) {
    renderizacionDetalleProducto(producto);
    detalleProducto.classList.remove('inactive');
}

// Cerrar el detalle del producto al hacer click en .producto-detalle-cierre
function cerrarDetalleProducto(){

    detalleProducto.classList.add('inactive');
}

function abrirFiltroDeProductos(){
    filtroModal.classList.remove('inactive');
    iconoFiltroDeProductos.classList.add('inactive');
}
function cerrarFiltroDeProductos(){
    filtroModal.classList.add('inactive');
    iconoFiltroDeProductos.classList.remove('inactive');
}

const productoList = [];

const categoriaEjemplo = new Categoria({
    id: 1,
    nombre: 'Categoria de Ejemplo',
    descripcion: 'Esta es una categoria usada para el testeo'
});
const categoriaEjemplo2 = new Categoria({
    id: 2,
    nombre: 'Categoria de Ejemplo 2',
    descripcion: 'Esta es una categoria usada para el testeo'
});

const productoEjemplo = new Producto({
    id: 1,
    nombre: "Producto de Ejemplo 1",
    precio: 5000,
    imagen: "../media/shop/podio.avif",
    descripcion: "Este es un producto de ejemplo",
    categoria: categoriaEjemplo2
});
const productoEjemplo1 = new Producto({
    id: 1,
    nombre: "Producto de Ejemplo 2",
    precio: 3000,
    imagen: "../media/shop/podio.avif",
    descripcion: "Este es un producto de ejemplo",
    categoria: categoriaEjemplo2
});
const productoEjemplo2 = new Producto({
    id: 1,
    nombre: "Producto de Ejemplo 3",
    precio: 2500,
    imagen: "../media/shop/podio.avif",
    descripcion: "Este es un producto de ejemplo",
    categoria: categoriaEjemplo
});
const productoEjemplo3 = new Producto({
    id: 1,
    nombre: "Producto de Ejemplo 4",
    precio: 5000,
    imagen: "../media/shop/podio.avif",
    descripcion: "Este es un producto de ejemplo",
    categoria: categoriaEjemplo
});
const productoEjemplo4 = new Producto({
    id: 1,
    nombre: "Producto de Ejemplo 5",
    precio: 8000,
    imagen: "../media/shop/podio.avif",
    descripcion: "Este es un producto de ejemplo",
    categoria: categoriaEjemplo
});
const productoEjemplo5 = new Producto({
    id: 1,
    nombre: "Producto de Ejemplo 5",
    precio: 8000,
    imagen: "../media/shop/podio.avif",
    descripcion: "Este es un producto de ejemplo",
    categoria: categoriaEjemplo
});

productoList.push(productoEjemplo1,productoEjemplo2,productoEjemplo3,productoEjemplo4,productoEjemplo5,productoEjemplo);

//Renderizado del detalle de cada prodcuto
function renderizacionDetalleProducto (producto){
    // Limpiar el DetalleProducto eliminando todos los elementos hijos
    while (detalleProducto.firstChild) {
        detalleProducto.removeChild(detalleProducto.firstChild);
    }

    // Botón de cierre
    const closeButton = document.createElement('div');
    closeButton.classList.add('producto-detalle-cierre');
    const closeIcon = document.createElement('img');
    closeIcon.setAttribute('src', '../icons/icon_close.png');
    closeIcon.setAttribute('alt', 'close');
    closeButton.addEventListener('click', cerrarDetalleProducto);
    closeButton.appendChild(closeIcon);

    // Agregar el botón de cierre al detalleProducto
    detalleProducto.appendChild(closeButton);

    //Imagen del producto
    const displayProductoImg = document.createElement('img');
    displayProductoImg.setAttribute('src', producto.imagen);//Imagen del producto

    //Agregamos la imagen como hijo del productDetail
    detalleProducto.appendChild(displayProductoImg);

    //Div con la informacion del producto
    const displayProductoInfo = document.createElement('div');
    displayProductoInfo.classList.add('producto-info-detalle');

    //Informacion del producto
    const displayProductoPrecio = document.createElement('p');//Precio del producto
    displayProductoPrecio.innerText = '$' + producto.precio;
    const displayProductoNombre = document.createElement('p');//Nombre del producto
    displayProductoNombre.innerText = producto.nombre;
    const displayProductoDescripcion = document.createElement('p');//Descripcion del producto
    displayProductoDescripcion.innerText = producto.descripcion;

    displayProductoInfo.append(displayProductoPrecio, displayProductoNombre, displayProductoDescripcion);

    detalleProducto.appendChild(displayProductoInfo);

    // Botón para añadir al carrito
    const displayBotonCarrito = document.createElement('button');
    displayBotonCarrito.classList.add('boton-primario', 'agregar-al-carrito');
    const displayImg = document.createElement('img');
    displayImg.setAttribute('src', '../icons/bt_add_to_cart.svg');
    displayImg.setAttribute('alt', 'agregar al carrito');
    displayBotonCarrito.appendChild(displayImg);
    displayBotonCarrito.appendChild(document.createTextNode('Agregar al carrito'));
  
    // Agregar el botón como hijo del detalleProducto
    detalleProducto.appendChild(displayBotonCarrito);
}

//Renderizado de los productos del Ecommerce
function renderizacionProductosEcommerce (arr){
    let count = 0;
    for (const producto of productoList) {
        
        const productoCard = document.createElement('div');
        productoCard.classList.add('producto-card');
    
        const productoImg = document.createElement('img');
        productoImg.setAttribute('src', producto.imagen);
        productoImg.setAttribute('alt', count);
        productoImg.addEventListener('click', function() {
            const alt = productoImg.getAttribute('alt');
            const producto = productoList[alt];
            abrirDetalleProducto(producto);
        });
    
        const productoInfo = document.createElement('div');
        productoInfo.classList.add('producto-info');
    
        const productoInfoDiv = document.createElement('div');
    
        const productoPrecio = document.createElement('p');
        productoPrecio.innerText = '$' + producto.precio;
    
        const productoNombre = document.createElement('p');
        productoNombre.innerText = producto.nombre;
    
        productoInfoDiv.appendChild(productoPrecio);
        productoInfoDiv.appendChild(productoNombre);
    
        productoInfo.append(productoInfoDiv);
    
        productoCard.append(productoImg, productoInfo);
    
        contenedorProductoEcommerce.appendChild(productoCard);

        count++;
    }
}

renderizacionProductosEcommerce(productoList);