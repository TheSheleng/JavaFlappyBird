import { MulticastDelegate, Vector2D } from "./SimpleTypes.js";
import { Settings } from "./Settings.js";
import { Obstacle } from "./GameObjects/Obstacle.js";
import { Floor } from "./GameObjects/Floor.js";
import { Pawn } from "./GameObjects/Pawn.js";
import { GameOverModal } from "./GameOverModal.js";
export class Game {
    constructor(settings) {
        // Create the game over window
        this._gameOverModal = new GameOverModal();
        // Create the pawn
        this._pawn = new Pawn(this, settings.pawnSettings);
        // Create the floor
        this._floor = new Floor(this, new Vector2D(0, 0), settings.floorSettings);
        const pawnXLocationPlusWidth = this._pawn.location.x + this._pawn.size.x;
        // Calculate location of the first obstacle (pawn's X location + pawn's width + distance between obstacles)
        const firstObstacleLocationX = pawnXLocationPlusWidth +
            settings.obstaclesSettings.distanceBetweenObstacles;
        // Create the first obstacle to know its size
        const firstObstacle = new Obstacle(this, new Vector2D(firstObstacleLocationX, 0), settings.obstaclesSettings);
        // Subscribe to the trigger's onPawnOverlap event to update the _score
        firstObstacle.trigger.onPawnOverlap.add(() => this.updateScore());
        // Add the first obstacle to the list of obstacles
        this._obstacles.push(firstObstacle);
        // Total width covered by one obstacle including the distance between obstacles
        const obstacleTotalWidth = settings.obstaclesSettings.distanceBetweenObstacles + firstObstacle.size.x;
        /**
         * Total width of the screen + 1 obstacle - distance to the end of the pawn (distance to the first obstacle is
         * counted from the pawn).
         */
        const screenWidthToFill = window.screen.availWidth + obstacleTotalWidth - pawnXLocationPlusWidth;
        // Amount of obstacles to fill the screen
        const amountOfObstacles = Math.ceil(screenWidthToFill / obstacleTotalWidth);
        // Create the rest of the obstacles (all except the first one)
        for (let previousObstacleIndex = 0; previousObstacleIndex < amountOfObstacles - 2; ++previousObstacleIndex) {
            // Calculate the next obstacle's location
            const nextObstacleLocation = this._obstacles[previousObstacleIndex].location.x + obstacleTotalWidth;
            // Create the nextObstacle
            const nextObstacle = new Obstacle(this, new Vector2D(nextObstacleLocation, 0), settings.obstaclesSettings);
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
    get gameOverModal() {
        return this._gameOverModal;
    }
    get pawn() {
        return this._pawn;
    }
    get obstacles() {
        return this._obstacles;
    }
    get floor() {
        return this._floor;
    }
    onTick = new MulticastDelegate();
    playSound(sound) {
        // Проверяем, включён ли звук в cookies
        const soundCookie = document.cookie.split('; ').find(row => row.startsWith('sound='));
        const isSoundEnabled = soundCookie ? soundCookie.split('=')[1] === 'on' : true; // По умолчанию звук включён
        // Если звук выключен, не воспроизводим
        if (!isSoundEnabled || this.isPaused) {
            return;
        }
        // Сбрасываем звук и играем
        sound.currentTime = 0;
        sound.play().then();
    }
    endPlay() {
        this.playSound(this._gameOverSound);
        this.pause();
        this._isGameEnded = true;
        this.sendScore();
        const currentScore = this._score;
        const bestScore = Math.max(this._score, this.getBestScore());
        this.gameOverModal.show(currentScore, bestScore);
    }
    get score() {
        return this._score;
    }
    get isPaused() {
        return this._isPaused;
    }
    updateScore() {
        ++this._score;
        this.playSound(this._updateScoreSound);
        const scoreDisplay = document.getElementById('score-display');
        if (scoreDisplay) {
            scoreDisplay.textContent = this._score.toString();
        }
    }
    lastFrameTime = 0;
    tickCallback = (currentTime) => {
        // Calculate the time since the last frame in seconds
        const deltaTime = (currentTime - this.lastFrameTime) / 1000;
        this.onTick.broadcast(deltaTime);
        // Update the last frame time
        this.lastFrameTime = currentTime;
        // Request the next tick but only if the game is not paused
        if (!this.isPaused) {
            this._requestAnimationFrameId = requestAnimationFrame(this.tickCallback);
        }
    };
    pause() {
        cancelAnimationFrame(this._requestAnimationFrameId);
        this._isPaused = true;
    }
    resume() {
        // Don't resume the game if it has ended
        if (this._isGameEnded) {
            return;
        }
        this._isPaused = false;
        this.lastFrameTime = performance.now();
        this._requestAnimationFrameId = requestAnimationFrame(this.tickCallback);
    }
    _score = 0;
    _gameOverModal;
    _pawn;
    _obstacles = [];
    _floor;
    _requestAnimationFrameId;
    _updateScoreSound;
    _gameOverSound;
    _isPaused = false;
    _isGameEnded = false;
    getBestScore() {
        // TODO: Connect to a database to get the best score
        return 1000; // Temporary placeholder value
    }
    sendScore() {
        const score = this._score;
        fetch("http://localhost:8080/api/game/sendScore", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(score),
        });
    }
}
new Game(new Settings());
