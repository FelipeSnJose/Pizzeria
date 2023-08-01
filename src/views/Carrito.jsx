import { useContext } from 'react';
import { Button, Table } from 'react-bootstrap';
import MyContext from '../context/MyContext';

const Carrito = () => {
  const { cart, setCart } = useContext(MyContext);

  const getTotalValue = () => {
    return cart.reduce((total, item) => total + item.price * item.count, 0);
  };

  const total = getTotalValue();

  const handleIncrease = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, count: item.count + 1 } : item
      )
    );
  };

  const handleDecrease = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, count: Math.max(0, item.count - 1) } : item
      ).filter((item) => item.count > 0)
    );
  };

  const handleRemove = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleGoToPayment = () => {
    handleClearCart();
    alert('Muchas gracias por su preferencia');
  };

  return (
    <div className="mt-5">
      <h1>Carrito de Compras</h1>
      {cart.length === 0 ? (
        <p>No hay pizzas en el carrito.</p>
      ) : (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Cantidad</th>
                <th>Precio Unitario</th>
                <th>Subtotal</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>
                    <Button variant="outline-primary" onClick={() => handleDecrease(item.id)}>-</Button>
                    <span className="mx-2">{item.count}</span>
                    <Button variant="outline-primary" onClick={() => handleIncrease(item.id)}>+</Button>
                  </td>
                  <td>${item.price}</td>
                  <td>${item.price * item.count}</td>
                  <td>
                    <Button variant="danger" onClick={() => handleRemove(item.id)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button variant="danger" onClick={handleClearCart}>Vaciar Carrito</Button>
          <Button variant="success" onClick={handleGoToPayment}>Ir a Pagar</Button>
          <h4>Total: ${total}</h4>
        </>
      )}
    </div>
  );
};

export default Carrito;
