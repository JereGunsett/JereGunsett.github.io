const contenedorNoticias = document.querySelector('.noticias-container');

function renderizadoNoticias (arr) {
    for (noticia of noticiasList){
        //Articulo que contendra la noticia
        const articleNoticias = document.createElement('article');
        articleNoticias.classList.add('noticia');

        // Titulo de la noticia
        const tituloNoticia = document.createElement('h2');
        tituloNoticia.classList.add('titulo-noticia');
        tituloNoticia.innerText = noticia.titulo;

        // Texto de la noticia
        const textoNoticia = document.createElement('p');
        textoNoticia.classList.add('texto-noticia');
        textoNoticia.innerText = noticia.texto;

        articleNoticias.append(tituloNoticia, textoNoticia);

        //Imagen de la noticia (Opcional)
        if (noticia.imagen != null) {
            const imagenNoticia = document.createElement('img');
            imagenNoticia.classList.add('imagen-noticia');
            imagenNoticia.setAttribute('src', noticia.imagen);
            imagenNoticia.setAttribute('alt', `Noticia ${noticia.id}`);
            articleNoticias.appendChild(imagenNoticia);
        }

        //Posteo de Instagram (Opcional)
        if(noticia.posteoInstagram != null){
            const instagramNoticia = document.createElement('div');
            instagramNoticia.classList.add('instagram');

            const iframeInstagramNoticia = document.createElement('iframe');
            iframeInstagramNoticia.setAttribute('src', noticia.posteoInstagram);

            instagramNoticia.appendChild(iframeInstagramNoticia);
            articleNoticias.appendChild(instagramNoticia);
        }

        //Mapa de Google (Opcional)
        if(noticia.mapa != null){
            const mapaNoticia = document.createElement('div');
            mapaNoticia.classList.add('mapa');

            const iframeMapaNoticia = document.createElement('iframe');
            iframeMapaNoticia.setAttribute('src', noticia.mapa);

            mapaNoticia.appendChild(iframeMapaNoticia);
            articleNoticias.appendChild(mapaNoticia);
        }
        contenedorNoticias.appendChild(articleNoticias);
    }
}

const noticia1 = new Noticia({
    id: 1,
    titulo: '¡Tenemos feria!',
    texto: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem modi deleniti enim fuga mollitia dignissimos doloribus consequatur harum quis explicabo reiciendis nihil voluptatem, quod beatae saepe minima perspiciatis! Quis, illum!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt, nostrum reiciendis. Consectetur distinctio molestiae, adipisci voluptatum voluptatem illo quis enim ab. Tenetur, odio dignissimos. Eum atque cumque voluptas quaerat quam.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reiciendis ipsa distinctio corrupti quaerat obcaecati iure sint neque possimus ipsam eum. Qui voluptatem velit reprehenderit nihil esse blanditiis aut provident neque!',
    mapa: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2809.8986000032546!2d-64.25497288364261!3d-31.372398101583162!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94329ec56e325f1f%3A0xb4166b54d074b369!2sComplejo%20Ferial%20C%C3%B3rdoba!5e0!3m2!1ses!2sar!4v1691250663549!5m2!1ses!2sar'
});

const noticia2 = new Noticia({
    id: 2,
    titulo: '¡Participa de nuestro sorteo!',
    texto: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem modi deleniti enim fuga mollitia dignissimos doloribus consequatur harum quis explicabo reiciendis nihil voluptatem, quod beatae saepe minima perspiciatis! Quis, illum!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt, nostrum reiciendis. Consectetur distinctio molestiae, adipisci voluptatum voluptatem illo quis enim ab. Tenetur, odio dignissimos. Eum atque cumque voluptas quaerat quam.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reiciendis ipsa distinctio corrupti quaerat obcaecati iure sint neque possimus ipsam eum. Qui voluptatem velit reprehenderit nihil esse blanditiis aut provident neque!',
    posteoInstagram: 'https://www.instagram.com/p/CuuyQbqxxRO/?utm_source=ig_embed&amp;utm_campaign=loading'
});

const noticiasList = [];

noticiasList.push(noticia1, noticia2);

renderizadoNoticias(noticiasList);