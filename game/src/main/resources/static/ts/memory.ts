// Загружаем тему из cookies
function loadThemeFromCookies(): void {
    const themeCookie = document.cookie.split('; ').find((row) => row.startsWith('theme='));
    const savedTheme = themeCookie ? themeCookie.split('=')[1] : 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

// Загружаем состояние звука из cookies
function loadSoundFromCookies(): void {
    const soundCookie = document.cookie.split('; ').find((row) => row.startsWith('sound='));
    const isSoundEnabled: boolean = soundCookie ? soundCookie.split('=')[1] === 'on' : true;

    const soundIcon: HTMLElement | null = document.getElementById('sound-icon');
    if (soundIcon) {
        if (isSoundEnabled) {
            soundIcon.classList.remove('fa-volume-mute');
            soundIcon.classList.add('fa-volume-up');
            soundIcon.nextElementSibling && (soundIcon.nextElementSibling.textContent = 'Sound ON');
        } else {
            soundIcon.classList.remove('fa-volume-up');
            soundIcon.classList.add('fa-volume-mute');
            soundIcon.nextElementSibling && (soundIcon.nextElementSibling.textContent = 'Sound OFF');
        }
    }
}

// Запускаем загрузку настроек при загрузке страницы
document.addEventListener('DOMContentLoaded', (): void => {
    loadThemeFromCookies();
    loadSoundFromCookies();
});


