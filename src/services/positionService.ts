import {
doc,
updateDoc,
onSnapshot
} from "firebase/firestore";

import {
db
} from "@/lib/firebase";



export async function atualizarPosicaoJogador(

operacaoId:string,

jogadorId:string,

x:number,

y:number

){

const jogadorRef = doc(

db,

"operacoes",

operacaoId

);



await updateDoc(

jogadorRef,

{

[`jogadores.${jogadorId}.x`]: x,

[`jogadores.${jogadorId}.y`]: y

}

);

}





export function observarPosicoes(

operacaoId:string,

callback:(jogadores:any)=>void

){


const operacaoRef = doc(

db,

"operacoes",

operacaoId

);



return onSnapshot(

operacaoRef,

(snapshot)=>{


const dados = snapshot.data();


if(!dados){

return;

}



callback(

dados.jogadores || []

);


}

);


}