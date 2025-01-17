"use strict";
// Загружаем тему из cookies
function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
}
// Загружаем состояние звука из cookies
function loadSound() {
    const isSoundEnabled = localStorage.getItem('sound') === 'on';
    console.log(isSoundEnabled);
}
// Запускаем загрузку настроек при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    loadTheme();
    loadSound();
});
