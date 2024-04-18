let canvas: HTMLCanvasElement | null;
let context: CanvasRenderingContext2D | null;
let fps = 30;

let canvasX = 400;
let canvasY = 400;

let board: Agent[][] = []; // Tablero de Agentes (Células) Matriz 2D
let rows = 50;
let columns = 50;

let white = '#FFFFFF';
let black = '#000000';

let tileX: number = 0;
let tileY: number = 0;

function createArray2D(r:number, c:number) {
    let obj = new Array(c);
    for (let i=0; i<c; i++) {
        obj[i] = new Array(r);
    }
    return obj;
};

// Objeto Agente
class Agent {
    x: number;
    y: number;
    status: number // Vivo = 1, Muerto = 0
    statusNext: number // Vivo = 1, Muerto = 0
    neighbors: Agent[] = [];

    constructor(x: number, y: number, status: number, statusNext: number, neighbors: any) {
        this.x = x;
        this.y = y;
        this.status = status;
        this.statusNext = statusNext;
        this.neighbors = neighbors;
    }

    addNeighbors() {
        let xNeighbor;
        let yNeighbor;

        for (let i=-1; i<2; i++) {
            for (let j=-1; j<2; j++) {
                xNeighbor = (this.x + j + columns) % columns;
                yNeighbor = (this.y + i + rows) % rows;
                
                if(i!=0 || j!=0){
                    this.neighbors.push(board[yNeighbor][xNeighbor]);
                }
            }
        }
    }

    draw() {
        let color;
        if (this.status == 1) {
            color = white;
        } else {
            color = black;
        }
        // Validar que el contexto exista y no sea nulo
        if (context) {
            context.fillStyle = color;
            context.fillRect(this.x*tileX, this.y*tileY, tileX, tileY);
            context.strokeStyle = 'gray';
            // Tamaño de la cuadricula
            context.lineWidth = 0.3;
            context.strokeRect(this.x*tileX, this.y*tileY, tileX, tileY);
        }
    }

    // Leyes de Conway
    newCycle() {
        let sum = 0;
        // Contar los vecinos vivos
        for (let i=0; i<this.neighbors.length; i++) {
            sum += this.neighbors[i].status;
        }
        // Aplicar las reglas
        this.statusNext = this.status; // Por defecto se mantiene igual
        // Muerte: Menos de 2 o más de 3 vecinos
        if (sum < 2 || sum > 3) {
            this.statusNext = 0; // Muere
        }
        // Vida: Exactamente 3 vecinos
        if (sum == 3){
            this.statusNext = 1; // Nace
        }
    }
    mutation() {
        this.status = this.statusNext;
    }
}

function initializeBoard(obj: any) {
    let status: number;
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < columns; x++) {
            status = Math.floor(Math.random() * 2);
            obj[y][x] = new Agent(x, y, status, status, []);
        }
    }

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < columns; x++) {
            obj[y][x].addNeighbors();
        }
    }
}

export function start() {
    canvas = document.getElementById('screen') as HTMLCanvasElement;
    context = canvas.getContext('2d');

    // Ajustar el tamaño del canvas
    canvas.width = canvasX;
    canvas.height = canvasY;

    // Calcular los tiles
    tileX = Math.floor(canvasX/rows);
    tileY = Math.floor(canvasY/columns);

    // Crear el tablero
    board = createArray2D(rows, columns);

    // Inicializar el tablero
    initializeBoard(board);

    // Ejecutar el bucle principal
    setInterval(function(){main();}, 1000/fps)
}

function deleteCanvas() {
    // Validar que el canvas exista y no sea nulo
    if (canvas) {
        canvas.width = canvas.width;
        canvas.height = canvas.height;
    }
}

function drawBoard(obj: any) {
    // Dibuja los agentes
    for (let y=0; y<rows; y++) {
        for (let x=0; x<columns; x++) {
            obj[y][x].draw();
        }
    }

    // Calcula el siguiente ciclo
    for (let y=0; y<rows; y++) {
        for (let x=0; x<columns; x++) {
            obj[y][x].newCycle();
        }
    }

    // Aplica la mutación
    for (let y=0; y<rows; y++) {
        for (let x=0; x<columns; x++) {
            obj[y][x].mutation();
        }
    }
}

function main() {
    deleteCanvas();
    drawBoard(board);
}