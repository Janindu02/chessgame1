document.addEventListener('DOMContentLoaded', () => {
    const chessBoard = document.getElementById('chess-board');
    const squares = [];
    const pieceSymbols = {
        'r': '♜', 'n': '♞', 'b': '♝', 'q': '♛', 'k': '♚', 'p': '♟',
        'R': '♖', 'N': '♘', 'B': '♗', 'Q': '♕', 'K': '♔', 'P': '♙'
    };

    const initialBoard = [
        'rnbqkbnr',
        'pppppppp',
        '........',
        '........',
        '........',
        '........',
        'PPPPPPPP',
        'RNBQKBNR'
    ];

    let selectedSquare = null;
    let currentPlayer = 'white';
    let gameMode = 'two-player';  // default game mode

    function createBoard() {
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const square = document.createElement('div');
                square.classList.add('square');
                square.classList.add((row + col) % 2 === 0 ? 'white' : 'black');
                square.dataset.row = row;
                square.dataset.col = col;
                square.addEventListener('click', () => selectSquare(square));
                chessBoard.appendChild(square);
                squares.push(square);
            }
        }
    }

    function initializePieces() {
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = initialBoard[row][col];
                if (piece !== '.') {
                    const square = squares[row * 8 + col];
                    square.textContent = pieceSymbols[piece];
                    square.dataset.piece = piece;
                }
            }
        }
    }

    function selectSquare(square) {
        if (selectedSquare) {
            if (movePiece(selectedSquare, square)) {
                selectedSquare.classList.remove('highlight');
                selectedSquare = null;
                if (gameMode === 'one-player' && currentPlayer === 'black') {
                    setTimeout(makeRandomMove, 500);  // AI makes a move after a delay
                }
            }
        } else if (square.dataset.piece && isCurrentPlayerPiece(square.dataset.piece)) {
            selectedSquare = square;
            selectedSquare.classList.add('highlight');
        }
    }

    function movePiece(fromSquare, toSquare) {
        if (fromSquare !== toSquare && isValidMove(fromSquare, toSquare)) {
            toSquare.textContent = fromSquare.textContent;
            toSquare.dataset.piece = fromSquare.dataset.piece;
            fromSquare.textContent = '';
            delete fromSquare.dataset.piece;
            currentPlayer = currentPlayer === 'white' ? 'black' : 'white';
            return true;
        }
        return false;
    }

    function isValidMove(fromSquare, toSquare) {
        // Implement move validation logic according to chess rules here
        // For simplicity, this implementation allows any move
        return !toSquare.dataset.piece || !isSamePlayerPiece(fromSquare.dataset.piece, toSquare.dataset.piece);
    }

    function isCurrentPlayerPiece(piece) {
        return (currentPlayer === 'white' && piece === piece.toUpperCase()) ||
               (currentPlayer === 'black' && piece === piece.toLowerCase());
    }

    function isSamePlayerPiece(piece1, piece2) {
        return (piece1 === piece1.toUpperCase() && piece2 === piece2.toUpperCase()) ||
               (piece1 === piece1.toLowerCase() && piece2 === piece2.toLowerCase());
    }

    function makeRandomMove() {
        const allPieces = squares.filter(square => square.dataset.piece && isCurrentPlayerPiece(square.dataset.piece));
        const randomPiece = allPieces[Math.floor(Math.random() * allPieces.length)];
        const emptySquares = squares.filter(square => !square.dataset.piece);
        const randomMove = emptySquares[Math.floor(Math.random() * emptySquares.length)];
        movePiece(randomPiece, randomMove);
    }

    document.getElementById('two-player').addEventListener('click', () => {
        gameMode = 'two-player';
    });

    document.getElementById('one-player').addEventListener('click', () => {
        gameMode = 'one-player';
    });

    createBoard();
    initializePieces();
});
