import { Memento } from "../interfaces/memento";
import util from "../util";
import { BoardMemento } from "./boardMemento";
import { Cell } from "./cell";
import _ from 'lodash';

export class Board{

    private static instance: Board;

    public board: Cell[][]=[[]];
    context: CanvasRenderingContext2D | null;

    private constructor(board: Cell[][]=[[]], context: CanvasRenderingContext2D | null){
        this.board=board;
        this.context=context;
    }

    public static getInstance(board: Cell[][]=[[]], context: CanvasRenderingContext2D | null){
        if(!Board.instance) {
            Board.instance = new Board(board, context);
        }

        return Board.instance;
    }

    initializeBoard() {
        let status: number;
        for (let y = 0; y < util.props.rows; y++) {
            for (let x = 0; x < util.props.columns; x++) {
                status = Math.floor(Math.random() * 2);
                this.board[y][x] = new Cell(x, y, status, status, []);
            }
        }
    
        for (let y = 0; y < util.props.rows; y++) {
            for (let x = 0; x < util.props.columns; x++) {

                let cellNeighbors: Cell[]=[];

                for (let i=-1; i<2; i++) {
                    let xNeighbor;
                    let yNeighbor;
                    
                    for (let j=-1; j<2; j++) {
                        xNeighbor = (x + j + util.props.columns) % util.props.columns;
                        yNeighbor = (y + i + util.props.rows) % util.props.rows;
                        
                        if(i!=0 || j!=0){
                            cellNeighbors.push(this.board[yNeighbor][xNeighbor]);
                        }
                    }
                }

                this.board[y][x].addNeighbors(cellNeighbors);
            }
        }

        return this.board;
    }

    drawBoard(tileX: number, tileY: number) {
        // Dibuja los agentes
        for (let y=0; y<util.props.rows; y++) {
            for (let x=0; x<util.props.columns; x++) {
                this.board[y][x].draw(this.context,tileX,tileY);
            }
        }
    
        // Calcula el siguiente ciclo
        for (let y=0; y<util.props.rows; y++) {
            for (let x=0; x<util.props.columns; x++) {
                this.board[y][x].newCycle();
            }
        }
    
        // Aplica la mutación
        for (let y=0; y<util.props.rows; y++) {
            for (let x=0; x<util.props.columns; x++) {
                this.board[y][x].mutation();
            }
        }
    }

    onlydrawBoard(tileX: number, tileY: number) {
        // Dibuja los agentes
        for (let y=0; y<util.props.rows; y++) {
            for (let x=0; x<util.props.columns; x++) {
                this.board[y][x].draw(this.context,tileX,tileY);
            }
        }
    }

    cleanBoard(){
        for (let y=0; y<util.props.rows; y++) {
            for (let x=0; x<util.props.columns; x++) {
                this.board[y][x].status=0;
            }
        }
    }

    save(stateNumber: number): Memento{
        let copyBoard: Cell[][]=[];
        for (let y=0; y<util.props.rows; y++) {
            copyBoard[y] = [];
            for (let x=0; x<util.props.columns; x++) {
                copyBoard[y][x]=_.clone(this.board[y][x]);
            }
        }

        return new BoardMemento(copyBoard,stateNumber);
    }

    restore(boardMemento: Memento){
        for (let y=0; y<util.props.rows; y++) {
            for (let x=0; x<util.props.columns; x++) {
                this.board[y][x].status=_.clone(boardMemento.getState()[y][x].status);
            }
        }
        console.log("Copia restaurada");
        console.log(this.board);
    }
}