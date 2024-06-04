document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const turnIndicator = document.getElementById('turn-indicator');
    const rows = 8;
    const cols = 8;
    const squares = [];
    let currentTurn = 'red'; // Start with red's turn

    // Create the board
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const square = document.createElement('div');
            square.classList.add('square');
            if ((row + col) % 2 === 0) {
                square.classList.add('light');
            } else {
                square.classList.add('dark');
            }
            board.appendChild(square);
            squares.push(square);
        }
    }

    // Initialize pieces
    function initPieces() {
        for (let i = 0; i < 12; i++) {
            const redPiece = document.createElement('div');
            redPiece.classList.add('piece', 'red');
            const blackPiece = document.createElement('div');
            blackPiece.classList.add('piece', 'black');

            const redPosition = i * 2 + Math.floor(i / 4) % 2;
            const blackPosition = 63 - i * 2 - Math.floor(i / 4) % 2;

            squares[redPosition].appendChild(redPiece);
            squares[blackPosition].appendChild(blackPiece);
        }
    }

    initPieces();

    // Add event listeners for player movement and game logic
    let selectedPiece = null;

    function updateTurnIndicator() {
        turnIndicator.textContent = `${currentTurn.charAt(0).toUpperCase() + currentTurn.slice(1)}'s Turn`;
    }

    board.addEventListener('click', (event) => {
        const target = event.target;

        if (target.classList.contains('piece')) {
            // Check if the piece belongs to the current player
            if (target.classList.contains(currentTurn)) {
                // Select a piece
                if (selectedPiece) {
                    selectedPiece.classList.remove('selected');
                }
                selectedPiece = target;
                selectedPiece.classList.add('selected');
            }
        } else if (target.classList.contains('square') && selectedPiece) {
            // Move the selected piece to an empty square
            if (target.children.length === 0) {
                const startX = selectedPiece.parentElement.offsetLeft;
                const startY = selectedPiece.parentElement.offsetTop;
                const endX = target.offsetLeft;
                const endY = target.offsetTop;

                const dx = endX - startX;
                const dy = endY - startY;

                selectedPiece.style.transform = `translate(${dx}px, ${dy}px)`;

                setTimeout(() => {
                    target.appendChild(selectedPiece);
                    selectedPiece.style.transform = 'translate(0, 0)';
                    selectedPiece.classList.remove('selected');
                    selectedPiece = null;

                    // Switch turn
                    currentTurn = currentTurn === 'red' ? 'black' : 'red';
                    updateTurnIndicator();
                }, 300); // Match the duration of the CSS transition
            }
        }
    });

    updateTurnIndicator();
});
