const contenedorProductoEcommerce = document.querySelector('.contenedor-ecommerce');
const detalleProducto = document.querySelector('#detalle-producto');
const iconoCierreDetalleProducto = document.querySelector('.producto-detalle-cierre');

// detalleProducto.addEventListener('click', abrirDetalleProducto);
iconoCierreDetalleProducto.addEventListener('click', cerrarDetalleProducto);

function abrirDetalleProducto(producto) {
    renderizacionDetalleProducto(producto);
    detalleProducto.classList.remove('inactive');
}
function cerrarDetalleProducto(){
    detalleProducto.classList.add('inactive');
}

let productoList = [];

productoList.push({
    nombre: 'Producto de ejemplo',
    precio: 2200,
    imagen: '../media/shop/podio.avif',
    descripcion: 'Este es un producto de ejemplo para agregar en el detalle'
});
productoList.push({
    nombre: 'Producto de ejemplo',
    precio: 2200,
    imagen: '../media/shop/podio.avif',
    descripcion: 'Este es un producto de ejemplo para agregar en el detalle'
});
productoList.push({
    nombre: 'Producto de ejemplo',
    precio: 2200,
    imagen: '../media/shop/podio.avif',
    descripcion: 'Este es un producto de ejemplo para agregar en el detalle'
});
productoList.push({
    nombre: 'Producto de ejemplo',
    precio: 2200,
    imagen: '../media/shop/podio.avif',
    descripcion: 'Este es un producto de ejemplo para agregar en el detalle'
});
productoList.push({
    nombre: 'Producto de ejemplo',
    precio: 2200,
    imagen: '../media/shop/podio.avif',
    descripcion: 'Este es un producto de ejemplo para agregar en el detalle'
});
productoList.push({
    nombre: 'Producto de ejemplo',
    precio: 2200,
    imagen: '../media/shop/podio.avif',
    descripcion: 'Este es un producto de ejemplo para agregar en el detalle'
});
productoList.push({
    nombre: 'Producto de ejemplo',
    precio: 2200,
    imagen: '../media/shop/podio.avif',
    descripcion: 'Este es un producto de ejemplo para agregar en el detalle'
});

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
    displayProductoImg.setAttribute('src', producto.imagen);

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

//Funcion que renderiza los productos del ecommerce
function renderizacionProductosEcommerce (arr){
    let count = 0;
    for (producto of productoList) {
        
        const productoCard = document.createElement('div');
        productoCard.classList.add('producto-card');
    
        const productoImg = document.createElement('img');
        productoImg.setAttribute('src', producto.imagen);
        productoImg.setAttribute('alt', count);
        productoImg.addEventListener('click', function() {
            const alt = productoImg.getAttribute('alt');
            const producto = productoList[alt];
            abrirDetalleProducto(producto); // Pasa el producto correcto a la función
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