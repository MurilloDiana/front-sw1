import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "Acordes en tus manos",
          "Afinando tu talento",
          "Lecciones en tu bolsillo",
          "Crea, toca, graba",
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default Type;
