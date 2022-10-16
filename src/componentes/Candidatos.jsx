import axios from "axios";
import { useEffect, useState } from "react";
import Card from "./Card";  
   

function Candidatos(props){
    const [candidatos, setCandidatos] = useState([]);

    useEffect(() =>{
        async function listarDados(){
            await axios.get("http://localhost:3001/candidates")
            .then(function(response){
                setCandidatos(response.data)
            })  
        }

        listarDados();
    }, []);

    const Cards = candidatos.map(c => {
       return(
           <>
                <Card 
                    idCidade = {props.idCidade}
                    idCandidato={c.id}
                    nome={c.name}
                    eleito={true}
                />
           </>
       )
    })

    return (
        <>
        {
            Cards
        }
        </>
    )
}

export default Candidatos;