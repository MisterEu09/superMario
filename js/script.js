document.addEventListener('DOMContentLoaded', () => {
    const mario = document.querySelector('.mario');
    const pipe = document.querySelector('.pipe');
    const gameOverScreen = document.querySelector('.game-over-screen');
    const restartButton = document.getElementById('restart-button');
    const scoreDisplay = document.querySelector('.score');
    let loop;
    let score = 0;

    const jump = () => {
        mario.classList.add('jump');
        setTimeout(() => {
            mario.classList.remove('jump');
        }, 400);
    };

    const updateScore = () => {
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
    };

    const checkCollision = () => {
        const marioRect = mario.getBoundingClientRect();
        const pipeRect = pipe.getBoundingClientRect();

        if (
            marioRect.right > pipeRect.left &&
            marioRect.left < pipeRect.right &&
            marioRect.bottom > pipeRect.top &&
            marioRect.top < pipeRect.bottom
        ) {
            gameOver();
        } else {
            updateScore();
        }
    };

    const gameOver = () => {
        clearInterval(loop);
        pipe.style.animationPlayState = 'paused';
        mario.style.animation = 'none';
        mario.src = 'src/mario-jump-images/game-over.png';
        mario.style.width = '50px';
        gameOverScreen.style.display = 'block';
    };

    const restartGame = () => {
        gameOverScreen.style.display = 'none';
        mario.src = 'src/mario-jump-images/mario.gif';
        mario.style.width = '100px';
        mario.style.animation = '';
        pipe.style.right = '-80px';
        pipe.style.animation = 'none';
        void pipe.offsetWidth;
        pipe.style.animation = 'pipe-animation 1.2s infinite linear';
        loop = setInterval(checkCollision, 10);
        score = 0;
        scoreDisplay.textContent = 'Score: 0';
    };

    loop = setInterval(checkCollision, 10);

    // Eventos para desktop (teclado)
    document.addEventListener('keydown', jump);

    // Eventos para mobile (toque)
    document.addEventListener('touchstart', jump);

    restartButton.addEventListener('click', restartGame);
});