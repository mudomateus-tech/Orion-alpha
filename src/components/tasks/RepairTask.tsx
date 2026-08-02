"use client";

import {
  useState
} from "react";


export default function RepairTask({

  concluir

}:{

  concluir:()=>void;

}){


  const pecas = [

    "🔩",

    "⚙️",

    "🔋",

    "🧲",

    "🔌",

    "🪛",

    "💡",

    "🧰",

    "📡",

    "🔧"

  ];



  const sequenciaCorreta = [

    "🔋",

    "⚙️",

    "🔌",

    "🧲",

    "🔧",

    "🔩",

    "📡",

    "🪛",

    "💡",

    "🧰"

  ];



  const [embaralhadas] = useState(

    [...pecas].sort(

      ()=>Math.random() - 0.5

    )

  );



  const [montagem,setMontagem] =

    useState<string[]>([]);



  const [mensagem,setMensagem] =

    useState("");





  function escolher(

    peca:string

  ){


    const nova = [

      ...montagem,

      peca

    ];



    setMontagem(

      nova

    );





    const posicao =

      nova.length - 1;



    if(

      nova[posicao] !==

      sequenciaCorreta[posicao]

    ){


      setMensagem(

        "❌ Peça errada! Recomeçando..."

      );


      setTimeout(()=>{


        setMontagem([]);

        setMensagem("");


      },1000);



      return;


    }







    if(

      nova.length ===

      sequenciaCorreta.length

    ){


      setMensagem(

        "✅ Equipamento restaurado!"

      );


      setTimeout(()=>{


        concluir();


      },800);


    }


  }








  return (

    <div className="
      bg-zinc-900
      p-6
      rounded-2xl
      text-white
    ">


      <h2 className="
        text-xl
        font-bold
        mb-4
      ">

        🔧 REPARAR EQUIPAMENTO

      </h2>




      <p className="
        mb-5
      ">

        Monte o equipamento na sequência correta.

      </p>





      <div className="
        bg-black
        p-4
        rounded-xl
        mb-5
        text-center
        text-3xl
      ">


        {

          montagem.length > 0

          ?

          montagem.join(" ")

          :

          "⚫ ⚫ ⚫ ⚫ ⚫"

        }


      </div>






      <div className="
        grid
        grid-cols-5
        gap-3
      ">


        {

          embaralhadas.map((peca)=>(


            <button

              key={peca}

              onClick={()=>escolher(peca)}

              className="
                bg-zinc-700
                p-4
                rounded-xl
                text-3xl
                hover:bg-zinc-600
              "

            >

              {peca}


            </button>


          ))

        }


      </div>






      {

        mensagem &&


        <p className="
          mt-5
          text-yellow-400
        ">

          {mensagem}

        </p>


      }





    </div>

  );

}