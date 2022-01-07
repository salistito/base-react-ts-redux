import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { getCart, ICartItem, updateCart } from '../../../../redux/cartSlice';
import { CartItemStyled, CartItemWrapperStyled, CartWrapperStyled, DeleteIcon } from './styles';

export const Cart = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(getCart);

  const getTotal = (list) => {
    const total = list.reduce((current, next) => current + next.price * next.quantity, 0);
    return total;
  };

  const onDeleteItem = (item: ICartItem) => {
    const tempNewCart: ICartItem[] = [];
    cartItems.forEach((i) => {
      if (i.id === item.id) {
        i.quantity !== 1 && tempNewCart.push({ ...i, quantity: i.quantity - 1 });
      } else {
        tempNewCart.push(i);
      }
    });

    dispatch(updateCart(tempNewCart));
  };

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
