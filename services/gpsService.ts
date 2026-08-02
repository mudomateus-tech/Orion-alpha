export function calcularDistancia(

  latitude1:number,

  longitude1:number,

  latitude2:number,

  longitude2:number

){



  const raioTerra =

    6371000;



  const rad =

    (valor:number)=>

      valor *

      Math.PI /

      180;





  const dLat =

    rad(

      latitude2 -

      latitude1

    );




  const dLon =

    rad(

      longitude2 -

      longitude1

    );







  const a =

    Math.sin(dLat / 2) *

    Math.sin(dLat / 2)

    +

    Math.cos(

      rad(latitude1)

    )

    *

    Math.cos(

      rad(latitude2)

    )

    *

    Math.sin(dLon / 2)

    *

    Math.sin(dLon / 2);







  const c =

    2 *

    Math.atan2(

      Math.sqrt(a),

      Math.sqrt(1-a)

    );







  return (

    raioTerra *

    c

  );



}









export function estaDentroDoRaio(



  distancia:number,



  raioPermitido:number



){



  return (

    distancia <=

    raioPermitido

  );


}