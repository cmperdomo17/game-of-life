import { Board } from "./class/board";
import { CareTaker } from "./class/careTaker";
import util from "./util";

let firstRun: boolean=true;

let canvas: HTMLCanvasElement | null;
let context: CanvasRenderingContext2D | null;
let fps = 30;

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

export function initialize(){
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
}

export function start() {

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
    let interval: number = 5000;
    let isRunning: boolean = false;
    speed(interval, isRunning);
    // Esto se puede quitar xd
    let velocity = interval/fps;
    console.log("velocidad inicial"+ velocity);
    // Solo era para ver como varia la velocidad
    intervalID = setInterval(function(){main(board,tileX,tileY);}, velocity);
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
    board.onlydrawBoard(tileX,tileY);
}

export function step(){
    // Inicializar el tablero
    if(firstRun){
        board.initializeBoard();
        firstRun=false;
    }
    // Guardar el estado actual del tablero
    save();

    // Dibujar el tablero
    board.drawBoard(tileX,tileY);
}

export function restart(){
    firstRun=true;
    start();
}

//Si se usa esto?
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
    careTaker.undo();
    board.drawBoard(tileX,tileY);
}

export function speed(interval: number, isRunning: boolean) {
    if (isRunning) {
        clearInterval(intervalID);
        intervalID = setInterval(function(){main(board,tileX,tileY);}, interval/fps);
        console.log("fps " + fps);
        console.log("interval " + interval);
        let velocity = interval/fps;
        console.log("velocidad actual"+ velocity);    
    } else {
        clearInterval(intervalID);
    }
}

function main(board: Board, tileX: number, tileY:number) {
    deleteCanvas();
    board.drawBoard(tileX,tileY);
}