// auth.js

// Функция для регистрации и сохранения JWT в localStorage
function register(username, email, password) {
    fetch('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(async (response) => {
        // Парсим JSON независимо от статуса ответа
        const data = await response.json();

        if (response.ok) {
            // Успешный ответ
            localStorage.setItem('jwt', data.token); // Сохраняем токен
            sendGetRequestWithToken('http://localhost:8080/menu')
            //window.location.href = '/menu';
        }
        else {
            showError(data.error);
        }
    })
    .catch((error) => {
        console.error('Registration error:', error);
    });
}

// Функция для логина и сохранения JWT в localStorage
function login(username, password) {
    fetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Invalid credentials');
        }
        return response.json();
    })
    .then(data => {
        console.log(data)

        if (data.token) { // Проверяем наличие токена
            // Сохраняем токен в localStorage
            localStorage.setItem('jwt', data.token);
            window.location.href = '/dashboard';
        } else {
            alert("Login failed. No token received.");
        }
    })
    .catch(error => {
        console.error('Login error:', error);
        alert("An error occurred during login. Please try again.");
    });
}

function showError(errorMessage) {
    // Находим элемент, в который нужно вывести ошибку
    const errorElement = document.getElementById('error-text');
    const errorMessageContainer = document.getElementById('error-message');

    // Устанавливаем текст ошибки
    errorElement.textContent = errorMessage;

    // Показываем сообщение об ошибке
    errorMessageContainer.style.display = 'block';
}

// Функция для отправки запросов с JWT в заголовке
function sendGetRequestWithToken(url) {
    const token = localStorage.getItem('jwt'); // Получение токена из localStorage


    if (token) {
        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}` // Отправка токена в заголовке
            }
        })
        .then(response => {
            console.log(response)
            if (response.status === 401) {
                alert("Unauthorized: Invalid or expired token");
            }
            window.location.href = response.url;
            //return response.json();
        })
        //.then(data => console.log(data))
        .catch(error => console.error('Error:', error));
    } else {
        alert("No JWT token found!");
    }
}

