import { Operation } from "@/types/Operation";

export class VictoryEngine {

  static agentesVenceram(

    operacao: Operation

  ) {

    return operacao.missoes.every(

      m => m.status === "concluida"

    );

  }

  static infiltradoVenceu(

    operacao: Operation

  ) {

    const vivos = operacao.jogadores.filter(

      j => j.status === "ativo"

    );

    const agentes = vivos.filter(

      j => j.papel === "agente" ||

           j.papel === "hacker"

    );

    const infiltrados = vivos.filter(

      j => j.papel === "infiltrado"

    );

    return infiltrados.length >= agentes.length;

  }

}