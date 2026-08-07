export interface Patente {

  nome:string;

  nivelMinimo:number;

  descricao:string;

  simbolo:string;

}



const patentes:Patente[] = [

  {
    nome:"RECRUTA",
    nivelMinimo:1,
    descricao:"Novo agente integrado ao protocolo ORION.",
    simbolo:"◽"
  },


  {
    nome:"VETERANO",
    nivelMinimo:10,
    descricao:"Agente com experiência em múltiplas operações.",
    simbolo:"🔹"
  },


  {
    nome:"OPERADOR",
    nivelMinimo:20,
    descricao:"Especialista em missões de campo.",
    simbolo:"🔷"
  },


  {
    nome:"ESPECIALISTA",
    nivelMinimo:30,
    descricao:"Agente altamente treinado.",
    simbolo:"⭐"
  },


  {
    nome:"CAPITÃO",
    nivelMinimo:40,
    descricao:"Líder de operações estratégicas.",
    simbolo:"🛡️"
  },


  {
    nome:"COMANDANTE",
    nivelMinimo:50,
    descricao:"Maior autoridade operacional ORION.",
    simbolo:"👑"
  }

];





export function obterPatentePorNivel(

  nivel:number

):Patente{


  let patente =

    patentes[0];



  for(

    const item of patentes

  ){


    if(

      nivel >= item.nivelMinimo

    ){

      patente = item;

    }


  }



  return patente;

}





export function listarPatentes(){

  return patentes;

}