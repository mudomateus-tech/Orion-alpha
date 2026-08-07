import {
doc,
getDoc,
setDoc,
updateDoc
} from "firebase/firestore";

import {
db
} from "@/lib/firebase";



export interface CalibracaoCasa {


larguraMetros:number;

comprimentoMetros:number;


origem:{

x:number;

y:number;

};


criadaEm:number;


}





export async function salvarCalibracao(

operacaoId:string,

dados:CalibracaoCasa

){


await setDoc(

doc(

db,

"operacoes",

operacaoId,

"config",

"calibracao"

),

{

...dados,

criadaEm:Date.now()

}

);



}







export async function buscarCalibracao(

operacaoId:string

){


const referencia =

doc(

db,

"operacoes",

operacaoId,

"config",

"calibracao"

);




const resultado =

await getDoc(

referencia

);




if(

!resultado.exists()

){

return null;

}



return resultado.data() as CalibracaoCasa;



}








export async function atualizarEscalaMapa(

operacaoId:string,

escala:number

){


await updateDoc(

doc(

db,

"operacoes",

operacaoId,

"config",

"calibracao"

),

{

escala

}

);



}








export function converterMetrosParaMapa(

metrosX:number,

metrosY:number,

calibracao:CalibracaoCasa

){



const x =

(

metrosX /

calibracao.larguraMetros

)

*

100;





const y =

(

metrosY /

calibracao.comprimentoMetros

)

*

100;





return {

x,

y

};



}