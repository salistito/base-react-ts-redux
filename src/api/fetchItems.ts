/* istanbul ignore file */
import { IItem } from '../redux/cartSlice';
import { cartItems } from '../__mock__/cartItems';

const delay = 1000; //1s

// Promesas representa un resultado eventual de una operación asincrónica (en este caso recuperar items)
// Las promesas pueden estar en 3 estados pending, fulfilled y rejected
// Sintaxis: new Promise( /* ejecutor */ function(resolver, rechazar) { ... } );
/*
let miPrimeraPromise = new Promise((resolve, reject) => {
  // Llamamos a resolve(...) cuando lo que estabamos haciendo finaliza con éxito, y reject(...) cuando falla.
  // En este ejemplo, usamos setTimeout(...) para simular código asíncrono.
  // En la vida real, probablemente uses algo como XHR o una API HTML5.
  setTimeout(function(){
    resolve("¡Éxito!"); // ¡Todo salió bien!
  }, 250);
});
*/
export const fetchItems = () => {
  return new Promise<IItem[]>((resolve) => {
    setTimeout(() => {
      resolve(cartItems);
    }, delay);
  });
};
