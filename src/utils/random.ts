export function gerarId(){

  return crypto.randomUUID();

}





export function gerarCodigo(

  tamanho:number = 6

){

  const caracteres =

    "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";



  let codigo = "";



  for(

    let i = 0;

    i < tamanho;

    i++

  ){

    codigo +=

      caracteres[

        Math.floor(

          Math.random() *

          caracteres.length

        )

      ];

  }



  return codigo;

}





export function numeroAleatorio(

  minimo:number,

  maximo:number

){

  return Math.floor(

    Math.random() *

    (maximo - minimo + 1)

  ) + minimo;

}