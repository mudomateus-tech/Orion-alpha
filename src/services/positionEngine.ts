import {
  CalibracaoCasa,
  converterMetrosParaMapa
} from "./calibrationService";


export interface PosicaoMapa {

  x:number;

  y:number;

}



export function converterPosicaoRealParaMapa(

  metrosX:number,

  metrosY:number,

  calibracao:CalibracaoCasa

):PosicaoMapa{


const posicao =

converterMetrosParaMapa(

metrosX,

metrosY,

calibracao

);



return {

x:

Math.max(

0,

Math.min(

100,

posicao.x

)

),


y:

Math.max(

0,

Math.min(

100,

posicao.y

)

)


};


}






export function suavizarMovimento(

atual:PosicaoMapa,

destino:PosicaoMapa,

forca:number = 0.15

):PosicaoMapa{


return {


x:

atual.x +

(

destino.x -

atual.x

)

*

forca,



y:

atual.y +

(

destino.y -

atual.y

)

*

forca



};


}