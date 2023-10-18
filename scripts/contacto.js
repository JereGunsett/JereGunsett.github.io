const sumbitButtonContacto = document.querySelector('#sumbit-contacto');

sumbitButtonContacto.addEventListener('click', enviarDatosDeContacto);

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

    fetch('/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);
        
    })
    .catch(error => {
        console.error('Error:', error);
    });
}