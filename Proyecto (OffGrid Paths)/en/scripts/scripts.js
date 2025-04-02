// Idioma de la página
function changeLanguage(lang) {
  if (lang === 'en') {
      window.location.href = "../en/index.html";  // Redirige a la versión en inglés
  } if (lang === 'ca') {
      window.location.href = "../ca/index.html";  // Redirige a la versión en catalán
  } else if (lang === 'es') {
      window.location.href = "../index.html";  // Redirige a la versión en español
  }
}
//Carrusel de imágenes
document.querySelectorAll(".botonDesplegable").forEach((button) => {
  button.addEventListener("click", function () {
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
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

// Pop-ups
function openPopup(popupId) {
  document.getElementById(popupId).style.display = "block";
}

function closePopup(popupId) {
  document.getElementById(popupId).style.display = "none";
}

// Cambio icono iniciar sesión + Validacion inicio de sesión
// Validación de inicio de sesión
async function validateLogin(event) {
    event.preventDefault();
    const username = document.querySelector('#login-popup input[name="username"]').value;
    const password = document.querySelector('#login-popup input[name="password"]').value;

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const result = await response.json();

        if (result.success) {
            document.getElementById('login-icon').src = 'images/inicio-sesion2.png';
            closePopup('login-popup');
            alert(result.message);
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        alert('Hubo un problema al iniciar sesión. Inténtalo más tarde.');
    }
}

// Validación de registro
async function validateRegister(event) {
    event.preventDefault();
    const username = document.querySelector('#create-popup input[name="username"]').value;
    const email = document.querySelector('#create-popup input[name="email"]').value;
    const password = document.querySelector('#create-popup input[name="password"]').value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!username || !email || !password) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    if (!emailRegex.test(email)) {
        alert("Por favor, ingresa un correo electrónico válido.");
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });

        const result = await response.json();

        if (result.success) {
            closePopup('create-popup');
            alert(result.message);
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        alert('Hubo un problema al registrar el usuario. Inténtalo más tarde.');
    }
}