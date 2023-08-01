import { useContext } from 'react';
import MyContext from '../context/MyContext';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const Pizza = () => {
  const { pizzas, cart, setCart } = useContext(MyContext);
  const { id } = useParams();

  const pizza = pizzas.find((pizza) => pizza.id === id);

  if (!pizza) {
    return <p>Pizza no encontrada.</p>;
  }

  const handleAddToCart = () => {
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
    <div className="detail">
      <img className="img-detail" src={pizza.img} alt={pizza.name} />
      <div className="info-detail">
        <h2>{pizza.name}</h2>
        <p>Descripción: {pizza.desc}</p>
        <p>Ingredientes:</p>
        <ul>
          {pizza.ingredients.map((ingredient) => (
            <li key={ingredient}>{ingredient}</li>
          ))}
        </ul>
        <p>Precio: {pizza.price}</p>
        <Button className="mb-5" variant="danger" onClick={handleAddToCart}>
          Añadir 🛒
        </Button>
      </div>
    </div>
  );
};

export default Pizza;
