import { useEffect } from "react";
import { GlobalContext } from "./CContext";
import { useReducer } from "react";

const BASE_URL = "http://localhost:3001";

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_CITIES":
      return {
        ...state,
        cities: action.payload.data,
        currentCity: action.payload.current
          ? action.payload.current
          : state.currentCity,
      };
    case "SET_CURRENT_CITY":
      return {
        ...state,
        currentCity: action.payload,
      };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };
  }
}

function CProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  async function crudOperation(doOperation) {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      await doOperation();
    } catch (err) {
      console.error(err.message);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }

  // fetch all cities
  useEffect(function () {
    async function fetchCities() {
      const res = await fetch(`${BASE_URL}/cities`);
      const data = await res.json();
      dispatch({ type: "SET_CITIES", payload: { data } });
    }
    crudOperation(fetchCities);
  }, []);

  async function getCity(id) {
    if (id === +state.currentCity.id) return;
    const res = await fetch(`${BASE_URL}/cities/${id}`);
    const data = await res.json();
    dispatch({ type: "SET_CURRENT_CITY", payload: data });
  }

  async function createCity(newCity) {
    const res = await fetch(`${BASE_URL}/cities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCity),
    });
    const data = await res.json();
    dispatch({
      type: "SET_CITIES",
      payload: { current: data, data: [...state.cities, data] },
    });
  }

  async function deleteCity(id) {
    await fetch(`${BASE_URL}/cities/${id}`, {
      method: "DELETE",
    });
    const data = state.cities.filter((city) => city.id !== id);
    dispatch({ type: "SET_CITIES", payload: { data } });
  }

  return (
    <GlobalContext.Provider
      value={{
        cities: state.cities,
        isLoading: state.isLoading,
        currentCity: state.currentCity,
        crudOperation,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default CProvider;
