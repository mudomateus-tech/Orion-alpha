import { Localizacao } from "./Player";

export interface Mission {

  id: string;

  titulo: string;

  descricao: string;

  localizacao: Localizacao & {

    raio: number;

  };

  progresso: number;

  status:
    | "pendente"
    | "concluida"
    | "sabotada";

  criadaEm: number;

}