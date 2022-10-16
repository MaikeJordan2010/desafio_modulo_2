import { useState, useEffect } from "react";
import axios from "axios";

function ListaCidades(id = "idSelect"){
    const [cidades, setCidades] = useState([]);

    useEffect(() =>{
        async function teste(){
            await axios.get("http://localhost:3001/cities")
            .then(function(response){
                setCidades(response.data);
            })
        }

        teste();
    }, [])

    const Opcoes =  cidades.map((c) => {
        return(
            <>
            <option value={c.id}>{c.name}</option>
            </>
        )
    })
    

    return(
        <>
        <div className="w-full h-auto items-center content-center justify-center flex flex-col">
            <span>Escolha uma Cidade</span>
            <select id={id} onChange={() => {}}>
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
    )
}

export default ListaCidades;