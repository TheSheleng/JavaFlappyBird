// Предполагаем, что LoginDto — это объект с данными для логина, поэтому создадим интерфейс для него
interface LoginDto {
    username: string;
    password: string;
}

class LoginPage {
// Метод для отображения страницы логина
display(): void {
        // Логика для отображения страницы логина
    }

    // Метод для авторизации пользователя
    loginUser(loginDto: LoginDto): void {
        // Логика авторизации пользователя (визуальная часть)
        // loginDto — данные для авторизации
    }

    // Метод для возврата назад
    navigateBack(): void {
        // Возврат назад
    }

    // Метод для перехода на страницу регистрации
    navigateToRegistration(): void {
        // Переход на страницу регистрации
    }
}

// Создание экземпляра класса LoginPage
const loginPage = new LoginPage();
loginPage.display();
