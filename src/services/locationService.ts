import {
  doc,
  getDoc,
  updateDoc
} from "firebase/firestore";

import {
  db
} from "@/lib/firebase";



export async function obterLocalizacao(){

  return new Promise<{

    latitude:number;

    longitude:number;

  }>((resolve,reject)=>{


    if(!navigator.geolocation){

      reject(

        new Error(

          "GPS não disponível."

        )

      );

      return;

    }



    navigator.geolocation.getCurrentPosition(

      (posicao)=>{


        resolve({

          latitude:
            posicao.coords.latitude,

          longitude:
            posicao.coords.longitude

        });


      },


      (erro)=>{


        reject(

          new Error(

            "GPS ERRO: " + erro.message

          )

        );


      },


      {

        enableHighAccuracy:true,

        timeout:10000,

        maximumAge:1000

      }

    );


  });

}









export async function atualizarLocalizacao(

  operacaoId:string,

  jogadorId:string,

  latitude:number,

  longitude:number,

  direcao:number = 0

){


  const referencia = doc(

    db,

    "operacoes",

    operacaoId

  );



  const snapshot = await getDoc(

    referencia

  );



  if(!snapshot.exists()){

    throw new Error(

      "Operação não encontrada."

    );

  }



  const dados:any = snapshot.data();



  const jogadores =

    dados.jogadores || [];






  const jogadoresAtualizados =

    jogadores.map(

      (j:any)=>{


        if(

          j.id === jogadorId

        ){

          return {

            ...j,

            localizacao:{

              latitude,

              longitude,

              direcao

            }

          };

        }



        return j;


      }

    );







  await updateDoc(

    referencia,

    {

      jogadores:

        jogadoresAtualizados

    }

  );



  return true;

}









export async function atualizarLocalizacaoJogador(

  operacaoId:string,

  jogadorId:string,

  localizacao:{

    latitude:number;

    longitude:number;

    direcao?:number;

  }

){


  return atualizarLocalizacao(

    operacaoId,

    jogadorId,

    localizacao.latitude,

    localizacao.longitude,

    localizacao.direcao ?? 0

  );

}