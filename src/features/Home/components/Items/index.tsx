import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { ItemWrapperStyled, ItemDetailStyled, Button, ContainerStyled } from './styles';
import { getCart, ICartItem, IItem, updateCart } from '../../../../redux/cartSlice';

export type ItemsProps = {
  list: IItem[];
};

export const Items: React.FC<ItemsProps> = ({ list: arr = [] }) => {
  const dispatch = useAppDispatch();
  const cartList: ICartItem[] = useAppSelector(getCart);
  const [list, setList] = useState(arr);

  useEffect(() => {
    setList(arr);
  }, [arr]);

  const onAddItemToCart = (item: IItem) => {
    const index = cartList.findIndex((m) => m.id === item.id);
    if (index === -1) {
      dispatch(updateCart([...cartList, { ...item, quantity: 1 }]));
    } else {
      const tempNewCart = cartList.map((i) =>
        i.id == item.id ? { ...i, quantity: i.quantity + 1 } : i
      );
      dispatch(updateCart(tempNewCart));
    }
  };

  return (
    <ContainerStyled data-testid="container-item">
      {list.map((item, i) => (
        <ItemWrapperStyled key={i}>
          <ItemDetailStyled>
            {item.name} (${item.price})
          </ItemDetailStyled>
          <Button onClick={() => onAddItemToCart(item)}>Add to Cart</Button>
        </ItemWrapperStyled>
      ))}
    </ContainerStyled>
  );
};
