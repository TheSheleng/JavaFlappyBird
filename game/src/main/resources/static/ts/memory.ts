// Загружаем тему из cookies
function loadTheme(): void {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

// Загружаем состояние звука из cookies
function loadSound(): void {
    const isSoundEnabled = localStorage.getItem('sound') === 'on';

    if (isSoundEnabled) {

    } else {

    }
}

// Запускаем загрузку настроек при загрузке страницы
document.addEventListener('DOMContentLoaded', (): void => {
    loadTheme();
    loadSound();
});


