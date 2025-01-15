export class GameOverModal {
    private modal: HTMLElement | null;
    private currentScoreElement: HTMLElement | null;
    private bestScoreElement: HTMLElement | null;
    private restartButton: HTMLElement | null;

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

    public show(currentScore: number, bestScore: number): void {
        if (this.modal && this.currentScoreElement && this.bestScoreElement) {
            this.currentScoreElement.textContent = currentScore.toString();
            this.bestScoreElement.textContent = bestScore.toString();

            this.modal.style.display = 'flex';
        }
    }

    private restartGame = (): void => {
        location.reload();
    }
}

