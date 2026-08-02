export function obterGPS(){

  return new Promise<{

    latitude:number;

    longitude:number;

  }>((resolve,reject)=>{


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

        maximumAge:1000

      }

    );


  });

}