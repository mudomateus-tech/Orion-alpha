"use client";

interface OrionButtonProps {

  children: React.ReactNode;

  onClick?: () => void;

  variant?: "normal" | "danger";

  className?: string;

}



export default function OrionButton({

  children,

  onClick,

  variant = "normal",

  className = ""

}: OrionButtonProps){


  return (

    <button

      onClick={onClick}

      className={`

        relative

        overflow-hidden

        w-full

        rounded-xl

        px-5

        py-3

        font-bold

        tracking-widest

        uppercase

        transition-all

        duration-300

        border


        ${
          variant === "danger"

          ?

          `

          border-red-500/60

          text-red-400

          shadow-[0_0_25px_rgba(255,0,0,0.35)]

          hover:bg-red-500/10

          `

          :

          `

          border-cyan-400/60

          text-cyan-300

          shadow-[0_0_25px_rgba(0,220,255,0.35)]

          hover:bg-cyan-400/10

          `

        }


        hover:scale-[1.02]

        active:scale-95

        ${className}

      `}

    >


      <span

        className="

          relative

          z-10

        "

      >

        {children}

      </span>



      <span

        className="

          absolute

          inset-0

          bg-gradient-to-r

          from-transparent

          via-white/10

          to-transparent

          translate-x-[-100%]

          hover:translate-x-[100%]

          transition-transform

          duration-700

        "

      />


    </button>

  );

}