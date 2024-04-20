import { Memento } from "../interfaces/memento";
import { Board } from "./board";

export class CareTaker{
    
    private mementos: Memento[]=[];
    
    private boardOriginator: Board;

    private count: number=1;

    constructor(boardOriginator: Board){
        this.boardOriginator=boardOriginator;
    }

    saveBackup(): void{
        this.mementos.push({...this.boardOriginator.save(this.count)});
        this.count++;
    }

    undo(): void {
        if (!this.mementos.length) {
            return;
        }
        
        const memento = this.mementos.length > 0 ? this.mementos.pop() : null;

        if (memento) {
            // Si el memento no es nulo, entonces restaura el estado
            this.boardOriginator.restore(memento);
        } else {
            alert("El arreglo de mementos está vacío.");
        }
        
    }

    getMementos(){
        for(const memento of this.mementos){
            console.log(memento);
        }
    }
}