"use client";

interface MovementControllerProps {
  onMove: (
    dx:number,
    dy:number
  ) => void;
}


export default function MovementController({
  onMove
}:MovementControllerProps){


return (

<div
className="
fixed
bottom-6
left-1/2
-translate-x-1/2
z-50
bg-black/80
border
border-cyan-400/40
rounded-3xl
p-4
shadow-[0_0_30px_rgba(0,255,255,.3)]
"
>


<div
className="
grid
grid-cols-3
gap-2
"
>


<div />


<button

onClick={()=>onMove(0,-5)}

className="
w-14
h-14
rounded-xl
bg-zinc-900
border
border-cyan-400/40
text-cyan-300
text-xl
"

>
▲
</button>


<div />



<button

onClick={()=>onMove(-5,0)}

className="
w-14
h-14
rounded-xl
bg-zinc-900
border
border-cyan-400/40
text-cyan-300
text-xl
"

>
◀
</button>



<button

onClick={()=>onMove(0,5)}

className="
w-14
h-14
rounded-xl
bg-zinc-900
border
border-cyan-400/40
text-cyan-300
text-xl
"

>
▼
</button>



<button

onClick={()=>onMove(5,0)}

className="
w-14
h-14
rounded-xl
bg-zinc-900
border
border-cyan-400/40
text-cyan-300
text-xl
"

>
▶
</button>



</div>


</div>

);

}