import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";

import Navigation from "./components/Navigation";
import Home from "./views/Home";
import Carrito from "./views/Carrito";
import NotFound from "./views/NotFound";

import pizzas from "./assets/pizzas.json";
import MyContext from "./context/MyContext";
import Pizza from "./views/Pizza";

const App = () => {
  const [cart, setCart] = useState([]);

  const getTotalValue = useCallback(() => {
    return cart.reduce((total, item) => total + item.price * item.count, 0);
  }, [cart]);

  const [total, setTotal] = useState(getTotalValue);

  useEffect(() => {
    setTotal(getTotalValue);
  }, [cart, getTotalValue]);

  return (
    <MyContext.Provider value={{ cart, setCart, pizzas }}>
      <BrowserRouter>
        <Navigation total={total} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pizza/:id" element={<Pizza />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </MyContext.Provider>
  );
};

export default App;
