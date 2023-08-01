import { useContext } from 'react';
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import MyContext from '../context/MyContext';

const Navigation = () => {
  const { cart } = useContext(MyContext);

  const getTotalValue = () => {
    return cart.reduce((total, item) => total + item.price * item.count, 0);
  };

  const total = getTotalValue();

  const aux = 'ms-3 text-decoration-none';
  const setActiveClass = ({ isActive }) => (isActive ? `text-white ${aux}` : `text-secondary ${aux}`);

  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand>
          <NavLink to="/" className="text-white ms-3 text-decoration-none">🍕 Pizzería Mamma Mia!</NavLink>
        </Navbar.Brand>
        <Nav className="ms-auto">
          <NavLink to="/carrito" className={setActiveClass}>
            🛒 ${total}
          </NavLink>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Navigation;
