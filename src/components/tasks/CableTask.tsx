"use client";

import {
  useState
} from "react";


export default function CableTask({

  concluir

}:{

  concluir:()=>void;

}){


  const cores = [

    "vermelho",
    "amarelo",
    "verde",
    "azul",
    "roxo"

  ];



  function gerarSequencia(){


    return Array.from(

      {length:10},

      ()=>cores[

        Math.floor(

          Math.random()*cores.length

        )

      ]

    );


  }



  function embaralhar(lista:any[]){

    return [...lista].sort(

      ()=>Math.random()-0.5

    );

  }





  const [ordemCorreta] = useState(

    gerarSequencia()

  );




  const [cabosDisponiveis,setCabosDisponiveis] = useState(

    ()=>


      embaralhar(

        ordemCorreta.map((cor,index)=>({

          id:index,

          cor

        }))

      )

  );




  const [posicao,setPosicao] = useState(0);



  const [mensagem,setMensagem] = useState("");






  function clicar(cabo:any){



    if(

      cabo.cor !== ordemCorreta[posicao]

    ){


      setMensagem(

        "❌ Cabo errado!"

      );


      setPosicao(0);


      setTimeout(()=>{


        setMensagem("");


      },1000);


      return;


    }






    setCabosDisponiveis(

      cabosDisponiveis.filter(

        item=>item.id !== cabo.id

      )

    );



    const novaPosicao = posicao + 1;



    setPosicao(

      novaPosicao

    );






    if(

      novaPosicao === ordemCorreta.length

    ){


      setMensagem(

        "✅ Energia restaurada!"

      );


      setTimeout(()=>{


        concluir();


      },800);


    }


  }







  function emoji(cor:string){


    const mapa:any = {

      vermelho:"🔴",

      amarelo:"🟡",

      verde:"🟢",

      azul:"🔵",

      roxo:"🟣"

    };


    return mapa[cor];


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

        🔌 REATIVAR ENERGIA

      </h2>





      <p className="
        text-yellow-400
        mb-3
      ">

        📋 Ordem correta:

      </p>





      <div className="
        bg-black
        p-4
        rounded-xl
        mb-5
        text-center
        text-2xl
      ">

        {

          ordemCorreta

          .map(emoji)

          .join(" → ")

        }

      </div>






      <div className="
        grid
        grid-cols-5
        gap-3
      ">


        {

          cabosDisponiveis.map((cabo)=>(


            <button

              key={cabo.id}

              onClick={()=>clicar(cabo)}

              className="
                bg-zinc-700
                p-4
                rounded-xl
                text-3xl
                hover:scale-110
                transition
              "

            >

              {emoji(cabo.cor)}

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