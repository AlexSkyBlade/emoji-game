const squares = document.querySelectorAll('.square');
const score = document.querySelector('#score');
const timeLeft = document.querySelector('#time-left');
const emojis = ['🍎', '🍌', '🍒', '🍇', '🍉', '🍊', '🍋', '🍍', '🥭', '🥝'];
const correctEmoji = '🍎'; // L'emoji corretta da colpire

let result = 0;
let currentTime = 60;
let hitPosition;
let timerId;

// commento da eliminare

function randomSquare() {
    // Rimuovi tutte le emoji dai quadrati
    squares.forEach((square) => {
        square.textContent = ''; // Rimuove il contenuto del quadrato
        square.classList.remove('emoji'); // Rimuove la classe 'emoji'
    });

    // Assegna un'emoji casuale a ogni quadrato
    squares.forEach((square) => {
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        square.textContent = randomEmoji; // Imposta un'emoji casuale
    });

    // Seleziona un quadrato casuale per l'emoji corretta
    const randomSquare = squares[Math.floor(Math.random() * squares.length)];
    randomSquare.textContent = correctEmoji; // Imposta l'emoji corretta
    randomSquare.classList.add('emoji'); // Aggiungi la classe 'emoji'
    hitPosition = randomSquare.id; // Salva la posizione del quadrato corretto

     // Fai scomparire l'emoji dopo un breve intervallo
     setTimeout(() => {
        randomSquare.textContent = ''; // Rimuove l'emoji
        randomSquare.classList.remove('emoji'); // Rimuove la classe 'emoji'
        hitPosition = null; // Resetta la posizione corretta
    }, 500); // L'emoji scompare dopo 500ms
}

function moveEmoji() {
    timerId = setInterval(randomSquare, 500);
}

function countdown() {
    // Decrementa il tempo rimanente di un secondo
    currentTime--;
    timeLeft.textContent = currentTime; // Aggiorna il tempo rimanente sullo schermo

    // Se il tempo è scaduto, ferma il gioco
    if (currentTime === 0) {
        clearInterval(timerId); // Ferma il timer dell'emoji
        clearInterval(countdownTimerId); // Ferma il timer del countdown
        alert('Game Over! Your score is ' + result); // Mostra il punteggio finale
    }
}

squares.forEach((square) => {
    square.addEventListener('mousedown', () => {
        if (square.textContent === correctEmoji) {
            result++; // Incrementa il punteggio
            score.textContent = result; // Aggiorna il punteggio sullo schermo
            hitPosition = null; // Resetta l'indice dell'emoji
        } else {
            result--; // Decrementa il punteggio
            if (result < 0) result = 0; // Evita punteggi negativi
            score.textContent = result; // Aggiorna il punteggio sullo schermo
        }
    });
});


moveEmoji();
timerId = setInterval(randomSquare, 800); // cambia emoji ogni 800ms
