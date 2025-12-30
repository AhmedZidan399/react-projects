import { useState } from "react";
import { Logo } from "./Logo.jsx";
import { Form } from "./Form.jsx";
import { Stats } from "./Stats.jsx";
import { PackingList } from "./PackingList.jsx";

export default function App() {
    // GLOBAL STATE
    const [items, setItems] = useState([]);

    function handleAddItem(item) {
        setItems(items => [...items, item]);
    }

    function handleDeleteItem(id) {
        setItems(items => items.filter(item => item.id !== id));
    }

    function handleUpdateItem(id) {
        setItems(items => items.map(item => item.id === id ? {
            ...item,
            packed: !item.packed
        } : item));
    }

    function handleClearList() {
        if (items.length)
            confirm("Are you sure you want to clear all items?") && setItems([]);
    }

    const packedItems = items.filter(item => item.packed);

    return <div className="app">
        <Logo/>
        <Form onAddItem={ handleAddItem }/>
        <PackingList items={ items } onDeleteItem={ handleDeleteItem }
                     onUpdateItem={ handleUpdateItem }
                     onClearList={ handleClearList }/>
        <Stats itemsCount={ items.length } itemsPacked={ packedItems.length }/>
    </div>;
}