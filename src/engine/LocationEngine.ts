import { Player } from "@/types/Player";

export class LocationEngine {

  static possuiGPS(

    jogador: Player

  ) {

    return !!jogador.localizacao;

  }

}