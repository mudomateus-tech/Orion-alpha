"use client";


type MovimentoCallback = (
direcao:{
x:number;
y:number;
}
)=>void;



let ativo = false;



export function iniciarSensorMovimento(

callback:MovimentoCallback

){


if(
typeof window === "undefined"
){

return;

}



if(ativo){

return;

}



ativo = true;





function movimento(

evento:DeviceMotionEvent

){


const aceleracao =
evento.accelerationIncludingGravity;



if(!aceleracao){

return;

}



const x =
aceleracao.x || 0;


const y =
aceleracao.y || 0;





let movimentoX = 0;

let movimentoY = 0;





if(
Math.abs(x) > 2
){

movimentoX =
x > 0
?
5
:
-5;

}





if(
Math.abs(y) > 2
){

movimentoY =
y > 0
?
5
:
-5;

}






if(
movimentoX !== 0 ||
movimentoY !== 0
){

callback({

x:movimentoX,

y:movimentoY

});

}



}





window.addEventListener(

"devicemotion",

movimento

);



}





export function pararSensorMovimento(){


if(
typeof window === "undefined"
){

return;

}



ativo = false;



window.removeEventListener(

"devicemotion",

()=>{}

);



}