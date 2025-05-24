function changeLanguage(lang) {
    if (lang === 'en') {
        window.location.href = '../../en/about us/aboutus.html';
    } else if (lang === 'es') {
        window.location.href = '../../about us/aboutus.html';
    } else if (lang === 'ca') {
        window.location.href = '../about us/aboutus.html';
    }
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