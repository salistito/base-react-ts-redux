import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { HomeStyled, HomeWrapperStyled } from './styles';
import { Items } from './components/Items';
import { fetchItemsAsync, getItems, getItemsStatus } from '../../redux/cartSlice';
import { Cart } from './components/Cart';

const Home = () => {
  const dispatch = useAppDispatch();
  const itemList = useAppSelector(getItems);
  const status = useAppSelector(getItemsStatus);

  useEffect(() => {
    dispatch(fetchItemsAsync());
  }, []);

  const Loading = () => (
    <div data-testid="el_loading">
      <p>Loading...</p>
    </div>
  );

  return (
    <>
      {status === 'loading' ? (
        <Loading />
      ) : (
        <HomeWrapperStyled>
          <h1>Tienda</h1>
          <HomeStyled>
            <Items list={itemList} />
            <Cart data-testid="cart-component" />
          </HomeStyled>
        </HomeWrapperStyled>
      )}
    </>
  );
};

export default Home;
