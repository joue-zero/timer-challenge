import {useRef, useState} from "react";
import ResultModal from "./ResultModal.jsx";

export default function TimerChallenge({title, targetTime}) {
    const timer = useRef();
    const dialog = useRef();
    const [remainingTime, setRemainingTime] = useState(targetTime * 1000);

    const isTimerActive = remainingTime > 0 && remainingTime < targetTime * 1000;

    if(remainingTime <= 0){
        clearInterval(timer.current);
        dialog.current.open();
    }
    function handleStart(){
        timer.current = setInterval(() => {
            setRemainingTime(time => time-10)
        },10);
    }

    function handleReset(){
        setRemainingTime(1000 * targetTime);
    }
    function handleStop(){
        clearInterval(timer.current);
        dialog.current.open();
    }
    return (
        <>
        <ResultModal ref={dialog} result={"You won!"} targetTime={targetTime} remainingTime={remainingTime} onReset={handleReset}/>
        <section className="challenge">
            <h2>{title}</h2>
            {remainingTime <= 0 && "You Lost!"}
            <p className="challenge-time">
                {targetTime} second{targetTime === 1 ? "" : "s"}
            </p>
            <p>
                <button onClick={isTimerActive ? handleStop: handleStart }>
                    {isTimerActive || "Start Challenge"}
                    {isTimerActive && "Stop Challenge"}
                </button>
            </p>
            <p className={isTimerActive ? "active" : undefined}>
                {isTimerActive ? "Time Is Running" : "Timer Inactive"}
            </p>
        </section>
        </>
    );
}