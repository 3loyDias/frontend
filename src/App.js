import React from 'react';
import './App.css';
import PrevisaoTempo from './components/PrevisaoTempo';

function App() {
  // Aqui vai ser tipo o VMC
  return (
    <div className="App">
      <header className="App-header">
        <h1>Previsão do Tempo - IPMA</h1>
      </header>
      
      <main>
        <PrevisaoTempo />
      </main>
      
      <footer>
        <p>Feito com ajuda do IPMA: <a href="https://api.ipma.pt/open-data/" target="_blank" rel="noopener noreferrer">Instituto Português da Meteorologia</a></p>
        <p className="copyright">© {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

// Tenho que exportar para o programa saber qual é o componente principal
export default App;
