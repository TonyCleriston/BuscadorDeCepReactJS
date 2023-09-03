import './App.css';
import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import api from './services/api';
function App() {
  const [input, setinput] = useState('');
  const [cep, setcep] = useState({});
  async function handleSearch() {
    if (input === "") {
      alert("Digite seu CEP!!");
      return;
    }
    try {
      const response = await api.get(`${input}/json`);
      setcep(response.data);
      setinput('');
    } catch (err) {
      alert("CEP não encontrado!");
      setinput('');
    }
  }
    return (
      <div className="container">
        <h1 className="title">API de Buscar CEP</h1>

        <div className="containerInput">
          <input type="text" placeholder="Digite seu CEP..." value={input} onChange={(e) => setinput(e.target.value)}></input>

          <button className="buttonSearch"><FiSearch size={25} color='#FFF' onClick={handleSearch} /></button>
        </div>
        {Object.keys(cep).length > 0 && (
          <main className='main'>
            <h2>CEP: {cep.cep}</h2>
            <span>{cep.logradouro}</span>
            <span>Complemento: {cep.complemento}</span>
            <span>Bairro: {cep.bairro}</span>
            <span>{cep.localidade} - {cep.uf}</span>
          </main>
        )}

      </div>

    );
  }

  export default App;
