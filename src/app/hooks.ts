import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Para la integración con los componentes se utiliza dos hooks: useAppDispatch y useAppSelector
// Para manejar los estados de nuestro store, se hace por medio de los hooks.
// useAppDispatch ejecuta una acción (actions) definida en un slice (ejecutar funciones que se gatillan dentro del reducer).
// useAppSelector se usa para ejecutar un selector (selectors) definido en un slice (obtener data del reducer).

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
