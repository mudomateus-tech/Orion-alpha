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

export type StatusJogador =
  | "ativo"
  | "morto"
  | "fantasma";

export interface Jogador {

  id: string;

  nome: string;

  papel: Papel;

  tipo: Tipo;

  conectado: boolean;

  entrouNaPartida: boolean;

  status: StatusJogador;

  vivo?: boolean;

  localizacao?: Localizacao;

}

export type Player = Jogador;