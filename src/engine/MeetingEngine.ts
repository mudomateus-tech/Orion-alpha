import { Operation } from "@/types/Operation";

export class MeetingEngine {

  static emReuniao(

    operacao: Operation

  ) {

    return operacao.meeting?.ativa;

  }

}