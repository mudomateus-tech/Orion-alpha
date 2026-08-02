export interface Coordenada {

  latitude:number;

  longitude:number;

}





// Calcula distância em metros entre dois pontos GPS

export function calcularDistanciaGPS(

  ponto1:Coordenada,

  ponto2:Coordenada

){


  const raioTerra =

    6371000;



  const lat1 =

    ponto1.latitude *

    Math.PI /

    180;



  const lat2 =

    ponto2.latitude *

    Math.PI /

    180;



  const deltaLat =

    (ponto2.latitude -

    ponto1.latitude)

    *

    Math.PI /

    180;



  const deltaLon =

    (ponto2.longitude -

    ponto1.longitude)

    *

    Math.PI /

    180;




  const a =

    Math.sin(deltaLat / 2) ** 2 +

    Math.cos(lat1) *

    Math.cos(lat2) *

    Math.sin(deltaLon / 2) ** 2;



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





// Descobre direção do alvo em relação ao jogador

export function calcularAngulo(

  origem:Coordenada,

  destino:Coordenada

){


  const y =

    Math.sin(

      (destino.longitude -

      origem.longitude)

      *

      Math.PI /

      180

    )

    *

    Math.cos(

      destino.latitude *

      Math.PI /

      180

    );



  const x =

    Math.cos(

      origem.latitude *

      Math.PI /

      180

    )

    *

    Math.sin(

      destino.latitude *

      Math.PI /

      180

    )

    -

    Math.sin(

      origem.latitude *

      Math.PI /

      180

    )

    *

    Math.cos(

      destino.latitude *

      Math.PI /

      180

    )

    *

    Math.cos(

      (destino.longitude -

      origem.longitude)

      *

      Math.PI /

      180

    );



  const graus =

    Math.atan2(y,x)

    *

    180 /

    Math.PI;



  return (

    graus + 360

  )

  %

  360;


}