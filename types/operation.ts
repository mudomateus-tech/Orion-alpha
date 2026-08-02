import type { Jogador } from "./player";

import type { Missao } from "./mission";



export interface Operacao {


  id:string;



  nome:string;



  codigo:string;



  status:

    | "aguardando"

    | "reuniao"

    | "em andamento"

    | "finalizada"

    | string;





  jogadores:Jogador[];





  criadorId?:string;





  missoes?:Missao[];





  sabotagemAtiva?:boolean;





  criadoEm?:number;





  iniciadoEm?:number;



  votos?:{


    eleitor:string;


    escolhido:string;


    criadoEm:number;


  }[];





}