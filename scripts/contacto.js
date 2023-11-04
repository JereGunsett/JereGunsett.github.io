const sumbitButtonContacto = document.querySelector('#sumbit-contacto');

sumbitButtonContacto.addEventListener('click', enviarDatosDeContacto);

const BASE_URL = 'http://localhost:5009';

function enviarDatosDeContacto(event) {
    event.preventDefault();

    const nombreContacto = document.querySelector('#nombre').value;
    const emailContacto = document.querySelector('#email').value;
    const descripcionContacto = document.querySelector('#descripcion').value;

    const data = {
        nombre: nombreContacto,
        email: emailContacto,
        descripcion: descripcionContacto
    };

    fetch(`${BASE_URL}/Contacto`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);
        console.log(data);
        // Limpiar los campos del formulario
        nombreContacto.value = '';
        emailContacto.value = '';
        descripcionContacto.value = '';
        // Recargar la página
        location.reload();
        alert('La información fue enviada con exito')
    })
    .catch(error => {
        console.error('Error:', error);
    });
}