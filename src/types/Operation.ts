import { Player } from "./Player";
import { Mission } from "./Mission";
import { Sabotage } from "./Sabotage";
import { Meeting } from "./Meeting";


export interface Operation {

  id: string;

  codigo: string;

  nome: string;

  status: string;

  comandanteId: string;

  jogadores: Player[];

  missoes: Mission[];

  sabotagem?: Sabotage;

  meeting?: Meeting;

  configuracao: {

    quantidadeMissoes: number;

    quantidadeInfiltrados: number;

    raioMissao: number;

    tempoSabotagem: number;

  };

}


/**
 * Compatibilidade ORION
 * Alguns arquivos usam Operation,
 * outros usam Operacao.
 */
export type Operacao = Operation;