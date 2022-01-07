import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { HomeStyled } from './styles';
import { Items } from './components/Items';
import { fetchItemsAsync, getItems, getItemsStatus } from '../../redux/cartSlice';

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
        <>
          <h1>Tienda</h1>
          <HomeStyled>
            <Items list={itemList} />
            {/* <Cart data-testid="cart-component" /> */}
          </HomeStyled>
        </>
      )}
    </>
  );
};

export default Home;
