"use client";


interface OrionRadarProps {

  titulo?:string;

  children:React.ReactNode;

}



export default function OrionRadar({

  titulo="TACTICAL MAP",

  children

}:OrionRadarProps){


  return (


    <section

      className="

        relative

        overflow-hidden

        rounded-3xl

        border

        border-cyan-400/50

        bg-black

        shadow-[0_0_40px_rgba(0,220,255,0.25)]

        p-3

      "

    >



      <div

        className="

          absolute

          inset-0

          opacity-20

          bg-[linear-gradient(#00ffff33_1px,transparent_1px),linear-gradient(90deg,#00ffff33_1px,transparent_1px)]

          bg-[size:40px_40px]

        "

      />




      <div

        className="

          relative

          z-10

        "

      >



        <div

          className="

            flex

            justify-between

            items-center

            mb-3

          "

        >



          <h2

            className="

              text-cyan-300

              font-black

              tracking-[0.35em]

              text-xs

            "

          >

            ORION //

            {" "}

            {titulo}


          </h2>



          <span

            className="

              text-green-400

              text-xs

              tracking-widest

            "

          >

            ONLINE

          </span>



        </div>




        <div

          className="

            rounded-2xl

            overflow-hidden

            border

            border-cyan-400/30

          "

        >

          {children}


        </div>



      </div>



    </section>


  );


}