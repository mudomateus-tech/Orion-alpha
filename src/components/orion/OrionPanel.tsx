"use client";

interface OrionPanelProps {

  title?: string;

  children: React.ReactNode;

  className?: string;

}


export default function OrionPanel({

  title,

  children,

  className = ""

}:OrionPanelProps){


  return (

    <section

      className={`
        relative
        overflow-hidden
        rounded-2xl
        border
        border-cyan-400/40
        bg-black/70
        backdrop-blur-xl
        shadow-[0_0_25px_rgba(0,200,255,0.25)]
        p-5
        ${className}
      `}

    >


      <div

        className="
          absolute
          inset-0
          pointer-events-none
          bg-gradient-to-br
          from-cyan-400/10
          via-transparent
          to-blue-600/10
        "

      />



      {

        title &&

        <div

          className="
            relative
            mb-4
            text-cyan-300
            font-bold
            tracking-[0.25em]
            uppercase
            text-sm
          "

        >

          {title}


        </div>

      }



      <div className="relative">

        {children}

      </div>



    </section>

  );

}