import { Board } from "./class/board";
import { CareTaker } from "./class/careTaker";
import util from "./util";

let firstRun: boolean=true;

let canvas: HTMLCanvasElement | null;
let context: CanvasRenderingContext2D | null;
let fps = 15;

let canvasX = 400;
let canvasY = 400;

let board: Board; // Tablero de Celulas

let tileX: number = 0;
let tileY: number = 0;

let intervalID: number=0;

let careTaker: CareTaker;

function createArray2D(r:number, c:number) {
    let obj = new Array(c);
    for (let i=0; i<c; i++) {
        obj[i] = new Array(r);
    }
    return obj;
};

export function start() {
    canvas = document.getElementById('screen') as HTMLCanvasElement;
    context = canvas.getContext('2d');

    // Ajustar el tamaño del canvas
    canvas.width = canvasX;
    canvas.height = canvasY;

    // Calcular los tiles: cuadricula
    tileX = Math.floor(canvasX/util.props.rows);
    tileY = Math.floor(canvasY/util.props.columns);

    // Crear el tablero
    board = Board.getInstance(createArray2D(util.props.rows, util.props.columns),context);
    
    // Crear el cuidador de mementos
    careTaker = new CareTaker(board);

    // Inicializar el tablero
    if(firstRun){
        board.initializeBoard();
        firstRun=false;
    }

    // Guardar el estado actual del tablero
    careTaker.saveBackup();

    // Dibujar el tablero
    board.drawBoard(tileX,tileY);
    
    // Ejecutar el bucle principal
    intervalID=setInterval(function(){main(board,tileX,tileY);}, 5000/fps);
}

function deleteCanvas() {
    // Validar que el canvas exista y no sea nulo
    if (canvas) {
        canvas.width = canvas.width;
        canvas.height = canvas.height;
    }
}

export function stop(){
    clearInterval(intervalID);
}

export function restart(){
    firstRun=true;
    start();
}

export function save(){
    careTaker.saveBackup();
}

export function clean(){
    board.cleanBoard();
    board.drawBoard(tileX,tileY);
}

export function load(){
    //Por ahora solo se carga el ultimo estado guardado
    careTaker.getMementos();
    //careTaker.undo();
    board.drawBoard(tileX,tileY);
}

function main(board: Board, tileX: number, tileY:number) {
    deleteCanvas();
    board.drawBoard(tileX,tileY);
}