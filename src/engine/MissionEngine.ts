import { Mission } from "@/types/Mission";

export class MissionEngine {

  static concluidas(

    missoes: Mission[]

  ) {

    return missoes.filter(

      m => m.status === "concluida"

    );

  }

  static pendentes(

    missoes: Mission[]

  ) {

    return missoes.filter(

      m => m.status === "pendente"

    );

  }

}