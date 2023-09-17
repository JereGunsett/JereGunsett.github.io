const rowGaleria = document.querySelector('.row');
const modalGaleria = document.querySelector('.modal-galeria');

function renderizadoImagenesGaleria (arr){
    for (imagen of imgList) {
        const divCol4 = document.createElement('div');
        divCol4.classList.add('col-lg-4');
    
        const imgGaleria = document.createElement('img');
        imgGaleria.setAttribute('src', imagen.src);
        imgGaleria.setAttribute('alt', imagen.id);
        imgGaleria.setAttribute('data-bs-toggle', "modal");
        imgGaleria.setAttribute('data-bs-target', `#imageModal${imagen.id}`);
        imgGaleria.classList.add('gallery-image');

        divCol4.appendChild(imgGaleria);
        rowGaleria.appendChild(divCol4);
    }
}


function renderizadoModalGaleria (arr){
    for (imagen of imgList) {
        const modalFade = document.createElement('div');
        modalFade.classList.add('modal');
        modalFade.classList.add('fade');
        modalFade.id = `imageModal${imagen.id}`;
        modalFade.setAttribute('aria-hidden', 'true');
        modalFade.setAttribute('aria-labelledby', `imageModal${imagen.id}Label`);
        modalFade.setAttribute('tabindex', '-1');

        const modalDialog = document.createElement('div');
        modalDialog.classList.add('modal-dialog');
        modalDialog.classList.add('modal-dialog-centered');

        const modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');

        const modalBody = document.createElement('div');
        modalBody.classList.add('modal-body');

        const imagenModal = document.createElement('img');
        imagenModal.classList.add('img-fluid');
        imagenModal.setAttribute('src', imagen.src);
        imagenModal.setAttribute('alt', `Imagen ${imagen.id}`);

        modalBody.appendChild(imagenModal);
        modalContent.appendChild(modalBody);
        modalDialog.appendChild(modalContent);
        modalFade.appendChild(modalDialog);
        modalGaleria.appendChild(modalFade);
    }
}

const imgGaleria1 = new Imagen({
    id: 1,
    src: '../media/gallery/1.webp'
});
const imgGaleria2 = new Imagen({
    id: 2,
    src: '../media/gallery/2.webp'
});
const imgGaleria3 = new Imagen({
    id: 3,
    src: '../media/gallery/3.webp'
});
const imgGaleria4 = new Imagen({
    id: 4,
    src: '../media/gallery/4.webp'
});
const imgGaleria5 = new Imagen({
    id: 5,
    src: '../media/gallery/5.webp'
});
const imgGaleria6 = new Imagen({
    id: 6,
    src: '../media/gallery/6.webp'
});
const imgGaleria7 = new Imagen({
    id: 7,
    src: '../media/gallery/7.webp'
});
const imgGaleria8 = new Imagen({
    id: 8,
    src: '../media/gallery/8.webp'
});

const imgList = [];

imgList.push(imgGaleria1, imgGaleria2, imgGaleria3, imgGaleria4, imgGaleria5, imgGaleria6, imgGaleria7, imgGaleria8);

renderizadoModalGaleria(imgList);
renderizadoImagenesGaleria(imgList);
