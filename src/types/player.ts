export interface Localizacao {
  latitude: number;
  longitude: number;
}

export type Papel =
  | "agente"
  | "infiltrado"
  | "hacker";

export type Tipo =
  | "comandante"
  | "agente";


export interface Jogador {

  id: string;

  nome: string;

  papel: Papel;

  tipo: Tipo;

  conectado: boolean;

  entrouNaPartida: boolean;

  status: "ativo" | "morto";

  /**
   * Compatibilidade com módulos antigos.
   */
  vivo?: boolean;

  localizacao?: Localizacao;

}


/**
 * Compatibilidade com engines antigas do ORION.
 * Alguns módulos usam Player, outros usam Jogador.
 */
export type Player = Jogador;