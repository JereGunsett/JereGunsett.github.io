
const contenedorProductoEcommerce = document.querySelector('.contenedor-ecommerce');
const detalleProducto = document.querySelector('#detalle-producto');
const iconoCierreDetalleProducto = document.querySelector('.producto-detalle-cierre');
const iconoFiltroDeProductos = document.querySelector('.filtro-button');
const filtroModal = document.querySelector('.filtro-modal');



//URL base del servidor local
const BASE_URL = 'http://localhost:5009';


iconoCierreDetalleProducto.addEventListener('click', cerrarDetalleProducto);

iconoFiltroDeProductos.addEventListener('click', abrirFiltroDeProductos);


// Abrir el detalle del producto al hacer click en la imagen de este
function abrirDetalleProducto(producto) {
    renderizacionDetalleProducto(producto);
    detalleProducto.classList.remove('inactive');
}

// Cerrar el detalle del producto al hacer click en .producto-detalle-cierre
function cerrarDetalleProducto(){
    detalleProducto.classList.add('inactive');
}

async function abrirFiltroDeProductos(){
    await obtenerCategoriasDelServidor();
    renderizacionFiltradoProducto(); //Renderiza el modal de filtrado
    filtroModal.classList.remove('inactive');
    iconoFiltroDeProductos.classList.add('inactive');
}

let precios;
// Función para obtener todos los productos desde el servidor
async function obtenerProductosDelServidor() {
    try {
        const response = await fetch(`${BASE_URL}/Producto`);
        if (!response.ok) {
            throw new Error('Ocurrió un problema al obtener los productos');
        }
        const data = await response.json();
        precios = data.map((producto) => producto.precio);
        renderizacionProductosEcommerce(data); // Renderiza los productos recibidos desde el servidor
    } catch (error) {
        console.error('Error al obtener los productos: ', error);
    }
}

let categorias;
//Funcion para obtener las categorias de los productos desde el servidor
async function obtenerCategoriasDelServidor() {
    try {
        const response = await fetch(`${BASE_URL}/Categoria`);
        if (!response.ok) {
            throw new Error('Ocurrió un problema al obtener las categorias');
        }
        const data = await response.json();
        categorias = data.map((categorias) => categorias.nombre) // Renderiza las categorias recibidas desde el servidor
    } catch (error) {
        console.error('Error al obtener las categorias: ', error);
    }
}

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
    for (const producto of arr) {
        
        const productoCard = document.createElement('div');
        productoCard.classList.add('producto-card');
    
        const productoImg = document.createElement('img');
        productoImg.setAttribute('src', producto.imagen);
        productoImg.setAttribute('alt', count);
        productoImg.addEventListener('click', function() {
            const alt = productoImg.getAttribute('alt');
            const producto = arr[alt];
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

function renderizacionFiltradoProducto(){
    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    const closeButton = document.createElement('button');
    closeButton.classList.add('close-button');
    closeButton.addEventListener('click', function(){
        filtroModal.classList.add('inactive');
        iconoFiltroDeProductos.classList.remove('inactive');
    })

    const span = document.createElement('span');
    span.innerHTML = "&times;";
    closeButton.appendChild(span);

    const h2 = document.createElement('h2');
    h2.innerText = 'Filtrar Productos';

    const label = document.createElement('label');
    label.setAttribute('for', 'productName');
    label.innerText = 'Nombre del producto';

    const inputProductName = document.createElement('input');
    inputProductName.setAttribute('type', 'text');
    inputProductName.setAttribute('id', 'productName');
    inputProductName.setAttribute('name', 'productName');

    const label2 = document.createElement('label');
    label2.setAttribute('for', 'category');
    label2.innerText = 'Categoría:';

    const selectCategory = document.createElement('select');
    selectCategory.setAttribute('id', 'category');
    selectCategory.setAttribute('name', 'category');
    for (const categoria in categorias) {
        const option = document.createElement('option');
        option.setAttribute('value', categoria);
        option.innerText = categorias[categoria];
        selectCategory.appendChild(option);
    }
    // selectCategory.innerHTML = `<option value="category1">Categoría 1</option>
    //                             <option value="category2">Categoría 2</option>`;             
    const label3 = document.createElement('label');
    label3.setAttribute('for', 'price');
    label3.innerText = 'Precio:';

    const inputPrice = document.createElement('input');
    inputPrice.setAttribute('type', 'range');
    inputPrice.setAttribute('id', 'price');
    inputPrice.setAttribute('name', 'price');
    inputPrice.setAttribute('min', Math.min(...precios));
    inputPrice.setAttribute('max', Math.max(...precios));

    const buttonApplyFilter = document.createElement('button');
    buttonApplyFilter.setAttribute('onclick', 'applyFilters()');
    buttonApplyFilter.innerText = 'Aplicar Filtros';
    
    modalContent.append(closeButton, h2, label, inputProductName, label2, selectCategory, label3, inputPrice, buttonApplyFilter);
    filtroModal.appendChild(modalContent);
}

obtenerProductosDelServidor();