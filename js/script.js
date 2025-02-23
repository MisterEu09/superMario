document.addEventListener('DOMContentLoaded', () => {
    const mario = document.querySelector('.mario');
    const pipe = document.querySelector('.pipe');
    const gameOverScreen = document.querySelector('.game-over-screen');
    const restartButton = document.getElementById('restart-button');
    let loop;

    const jump = () => {
        mario.classList.add('jump');
        setTimeout(() => {
            mario.classList.remove('jump');
        }, 400);
    };
    const scoreDisplay = document.querySelector('.score');
    let score = 0;

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
        }
        else {
            updateScore(); // Atualiza a pontuação se não houver colisão
        }
    };

    const gameOver = () => {
        clearInterval(loop);
        pipe.style.animationPlayState = 'paused';
        mario.style.animation = 'none';
        mario.src = 'src/mario-jump-images/game-over.png';
        mario.style.width = '50px';
        gameOverScreen.style.display = 'block'; // Mostra a tela de game over
    };

    const restartGame = () => {
        gameOverScreen.style.display = 'none';
        mario.src = 'src/mario-jump-images/mario.gif';
        mario.style.width = '100px';
        mario.style.animation = '';
    
        // Reposiciona o cano de volta à posição inicial
        pipe.style.right = '-80px';
    
        // Reinicia a animação do cano
        pipe.style.animation = 'none'; // Pausa a animação
        void pipe.offsetWidth; // Força uma reflow
        pipe.style.animation = 'pipe-animation 1.2s infinite linear'; // Reinicia a animação
    
        loop = setInterval(checkCollision, 10);

        score = 0; // Reseta a pontuação
        scoreDisplay.textContent = 'Score: 0';
    };
    

    loop = setInterval(checkCollision, 10);
    document.addEventListener('keydown', jump);
    restartButton.addEventListener('click', restartGame);
});