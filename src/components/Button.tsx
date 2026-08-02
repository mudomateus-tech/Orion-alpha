"use client";


export default function Button({

  children,

  onClick,

  className="",

  variant="default"

}:any){



  const estilo =

    variant === "danger"

    ?

    "bg-red-600 hover:bg-red-700"

    :

    "bg-blue-600 hover:bg-blue-700";





  return (

    <button

      onClick={onClick}

      className={`
      
      ${estilo}

      text-white

      font-bold

      rounded-xl

      p-3

      transition

      ${className}

      `}

    >

      {children}

    </button>

  );


}