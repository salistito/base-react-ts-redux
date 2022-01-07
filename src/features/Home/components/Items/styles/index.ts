/* istanbul ignore file */
import styled from 'styled-components';
import { ItemWrapperProps } from '..';

export const ContainerStyled = styled.div`
  display: block;
  background-color: white;
`;

export const ItemWrapperStyled = styled.div<ItemWrapperProps>`
  padding: 5px;
  background-color: ${(props) => props.color};
`;

export const ItemDetailStyled = styled.div`
  display: inline-flex;
  height: 30px;
`;

export const Button = styled.button`
  padding: 5px;
  margin: 0 10px;
`;
