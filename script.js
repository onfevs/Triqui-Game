// Selecciona todas las celdas del tablero.
const cells = document.querySelectorAll('.cell');

// Selecciona el botón de reset.
const resetButton = document.getElementById('reset');

// Inicializa la variable del jugador en 'X'.
let player = 'X';

// Agrega un 'eventListener' a cada celda del tablero para que cuando el usuario haga clic en una celda, la función 'onCellClick' se ejecute.
cells.forEach(cell => {
    cell.addEventListener('click', () => {
        if (!cell.textContent) {
            // Agrega la clase correspondiente al jugador actual a la celda.
            cell.classList.add(player.toLowerCase());
            // Agrega el símbolo del jugador actual a la celda.
            cell.textContent = player;
            // Verifica si hay un ganador.
            checkForWinner();
            // Cambia el jugador actual.
            player = player === 'X' ? 'O' : 'X';
        }
    });
});

// Agrega un 'eventListener' al botón de reset para que cuando se haga clic, la función 'resetGame' se ejecute.
resetButton.addEventListener('click', resetGame);

// Verifica si hay un ganador.
function checkForWinner() {
    // Crea una matriz de combinaciones ganadoras.
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    // Itera sobre cada combinación ganadora.
    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        // Si las celdas correspondientes a la combinación actual contienen el mismo símbolo, se agrega la clase 'winning' a cada celda y se muestra una alerta que indica quién ganó.
        if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
            cells[a].classList.add('winning');
            cells[b].classList.add('winning');
            cells[c].classList.add('winning');
            // Se usa la función 'setTimeout' para que la alerta se muestre después de que las celdas se hayan coloreado.
            setTimeout(() => {
                alert(`${cells[a].textContent} wins!`);
                resetGame();
            },
                1000);
            // Remueve los 'eventListeners' de las celdas para que no se puedan hacer más clics en ellas después de que se haya encontrado un ganador.
            cells.forEach(cell => {
                cell.removeEventListener('click', onCellClick);
            });
        }
    }
}

// Restablece el tablero y agrega nuevos 'eventListeners' a cada celda.
function resetGame() {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x');
        cell.classList.remove('o');
        cell.classList.remove('winning');
        cell.addEventListener('click', onCellClick);
    });
    // Reinicia el jugador actual en 'X'.
    player = 'X';
}

// La función 'onCellClick' se ejecuta cuando el usuario hace clic en una celda del tablero.
function onCellClick(event) {


    const cell = event.target;
    if (!cell.textContent) {
        cell.classList.add(player.toLowerCase());
        cell.textContent = player;
        checkForWinner();
        player = player === 'X' ? 'O' : 'X';
    }
}

cells.forEach(cell => {
    cell.addEventListener('click', onCellClick);
});

