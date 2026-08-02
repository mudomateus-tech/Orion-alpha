"use client";

import {
  useState
} from "react";


export default function FrequencyTask({

  concluir

}:{

  concluir:()=>void;

}){


  const numeros = [

    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9"

  ];




  function gerarSequencia(){


    return Array.from(

      {length:10},

      ()=>

        numeros[

          Math.floor(

            Math.random()*numeros.length

          )

        ]

    );


  }





  function embaralhar(lista:any[]){

    return [...lista].sort(

      ()=>Math.random()-0.5

    );

  }







  const [sequenciaCorreta] = useState(

    gerarSequencia()

  );





  const [botoes,setBotoes] = useState(

    ()=>


      embaralhar(

        sequenciaCorreta.map((numero,index)=>({

          id:index,

          numero

        }))

      )

  );





  const [posicao,setPosicao] = useState(0);



  const [mensagem,setMensagem] = useState("");








  function apertar(botao:any){



    if(

      botao.numero !== sequenciaCorreta[posicao]

    ){


      setMensagem(

        "❌ Frequência errada! Reiniciando..."

      );


      setPosicao(0);


      setTimeout(()=>{


        setMensagem("");


      },1000);


      return;


    }






    setBotoes(

      botoes.filter(

        item=>item.id !== botao.id

      )

    );





    const novaPosicao = posicao + 1;



    setPosicao(

      novaPosicao

    );






    if(

      novaPosicao === sequenciaCorreta.length

    ){


      setMensagem(

        "✅ Comunicação restaurada!"

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

        📡 VERIFICAR COMUNICAÇÃO

      </h2>





      <p className="
        text-yellow-400
        mb-3
      ">

        📋 Frequência correta:

      </p>





      <div className="
        bg-black
        p-4
        rounded-xl
        text-center
        text-3xl
        mb-5
        tracking-widest
      ">

        {

          sequenciaCorreta.join(" → ")

        }

      </div>







      <p className="mb-4">

        Ajuste o sinal na ordem correta.

      </p>






      <div className="
        grid
        grid-cols-5
        gap-3
      ">


        {

          botoes.map((botao)=>(


            <button

              key={botao.id}

              onClick={()=>apertar(botao)}

              className="
                bg-zinc-700
                p-4
                rounded-xl
                text-2xl
                hover:scale-110
                transition
              "

            >

              {botao.numero}

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