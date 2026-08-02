"use client";

import {
  useState
} from "react";

import {
  useRouter
} from "next/navigation";

import Header from "@/components/Header";

import Card from "@/components/Card";

import Button from "@/components/Button";

import {
  entrarPorCodigo
} from "@/services/joinByCode";




export default function Entrar(){


  const router = useRouter();



  const [nome,setNome] = useState("");

  const [codigo,setCodigo] = useState("");

  const [carregando,setCarregando] = useState(false);

  const [erro,setErro] = useState("");





  async function entrar(){


    try{


      setCarregando(true);

      setErro("");




      if(

        !nome.trim() ||

        !codigo.trim()

      ){

        throw new Error(

          "Preencha todos os campos."

        );

      }





      let jogadorId =

        sessionStorage.getItem(

          "agenteId"

        );




      if(!jogadorId){


        jogadorId =

          Date.now().toString() +

          Math.random()

          .toString(36)

          .substring(2);




        sessionStorage.setItem(

          "agenteId",

          jogadorId

        );


      }





      const resultado =

        await entrarPorCodigo(

          codigo.trim().toUpperCase(),

          jogadorId,

          nome.trim()

        );






      sessionStorage.setItem(

        "agenteId",

        resultado.jogadorId

      );






      router.push(

        `/lobby?id=${resultado.operacaoId}&codigo=${resultado.codigo}&jogador=${resultado.jogadorId}`

      );





    }


    catch(error:any){


      console.error(error);


      setErro(

        error.message

      );


    }


    finally{


      setCarregando(false);


    }


  }








  return (

    <main

      className="
      min-h-screen
      bg-black
      text-white
      flex
      flex-col
      items-center
      justify-center
      p-6
      "

    >



      <Header

        titulo="ORION"

        subtitulo="Entrar em operação"

      />





      <Card

        title="AGENTE"

        className="
        w-full
        max-w-md
        "

      >



        <input

          value={nome}

          onChange={

            e=>

            setNome(

              e.target.value

            )

          }

          placeholder="Seu nome"

          className="
          w-full
          bg-zinc-800
          rounded-xl
          p-4
          mb-4
          outline-none
          "

        />






        <input

          value={codigo}

          onChange={

            e=>

            setCodigo(

              e.target.value.toUpperCase()

            )

          }

          placeholder="Código da operação"

          className="
          w-full
          bg-zinc-800
          rounded-xl
          p-4
          mb-5
          uppercase
          outline-none
          "

        />






        <Button

          onClick={entrar}

          disabled={carregando}

          className="
          w-full
          "

        >


          {

            carregando

            ?

            "ENTRANDO..."

            :

            "ENTRAR"

          }


        </Button>







        {

          erro &&


          <p

            className="
            text-red-500
            mt-4
            "

          >

            {erro}

          </p>


        }




      </Card>


    </main>

  );


}