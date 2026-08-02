import { Operation } from "@/types/Operation";

export class SabotageEngine {

  static ativa(

    operacao: Operation

  ) {

    return operacao.sabotagem?.ativa;

  }

}