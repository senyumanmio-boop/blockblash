const gridElement = document.getElementById('grid');
const scoreElement = document.getElementById('score');
const piecesContainer = document.getElementById('pieces');

let grid = Array(8).fill().map(() => Array(8).fill(0));
let score = 0;

// Inisialisasi Grid
function createGrid() {
    gridElement.innerHTML = '';
    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            if (grid[r][c] === 1) cell.classList.add('filled');
            cell.dataset.row = r;
            cell.dataset.col = c;
            gridElement.appendChild(cell);
        }
    }
}

// Cek dan hapus baris/kolom yang penuh
function checkLines() {
    let rowsToClear = [];
    let colsToClear = [];

    // Cek Baris
    for (let r = 0; r < 8; r++) {
        if (grid[r].every(cell => cell === 1)) rowsToClear.push(r);
    }

    // Cek Kolom
    for (let c = 0; c < 8; c++) {
        let colFull = true;
        for (let r = 0; r < 8; r++) {
            if (grid[r][c] === 0) colFull = false;
        }
        if (colFull) colsToClear.push(c);
    }

    // Hapus dan update skor
    rowsToClear.forEach(r => grid[r].fill(0));
    colsToClear.forEach(c => {
        for (let r = 0; r < 8; r++) grid[r][c] = 0;
    });

    if (rowsToClear.length > 0 || colsToClear.length > 0) {
        score += (rowsToClear.length + colsToClear.length) * 10;
        scoreElement.innerText = score;
        createGrid();
    }
}

// Sederhananya, kita gunakan klik untuk simulasi taruh balok (Drag & Drop butuh library/logic lebih panjang)
// Disini kita buat fungsi taruh balok otomatis untuk contoh
gridElement.addEventListener('click', (e) => {
    const r = parseInt(e.target.dataset.row);
    const c = parseInt(e.target.dataset.col);

    if (!isNaN(r) && !isNaN(c) && grid[r][c] === 0) {
        grid[r][c] = 1; // Taruh balok tunggal
        createGrid();
        checkLines();
    }
});

createGrid();
const gridContainer = document.querySelector('.grid');
const scoreEl = document.getElementById('score');
const dock = document.getElementById('dock');

let score = 0;
let grid = Array(8).fill().map(() => Array(8).fill(0));

// Definisi Bentuk Balok (Block Blast Style)
const SHAPES = [
    [[1, 1], [1, 1]], // Square
    [[1, 1, 1, 1]],    // Line
    [[1, 0], [1, 0], [1, 1]], // L Shape
    [[1, 1, 1]],       // Small Line
    [[1]]              // Single dot
];

function initGame() {
    renderGrid();
    spawnPieces();
}

function renderGrid() {
    gridContainer.innerHTML = '';
    grid.forEach((row, r) => {
        row.forEach((val, c) => {
            const cell = document.createElement('div');
            cell.className = `cell ${val ? 'filled' : ''}`;
            cell.dataset.r = r;
            cell.dataset.c = c;
            gridContainer.appendChild(cell);
        });
    });
}

function spawnPieces() {
    dock.innerHTML = '';
    for (let i = 0; i < 3; i++) {
        const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
        const piece = document.createElement('div');
        piece.className = 'piece-preview';
        // Logika render bentuk kecil di bawah...
        // (Klik bentuk lalu klik grid untuk menaruhnya)
        piece.onclick = () => selectPiece(shape, piece);
        dock.appendChild(piece);
    }
}

function checkAndClear() {
    let rowsToClear = [];
    let colsToClear = [];

    // Logika AI deteksi baris & kolom penuh
    for (let i = 0; i < 8; i++) {
        if (grid[i].every(v => v === 1)) rowsToClear.push(i);
        if (grid.map(row => row[i]).every(v => v === 1)) colsToClear.push(i);
    }

    rowsToClear.forEach(r => grid[r].fill(0));
    colsToClear.forEach(c => grid.forEach(row => row[c] = 0));

    if (rowsToClear.length > 0 || colsToClear.length > 0) {
        score += (rowsToClear.length + colsToClear.length) * 100;
        scoreEl.innerText = score;
        // Efek guncangan layar (Screen Shake)
        document.body.style.animation = 'shake 0.2s';
        setTimeout(() => document.body.style.animation = '', 200);
    }
    renderGrid();
}

initGame();
