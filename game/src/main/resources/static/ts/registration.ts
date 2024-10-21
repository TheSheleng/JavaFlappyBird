// Предположим, что UserDto — это объект с данными для регистрации, создадим интерфейс для него
interface UserDto {
    username: string;
    password: string;
    email: string;
}

class RegistrationPage {
// Метод для отображения страницы регистрации
display(): void {
        // Логика для отображения страницы регистрации
    }

    // Метод для регистрации пользователя
    registerUser(userDto: UserDto): void {
        // Логика регистрации пользователя (визуальная часть)
        // userDto — данные для регистрации
    }

    // Метод для возврата назад
    navigateBack(): void {
        // Логика возврата назад
    }
}

// Создание экземпляра класса RegistrationPage
const registrationPage = new RegistrationPage();
registrationPage.display();
