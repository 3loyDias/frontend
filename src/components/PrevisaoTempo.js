import React, { useState, useEffect } from 'react';
import axios from 'axios'; // para fazer as requisições ao backend
import './PrevisaoTempo.css';

// essa constante guarda os emojis dos tipos de tempo
const iconesDoTempo = {
  1: '☀️', 
  2: '🌤️', 
  3: '⛅', 
  4: '☁️', 
  5: '🌧️', 
  6: '🌧️', 
  7: '🌩️', 
  8: '🌨️', 
  9: '🌫️', 
  10: '🌦️', 
  11: '🌦️', 
  12: '🌧️', 
  13: '🌧️', 
  14: '🌨️', 
  15: '🌨️', 
  16: '🌫️', 
  17: '🌦️', 
  18: '⛈️', 
  19: '⛈️', 
  'default': '🌡️',
};

// essa função devolve o emoji do tipo de tempo
function getIconeTempo(idTipoTempo) {
  if (iconesDoTempo[idTipoTempo]) {
    return iconesDoTempo[idTipoTempo];
  } else {
    return iconesDoTempo['default'];
  }
}

function PrevisaoTempo() {
  
  const [previsao, setPrevisao] = useState(null); // guarda o tempo
  const [carregando, setCarregando] = useState(true); // se está a carregar
  const [erro, setErro] = useState(null); // se der erro guarda aqui

  useEffect(() => {
    // esta função vai buscar o tempo no backend
    async function buscarTempo() {
      try {
      
        setCarregando(true);
        
        // ir para o backend para ver o tempo 
        const resposta = await axios.get('http://localhost:5000/api/previsao-faro');
        
        // guardo os dados
        setPrevisao(resposta.data);
        setErro(null); 
      } catch (error) {
       
        console.error('Error fetching weather data:', error);
        setErro('Could not fetch weather data, sorry!');
      } finally {
        setCarregando(false);
      }
    }

    // chamar a função 
    buscarTempo();
  }, []);

  // se ainda está a carregar mostro isto
  if (carregando) {
    return (
      <div className="previsao-container">
        <p style={{textAlign: 'center', marginTop: '50px'}}>Loading...</p>
        {/* loader */}
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  // quando der erro mostra esse erro
  if (erro) {
    return (
      <div className="previsao-container">
        <div className="erro">
          <p> {erro} </p>
          <button onClick={() => window.location.reload()}>
            Fail, try again!
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="previsao-container">
      <h2>Tempo em {previsao.cidade} </h2>
      <div className="previsoes-cards">
        {previsao.previsoes.map((dia, index) => (
          <div key={index} className="previsao-card">
            <div className="previsao-card-header">
              {/* index 0 é hoje, index 1 é amanhã, é tipo uma lista que começa em 0 */}
              <h3>{index === 0 ? 'Hoje' : 'Amanhã'} </h3>
              <span className="data-previsao">{dia.data}</span>
            </div>
            
           
            <div className="icone-tempo">
              {getIconeTempo(dia.idTipoTempo)}
            </div>
            
            <div className="previsao-detalhes">
              {/* aqui esta mostrar as temperaturas */}
              <div className="temperatura">
                <span className="temp-label">Temperatura</span>
                <div>
                  <span className="temp-min">{dia.tempMinima}°</span>
                  <span className="temp-separator"> / </span>
                  <span className="temp-valor">{dia.tempMaxima}°</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// exportar a função para usar noutros ficheiros
export default PrevisaoTempo; 