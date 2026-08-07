"use client";

import {
useState
} from "react";

import {
salvarCalibracao
} from "@/services/calibrationService";



interface Sala {

id:string;

nome:string;

x:number;

y:number;

largura:number;

altura:number;

}



export default function Editor(){


const [
salas,
setSalas
] = useState<Sala[]>([]);



const [
selecionada,
setSelecionada
] = useState<string|null>(null);



const [
nomeMapa,
setNomeMapa
] = useState(

"Casa Pequena"

);



const [
larguraMetros,
setLarguraMetros
] = useState(10);



const [
comprimentoMetros,
setComprimentoMetros
] = useState(8);



const [
arrastando,
setArrastando
] = useState<string|null>(null);



const [
mensagem,
setMensagem
] = useState("");



async function salvarMapa(){


try{


await salvarCalibracao(

"teste",

{


larguraMetros,

comprimentoMetros,


origem:{

x:50,

y:50

},


criadaEm:Date.now()


}

);



setMensagem(

"Mapa salvo no sistema ORION"

);


}


catch(error){


console.log(error);


setMensagem(

"Erro ao salvar mapa"

);


}



}
function criarSala(
e:React.MouseEvent
){


if(arrastando){

return;

}



const area =
e.currentTarget.getBoundingClientRect();



const x =
((e.clientX-area.left)/area.width)*100;



const y =
((e.clientY-area.top)/area.height)*100;





const nova:Sala={


id:Date.now().toString(),


nome:"Novo cômodo",


x,


y,


largura:15,


altura:15


};




setSalas(

salas=>[

...salas,

nova

]

);



setSelecionada(

nova.id

);


}







function moverSala(

e:React.MouseEvent,

id:string

){


e.stopPropagation();


setArrastando(

id

);


}







function moverMouse(

e:React.MouseEvent

){


if(!arrastando){

return;

}




const area =
e.currentTarget.getBoundingClientRect();



const x =
((e.clientX-area.left)/area.width)*100;



const y =
((e.clientY-area.top)/area.height)*100;





setSalas(

salas=>


salas.map(

sala=>


sala.id===arrastando


?

{

...sala,

x,

y

}


:


sala


)

);


}







function atualizarNome(

valor:string

){


if(!selecionada){

return;

}




setSalas(


salas=>


salas.map(

sala=>


sala.id===selecionada


?


{

...sala,

nome:valor

}


:


sala


)

);



}
return (

<main className="min-h-screen bg-[#05070d] text-white p-8">


<div className="max-w-7xl mx-auto flex gap-8">



<aside className="
w-80
bg-black
border
border-cyan-400/30
rounded-2xl
p-6
">


<h1 className="
text-2xl
text-cyan-300
font-bold
">

EDITOR ORION

</h1>





<input

value={nomeMapa}

onChange={

e=>setNomeMapa(

e.target.value

)

}

className="
w-full
mt-6
bg-zinc-900
border
border-cyan-400/30
rounded-xl
p-3
"

/>







<div className="mt-6">


<label className="text-cyan-300 text-sm">

Largura da casa (metros)

</label>


<input

type="number"

value={larguraMetros}

onChange={

e=>setLarguraMetros(

Number(e.target.value)

)

}

className="
w-full
mt-2
bg-zinc-900
border
border-cyan-400/30
rounded-xl
p-3
"

/>



<label className="text-cyan-300 text-sm block mt-4">

Comprimento da casa (metros)

</label>



<input

type="number"

value={comprimentoMetros}

onChange={

e=>setComprimentoMetros(

Number(e.target.value)

)

}

className="
w-full
mt-2
bg-zinc-900
border
border-cyan-400/30
rounded-xl
p-3
"

/>



<button

onClick={salvarMapa}

className="
w-full
mt-6
bg-cyan-500
text-black
font-bold
rounded-xl
p-3
hover:bg-cyan-300
"

>

SALVAR MAPA ORION

</button>



{

mensagem &&

<p className="
text-cyan-300
text-sm
mt-4
">

{mensagem}

</p>

}



</div>









{

selecionada &&


<div className="mt-8">


<h2 className="text-cyan-300 mb-2">

Nome do cômodo

</h2>




<input


value={

salas.find(

s=>s.id===selecionada

)?.nome || ""

}


onChange={

e=>atualizarNome(

e.target.value

)

}


className="
w-full
bg-zinc-900
border
border-cyan-400/30
rounded-xl
p-3
"

/>


</div>


}





</aside>









<section


onClick={criarSala}


onMouseMove={moverMouse}


onMouseUp={

()=>setArrastando(null)

}


className="
flex-1
min-h-[700px]
rounded-3xl
border
border-cyan-400/30
relative
overflow-hidden
bg-[#071019]
"


>



<div

className="
absolute
inset-0
opacity-20
bg-[linear-gradient(#00ffff_1px,transparent_1px),linear-gradient(90deg,#00ffff_1px,transparent_1px)]
bg-[size:40px_40px]
"

/>







{

salas.map(

sala=>(


<div


key={sala.id}


onMouseDown={

e=>moverSala(

e,

sala.id

)

}



onClick={

e=>{


e.stopPropagation();


setSelecionada(

sala.id

);


}

}



className="
absolute
border
border-cyan-300
bg-cyan-400/20
rounded-xl
flex
items-center
justify-center
text-xs
text-cyan-100
cursor-move
"



style={{


left:`${sala.x}%`,


top:`${sala.y}%`,


width:`${sala.largura}%`,


height:`${sala.altura}%`


}}



>


{sala.nome}



</div>


)

)

}







</section>





</div>



</main>

);


}