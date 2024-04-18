import './style.css'
import { start } from './game';

window.onload = () => {
  document.querySelector<HTMLDivElement>('#app')!.innerHTML = 
  `
    <div class="container">
      <h1>Game of Life</h1>
      <section class="section-buttons">
        <button onclick="startGame()">Start</button>
        <button onclick="stop()">Stop</button>
        <button onclick="restart()">Restart</button>
      </section>
      <canvas id="screen"></canvas>
    </div>
  `;

  start();
};