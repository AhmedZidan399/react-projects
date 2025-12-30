import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from "./App.jsx";

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "src/assets/pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "src/assets/pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "src/assets/pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "src/assets/pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "src/assets/pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "src/assets/pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="header">
      <h1>FAST REACT PIZZA CO.</h1>
    </header>
  );
}

function Footer() {
  const dateNow = new Date().getHours();
  const start = 12;
  const close = 20;
  const isOpen = dateNow >= start && dateNow <= close;

  return (
    <h1 className="footer">
      {isOpen ? (
        <div className="order">
          <p>We're Currently Open, Come to Visit Us Or Order Online Now.</p>
          <button className="btn">Order Now</button>
        </div>
      ) : (
        "We're Closed, Please Visit Us Later :)"
      )}
    </h1>
  );
}

function Menu() {
  return (
    <div className="menu">
        <h2>Our Menu</h2>
        {pizzaData.length > 0 ? (
            <>
                <p>Authentic Italian cuisine, six creative dishes to choose. All from our stone even, all organic, all origin.</p>
                <ul className="pizzas">
                    { pizzaData.map((pizza) => <Pizza pizza={ pizza } key={ pizza.name }/>) }
                 </ul>
            </>
        ) : (
            <p>We're Worked on it, Please Visit Us Later :).</p>
            )}
    </div>
  );
}

function Pizza({ pizza }) {
  return (
    <div className={ `pizza ${pizza.soldOut ? "sold-out" : ''}` }>
      <img src={pizza.photoName} alt="Pizza Margherita" />
      <div>
        <h1>{pizza.name}</h1>
        <p>{pizza.ingredients}</p>
        <span>{pizza.soldOut ? "SOLD OUT" : pizza.price}</span>
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
