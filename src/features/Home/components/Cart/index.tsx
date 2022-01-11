import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { getCart, ICartItem, updateCart } from '../../../../redux/cartSlice';
import { CartItemStyled, CartItemWrapperStyled, CartWrapperStyled, DeleteIcon } from './styles';

export const Cart = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(getCart);

  const getTotal = (list) => {
    const total = list.reduce((current, next) => current + next.price * next.quantity, 0); // array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
    return total;
  };

  const onDeleteItem = (item: ICartItem) => {
    const tempNewCart: ICartItem[] = []; // array temporal para actualizar los items del carro
    cartItems.forEach((i) => {  // iteramos sobre los items antiguos
      if (i.id === item.id) { // si coinciden los id
        i.quantity !== 1 && tempNewCart.push({ ...i, quantity: i.quantity - 1 }); // quitarle una aparición (restar cantidad en 1)
      } else { // si no coinciden los id
        tempNewCart.push(i); // mantenerlo en el array
      }
    });

    dispatch(updateCart(tempNewCart));
  };

  // {cartItems.length === 0 && <CartItemStyled>Carrito Vacío</CartItemStyled>} -> solo si el carro está vacío
  return (
    <CartWrapperStyled data-testid="cart-item">
      {cartItems.length === 0 && <CartItemStyled>Carrito Vacío</CartItemStyled>}
      <div data-testid="cart-items-list">
        {cartItems.map((item, i) => (
          <CartItemWrapperStyled key={i}>
            <CartItemStyled>
              <p>
                {item.name} x {item.quantity} = {item.quantity * item.price}
              </p>
              <DeleteIcon onClick={() => onDeleteItem(item)}>🗑</DeleteIcon>
            </CartItemStyled>
          </CartItemWrapperStyled>
        ))}
      </div>
      <p>_______________________________</p>
      <p>
        <span>Total: </span>
        <b>{getTotal(cartItems)}</b>
      </p>
    </CartWrapperStyled>
  );
};