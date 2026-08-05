"use client";

import {
  useEffect,
  useState
} from "react";


interface CodeTaskProps {

  concluir:()=>void;

  senha?: string | number[];

}


export default function CodeTask({

  concluir,

  senha

}:CodeTaskProps){


  function gerarSequencia(){

    if(senha){

      return String(senha)
        .split("")
        .slice(0,4);

    }


    const numeros:string[] = [];


    for(let i = 0; i < 4; i++){

      numeros.push(

        String(

          Math.floor(

            Math.random() * 10

          )

        )

      );

    }


    return numeros;

  }





  const [sequenciaCorreta] =

    useState(

      gerarSequencia()

    );



  const [mostrar,setMostrar] =

    useState(true);



  const [digitado,setDigitado] =

    useState<string[]>([]);



  const [mensagem,setMensagem] =

    useState("");





  useEffect(()=>{

    const tempo = setTimeout(()=>{

      setMostrar(false);

    },3000);


    return ()=>clearTimeout(tempo);


  },[]);







  function apertar(numero:string){


    if(mostrar){

      return;

    }



    const novaSequencia = [

      ...digitado,

      numero

    ];



    const posicao =

      novaSequencia.length - 1;





    if(

      novaSequencia[posicao] !==

      sequenciaCorreta[posicao]

    ){


      setMensagem(

        "❌ Código incorreto! Tente novamente."

      );



      setTimeout(()=>{


        setDigitado([]);

        setMensagem("");


      },1000);



      return;


    }






    setDigitado(

      novaSequencia

    );





    if(

      novaSequencia.length ===

      sequenciaCorreta.length

    ){


      setMensagem(

        "✅ Terminal desbloqueado!"

      );



      setTimeout(()=>{


        concluir();


      },800);


    }


  }







  const numeros = [

    "1","2","3",

    "4","5","6",

    "7","8","9",

    "0"

  ];






  return(


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

        🔢 TERMINAL ORION

      </h2>




      <p className="mb-4">

        Memorize a sequência.

      </p>





      <div className="
        bg-black
        p-5
        rounded-xl
        text-center
        text-4xl
        tracking-widest
        mb-5
      ">


        {

          mostrar

          ?

          sequenciaCorreta.join(" ")

          :

          "• • • •"

        }


      </div>






      <p className="mb-4">

        {

          mostrar

          ?

          "Memorize..."

          :

          "Repita a sequência"

        }


      </p>






      <div className="
        bg-zinc-800
        p-4
        rounded-xl
        text-center
        text-3xl
        tracking-widest
        mb-5
      ">


        {

          digitado.length

          ?

          digitado.join(" ")

          :

          "• • • •"

        }


      </div>







      <div className="
        grid
        grid-cols-3
        gap-3
      ">


        {

          numeros.map((numero)=>(


            <button

              key={numero}

              onClick={()=>apertar(numero)}

              disabled={mostrar}

              className="
                bg-zinc-700
                hover:bg-zinc-600
                disabled:bg-zinc-800
                disabled:text-zinc-500
                p-4
                rounded-xl
                text-xl
              "

            >

              {numero}


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