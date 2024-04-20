import { Cell } from "../class/cell";

export interface Memento{
    getState(): Cell[][];

    getStateNumber(): number;
}