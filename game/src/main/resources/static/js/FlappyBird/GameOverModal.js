export class GameOverModal {
    modal;
    currentScoreElement;
    bestScoreElement;
    restartButton;
    menuButton;
    constructor() {
        this.modal = document.getElementById('game-over-modal');
        this.currentScoreElement = document.getElementById('current-score');
        this.bestScoreElement = document.getElementById('best-score');
        this.restartButton = document.getElementById('restart-button');
        this.menuButton = document.getElementById('menu-button');
        if (this.modal) {
            this.modal.style.display = 'none';
        }
        this.restartButton?.addEventListener('click', this.restartGame);
        this.menuButton?.addEventListener('click', this.goToMenu);
    }
    show(currentScore, bestScore) {
        if (this.modal && this.currentScoreElement && this.bestScoreElement) {
            this.currentScoreElement.textContent = currentScore.toString();
            this.bestScoreElement.textContent = bestScore.toString();
            this.modal.style.display = 'flex';
        }
    }
    restartGame = () => {
        location.reload();
    };
    goToMenu = () => {
        window.location.href = 'menu.html';
    };
}
