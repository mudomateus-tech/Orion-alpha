"use client";


interface OrionRadarProps {

  children?: React.ReactNode;

}



export default function OrionRadar({

  children

}: OrionRadarProps){


  return (

    <div

      className="
        relative
        w-72
        h-72
        rounded-full
        border
        border-cyan-400/30
        flex
        items-center
        justify-center
      "

    >


      <div

        className="
          absolute
          inset-8
          rounded-full
          border
          border-cyan-400/20
        "

      />


      <div

        className="
          absolute
          inset-20
          rounded-full
          border
          border-cyan-400/20
        "

      />


      <div

        className="
          absolute
          w-full
          h-[1px]
          bg-cyan-400/30
        "

      />


      <div

        className="
          absolute
          h-full
          w-[1px]
          bg-cyan-400/30
        "

      />


      {children}


    </div>

  );

}