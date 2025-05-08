document.addEventListener('DOMContentLoaded', function() {
    const imagenes = document.querySelectorAll('.imagen-contenedor img');

    imagenes.forEach(imagen => {
        imagen.addEventListener('click', function() {
            const rutaImagen = this.getAttribute('src');
            alert(`Has hecho clic en: ${rutaImagen}`);
            // Aquí podrías agregar más funcionalidades al hacer clic,
            // como abrir un modal con la imagen más grande.
        });
    });
});