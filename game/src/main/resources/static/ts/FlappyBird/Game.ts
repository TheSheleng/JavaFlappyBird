import {MulticastDelegate, Vector2D} from "./SimpleTypes.js";
import {Settings} from "./Settings.js";
import {Obstacle} from "./GameObjects/Obstacle.js";
import {Floor} from "./GameObjects/Floor.js";
import {Pawn} from "./GameObjects/Pawn.js";

import {GameOverModal} from "./GameOverModal.js";

export class Game {
    public constructor(settings: Settings) {
        // Create the game over window
        this._gameOverModal = new GameOverModal();

        // Create the pawn
        this._pawn = new Pawn(this, settings.pawnSettings);

        // Create the floor
        this._floor = new Floor(this, new Vector2D(0, 0), settings.floorSettings);

        const pawnXLocationPlusWidth: number = this._pawn.location.x + this._pawn.size.x;

        // Calculate location of the first obstacle (pawn's X location + pawn's width + distance between obstacles)
        const firstObstacleLocationX: number = pawnXLocationPlusWidth +
            settings.obstaclesSettings.distanceBetweenObstacles;

        // Create the first obstacle to know its size
        const firstObstacle: Obstacle = new Obstacle(this, new Vector2D(firstObstacleLocationX, 0),
            settings.obstaclesSettings);

        // Subscribe to the trigger's onPawnOverlap event to update the _score
        firstObstacle.trigger.onPawnOverlap.add(() => this.updateScore());

        // Add the first obstacle to the list of obstacles
        this._obstacles.push(firstObstacle);

        // Total width covered by one obstacle including the distance between obstacles
        const obstacleTotalWidth: number = settings.obstaclesSettings.distanceBetweenObstacles + firstObstacle.size.x;

        /**
         * Total width of the screen + 1 obstacle - distance to the end of the pawn (distance to the first obstacle is
         * counted from the pawn).
         */
        const screenWidthToFill: number = window.screen.availWidth + obstacleTotalWidth - pawnXLocationPlusWidth;

        // Amount of obstacles to fill the screen
        const amountOfObstacles: number = Math.ceil(screenWidthToFill / obstacleTotalWidth);

        // Create the rest of the obstacles (all except the first one)
        for (
            let previousObstacleIndex: number = 0;
            previousObstacleIndex < amountOfObstacles - 2;
            ++previousObstacleIndex
        ) {
            // Calculate the next obstacle's location
            const nextObstacleLocation: number = this._obstacles[previousObstacleIndex].location.x + obstacleTotalWidth;

            // Create the nextObstacle
            const nextObstacle: Obstacle = new Obstacle(this, new Vector2D(nextObstacleLocation, 0),
                settings.obstaclesSettings);

            // Subscribe to the trigger's onPawnOverlap event to update the _score
            nextObstacle.trigger.onPawnOverlap.add(() => this.updateScore());

            // Add the nextObstacle to the list of obstacles
            this._obstacles.push(nextObstacle);
        }

        // Start the tick after all objects have been created
        this._requestAnimationFrameId = requestAnimationFrame(this.tickCallback);

        // Create audio elements
        this._updateScoreSound = new Audio(settings.generalSettings.updateScoreSoundUrl);
        this._gameOverSound = new Audio(settings.generalSettings.gameOverSoundUrl);

        document.addEventListener("visibilitychange", () => {
            if (document.visibilityState === "hidden") {
                this.pause();
            }
            else {
                this.resume();
            }
        });
    }

    public get gameOverModal(): GameOverModal {
        return this._gameOverModal;
    }

    public get pawn(): Pawn {
        return this._pawn;
    }

    public get obstacles(): Array<Obstacle> {
        return this._obstacles;
    }

    public get floor(): Floor {
        return this._floor;
    }

    public onTick: MulticastDelegate<(deltaTime: number) => void> = new MulticastDelegate<() => void>();

    public playSound(sound: HTMLAudioElement): void {
        // Don't play the sound if the game is paused
        if (this.isPaused) {
            return;
        }

        // Reset the sound to the beginning in case it's already playing
        sound.currentTime = 0;

        // Play the sound. then function is used here only to avoid the warning.
        sound.play().then();
    }

    public endPlay(): void {
        this.playSound(this._gameOverSound);

        this.pause();
        this._isGameEnded = true;

        this.sendScore();

        const currentScore = this._score;
        const bestScore = Math.max(this._score, this.getBestScore());
        this.gameOverModal.show(currentScore, bestScore);
    }

    public get score(): number {
        return this._score;
    }

    public get isPaused(): boolean {
        return this._isPaused;
    }

    private updateScore(): void {
        ++this._score;

        this.playSound(this._updateScoreSound);

        const scoreDisplay: HTMLDivElement = document.getElementById('score-display') as HTMLDivElement;

        if (scoreDisplay) {
            scoreDisplay.textContent = this._score.toString();
        }
    }

    private lastFrameTime: number = 0;

    private readonly tickCallback: FrameRequestCallback = (currentTime: DOMHighResTimeStamp) => {
        // Calculate the time since the last frame in seconds
        const deltaTime: number = (currentTime - this.lastFrameTime) / 1000;

        this.onTick.broadcast(deltaTime);

        // Update the last frame time
        this.lastFrameTime = currentTime;

        // Request the next tick but only if the game is not paused
        if (!this.isPaused) {
            this._requestAnimationFrameId = requestAnimationFrame(this.tickCallback);
        }
    };

    private pause(): void {
        cancelAnimationFrame(this._requestAnimationFrameId);

        this._isPaused = true;
    }

    private resume(): void {
        // Don't resume the game if it has ended
        if (this._isGameEnded)
        {
            return;
        }

        this._isPaused = false;

        this.lastFrameTime = performance.now();
        this._requestAnimationFrameId = requestAnimationFrame(this.tickCallback);
    }

    private _score: number = 0;

    private readonly _gameOverModal: GameOverModal;

    private readonly _pawn: Pawn;
    private _obstacles: Array<Obstacle> = [];
    private readonly _floor: Floor;

    private _requestAnimationFrameId: number;

    private readonly _updateScoreSound: HTMLAudioElement;
    private readonly _gameOverSound: HTMLAudioElement;

    private _isPaused: boolean = false;
    private _isGameEnded: boolean = false;

    private getBestScore(): number {
        // TODO: Connect to a database to get the best score
        return 1000; // Temporary placeholder value
    }

    private sendScore(): void {
        // TODO: Implement sending the score to the server
    }
}

new Game(new Settings());