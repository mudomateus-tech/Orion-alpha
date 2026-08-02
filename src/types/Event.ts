export type EventType =

  | "missao_concluida"
  | "sabotagem_iniciada"
  | "sabotagem_resolvida"
  | "jogador_eliminado"
  | "reuniao_iniciada"
  | "jogo_finalizado";




export interface GameEvent {

  id:string;

  tipo:EventType;

  titulo:string;

  descricao:string;

  jogadorId:string;

  criadoEm:number;

}