import { useState } from "react";

export default function App() {
    return <>
        <div className="container"
             style={ {
                 margin: "auto",
                 width: "50%",
                 textAlign: "center",
                 marginTop: "100px"
             } }>
            <Steps/>;
        </div>
    </>;
}

function Count() {
    const [step, setStep] = useState(1);
    const [count, setCount] = useState(0);

    const newDate = new Date();
    newDate.setDate(newDate.getDate() + count);

    return <>
        <div className="steps">
            <input
                type="range"
                min="1" max="10"
                value={ step }
                onChange={ e => setStep(+e.target.value) }
            />
            { step }
        </div>
        <div className="steps">
            <button
                onClick={ () => setCount(c => c - step) }
            >
                -
            </button>
            <input
                type="number"
                value={ count || "" }
                step={ step }
                onChange={ e => setCount(+e.target.value) }
            />
            <button
                onClick={ () => setCount(c => c + step) }
            >
                +
            </button>
        </div>
        <div className=" message">
            { (count === 0)
                ? `Today is `
                : count > 0
                    ? `${ count } days from today is `
                    : `${ Math.abs(count) } days ago is `
            }
            { newDate.toDateString() }
        </div>
        <button
            style={ (step === 1 && count === 0) ? { display: "none" } : {} }
            onClick={ () => {
                setStep(1);
                setCount(0);
            } }
        >Reset
        </button>
    </>;
}

function Steps() {
    const messages = [
        " Learn React ⚛️",
        "Apply for jobs 💼",
        "Invest your new income 🤑",
    ];
    const [step, setStep] = useState(1);
    const [open, setOpen] = useState(true);
    // bad practice
    // const [test] = useState({ name: "jonas" });

    function handlePrevious() {
        if (step > 1)
            setStep(c => c - 1);
    }

    function handleNext() {
        if (step < 3)
            setStep(c => c + 1);
        // test.name = 'fred';
    }

    return (
        <>
            <button className="close" onClick={ () => setOpen(o => !o) }>
                &times;
            </button>
            { open &&
                <div className="steps">
                    <div className="numbers">
                        <div
                            className={ step >= 1 ? "active" : "" }>1
                        </div>
                        <div
                            className={ step >= 2 ? "active" : "" }>2
                        </div>
                        <div
                            className={ step === 3 ? "active" : "" }>3
                        </div>
                    </div>

                    <div className="message">
                        step { step }: { messages[step - 1] }
                    </div>

                    <div className="buttons">
                        <Button textColor="#fff" bgColor="#7950f2"
                                onClick={ handlePrevious }
                        >
                            ⬅ Previous
                        </Button>
                        <Button textColor="#fff" bgColor="#7950f2"
                                onClick={ handleNext }
                        >
                            Next ➡
                        </Button>
                    </div>
                </div>
            }
        </>
    );
}

function Button({ textColor, bgColor, onClick, children }) {
    return <button
        className="button"
        style={ {
            backgroundColor: bgColor,
            color: textColor
        } }
        onClick={ onClick }
    >
        { children }
    </button>;
}
