const contenedorProductoEcommerce = document.querySelector('.contenedor-ecommerce');
const detalleProducto = document.querySelector('#detalle-producto');
const iconoCierreDetalleProducto = document.querySelector('.producto-detalle-cierre');
const iconoFiltroDeProductos = document.querySelector('.filtro-button');
const filtroModal = document.querySelector('.filtro-modal');
const paginationContainer = document.querySelector('.pagination-container');
const BASE_URL = 'http://localhost:5009';


let precios;
let categorias;
let isModalRendered = false;
const PAGE_SIZE = 8;
let page = 1;
let totalCount = 1;

iconoCierreDetalleProducto.addEventListener('click', cerrarDetalleProducto);
iconoFiltroDeProductos.addEventListener('click', abrirFiltroDeProductos);

function abrirDetalleProducto(producto) {
    console.log('Abriendo el detalle del producto:', producto);
    renderizacionDetalleProducto(producto);
    detalleProducto.classList.remove('inactive');
}


async function obtenerProductosDelServidor(page = 1, pageSize = PAGE_SIZE, type = '0', query = '', orderBy = 'Id') {
    try {
        const response = await fetch(`${BASE_URL}/Producto/type/${type}?page=${page}&pageSize=${pageSize}&query=${query}&orderBy=${orderBy}`);
        console.log('URL de la llamada a la API: ' + response.url);
        console.log('Valores de paginación:', { page, pageSize });
        if (!response.ok) {
            throw new Error('Ocurrió un problema al obtener los productos');
        }

        const data = await response.json();
        console.log('Respuesta del servidor:', data);
        console.log('Productos cargados correctamente:', data.list);
        totalCount = data.totalCount;
        precios = data.list.map((producto) => producto.precio);
        renderizacionProductosEcommerce(data.list);
    } catch (error) {
        console.error('Error al obtener los productos: ', error);
    }
}

function enviarMensajeWhatsApp(producto) {
    const mensaje = `¡Hola! Estoy interesado en el producto: ${producto.nombre}. ¿Puedes proporcionarme más información?`;
    const numeroTelefono = '5493512884578';

    // URL de WhatsApp con el número de teléfono y el mensaje codificado
    const urlWhatsApp = `whatsapp://send?phone=${numeroTelefono}&text=${encodeURIComponent(mensaje)}`;

    // Abrir la URL de WhatsApp
    window.location.href = urlWhatsApp;
}

// Botones de paginación
const paginationButtonsContainer = document.createElement('div');
paginationButtonsContainer.classList.add('pagination_container');

const prevPageButton = document.createElement('button');
prevPageButton.classList.add('button_page');
prevPageButton.innerText = 'Anterior';
prevPageButton.addEventListener('click', () => {
    if (page > 1) {
        page--;
        obtenerProductosDelServidor(page);
        console.log('Pagina: ' + page)
    }
});

paginationButtonsContainer.appendChild(prevPageButton);

const nextPageButton = document.createElement('button');
nextPageButton.classList.add('button_page');
nextPageButton.innerText = 'Siguiente';
nextPageButton.addEventListener('click', () => {
    const lastPage = Math.ceil(totalCount / PAGE_SIZE);
    if (page < lastPage) {
        page++;
        obtenerProductosDelServidor(page);
        console.log('Pagina: ' + page)
    }
});
paginationButtonsContainer.appendChild(nextPageButton);

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

    const displayBotonWhatsApp = document.createElement('button');
    displayBotonWhatsApp.classList.add('boton-whatsapp');
    
    const displayWhatsAppIcon = document.createElement('i');
    displayWhatsAppIcon.classList.add('fab', 'fa-whatsapp', 'fa-2x');
    displayWhatsAppIcon.style.marginRight = '10px';
    
    const displayWhatsAppText = document.createTextNode('Enviar a WhatsApp');
    
    // Agregar icono y texto al botón
    displayBotonWhatsApp.appendChild(displayWhatsAppIcon);
    displayBotonWhatsApp.appendChild(displayWhatsAppText);
    
    // Agregar evento clic para enviar el mensaje de WhatsApp
    displayBotonWhatsApp.addEventListener('click', function() {
        enviarMensajeWhatsApp(producto);
    });
    
    // Agregar botón al elemento detalleProducto
    detalleProducto.appendChild(displayBotonWhatsApp);

    detalleProducto.appendChild(displayBotonWhatsApp);
}

function renderizacionProductosEcommerce(arr) {
    if (!arr || !Array.isArray(arr)) {
        console.error('La variable arr no es valida: ', arr)
        return;
    }

    contenedorProductoEcommerce.innerHTML = '';

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
    // Paginación
    const totalPages = Math.ceil(totalCount / PAGE_SIZE);

    // Elimina la información de paginación anterior
    paginationContainer.innerHTML = '';
    
    const paginationInfo = document.createElement('p');
    paginationInfo.classList.add('pagination_info');
    paginationInfo.innerText = `Página ${page} de ${totalPages}`;
    paginationContainer.appendChild(paginationInfo);

    paginationContainer.appendChild(paginationButtonsContainer);
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

console.log('Creando botones de paginación. Página actual:', page, 'Total de páginas:', Math.ceil(totalCount / PAGE_SIZE))
console.log('Total de productos:', totalCount);
console.log('Tamaño de página:', PAGE_SIZE);

obtenerProductosDelServidor(1, PAGE_SIZE, '0', "", "Id");