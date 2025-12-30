import { useState } from "react";

export default function App() {
    const [bill, setBill] = useState(0);
    const [yourService, setYourService] = useState(0);
    const [yourFriendsService, setYourFriendsService] = useState(0);

    function handleReset() {
        setBill(0);
        setYourService(0);
        setYourFriendsService(0);
    }

    return <>
        <Bill bill={ bill } setBill={ setBill }/>
        <Service
            service={ yourService }
            setService={ setYourService }
        >
            How did you like the service?
        </Service>
        <Service
            service={ yourFriendsService }
            setService={ setYourFriendsService }
        >
            How did your friends like the service?
        </Service>
        <Results
            bill={ bill }
            yourService={ yourService }
            yourFriendsService={ yourFriendsService }
            onReset={ handleReset }
        />
    </>;
}

function Bill({ bill, setBill }) {
    return <div className="bill">
        <h2 style={ { display: "inline-block" } }>How much was the bill?</h2>
        <input type="number" min={ 0 } value={ bill || "" }
               onChange={ (e) => setBill(+e.target.value) }/>
    </div>;
}

function Service({ service, setService, children }) {
    return <div className="service">
        <h2 style={ { display: "inline-block" } }>
            { children }
        </h2>
        <select
            value={ service }
            onChange={ (e) => setService(+e.target.value) }
        >
            <option value="0">Dissatisfied (0%)</option>
            <option value="5">It was Okay (5%)</option>
            <option value="10">It was good (10%)</option>
            <option value="20">Absolutely amazing (20%)</option>
        </select>
    </div>;
}

function Results({ bill, yourService, yourFriendsService, onReset }) {
    const totalTip = Math.round(((yourFriendsService + yourService) / 2 / 100) * Math.abs(bill));
    const total = Math.abs(bill) + totalTip;

    return <div className="results">
        { !bill
            ? <h3>answer to start calc 🚀</h3>
            :
            <div>
                <h3>
                    You Pay ${ total } (${ Math.abs(bill) } + ${ totalTip } tip)
                    😊
                </h3>
                <button onClick={ onReset }>Reset</button>
            </div>
        }
    </div>;
}