import {
  doc,
  getDoc,
  setDoc
} from "firebase/firestore";

import {
  db
} from "@/lib/firebase";



export interface SalaMapa {

  id:string;

  nome:string;

  x:number;

  y:number;

  largura:number;

  altura:number;

}



export interface MapaCasa {

  nome:string;

  salas:SalaMapa[];

  criadoEm:number;

}




export async function salvarMapa(

  operacaoId:string,

  mapa:MapaCasa

){


await setDoc(

doc(

db,

"operacoes",

operacaoId,

"config",

"mapa"

),

{

...mapa,

criadoEm:Date.now()

}

);


}






export async function buscarMapa(

  operacaoId:string

){


const referencia =

doc(

db,

"operacoes",

operacaoId,

"config",

"mapa"

);



const resultado =

await getDoc(

referencia

);



if(!resultado.exists()){


return null;


}



return resultado.data() as MapaCasa;


}