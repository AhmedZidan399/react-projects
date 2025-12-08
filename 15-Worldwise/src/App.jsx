import { BrowserRouter, Routes, Route, Form, Navigate } from "react-router-dom";
import CProvider from "./context/CProvider";

import Homepage from "./pages/Homepage";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import CitiesList from "./components/CitiesList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import MapForm from "./components/MapForm";
import AuthProvider from "./context/AuthProvider";
import ProtectedApp from "./pages/ProtectedApp";

export default function App() {
  return (
    <div>
      <CProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route index element={<Homepage />} />
              <Route path="/Product" element={<Product />} />
              <Route path="/Pricing" element={<Pricing />} />
              <Route path="/Login" element={<Login />} />
              <Route
                path="/app"
                element={
                  <ProtectedApp>
                    <AppLayout />
                  </ProtectedApp>
                }
              >
                <Route index element={<Navigate to="cities" replace />} />
                <Route path="cities" element={<CitiesList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<MapForm />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </CProvider>
    </div>
  );
}
