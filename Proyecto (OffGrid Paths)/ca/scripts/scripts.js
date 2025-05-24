// Idioma de la página
function changeLanguage(lang) {
  if (lang === 'en') {
      window.location.href = "../en/index.html";  // Redirige a la versión en inglés
  } if (lang === 'ca') {
      window.location.href = "./index.html";  // Redirige a la versión en catalán
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
    // Cargar clima según el popup que se abra
  switch (popupId) {
    case 'popup-castillo':
      showWeather('Alfondeguilla,ES', 'weather-castillo');
      break;
    case 'popup-penalara':
      showWeather('Rascafría,ES', 'weather-penalara');
      break;
    case 'popup-poetas':
      showWeather('Cercedilla,ES', 'weather-poetas');
      break;
    case 'popup-fuente':
      showWeather('Fuente Dé,ES', 'weather-fuente');
      break;

    default:
      console.warn('No se configuró clima para este popup:', popupId);
  }
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


//Clima
const API_KEY = 'yAAib8KAXd1ESllvvYGEvcNlvpauxD9w'; // Tu clave real

async function getLocationKey(city) {
    const response = await fetch(`https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${API_KEY}&q=${city}`);
    const data = await response.json();
    return data[0]?.Key;
}

async function getCurrentWeather(locationKey) {
    const response = await fetch(`https://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${API_KEY}`);
    const data = await response.json();
    return data[0];
}

// Función reutilizable para mostrar el clima
async function showWeather(locationName, containerId) {
    try {
        const locationKey = await getLocationKey(locationName);
        const weather = await getCurrentWeather(locationKey);

        document.getElementById(containerId).innerHTML = `
            <h3>Clima actual</h3>
            <p><strong>${weather.WeatherText}</strong></p>
            <p>Temperatura: ${weather.Temperature.Metric.Value} °C</p>
        `;
    } catch (error) {
        console.error("Error al obtener el clima:", error);
        document.getElementById(containerId).innerHTML = `<p>No se pudo cargar el clima.</p>`;
    }
}

/* Carrusel auto */
(() => {
  let slideIndex = 0;
  showSlides();

  function showSlides() {
    let i;
    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("dot");

    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }

    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1; }

    for (i = 0; i < dots.length; i++) {
      dots[i].classList.remove("active");
    }

    slides[slideIndex - 1].style.display = "block";
    if (dots[slideIndex - 1]) {
      dots[slideIndex - 1].classList.add("active");
    }

    setTimeout(showSlides, 5000); // Cambia cada 5 segundos
  }
})();

/*Desaparicion Flecha*/
  const scrollArrow = document.getElementById("scrollArrow");

  function hideArrow() {
    scrollArrow.classList.add("hidden");
  }

  function showArrowIfAtTop() {
    if (window.scrollY < window.innerHeight * 0.6) {
      scrollArrow.classList.remove("hidden");
    }
  }

  // Oculta al hacer clic en la flecha
  scrollArrow.addEventListener("click", () => {
    // Desplazamiento suave hacia la sección #nuestras-rutas
    document.getElementById("nuestras-rutas").scrollIntoView({
      behavior: 'smooth'
    });
    
    // Oculta la flecha después de un tiempo
    setTimeout(hideArrow, 1000);
  });

  // Oculta al hacer cualquier scroll hacia abajo
  window.addEventListener("scroll", () => {
    if (window.scrollY > 1) {
      hideArrow();
    } else {
      showArrowIfAtTop();
    }
  });