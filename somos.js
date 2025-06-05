// somos.js

document.addEventListener('DOMContentLoaded', function() {
    const canvaButton = document.querySelector('.canva-button');

    if (canvaButton) {
        canvaButton.addEventListener('click', function(event) {
            // Opcional: podrías añadir un mensaje o animación antes de ir al enlace.
            // Por ahora, solo confirmaremos que el JS funciona.
            console.log('Botón de Canva clicado. Abriendo enlace...');
            // event.preventDefault(); // Descomenta si quieres manejar la navegación manualmente (no recomendado para enlaces directos)

            // Si quisieras añadir un efecto visual al clic, podrías hacerlo aquí:
            // canvaButton.style.transform = 'scale(0.98)';
            // setTimeout(() => {
            //     canvaButton.style.transform = 'scale(1)';
            // }, 100);
        });
    }

    // Si quieres añadir alguna otra interactividad futura, este es tu archivo.
    // Por ejemplo, animaciones al cargar la página, etc.
});
