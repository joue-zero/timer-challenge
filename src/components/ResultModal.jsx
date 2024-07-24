import {forwardRef, useImperativeHandle, useRef} from "react";
import {createPortal} from "react-dom";

const ResultModal = forwardRef(({targetTime, remainingTime, onReset}, ref) =>{
    const dialog = useRef();
    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal();
            }
        };
    });
    let lost = remainingTime <= 0;
    const remainingSeconds = (remainingTime / 1000).toFixed(2);
    const score = ((1 - remainingTime / (targetTime * 1000)) * 100).toFixed(2);
    return createPortal(
        <dialog ref={dialog} className="result-modal" onClose={onReset}>
            {lost && <h2 style={{color: "deeppink" } }>You Lost !</h2>}
            {lost || <h2>Your score: {score} %</h2>}
            <p>
                The Target Time Was <strong>{targetTime} seconds.</strong>
            </p>
            <p>
                You Stopped The Timer With <strong>{remainingSeconds} Seconds Left.</strong>
            </p>
            <form method="dialog"> {/*This to close the dialog*/}
                <button>Close</button>
            </form>
        </dialog>,
        document.getElementById("modal")
    );
});

export default ResultModal;