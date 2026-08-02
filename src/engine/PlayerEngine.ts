import { Player } from "@/types/Player";



export class PlayerEngine {


  static vivos(

    jogadores:Player[]

  ){


    return jogadores.filter(

      jogador =>

        jogador.status === "ativo"

    );


  }





  static mortos(

    jogadores:Player[]

  ){


    return jogadores.filter(

      jogador =>

        jogador.status === "morto"

    );


  }





  static podeExecutarMissao(

    jogador:Player

  ){


    return jogador.status === "ativo";


  }


}