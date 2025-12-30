import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  return (
    <div className="app">
      <EatNSplit />
    </div>
  );
}

function EatNSplit() {
  const [data, setData] = useState(initialFriends);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleOpenForm() {
    setIsOpen((show) => !show);
  }

  function handleAddFriend(name, image) {
    if (image.length === 0) image = name.slice(0, 1).toUpperCase();
    const newFriend = { id: Date.now(), name, image, balance: 0 };
    setData((date) => [...data, newFriend]);
  }

  function handleSelection(friend) {
    if (selectedFriend?.id !== friend.id) setSelectedFriend(friend);
    else setSelectedFriend(null);
  }

  function onSplitBill(friend) {
    setData((data) =>
      data.map((d) =>
        d.id === friend.id
          ? {
              ...d,
              balance: (d.balance += friend.balance),
            }
          : d
      )
    );
    setSelectedFriend(null);
  }

  return (
    <>
      <div className="sidebar">
        <Friends
          friends={data}
          selectedFriend={selectedFriend}
          onSelection={handleSelection}
        />
        {isOpen && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={handleOpenForm}>
          {!isOpen ? "Add Friend" : "Close"}
        </Button>
      </div>

      {selectedFriend && (
        <FormSplitBill
          key={selectedFriend.id}
          selectedFriend={selectedFriend}
          onSplitBill={onSplitBill}
        />
      )}
    </>
  );
}

function Friends({ friends, onSelection, selectedFriend }) {
  return (
    <>
      <ul>
        {friends.map((friend) => (
          <FriendsList
            selectedFriend={selectedFriend}
            onSelection={onSelection}
            friend={friend}
            key={friend.id}
          />
        ))}
      </ul>
    </>
  );
}

function FriendsList({ friend, onSelection, selectedFriend }) {
  return (
    <>
      <li>
        {friend.image.length === 1 ? (
          <span
            className="circle"
            style={{
              backgroundColor: `#${(friend.id & 0xffffff)
                .toString(16)
                .padStart(6, "0")}`,
            }}
          >
            {friend.image}
          </span>
        ) : (
          <img src={friend.image} alt={friend.name} />
        )}
        <h3>{friend.name}</h3>
        <p
          className={
            friend.balance > 0 ? "green" : friend.balance < 0 ? "red" : ""
          }
        >
          {friend.balance === 0
            ? `you and ${friend.name} are even`
            : friend.balance > 0
            ? `${friend.name} owes you ${friend.balance}$`
            : `you owe ${friend.name} ${Math.abs(friend.balance)}$`}
        </p>
        <Button onClick={() => onSelection(friend)}>
          {friend.id === selectedFriend?.id ? "Close" : "Select"}
        </Button>
      </li>
    </>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  function handleSubmitForm(e) {
    e.preventDefault();
    if (name.trim()) {
      onAddFriend(name, image);
      setName("");
      setImage("");
    }
  }

  return (
    <form
      className="form-add-friend"
      onSubmit={handleSubmitForm}
    >
      <label>🧑‍🤝‍🧑Friend Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Clark..."
      />

      <label>🖼️Image Url</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        placeholder="https://i.pravatar.cc/48?u=118836"
      />

      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState(0);
  const [expense, setExpense] = useState(0);
  const [selectedPayer, setSelectedPayer] = useState("0");

  function handleSplitBill(e) {
    e.preventDefault();
    if (bill <= 0) return;
    onSplitBill({
      id: selectedFriend.id,
      balance: selectedPayer === "0" ? bill - expense : expense - bill,
    });
    setBill(0);
    setExpense(0);
    setSelectedPayer("0");
  }

  return (
    <>
      <form
        className="form-split-bill"
        onSubmit={handleSplitBill}
      >
        <h2 style={{ textAlign: "center" }}>
          Split the bill with {selectedFriend.name}
        </h2>
        <label>💰 Bill Value</label>
        <input
          type="number"
          value={bill || ""}
          onChange={(e) => setBill(+e.target.value > 0 ? +e.target.value : 0)}
        />

        <label>💵 Your Expense</label>
        <input
          type="number"
          value={expense || ""}
          onChange={(e) =>
            setExpense(+e.target.value < bill ? +e.target.value : expense)
          }
        />

        <label>💶 {selectedFriend.name}'s Expense</label>
        <input type="number" disabled value={bill - expense} />

        <label>🤑 Who's Paying the bill?</label>
        <select
          value={selectedPayer}
          onChange={(e) => setSelectedPayer(e.target.value)}
        >
          <option value="0">You</option>
          <option value={selectedFriend.id}>{selectedFriend.name}</option>
        </select>

        <Button>Split Bill</Button>
      </form>
    </>
  );
}
