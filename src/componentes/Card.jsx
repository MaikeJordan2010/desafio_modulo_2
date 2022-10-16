import axios from "axios";
import { useEffect, useState } from "react";

function Card(props){   

    //console.log(props)
    const [eleicao, setEleicao] = useState();
    const [total, setTotal] = useState(0);
    const [eleito, setEleito] = useState(false);

    useEffect( () =>{
        async function teste(){
            await axios.get("http://localhost:3001/election")
                .then(function(response){
                    var dados = response.data;
                    dados = dados.filter( f => f.candidateId == props.idCandidato && f.cityId == props.idCidade)
                    setEleicao(dados[0])

                    let t = 0;

                    response.data.filter(f => f.cityId == props.idCidade).forEach(element =>{
                        t = t + element.votes;
                    } )
                    setTotal(t)

                    var ordemVotacao = response.data.filter(f => f.cityId == props.idCidade).sort(
                        function(a, b){
                            if(a.votes > b.votes) return -1;
                            if(a.votes < b.votes) return 1;
                            return 0;
                        }
                    )

                    if(ordemVotacao[0].candidateId == props.idCandidato){
                        setEleito(true);
                    }

                })
            }
        teste()
    }, [props])

    if(eleicao != undefined && eleicao.votes > 0){
    return(
        <>  
            <div className="w-56  h-auto bg-white shadow-md shadow-slate-500 p-2 m-2 " >
                <div className="w-full h-auto flex flex-row justify-center m-b-2">
                    <div className="w-16 h-16 rounded-full jus ">
                        <img className="w-16 h-16 rounded-full" src="../src/assets/tor.jpg" />
                    </div>
                    <div className="w-32 h-auto flex flex-col items-center justify-start content-end">
                        <span className="text-2xl text-cyan-600">
                               {eleicao? ((eleicao.votes * 100) / total).toFixed(2)  : 0} %
                        </span>
                        <span>
                                {eleicao ? eleicao.votes : 0} Votos
                        </span>
                    </div>
                </div>
                <div className="w-full h-auto flex flex-col justify-center content-center ">
                    <span className="text-2xl text-black text-center">
                        {
                            props.nome
                        }
                    </span>
                    <span className="text-center">
                        {
                           eleito ? <p>Eleito</p> : <p>Não Eleito</p>
                        }
                    </span>
                </div>
            </div>
        </>
    )
    }
    else{
        return(
        <></>
        )
    }
}

export default Card;