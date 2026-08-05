"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Circle,
  useMap
} from "react-leaflet";

import {
  useEffect
} from "react";

import L from "leaflet";

import "leaflet/dist/leaflet.css";

import {
  useRealtimePlayers
} from "@/hooks/useRealtimePlayers";





function criarIcone(

  cor:string

){

  return L.divIcon({

    className:"",


    html:`

      <div style="
        width:20px;
        height:20px;
        background:${cor};
        border-radius:50%;
        box-shadow:
        0 0 25px ${cor};
        border:
        2px solid white;
      "></div>

    `


  });


}







const missaoIcon =

criarIcone(

  "#ffaa00"

);








function Centralizar({

  posicao

}:any){


  const mapa = useMap();




  useEffect(()=>{


    mapa.setView(

      posicao,

      18

    );


  },[posicao]);



  return null;


}









export default function OrionMap({

  operacao,

  jogador

}:any){



  const {

    jogadores

  } = useRealtimePlayers(

    operacao?.id

  );







  if(

    !jogador?.localizacao

  ){

    return (

      <div

        className="
        text-white
        text-center
        "

      >

        Buscando GPS...

      </div>

    );

  }







  const centro = [

    jogador.localizacao.latitude,

    jogador.localizacao.longitude

  ] as [number,number];









  return (

    <div

      className="
      h-[500px]
      w-full
      rounded-2xl
      overflow-hidden
      mt-6
      "

    >





      <MapContainer

        center={centro}

        zoom={18}

        style={{

          height:"100%",

          width:"100%"

        }}

      >





        <TileLayer

          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"

        />







        <Centralizar

          posicao={centro}

        />









        {

          jogadores.map(

            (j:any)=>{



              if(

                !j.localizacao

              ){

                return null;

              }







              let cor = "#0088ff";





              if(

                j.papel === "hacker"

              ){

                cor="#aa00ff";

              }






              if(

                j.id === jogador.id &&

                jogador.papel === "infiltrado"

              ){

                cor="#ff0033";

              }








              return (

                <Marker


                  key={j.id}


                  position={[

                    j.localizacao.latitude,

                    j.localizacao.longitude

                  ]}


                  icon={

                    criarIcone(

                      cor

                    )

                  }


                />


              );



            }


          )

        }









        {

          operacao?.missoes?.map(

            (missao:any)=>(


              <div

                key={missao.id}

              >


                <Marker


                  position={[

                    missao.localizacao.latitude,

                    missao.localizacao.longitude

                  ]}


                  icon={missaoIcon}


                />





                <Circle


                  center={[

                    missao.localizacao.latitude,

                    missao.localizacao.longitude

                  ]}


                  radius={5}


                />


              </div>


            )


          )

        }





      </MapContainer>





    </div>


  );


}