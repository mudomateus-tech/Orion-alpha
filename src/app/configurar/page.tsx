"use client";

import {
  Suspense,
  useEffect,
  useState
} from "react";

import dynamic from "next/dynamic";

import {
  useSearchParams,
  useRouter
} from "next/navigation";


import {
  adicionarMissao,
  buscarMissoesConfiguradas,
  removerMissao
} from "@/services/missionConfigService";


import {
  obterLocalizacao
} from "@/services/locationService";


import Header from "@/components/Header";

import Card from "@/components/Card";

import Button from "@/components/Button";



const MissionMap = dynamic(

  () => import("@/components/map/MissionMap"),

  {

    ssr:false,

    loading:()=> (

      <div className="
        h-[450px]
        flex
        items-center
        justify-center
        text-green-400
      ">

        Carregando mapa tático...

      </div>

    )

  }

);



type TipoMissao =
  | "codigo"
  | "cabos"
  | "frequencia"
  | "sequencia"
  | "reparo";






function ConfigurarContent(){


  const params = useSearchParams();

  const router = useRouter();


  const operacaoId = params.get("id");



  const [localizacao,setLocalizacao] =
    useState<any>(null);



  const [missoes,setMissoes] =
    useState<any[]>([]);



  const [tipo,setTipo] =
    useState<TipoMissao>("cabos");



  const [titulo,setTitulo] =
    useState("");



  const [descricao,setDescricao] =
    useState("");



  const [mensagem,setMensagem] =
    useState("");







  useEffect(()=>{

    carregar();

  },[]);







  async function carregar(){


    if(!operacaoId){

      return;

    }


    try{


      const gps = await obterLocalizacao();


      setLocalizacao(gps);



      const lista =

        await buscarMissoesConfiguradas(

          operacaoId

        );


      setMissoes(lista);


    }

    catch(error:any){


      setMensagem(

        error.message

      );


    }


  }








  async function criar(){


    if(!operacaoId){

      return;

    }




    if(!localizacao){


      setMensagem(

        "Escolha um ponto no mapa."

      );


      return;

    }





    if(!titulo){


      setMensagem(

        "Digite o título da missão."

      );


      return;

    }






    try{


      await adicionarMissao(

        operacaoId,

        {

          tipo,

          titulo,

          descricao,

          localizacao,

          raio:5

        }

      );



      setMensagem(

        "✅ Missão criada!"

      );



      setTitulo("");

      setDescricao("");



      await carregar();



    }

    catch(error:any){


      setMensagem(

        error.message

      );


    }


  }








  async function excluir(id:string){


    if(!operacaoId){

      return;

    }



    await removerMissao(

      operacaoId,

      id

    );


    carregar();


  }









  return (

    <main className="
      min-h-screen
      bg-black
      text-white
      p-6
    ">


      <Header

        titulo="ORION"

        subtitulo="Configuração do comandante"

      />







      <Card title="MAPA TÁTICO">


        <MissionMap

          centro={[

            localizacao?.latitude ?? 2.7972,

            localizacao?.longitude ?? -60.7096

          ]}


          localizacao={localizacao}


          setLocalizacao={setLocalizacao}


          missoes={missoes}


        />


      </Card>








      <Card

        title="LOCALIZAÇÃO DA MISSÃO"

        className="mt-6"

      >


        <p>

          Latitude: {localizacao?.latitude ?? "..."}

        </p>


        <p>

          Longitude: {localizacao?.longitude ?? "..."}

        </p>


      </Card>









      <Card

        title="CRIAR MISSÃO"

        className="mt-6"

      >


        <select

          className="
          bg-zinc-900
          p-3
          rounded-xl
          w-full
          "

          value={tipo}

          onChange={(e)=>

            setTipo(

              e.target.value as TipoMissao

            )

          }

        >


          <option value="cabos">

            🔌 Cabos

          </option>


          <option value="frequencia">

            📡 Comunicação

          </option>


          <option value="codigo">

            🧠 Código

          </option>


          <option value="sequencia">

            📶 Sequência

          </option>


          <option value="reparo">

            🔧 Reparo

          </option>


        </select>







        <input

          className="
          mt-3
          w-full
          bg-zinc-900
          p-3
          rounded-xl
          "

          placeholder="Título da missão"

          value={titulo}

          onChange={(e)=>

            setTitulo(e.target.value)

          }

        />







        <textarea

          className="
          mt-3
          w-full
          bg-zinc-900
          p-3
          rounded-xl
          "

          placeholder="Descrição"

          value={descricao}

          onChange={(e)=>

            setDescricao(e.target.value)

          }

        />








        <Button

          className="w-full mt-4"

          onClick={criar}

        >

          📍 CRIAR MISSÃO

        </Button>


      </Card>









      <Card

        title="MISSÕES CONFIGURADAS"

        className="mt-6"

      >


        {

          missoes.map(

            (missao)=>(


              <div

                key={missao.id}

                className="
                bg-zinc-900
                rounded-xl
                p-4
                mb-3
                "

              >


                <h2>

                  {missao.titulo}

                </h2>



                <p>

                  {missao.descricao}

                </p>



                <Button

                  variant="danger"

                  onClick={()=>excluir(missao.id)}

                >

                  Remover

                </Button>


              </div>


            )

          )

        }


      </Card>







      {

        mensagem &&

        <p className="
          text-green-400
          text-center
          mt-5
        ">

          {mensagem}

        </p>

      }







      <Button

        className="w-full mt-6"

        onClick={()=>router.back()}

      >

        VOLTAR

      </Button>


    </main>

  );

}







export default function Configurar(){


  return (

    <Suspense

      fallback={

        <main className="
          min-h-screen
          bg-black
          text-white
          flex
          items-center
          justify-center
        ">

          Carregando...

        </main>

      }

    >

      <ConfigurarContent/>

    </Suspense>

  );

}