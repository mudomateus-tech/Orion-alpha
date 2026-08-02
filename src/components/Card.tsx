"use client";

import type {
  ReactNode
} from "react";



interface CardProps {

  children: ReactNode;

  className?: string;

  title?: string;

}



export default function Card({

  children,

  className = "",

  title

}: CardProps){



  return (

    <section

      className={`
      
        bg-zinc-900
        border
        border-zinc-800
        rounded-2xl
        p-6
        shadow-lg
        ${className}

      `}

    >

      {

        title &&

        (

          <h2

            className="
              text-xl
              font-bold
              mb-4
              text-white
            "

          >

            {title}

          </h2>

        )

      }



      <div

        className="
          text-zinc-200
        "

      >

        {children}

      </div>



    </section>

  );


}