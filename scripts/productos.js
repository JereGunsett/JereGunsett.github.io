const contenedorProductoEcommerce = document.querySelector('.contenedor-ecommerce');
const detalleProducto = document.querySelector('#detalle-producto');
const iconoCierreDetalleProducto = document.querySelector('.producto-detalle-cierre');
const iconoFiltroDeProductos = document.querySelector('.filtro-button');
const filtroModal = document.querySelector('.filtro-modal');
const BASE_URL = 'http://localhost:5009';

let precios;
let categorias;
let isModalRendered = false;

iconoCierreDetalleProducto.addEventListener('click', cerrarDetalleProducto);
iconoFiltroDeProductos.addEventListener('click', abrirFiltroDeProductos);

function abrirDetalleProducto(producto) {
    console.log('Abriendo el detalle del producto:', producto);
    renderizacionDetalleProducto(producto);
    detalleProducto.classList.remove('inactive');
}


async function obtenerProductosDelServidor() {
    try {
        const response = await fetch(`${BASE_URL}/Producto`);
        if (!response.ok) {
            throw new Error('Ocurrió un problema al obtener los productos');
        }

        const data = await response.json();
        console.log('Respuesta del servidor:', data);
        console.log('Productos cargados correctamente:', data.list);
        precios = data.list.map((producto) => producto.precio);
        renderizacionProductosEcommerce(data.list);
    } catch (error) {
        console.error('Error al obtener los productos: ', error);
    }
}

async function obtenerCategoriasDelServidor() {
    try {
        const response = await fetch(`${BASE_URL}/Categoria`);
        if (!response.ok) {
            throw new Error('Ocurrió un problema al obtener las categorias');
        }
        const data = await response.json();
        categorias = data.map((categoria) => categoria.nombre);
    } catch (error) {
        console.error('Error al obtener las categorias: ', error);
    }
}

function cerrarDetalleProducto() {
    detalleProducto.classList.add('inactive');
}

async function abrirFiltroDeProductos() {
    await obtenerCategoriasDelServidor();
    renderizacionFiltradoProducto(); // Renderiza el modal de filtrado
    filtroModal.classList.remove('inactive');
    iconoFiltroDeProductos.classList.add('inactive');
}

function renderizacionDetalleProducto(producto) {
    while (detalleProducto.firstChild) {
        detalleProducto.removeChild(detalleProducto.firstChild);
    }

    const closeButton = document.createElement('div');
    closeButton.classList.add('producto-detalle-cierre');
    const closeIcon = document.createElement('img');
    closeIcon.setAttribute('src', '../icons/icon_close.png');
    closeIcon.setAttribute('alt', 'close');
    closeButton.addEventListener('click', cerrarDetalleProducto);
    closeButton.appendChild(closeIcon);

    detalleProducto.appendChild(closeButton);

    if (producto && producto.imagen) {
        const displayProductoImg = document.createElement('img');
        displayProductoImg.setAttribute('src', producto.imagen);
        detalleProducto.appendChild(displayProductoImg);
    } else {
        // Puedes mostrar un mensaje de error o hacer algo adecuado si la imagen no está definida
        console.error('La propiedad imagen no está definida en el producto:', producto);
        return;
    }

    const displayProductoInfo = document.createElement('div');
    displayProductoInfo.classList.add('producto-info-detalle');

    const displayProductoPrecio = document.createElement('p');
    displayProductoPrecio.innerText = '$' + (producto.precio || 'Precio no disponible');

    const displayProductoNombre = document.createElement('p');
    displayProductoNombre.innerText = producto.nombre || 'Nombre no disponible';

    const displayProductoDescripcion = document.createElement('p');
    displayProductoDescripcion.innerText = producto.descripcion || 'Descripción no disponible';

    displayProductoInfo.append(displayProductoPrecio, displayProductoNombre, displayProductoDescripcion);
    detalleProducto.appendChild(displayProductoInfo);

    const displayBotonCarrito = document.createElement('button');
    displayBotonCarrito.classList.add('boton-primario', 'agregar-al-carrito');
    const displayImg = document.createElement('img');
    displayImg.setAttribute('src', '../icons/bt_add_to_cart.svg');
    displayImg.setAttribute('alt', 'agregar al carrito');
    displayBotonCarrito.appendChild(displayImg);
    displayBotonCarrito.appendChild(document.createTextNode('Agregar al carrito'));

    detalleProducto.appendChild(displayBotonCarrito);
}

function renderizacionProductosEcommerce(arr) {
    if (!arr || !Array.isArray(arr)) {
        console.error('La variable arr no es valida: ', arr)
        return;
    }

    for (const producto of arr) {
        const productoCard = document.createElement('div');
        productoCard.classList.add('producto-card');

        const productoImg = document.createElement('img');
        productoImg.setAttribute('src', producto.imagen);
        productoImg.setAttribute('alt', producto);
        productoImg.addEventListener('click', function() {
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
    }
}

function renderizacionFiltradoProducto() {
    if (!isModalRendered) {
        const modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');

        const closeButton = document.createElement('button');
        closeButton.classList.add('close-button');
        closeButton.addEventListener('click', function() {
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

        isModalRendered = true;
    }
}

obtenerProductosDelServidor();