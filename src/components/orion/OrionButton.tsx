"use client";


interface OrionButtonProps {

  children: React.ReactNode;

  onClick?: () => void;

  secondary?: boolean;

  disabled?: boolean;

  className?: string;

}



export default function OrionButton({

  children,

  onClick,

  secondary = false,

  disabled = false,

  className = ""

}: OrionButtonProps){



  return (

    <button

      onClick={onClick}

      disabled={disabled}

      className={`
      
        w-full

        p-4

        rounded-xl

        font-black

        tracking-widest

        transition

        border

        ${
          secondary

          ?

          "bg-black border-cyan-400/40 text-cyan-300 hover:bg-cyan-400/10"

          :

          "bg-cyan-500 text-black hover:bg-cyan-400"

        }

        ${
          disabled

          ?

          "opacity-50 cursor-not-allowed"

          :

          ""

        }

        ${className}

      `}

    >

      {children}

    </button>

  );

}