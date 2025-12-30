import { useState } from "react";

export function AappV1() {
    return <>
        <div className="container"
             style={ {
                 margin: "auto",
                 width: "50%",
                 textAlign: "center",
                 marginTop: "100px"
             } }>
            <Count/>;
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
            <button
                onClick={ () => step > 1 ? setStep(c => c - 1) : "" }
            >
                -
            </button>
            <span style={ { margin: "0 5px" } }>step: { step }</span>
            <button
                onClick={ () => setStep(c => c + 1) }
            >
                +
            </button>
        </div>
        <div className="steps">
            <button
                onClick={ () => setCount(c => c - step) }
            >
                -
            </button>
            <span style={ { margin: "0 5px" } }>count: { count }</span>
            <button
                onClick={ () => setCount(c => c + step) }
            >
                +
            </button>
        </div>
        <div className="message">
            { (count === 0)
                ? `Today is `
                : count > 0
                    ? `${ count } days from today is `
                    : `${ Math.abs(count) } days ago is `
            }
            { newDate.toDateString() }
        </div>
    </>;
}

function Steps() {
    const messages = [
        "Learn React ⚛️",
        "Apply for jobs 💼",
        "Invest your new income 🤑",
    ];
    const [step, setStep] = useState(1);
    const [open, setOpen] = useState(true);
    // bad practice
    // const [test] = useState({name: 'jonas'});

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
                        <button
                            className="button"
                            style={ {
                                backgroundColor: "#7950f2",
                                color: "#fff"
                            } }
                            onClick={ handlePrevious }
                        >
                            Previous
                        </button>
                        <button
                            className="button"
                            style={ {
                                backgroundColor: "#7950f2",
                                color: "#fff"
                            } }
                            onClick={ handleNext }
                        >
                            Next
                        </button>
                    </div>
                </div>
            }
        </>
    );
}
