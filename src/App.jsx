import { useState, useEffect } from 'react'
import ListaCidades from './componentes/ListaCidades'
import Candidatos from "./componentes/Candidatos"
import './App.css'
import axios from 'axios';

function App() {

  const [cidades, setCidades] = useState([]);
  const [cidade, setCidade] = useState();

  useEffect(() =>{
      async function teste(){
          await axios.get("http://localhost:3001/cities")
          .then(function(response){
              setCidades(response.data);
          })
      }
      teste();
  }, [cidade])

    const Opcoes =  cidades.map((c) => {
        return(
            <>
            <option value={c.id}>{c.name}</option>
            </>
        )
    })

    const handleChange = selectedOption => {
      setCidade(selectedOption.target.value);
    };

  return (
    <div className="App">
      <div className='w-full h-16  bg-slate-500'>

      </div>
      <div>
      <>
        <div className="w-full h-auto items-center content-center justify-center flex flex-col">
            <span>Escolha uma Cidade</span>
            <select  onChange={handleChange} value={cidade}>
                {
                    Opcoes
                }
            </select>
            <span className="bold">Eleiçoes de Argard</span>
            <table>
                <tbody>
                    <tr>
                        <td>Total de Eleitores:  </td>
                        <td>Abstenção: </td>
                        <td>Comparecimento: </td>
                    </tr>
                    <tr>Candidatos</tr>
                </tbody>
            </table>
        </div>
        </>
      </div>
      <div className='w-full h-auto flex flex-wrap'>
        <Candidatos 
          idCidade ={cidade}
        />
      </div>
    </div>
  )
}

export default App
