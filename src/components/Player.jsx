import {useRef, useState} from "react";
import ResultModal from "./ResultModal.jsx";

export default function Player() {
  const playerName = useRef();
  const [enteredPlayerName, setEnteredPlayerName] = useState(null);
  function handleClickButton(){
      setEnteredPlayerName(playerName.current.value);
  }
  return (
      /*
      * the difference between ?? and || is that
      * ?? checks for null or undefined
      * || checks for falsy values
      * */
    <section id="player">
      <h2>Welcome {enteredPlayerName || "unknown entity"}</h2>
      <p>
        <input type="text" ref={playerName}/>
        <button onClick={handleClickButton}>Set Name</button>
      </p>
    </section>
  );
}
