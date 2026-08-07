export interface Sala {

  id: string;

  nome: string;

  x: number;

  y: number;

  largura: number;

  altura: number;

}

export interface Parede {

  id: string;

  x1: number;

  y1: number;

  x2: number;

  y2: number;

}

export interface Porta {

  id: string;

  paredeId: string;

  posicao: number;

}

export interface MissaoMapa {

  id: string;

  titulo: string;

  tipo: string;

  x: number;

  y: number;

}

export interface Mapa {

  id: string;

  nome: string;

  largura: number;

  altura: number;

  salas: Sala[];

  paredes: Parede[];

  portas: Porta[];

  missoes: MissaoMapa[];

}