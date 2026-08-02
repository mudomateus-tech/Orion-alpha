"use client";


export default function VictoryScreen({

  vitoria

}:any){



if(!vitoria)

return null;





return (

<div

className="
fixed
inset-0
bg-black/90
flex
items-center
justify-center
z-50
"

>


<div

className="
bg-zinc-900
rounded-2xl
p-8
text-center
"

>


<h1

className="
text-5xl
font-black
"

>

🏆

</h1>



<h2

className="
text-3xl
font-bold
mt-4
"

>

{vitoria.vencedor}

</h2>



<p

className="
text-zinc-400
mt-3
"

>

{vitoria.mensagem}

</p>



</div>


</div>

);


}