import React, { useState } from 'react';
import './App.css';

function App() {
  const diasDaSemana = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'];

  const [estudos, setEstudos] = useState({
    'Segunda-feira': { manha: '', tarde: '', noite: '' },
    'Terça-feira': { manha: '', tarde: '', noite: '' },
    'Quarta-feira': { manha: '', tarde: '', noite: '' },
    'Quinta-feira': { manha: '', tarde: '', noite: '' },
    'Sexta-feira': { manha: '', tarde: '', noite: '' },
    'Sábado': { manha: '', tarde: '', noite: '' },
    'Domingo': { manha: '', tarde: '', noite: '' },
  });

  const [atividade, setAtividade] = useState('');
  const [diaSelecionado, setDiaSelecionado] = useState('Segunda-feira');
  const [periodoSelecionado, setPeriodoSelecionado] = useState('manha');

  const adicionarAtividade = () => {
    if (!atividade) return;

    setEstudos((prevEstudos) => ({
      ...prevEstudos,
      [diaSelecionado]: {
        ...prevEstudos[diaSelecionado],
        [periodoSelecionado]: atividade,
      },
    }));

    setAtividade('');
  };

  const limparAtividade = (dia, periodo) => {
    if (window.confirm('Você tem certeza que deseja limpar?')) {
      setEstudos((prevEstudos) => ({
        ...prevEstudos,
        [dia]: {
          ...prevEstudos[dia],
          [periodo]: '',
        },
      }));
    }
  };

  return (
    <div className="app-container">
      <h1>Gerenciador de Estudos 2024</h1>

      <div className="input-container">
        <label>Dia:</label>
        <select value={diaSelecionado} onChange={(e) => setDiaSelecionado(e.target.value)}>
          {diasDaSemana.map(dia => (
            <option key={dia} value={dia}>{dia}</option>
          ))}
        </select>

        <label>Período:</label>
        <select value={periodoSelecionado} onChange={(e) => setPeriodoSelecionado(e.target.value)}>
          <option value="manha">Manhã</option>
          <option value="tarde">Tarde</option>
          <option value="noite">Noite</option>
        </select>

        <label>O que estudar:</label>
        <input
          type="text"
          value={atividade}
          onChange={(e) => setAtividade(e.target.value)}
          placeholder="Ex: Matemática"
        />
        <button onClick={adicionarAtividade}>Adicionar Estudo</button>
      </div>

      <hr />

      <div className='respostas'>
        {diasDaSemana.map(dia => (
          <div key={dia} className="dia-container">
            <h2>{dia}</h2>
            <fieldset>
              <div className="periodo-container">
                <p>Manhã:<br />{estudos[dia].manha}</p>
                {estudos[dia].manha && (
                  <button onClick={() => limparAtividade(dia, 'manha')} className="limpar">Limpar</button>
                )}
              </div>
              <div className="periodo-container">
                <p>Tarde:<br />{estudos[dia].tarde}</p>
                {estudos[dia].tarde && (
                  <button onClick={() => limparAtividade(dia, 'tarde')} className="limpar">Limpar</button>
                )}
              </div>
              <div className="periodo-container">
                <p>Noite:<br />{estudos[dia].noite}</p>
                {estudos[dia].noite && (
                  <button onClick={() => limparAtividade(dia, 'noite')} className="limpar">Limpar</button>
                )}
              </div>
            </fieldset>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
