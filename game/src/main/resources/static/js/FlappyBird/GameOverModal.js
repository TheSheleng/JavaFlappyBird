export class GameOverModal {
    modal;
    currentScoreElement;
    bestScoreElement;
    restartButton;
    constructor() {
        this.modal = document.getElementById('game-over-modal');
        this.currentScoreElement = document.getElementById('current-score');
        this.bestScoreElement = document.getElementById('best-score');
        this.restartButton = document.getElementById('restart-button');
        if (this.modal) {
            this.modal.style.display = 'none';
        }
        this.restartButton?.addEventListener('click', this.restartGame);
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
}
