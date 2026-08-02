"use client";

import {
  useState
} from "react";


export default function CableTask({

  concluir

}:{

  concluir:()=>void;

}){


  const cabos = [

    {
      id:1,
      cor:"vermelho"
    },

    {
      id:2,
      cor:"azul"
    },

    {
      id:3,
      cor:"verde"
    },

    {
      id:4,
      cor:"amarelo"
    }

  ];



  const [selecionado,setSelecionado] =

    useState<any>(null);



  const [ligados,setLigados] =

    useState<any[]>([]);




  function conectar(

    cabo:any

  ){



    if(!selecionado){


      setSelecionado(cabo);


      return;


    }



    if(

      selecionado.cor === cabo.cor &&

      selecionado.id !== cabo.id

    ){


      const novos = [

        ...ligados,

        cabo.cor

      ];



      setLigados(

        novos

      );



      setSelecionado(

        null

      );



      if(

        novos.length === cabos.length

      ){


        setTimeout(()=>{


          concluir();


        },500);


      }


    }

    else{


      setSelecionado(

        null

      );


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

        🔌 REATIVAR ENERGIA

      </h2>



      <p className="mb-5">

        Conecte os cabos da mesma cor.

      </p>



      <div className="
        grid
        grid-cols-2
        gap-4
      ">


        {

          cabos.map((cabo)=>(


            <button

              key={cabo.id}

              onClick={()=>conectar(cabo)}

              className={`
                p-5
                rounded-xl
                bg-${cabo.cor}-600
              `}

            >

              {cabo.cor}


            </button>


          ))

        }


      </div>





      {

        ligados.length > 0 &&


        <p className="
          mt-5
          text-green-400
        ">


          Cabos conectados:

          {" "}

          {ligados.join(", ")}


        </p>


      }



    </div>

  );


}