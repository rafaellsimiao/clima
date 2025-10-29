import { useState } from 'react'
import './App.css'
import { CloudSunRain, MapPinned, Thermometer, Droplet, Wind } from 'lucide-react';

function App() {
  const [cidade, setCidade] = useState("");
  const [Clima, setClima] = useState(null);
  const [Carregando, setCarregando] = useState(false);
  const [Erro, setErro] = useState("");

  const buscarClima = async () =>{
    if(!cidade.trim()){
      setErro("Por favor, digite uma cidade");
      return;
    }

    setCarregando(true);
    setErro("")

    try{
      const API_KEY = "50878f4678cd0841144b44b2fca0ccc0";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${API_KEY}&units=metric&lang=pt_br`;
      console.log("URL da requisição", url);
      const resposta = await fetch(url);

      if(!resposta.ok){
        throw new Error("Cidade não encontrada")
      
      }
      const dados = await resposta.json();
      setClima(dados);
    } catch (error) {
      setErro(error.message);
      setClima(null);
    } finally {
      setCarregando(false);
    }    
  };

  const handleKeyPress = (e) =>{
    if (e.key === "Enter"){
      buscarClima();
    }
  };

  return (
    <>
      <div className="app-container">
        <div className="content-wrapper">
          <header>
            <h1>
              <CloudSunRain color="white" size={48} />
              Consulta de Clima
            </h1>
            <p>Exemplo de consumo de API com React</p>
          </header>

          <div className="busca-box">
            <div className="busca-container">
              <input type="text" />
              <button>Buscar</button>
            </div>
          </div>

          {/* Resultado do Clima */}
          <div className="card-resultado">
            <div className="info-cidade">
              <div className="nome-cidade">
                <MapPinned color="red" size={48} />
                Campinas, BR
              </div>
              <p className="desc-cidade">Nublado</p>
            </div>

            {/* Temperatura Principal */}
            <div className="temperatura-box">
              <div className="temperatura-valor">
                28ºC
              </div>
              <div className="sens-termica">
              Sensação Termica: 31ºC
              </div>
            </div>

            {/* Informações Adicionais */}
            <div className="detalhes-box">
              <div className="detal-item">
                <div className="detal-icone">
                  <Thermometer />
                </div>
                <p className="detal-desc">
                  Min/Max
                </p>
                <p className="detal-valor">
                  25ºC/28ºC
                </p>
              </div>

              <div className="detal-item">
                <div className="detal-icone">
                  <Droplet />
                </div>
                <p className="detal-desc">
                  Umidade
                </p>
                <p className="detal-valor">
                  20%
                </p>
              </div>

              <div className="detal-item">
                <div className="detal-icone">
                  <Wind />
                </div>
                <p className="detal-desc">
                  Vento
                </p>
                <p className="detal-valor">
                  12 km/h
                </p>
              </div>
            </div>

          </div>{/* Fecha Resultado */}

        </div>
      </div>
    </>
  )
}

export default App
