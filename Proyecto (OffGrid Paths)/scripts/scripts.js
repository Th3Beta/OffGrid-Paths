//Carrusel de imágenes
document.querySelectorAll(".botonDesplegable").forEach(button => {
    button.addEventListener("click", function() {
        let menu = this.nextElementSibling;
        if (menu.style.display === "none" || menu.style.display === "") {
            menu.style.display = "block";
        } else {
            menu.style.display = "none";
        }
    });
});

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
}

// Pop-ups
function openPopup(popupId) {
    document.getElementById(popupId).style.display = 'block';
}

function closePopup(popupId) {
    document.getElementById(popupId).style.display = 'none';
}

// Cambio icono iniciar sesión + Validacion inicio de sesión
function handleLogin(event) {
    event.preventDefault();
    // Aquí puedes agregar la lógica de autenticación
    // Si la autenticación es exitosa, cambia el icono
    document.getElementById('login-icon').src = 'images/inicio-sesion2.png';
    closePopup('login-popup');
}
