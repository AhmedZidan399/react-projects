import { useState } from "react";

export function Form({ onAddItem }) {
    const [input, setInput] = useState("");
    const [select, setSelect] = useState(1);

    function handleSubmit(e) {
        e.preventDefault();
        if (!input.trim()) return;

        const newItem = {
            id: Date.now(),
            description: input.trim(),
            quantity: select,
            packed: false
        };
        onAddItem(newItem);
        setInput("");
        setSelect(1);
    }

    return <form className="add-form" onSubmit={ handleSubmit }>
        <h3>What do you need for your 😍 trip?</h3>
        <select value={ select } name="category"
                onChange={ (e) => setSelect(+e.target.value) }>
            {
                Array.from({ length: 20 }, (_, i) => i + 1).map(
                    i => <option key={ i } value={ i }>{ i }</option>
                )
            }
        </select>
        <input value={ input } type="text" placeholder="items"
               onInput={ (e) => setInput(e.target.value) }/>
        <button>Add</button>
    </form>;
}