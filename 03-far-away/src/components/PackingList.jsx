import { useState } from "react";
import { Item } from "./Item.jsx";

export function PackingList({
                                items,
                                onDeleteItem,
                                onUpdateItem,
                                onClearList
                            }) {
    const [sortBy, setSortBy] = useState("input");
    if (sortBy === "input")
        items.sort((a, b) => b.id - a.id);
    else if (sortBy === "description")
        items.sort((a, b) => a.description.localeCompare(b.description));
    else
        items.sort((a, b) => a.packed - b.packed);

    return <div className="list">
        <ul>{
            items.map(item => <Item item={ item }
                                    onDeleteItem={ onDeleteItem }
                                    onUpdateItem={ onUpdateItem }
                                    key={ item.id }/>)
        }
        </ul>

        <div className="actions">
            <select value={ sortBy }
                    onChange={ (e) => setSortBy(e.target.value) }>
                <option value="input">Sort By Input Order desc</option>
                <option value="description">Sort By Description</option>
                <option value="status">Sort By Packed Status</option>
            </select>
            <button className="clearAll" onClick={ onClearList }>
                Clear List
            </button>
        </div>
    </div>;
}