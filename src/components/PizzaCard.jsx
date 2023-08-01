import { useContext } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import MyContext from "../context/MyContext";
import { Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const PizzaCard = () => {
  const { pizzas, cart, setCart } = useContext(MyContext);

  const handleAddToCart = (pizza) => {

    const existingPizza = cart.find((item) => item.id === pizza.id);

    if (existingPizza) {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === pizza.id ? { ...item, count: item.count + 1 } : item
        )
      );
    } else {

      setCart((prevCart) => [...prevCart, { ...pizza, count: 1 }]);
    }
  };

  return (
    <Container>
      <div className="cards-container">
        {pizzas.map((pizza) => (
          <Card key={pizza.id} style={{ width: '18rem' }}>
            <Card.Img variant="top" src={pizza.img} />
            <Card.Body>
              <Card.Title>{pizza.name}</Card.Title>
              <Card.Text>
                Ingredientes:
                <ul>
                  {pizza.ingredients.map((ingredient) => (
                    <li key={ingredient}>{ingredient}</li>
                  ))}
                </ul>
              </Card.Text>
              <Card.Text>
                Precio: {pizza.price}
              </Card.Text>
              <NavLink to={`/pizza/${pizza.id}`}>
                <Button variant="primary">Ver Más 👀</Button>
              </NavLink>
              <Button variant="danger" onClick={() => handleAddToCart(pizza)}>
                Añadir 🛒
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default PizzaCard;
