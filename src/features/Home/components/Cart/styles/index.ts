import styled from 'styled-components';
 /*
 Importante seguir el formato de nombres:
 - Terminar el css que es de estilo con Styled
 - Separar lógica de wrapped y de elementos
   Wrapped == Envoltura o Empaquetamiento -> En definitiva es un div más general que almacena elementos
 */
export const CartWrapperStyled = styled.div`
  height: 500px;
  overflow: auto;
  width: fit-content;
  background-color: rgba(50, 50, 50, 0.2);
  padding: 0 10px;
  border-radius: 5px;
  border: 1px solid grey;
`;

export const CartItemStyled = styled.div`
  flex: 1;
  display: inline-flex;
`;

export const DeleteIcon = styled.button`
  padding: 0 10px;
  border: none;
  background-color: rgba(50, 50, 50, 0);
`;

export const CartItemWrapperStyled = styled.div`
  padding: 10px;
  flex: 1;
`;