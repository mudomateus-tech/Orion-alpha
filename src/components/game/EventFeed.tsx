"use client";


export default function EventFeed({

  eventos

}:any){


return (

<div

className="
fixed
top-5
right-5
w-80
space-y-3
"

>


{

eventos.slice(0,5).map(

(evento:any)=>(


<div

key={evento.id}

className="
bg-zinc-900
border
border-zinc-700
rounded-xl
p-4
"

>


<h3

className="
font-bold
"

>

{evento.titulo}

</h3>



<p

className="
text-sm
text-zinc-400
"

>

{evento.descricao}

</p>



</div>


)

)


}


</div>


);


}