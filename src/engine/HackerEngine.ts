import { Player } from "@/types/Player";

export class HackerEngine {

  static podeHackear(

    jogador: Player

  ) {

    return jogador.papel === "hacker";

  }

}