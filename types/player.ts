export interface Jogador {


  id:string;


  nome:string;


  papel?:

    "agente"

    |

    "infiltrado"

    |

    "comandante"

    |

    null;



  tipo?:

    string;



  status?:

    "ativo"

    |

    "eliminado"

    |

    "offline"

    |

    string;



  conectado?:

    boolean;



  localizacao?:

    {


      latitude:number;


      longitude:number;


      precisao?:number;



      atualizadoEm?:number;


    };


}