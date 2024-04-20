import util from "../util";

// Objeto Agente
export class Cell{
    x: number;
    y: number;
    status: number // Vivo = 1, Muerto = 0
    statusNext: number // Vivo = 1, Muerto = 0
    neighbors: Cell[] = [];

    constructor(x: number, y: number, status: number, statusNext: number, neighbors: any) {
        this.x = x;
        this.y = y;
        this.status = status;
        this.statusNext = statusNext;
        this.neighbors = neighbors;
    }

    addNeighbors(neighbors: Cell[]=[]) {
        this.neighbors.push(...neighbors);
    }

    draw(context: CanvasRenderingContext2D | null,tileX: number, tileY: number) {
        let color;
        if (this.status == 1) {
            color = util.props.white;
        } else {
            color = util.props.black;
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