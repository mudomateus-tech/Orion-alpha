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
  criarOperacao
} from "@/services/operationService";



export default function Criar(){


  const router = useRouter();



  const [
    nome,
    setNome
  ] = useState("");



  const [
    carregando,
    setCarregando
  ] = useState(false);



  const [
    erro,
    setErro
  ] = useState("");






  async function criar(){


    try{


      setCarregando(true);

      setErro("");




      if(!nome.trim()){

        throw new Error(

          "Digite seu nome."

        );

      }





      const jogadorId =

        Date.now().toString() +

        Math.random()

        .toString(36)

        .substring(2);






      const resultado =

        await criarOperacao(

          "Operação ORION",

          jogadorId,

          nome.trim()

        );






      sessionStorage.setItem(

        "agenteId",

        jogadorId

      );






      router.push(

        `/lobby?id=${resultado.id}&codigo=${resultado.codigo}&jogador=${jogadorId}`

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

        subtitulo="Criar nova operação"

      />






      <Card

        title="COMANDANTE"

        className="
        w-full
        max-w-md
        "

      >





        <input

          value={nome}

          onChange={

            e =>

            setNome(

              e.target.value

            )

          }


          placeholder="Nome do comandante"


          className="
          w-full
          bg-zinc-800
          rounded-xl
          p-4
          mb-5
          outline-none
          text-white
          "

        />







        <Button

          onClick={criar}

          disabled={carregando}

          className="
          w-full
          "

        >


          {

            carregando

            ?

            "CRIANDO..."

            :

            "CRIAR OPERAÇÃO"


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