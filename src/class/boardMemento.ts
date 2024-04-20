import { Memento } from "../interfaces/memento";
import { Cell } from "./cell";

export class BoardMemento implements Memento{

    private boardState: Cell[][];
    private stateNumber: number;

    constructor(boardState: Cell[][], stateNumber: number){
        this.boardState=boardState.slice();
        this.stateNumber=stateNumber;
    }

    getState(): Cell[][] {
        return this.boardState;
    }

    getStateNumber(): number {
        return this.stateNumber;
    }
    
}