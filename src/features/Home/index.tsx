import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { HomeStyled } from './styles';
import { Items } from './components/Items';
import { fetchItemsAsync, getItems } from '../../redux/cartSlice';

const Home = () => {
  const dispatch = useAppDispatch();
  const itemList = useAppSelector(getItems);

  useEffect(() => {
    dispatch(fetchItemsAsync());
  }, []);

  return (
    <>
      <h1>Tienda</h1>
      <HomeStyled>
        <Items list={itemList} />
        {/* <Cart data-testid="cart-component" /> */}
      </HomeStyled>
    </>
  );
};

export default Home;
