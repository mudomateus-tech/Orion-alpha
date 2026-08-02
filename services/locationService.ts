import {
  doc,
  getDoc,
  updateDoc
} from "firebase/firestore";

import { db } from "@/lib/firebase";





export async function obterLocalizacao(){


  return new Promise<any>(

    (resolve,reject)=>{


      if(

        !navigator.geolocation

      ){

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


        ()=>{


          reject(

            new Error(

              "Não foi possível obter localização."

            )

          );


        },


        {

          enableHighAccuracy:true,

          timeout:10000,

          maximumAge:0

        }


      );


    }

  );


}









export async function atualizarLocalizacaoJogador(

  operacaoId:string,

  jogadorId:string,

  latitude:number,

  longitude:number

){



  if(

    latitude === undefined ||

    longitude === undefined

  ){

    console.log(

      "GPS inválido",

      latitude,

      longitude

    );


    return;

  }







  const referencia =

    doc(

      db,

      "operacoes",

      operacaoId

    );







  const snapshot =

    await getDoc(

      referencia

    );







  if(

    !snapshot.exists()

  ){

    throw new Error(

      "Operação não encontrada."

    );

  }







  const dados:any =

    snapshot.data();







  const jogadores =

    dados.jogadores.map(

      (j:any)=>{



        if(

          j.id === jogadorId

        ){



          return {


            ...j,


            localizacao:{


              latitude,

              longitude


            }


          };


        }




        return j;


      }

    );








  await updateDoc(

    referencia,

    {

      jogadores

    }

  );



}









export async function atualizarLocalizacao(

  operacaoId:string,

  jogadorId:string,

  latitude:number,

  longitude:number

){



  return atualizarLocalizacaoJogador(

    operacaoId,

    jogadorId,

    latitude,

    longitude

  );


}