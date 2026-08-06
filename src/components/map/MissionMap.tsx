"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Circle,
  Popup,
  useMapEvents,
  useMap
} from "react-leaflet";

import {
  useEffect,
  useState
} from "react";

import L from "leaflet";

import "leaflet/dist/leaflet.css";



interface Props {

  centro:[number,number];

  localizacao:any;

  setLocalizacao:(valor:any)=>void;

  missoes:any[];

}






function criarIcone(cor:string){


  return L.divIcon({

    className:"",

    html:`

      <div style="
        width:24px;
        height:24px;
        background:${cor};
        border-radius:50%;
        border:3px branca solid;
        box-shadow:0 0 20px ${cor};
      "></div>

    `

  });


}





const missaoIcon = criarIcone("#ffaa00");

const comandanteIcon = criarIcone("#00ff88");







function CliqueMapa({

  setLocalizacao

}:{

  setLocalizacao:(valor:any)=>void

}){


  useMapEvents({

    click(e){


      setLocalizacao({

        latitude:e.latlng.lat,

        longitude:e.latlng.lng

      });


    }


  });


  return null;

}








function Centralizar({

  centro

}:{

  centro:[number,number]

}){


  const mapa = useMap();



  useEffect(()=>{


    mapa.setView(

      centro,

      18

    );


  },[centro,mapa]);



  return null;

}








export default function MissionMap({

  centro,

  localizacao,

  setLocalizacao,

  missoes

}:Props){



  const [ponto,setPonto] =

    useState<[number,number]>(centro);





  useEffect(()=>{


    if(localizacao){


      setPonto([

        localizacao.latitude,

        localizacao.longitude

      ]);


    }


  },[localizacao]);








  return (

    <div className="
      h-[450px]
      w-full
      rounded-2xl
      overflow-hidden
    ">


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





        <CliqueMapa

          setLocalizacao={setLocalizacao}

        />





        <Centralizar

          centro={centro}

        />









        {

          localizacao &&

          <>


            <Marker

              position={ponto}

              icon={comandanteIcon}

            >

              <Popup>

                Novo ponto de missão

              </Popup>


            </Marker>




            <Circle

              center={ponto}

              radius={5}

            />


          </>

        }









        {

          missoes.map(

            (missao:any)=>(


              missao.localizacao &&

              <>


                <Marker

                  key={missao.id}

                  position={[

                    missao.localizacao.latitude,

                    missao.localizacao.longitude

                  ]}

                  icon={missaoIcon}

                >

                  <Popup>


                    <strong>

                      {missao.titulo}

                    </strong>


                    <br/>


                    {missao.descricao}


                  </Popup>


                </Marker>





                <Circle

                  key={missao.id+"-raio"}

                  center={[

                    missao.localizacao.latitude,

                    missao.localizacao.longitude

                  ]}

                  radius={

                    missao.raio ?? 5

                  }

                />



              </>


            )

          )

        }







      </MapContainer>


    </div>

  );

}