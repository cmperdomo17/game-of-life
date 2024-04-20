import './style.css'
import { start,  stop, restart, save, clean, load} from './game';

let isRunning = false;

window.onload = () => {
  document.querySelector<HTMLDivElement>('#app')!.innerHTML = 
  `
    <div class="container">
      <h1>Game of Life</h1>
      <section class="section-buttons">
        <button id="StartStop">Start</button>
        <button id="Restart">Restart</button>
        <button id="Save">Save</button>
        <button id="Load">Load</button>
        <button id="Clean">Clean</button>
      </section>
      <canvas id="screen"></canvas>
    </div>
  `;

  document.getElementById('StartStop')?.addEventListener('click', play);
  document.getElementById('Restart')?.addEventListener('click', Restart);
  document.getElementById('Save')?.addEventListener('click', Save);
  document.getElementById('Load')?.addEventListener('click', Load);
  document.getElementById('Clean')?.addEventListener('click', Clean);
  
};

function toggleButton(): void {
  const button = document.querySelector<HTMLButtonElement>('#StartStop');
  if (button) {
    isRunning = !isRunning;
    button.textContent = isRunning ? 'Stop' : 'Start';
  }
}

function play(): void{
  if(!isRunning){
    start();
  }else{
    stop();
    console.log("Detener!!!")
  }
  toggleButton();
  
}

function Restart(): void{
  //Primero se debe parar el juego
  stop();
  restart();
  isRunning=false;
  toggleButton();
}

function Save(): void{
  save();
}

function Load(): void{
  load();
}

function Clean(): void{
  clean();
}
