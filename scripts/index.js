
//URL base del servidor local
const BASE_URL = 'http://localhost:5009';


// Función para cargar las categorías en el carrusel
function cargarCategorias() {
    fetch(`${BASE_URL}/Categoria`)
        .then(response => response.json())
        .then(data => {
            const slickCarousel = $('.slick-carousel');
            data.forEach(categoria => {
                slickCarousel.append(`
                    <div class="card">
                        <div class="image-container">
                            <img src="media/category/${categoria.imagen}.png" class="image" />
                        </div>
                        <section class="body">
                            <h3 class="titulo-categoria">${categoria.nombre}</h3>
                        </section>
                    </div>
                `);
            });
            // Configuración del carrusel
            $('.slick-carousel').slick({
                slidesToShow: 3,
                slidesToScroll: 1,
                centerMode: true,
                focusOnSelect: true,
                prevArrow: '<button type="button" class="slick-prev">Previous</button>',
                nextArrow: '<button type="button" class="slick-next">Next</button>'
            });
        })
        .catch(error => console.error('Error al cargar las categorías: ', error));
}

// Llamada a la función para cargar las categorías
cargarCategorias();