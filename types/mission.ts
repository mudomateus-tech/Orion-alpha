export interface Missao {


  id:string;



  titulo:string;



  descricao:string;





  localizacao:{


    latitude:number;


    longitude:number;


    raio:number;


  };





  status:


    | "pendente"

    | "em andamento"

    | "concluida"

    | string;





  progresso:number;





  tempoExecucao:number;





  criadaEm:number;



}