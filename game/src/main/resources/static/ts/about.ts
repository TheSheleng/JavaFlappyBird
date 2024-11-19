class AboutPage {
    // Метод для отображения страницы "О нас"
    display(): void {
        // Логика для отображения страницы "О нас"
    }

    // Метод для получения информации о разработчиках
    getDeveloperInfo(): string {
        return "Информация о разработчиках"; // Возвращает информацию о разработчиках
    }

    // Метод для получения информации о игре
    getGameInfo(): string {
        return "Информация о игре"; // Возвращает информацию о игре
    }

    // Метод для возврата на предыдущую страницу
    navigateBack(): void {
        // Логика возврата на предыдущую страницу
    }
}

// Создание экземпляра класса
const aboutPage = new AboutPage();
aboutPage.display();