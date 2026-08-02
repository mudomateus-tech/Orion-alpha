"use client";

import {
  useEffect,
  useState
} from "react";


export default function SequenceTask({

  concluir

}:{

  concluir:()=>void;

}){


  const cores = [

    "🔴",
    "🔵",
    "🟢",
    "🟡",
    "🟣",
    "🟠"

  ];



  function gerarSequencia(){

    const nova:string[] = [];


    for(let i = 0; i < 5; i++){

      nova.push(

        cores[

          Math.floor(

            Math.random() * cores.length

          )

        ]

      );

    }


    return nova;

  }





  const [sequenciaCorreta] =

    useState(

      gerarSequencia()

    );



  const [mostrar,setMostrar] =

    useState(true);



  const [tentativa,setTentativa] =

    useState<string[]>([]);



  const [mensagem,setMensagem] =

    useState("");






  useEffect(()=>{


    const tempo = setTimeout(()=>{


      setMostrar(false);


    },3000);



    return ()=>clearTimeout(tempo);



  },[]);








  function apertar(cor:string){



    const novaTentativa = [

      ...tentativa,

      cor

    ];



    const posicao =

      novaTentativa.length - 1;





    if(

      novaTentativa[posicao] !==

      sequenciaCorreta[posicao]

    ){


      setMensagem(

        "❌ Calibração falhou! Tente novamente."

      );


      setTentativa([]);



      setTimeout(()=>{


        setMensagem("");


      },1200);



      return;


    }




    setTentativa(

      novaTentativa

    );






    if(

      novaTentativa.length ===

      sequenciaCorreta.length

    ){


      setMensagem(

        "✅ Sensores calibrados!"

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

        🔄 CALIBRAR SENSORES

      </h2>





      <p className="
        mb-4
        text-yellow-400
      ">

        Memorize a sequência:

      </p>





      <div className="
        bg-black
        p-5
        rounded-xl
        text-4xl
        text-center
        mb-5
      ">


        {

          mostrar

          ?

          sequenciaCorreta.join(" ")

          :

          "⚫ ⚫ ⚫ ⚫ ⚫"

        }


      </div>






      <p className="mb-4">

        Repita a sequência:

      </p>






      <div className="
        bg-zinc-800
        p-4
        rounded-xl
        text-3xl
        text-center
        mb-5
      ">


        {

          tentativa.length

          ?

          tentativa.join(" ")

          :

          "⚫ ⚫ ⚫ ⚫ ⚫"

        }


      </div>







      <div className="
        grid
        grid-cols-3
        gap-3
      ">


        {

          cores.map((cor)=>(


            <button

              key={cor}

              onClick={()=>apertar(cor)}

              className="
                bg-zinc-700
                p-5
                rounded-xl
                text-3xl
                hover:bg-zinc-600
              "

            >

              {cor}

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