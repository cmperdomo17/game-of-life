import './style.css'
import { start,  stop, restart, save, clean, load, initialize, step, speed} from './game';
import { toggleActiveButton } from './util';

let isRunning = false;
let firstRun = true;

const startIcon = '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-player-play"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 4v16l13 -8z" /></svg>';
const stepIcon = '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-chevrons-right"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 7l5 5l-5 5" /><path d="M13 7l5 5l-5 5" /></svg>'
const stopIcon = '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-player-pause"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 5m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" /><path d="M14 5m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" /></svg>';
const restartIcon = '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-refresh"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" /><path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" /></svg>';
const saveIcon = '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-download"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /><path d="M7 11l5 5l5 -5" /><path d="M12 4l0 12" /></svg>';
const loadIcon = '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-upload"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /><path d="M7 9l5 -5l5 5" /><path d="M12 4l0 12" /></svg>';
const cleanIcon = '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>';
const dotFiveXIcon = '<svg  xmlns="http://www.w3.org/2000/svg"  width="30"  height="30"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-multiplier-0-5x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 16h2a2 2 0 1 0 0 -4h-2v-4h4" /><path d="M5 16v.01" /><path d="M15 16l4 -4" /><path d="M19 16l-4 -4" /></svg>';
const oneXIcon = '<svg  xmlns="http://www.w3.org/2000/svg"  width="30"  height="30"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-multiplier-1x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 16v-8l-2 2" /><path d="M13 16l4 -4" /><path d="M17 16l-4 -4" /></svg>'
const twoXIcon = '<svg  xmlns="http://www.w3.org/2000/svg"  width="30"  height="30"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-multiplier-2x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 16l4 -4" /><path d="M18 16l-4 -4" /><path d="M6 10a2 2 0 1 1 4 0c0 .591 -.417 1.318 -.816 1.858l-3.184 4.143l4 0" /></svg>';

window.onload = () => {
  document.querySelector<HTMLDivElement>('#app')!.innerHTML = 
  `
    <div class="container">
      <h1 class="title">
          Game of Life
      </h1>
      <section class="section-buttons">
        <button id="StartStop">${startIcon}</button>
        <button id="Step">${stepIcon}</button>
        <button id="Restart">${restartIcon}</button>
        <button id="Save">${saveIcon}</button>
        <button id="Load">${loadIcon}</button>
        <button id="Clean">${cleanIcon}</button>
      </section>
      <canvas id="screen"></canvas>
      <section class="speed-buttons-section">
        <button id="vel05x">${dotFiveXIcon}</button>
        <button id="vel1x">${oneXIcon}</button>
        <button id="vel2x">${twoXIcon}</button>
      </section>
    </div>
  `;

  document.getElementById('StartStop')?.addEventListener('click', play);
  document.getElementById('Step')?.addEventListener('click', Step);
  document.getElementById('Restart')?.addEventListener('click', Restart);
  document.getElementById('Save')?.addEventListener('click', Save);
  document.getElementById('Load')?.addEventListener('click', Load);
  document.getElementById('Clean')?.addEventListener('click', Clean);
  document.getElementById('vel05x')?.addEventListener('click', speed05x);
  document.getElementById('vel1x')?.addEventListener('click', speed1x);
  document.getElementById('vel2x')?.addEventListener('click', speed2x);
};

function speed05x(): void {
  speed(20000, isRunning);
  toggleActiveButton('vel05x', true);
  toggleActiveButton('vel1x', false);
  toggleActiveButton('vel2x', false);
}

function speed1x(): void {
  speed(5000, isRunning);
  toggleActiveButton('vel05x', false);
  toggleActiveButton('vel1x', true);
  toggleActiveButton('vel2x', false);
}

function speed2x(): void {
  speed(1000, isRunning);
  toggleActiveButton('vel05x', false);
  toggleActiveButton('vel1x', false);
  toggleActiveButton('vel2x', true);
}

function toggleButton(): void {
  const button = document.querySelector<HTMLButtonElement>('#StartStop');
  if (button) {
    isRunning = !isRunning;
    button.innerHTML = isRunning ? stopIcon : startIcon;
  }
}

function play(): void{
  if(!isRunning){
    if(firstRun){
      firstRun=false;
      initialize();
    }
    start();
  }else{
    stop();
    console.log("Detener!!!")
  }
  toggleButton();
  
}

function Step(): void {
  if(!isRunning){
    if(firstRun){
      firstRun=false;
      initialize();
    }
    step()
  }else{
    step();
  }
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