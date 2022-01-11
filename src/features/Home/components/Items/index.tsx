import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { ItemWrapperStyled, ItemDetailStyled, Button, ContainerStyled } from './styles';
import { getCart, ICartItem, IItem, updateCart } from '../../../../redux/cartSlice';

// Para la integración con los componentes se utiliza dos hooks: useAppDispatch y useAppSelector
// Para manejar los estados de nuestro store, se hace por medio de los hooks.
// useAppDispatch ejecutar a una acción (actions) definida en un slice y con useAppSelector se usa para ejecutar a un selector (selectors) definido en un slice.

export type ItemsProps = {
  list: IItem[];
};

export type ItemWrapperProps = {
  color: string;
};

export const Items: React.FC<ItemsProps> = ({ list: arr }) => {
  const dispatch = useAppDispatch();
  const cartList: ICartItem[] = useAppSelector(getCart); // Obtiene el cart del store en cartSlice (getCart retorna la cartList)
  const [list, setList] = useState(arr);

  useEffect(() => {
    setList(arr);
  }, [arr]);

  const onAddItemToCart = (item: IItem) => {
    const index = cartList.findIndex((m) => m.id === item.id);
    if (index === -1) { // No se encontró el elemento (primera vez que se ingresa un elemento)
      dispatch(updateCart([...cartList, { ...item, quantity: 1 }]));
    } else { // Si el elemento ya existe se crea un nuevo array y se le suma 1 a la cantidad encontrada
      const tempNewCart = cartList.map((element) =>
        element.id == item.id ? { ...element, quantity: element.quantity + 1 } : element
      );
      dispatch(updateCart(tempNewCart));
    }
  };

  // Botón Add to Cart invoca la función onAddItemToCart que genera un updateCart, actualizando así el carrito
  return (
    <ContainerStyled data-testid="container-item">
      {list.map((item, i) => (
        <ItemWrapperStyled key={i} color="white">
          <ItemDetailStyled>
            {item.name} (${item.price})
          </ItemDetailStyled>
          <Button onClick={() => onAddItemToCart(item)}>Add to Cart</Button>
        </ItemWrapperStyled>
      ))}
    </ContainerStyled>
  );
};
