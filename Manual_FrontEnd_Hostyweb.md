# Manual de programación y buenas practicas

![HelloWorld](https://cdn-images-1.medium.com/max/1600/1*U-R58ahr5dtAvtSLGK2wXg.png)

> Este documento centraliza los acuerdos establecidos por el equipo de desarrollo de Journeys con respecto a la construcción de soluciones tecnológica de tipo `Frontend`. Con el objetivo de guiar a sus integrantes y dar a conocer las buenas practicas que como equipo entramos relevantes.

Para garantizar la escalabilidad o crecimiento de nuestros desarrollos, aconsejamos:

- Identificar y distribuir las responsabilidades de la lógica que vamos a construir en nuestros desarrollos.
- Mantener _siempre_ una "**Alta Cohesión** y **Bajo Acoplamiento**".

Potenciamos el uso de [ES6](https://www.w3schools.com/js/js_es6.asp).

[TOC]

## Acuerdo generales de formato

- Las **variables** y **funciones** `camelCase`. _Ejemplo:_ `myVariable`.
- Las **interfaces** y **types** deben contener el `prefix` "I" (Letra i mayúscula). _Ejemplo:_ `IUser`.
- Las **interface**, **types** y **componentes** se escriben en `PascalCase`. _Ejemplo:_ `MyVariable`.
- Los **atributos de las etiquetas HTML** se escriben en `kebab-case`. _Ejemplo:_ `my-variable`.
- Las **constantes** se escriben en `snake_case` y `UPPERCASE`. _Ejemplo:_ `MY_VARIABLE`.
- Los nombres de los **componentes de estilo**, debe tener el `postfix` "Styled". _Ejemplo:_ `ButtonStyled`.

## Estructura de carpetas

Para los proyectos react se identifican 4 tipos de estructuras de carpeta: _File Type_, _Feature_, _Atomic Desing_, y _Hexagonal_.

Para los proyectos de tipo `frontend` se utilizamos **Feature**.

```txt
.
└── src
    ├── __mocks__ (Contenedor de los mocks de uso general)
    ├── api (Contenedor de la lógica que consume información externa)
    ├── app (Contenedor de los hooks de redux y definición de store)
    ├── components (Contenedor de los componentes generales)
    │   └── ComponentName
    │       ├── __tests__
    │       ├── utils
    │       └── styles
    ├── features (Contenedor de características principales de aplicativo)
    │   └── ComponentName
    │       ├── __tests__
    │       ├── components (Contenedor de los componentes específicos para un determinado features)
    │       │   └── ComponentName
    │       ├── utils
    │       └── styles
    ├── hooks (Contenedor de hooks)
    ├── assets (Contenedor de recursos)
    │   └── icons
    │   └── otherImageGroup
    ├── models (Contenedor de los modelos como `interface` y `type`)
    ├── redux (Contenedor de los reducer)
    │   └── ReducerName
    │       └── __tests__
    └── utils (Contenedor de los herramientas generales)
        └── __tests__
```

Si quieres profundizar más en el tema puede visitar la siguiente [publicación](https://reboot.studio/blog/folder-structures-to-organize-react-project/).

## Construcción de componentes

Los componentes de `react` deben ser creado como **componente funcionales**, es necesario identificar el tipo de variable utilizando `:React.FC` y estableciendo sus propiedades por medio de un `type` (_de ser necesario_).

Cada componente de ser creado una carpeta, la cual lleva su respectivo nombre y dentro de ella su lógica, la cual va dentro de un archivo `index.tsx`.

El `type` del componente debe ser definido con el mismo nombre del componente y postfix `Props`.

> **IMPORTANTE**: el componente debe ser exportado como `default`.

```tsx
// components/index.tsx

import React from "react";
import { MyComponentStyled } from "./styles";

export type MyComponentProps = {
  backgroundColor: "red" | "blue";
  active: boolean;
};

const MyComponent: React.FC<MyComponentProps> = ({
  children,
  ...otherProps
}) => {
  return (
    <MyComponentStyled {...otherProps} data-testid="my-component">
      {children}
    </MyComponentStyled>
  );
};

export default MyComponent;
```

### Sugerencias para la construcción de componentes

> Si se necesita trabajar con las propiedades del componente dentro de otro componente hijo, se puede utilizar _sprite operator_ como se muestra en el ejemplo, donde se extraer `children` de las `Props` y todas las demás quedarán en `otherProps`.

## Manejo estético de los componentes

Para le manejo de los estilos de los componentes, se utiliza [StyledComponent](https://styled-components.com/).

> **IMPORTANTE**: evitar el uso de `Inline CSS`, es decir utilizando el atributo `style` directamente en el componente o etiqueta de HTML.

### Uso de props en StyledComponent

StyledComponent nos permite utilizar propiedades para condicionar alguna definición en nuestros componentes. Para seguir con el ejemplo del código anterior, tendremos lo siguiente:

- Importaremos `MyComponentProps` desde el `index.tsx` ubicado un nivel anterior.
- Utilizar las propiedades del componente base o crear una nueva propiedad y realizar la definición respectiva en el **componente de estilo**.

```typescript
// components/styles/index.ts

import styled from "styled-components";
import { MyComponentProps } from "..";

export const MyComponentStyled = styled.div<MyComponentProps>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  opacity: ${({ active }) => (active ? 1 : 0.6)};
`;
```

## Construcción de modelos

Para la definición de los `models` se sugiere utilizar la notación `type` como primera opción.

```typescript
type User = {
  name: string;
  email: string;
};
```

Ahora si es necesario definir un `models` de major complejidad, se sugiere utilizar la notación `interface`.

```typescript
// ../*/models/base";

interface IUserBase {
  createdAt: string;
  updatedAt: string;
}
```

```typescript
// ../*/models/user";

import { IBase } from "../*/models/base";

interface IUser extends IUserBase {
  name: string;
  age: number;
}

export interface IUserGroup {
  userList: IUser[];
}
```

## Construcción de funciones

La mayoría de las funciones debe manejar parámetros, donde para esta necesidad identificamos dos casos:

1. Función con **un solo parámetro**.
1. Función con **más de un parámetro**.

Para el **primer caso**, no es necesario nada fuera de los común.

```typescript
const getSuccessor = (value: number) => value + 1;
```

Para el **segundo caso**, sugerimos definir un `type` para el método.

```typescript
type QetProductProps = {
  firstValue: number;
  secondValue: number;
};

const getProduct = ({ firstValue, secondValue }: QetProductProps) =>
  firstValue * secondValue;
```

> **Importante**: definir las función como una variable.

## Manejo de estados

Para el manejo de los estados, se utiliza `Redux` como única fuente de la verdad, donde es utilizada por medio de [Redux Toolkit](https://redux-toolkit.js.org/).

Esta herramienta nos brinda una seria de método para la creación de los `Reducer`.

### Redux-Toolkit

La método principal es `createSlice`, ya que se utiliza para crear `reducer` y definir sus `action`. Ademas `Redux-Toolkit` viene integrado con `Redux-Thunk`.

#### Construcción de reducers

A continuación se muestra la creación de un reducer llamado `config` con un único atributo llamado `theme`, donde es su definición de establece su valor inicial y la acción `setTheme`. La acción `setTheme` esta definida para recibir un parámetro, el cual establece el nuevo valor para `theme`. Se definir un `selector` llamado `getCurrentTheme` para obtener el valor actual de `theme`.

```typescript
// src/redux/configSlice/index.ts

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

type IConfigReducer = {
  theme: "one" | "two";
};

// Definition of initial value
const initialState: IConfigReducer = {
  theme: "one",
};

// Slice creation
export const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<IConfigReducer["theme"]>) => {
      state.theme = action.payload;
    },
  },
});

// Export of actions
export const { setTheme } = configSlice.actions;

// Definition and export of selectors
export const getCurrentTheme = (state: RootState) => state.config.theme;

export default configSlice.reducer;
```

#### Configuración de Store

Luego de definir un `reducer`, se debe integrar al `store`.

```typescript
// src/app/store.ts

import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import configSlice from "../redux/configSlice";

// definition of reducer for store
export const rootReducer = {
  config: configSlice,
};

// store configuration
export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV === "development",
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type InitialRootState = RecursivePartial<RootState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
```

#### Uso de Redux-Thunk

Cuando es necesario crear una acción en el reducer de carácter asíncrono, entra a funcionar la integración con `Redux-Thunk`. Estas acción manejan 3 estados: `pending`, `fulfilled` y `rejected`.

Para su creación se utiliza el método `createAsyncThunk` y se integran al `reducer` por medio de `extraReducers`.

En el siguiente ejemplo, se ve la definición como interactuá la acción `thunk` con el `reducer` por cada estado.

```typescript
// src/redux/configSlice/index.ts

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export type IConfigState {
  theme: string;
  themeStatus: 'idle' | 'loading' | 'failed';
}

const initialState: IConfigState = {
  theme: ''
};

export const fetchThemeAsync = createAsyncThunk(
  'config/fetchThemeAsync',
  async () => {
    const response = await fetchTheme(); // Retorna una promesa - Ejecuta un fetch
    return response;
  }
);

export const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchThemeAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchThemeAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.theme = action.payload; // Save the theme response
      })
      .addCase(fetchThemeAsync.rejected, (state) => {
        state.status = 'failed';
      	state.theme = 'one' // We could choose one theme if request fail
      });
  },
});

// Defined Selectors
export const getCurrentTheme = (state: RootState) => state.config.theme;
export const getThemeStatus = (state: RootState) => state.config.themeStatus;
```

#### Uso de Hooks de Redux-ToolKit

Para la integración con los componentes se utiliza dos hooks: `useAppDispatch` y `useAppSelector`.

```typescript
// src/app/hooks.ts

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

#### Caso practico para redux

Para manejar los estados de nuestro `store`, se hace por medio de los `hooks`. `useAppDispatch` ejecutar a una acción definida en un `slice` y con `useAppSelector` se usa para ejecutar a un `selector` definido en un `slice`.

A continuación tenemos un pequeño ejemplo.

```tsx
// src/features/Config/components/RootComponent/index.tsx

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import {
  getCurrentTheme,
  getThemeStatus,
  fetchThemeAsync,
} from "../../../../redux/configSlice";
import { RootContainerStyled, LoadingStyle } from "./styles";

const RootComponent: React.FC = ({ children }) => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(getCurrentTheme); // Obtiene el Theme del store en configSlice
  const themeStatus = useAppSelector(getThemeStatus); // Obtenemos el status del fetch

  useEffect(() => {
    dispatch(fetchThemeAsync()); // Lanza el fetch al cargar el componente
  }, []);

  return (
    <RootContainerStyled>
      {themeStatus !== "loading" && (
        <LoadingStyle theme={theme}>{children}</LoadingStyle>
      )}
    </RootContainerStyled>
  );
};
```

## Construcción de Test Unitarios

En nuestro proyecto, utilizamos `Jest` como librería para validar el comportamiento de nuestros componentes, herramientas y reducer. Para este ultimo menos creado nuestro propia extension de la librería para tener una correcta integración.

```tsx
// src/utils/testing/reduxRender.tsx

import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { InitialRootState, rootReducer } from "../../app/store";

type wrap = any;

const initialReducerState: InitialRootState = {};

function render(
  ui: any,
  {
    initialState = initialReducerState,
    store = configureStore({
      reducer: rootReducer,
      preloadedState: initialState,
    }),
    ...renderOptions
  } = {}
) {
  const Wrapper: React.FC<wrap> = ({ children }) => {
    return (
      <Provider store={store}>
        {children}
      </Provider>
    );
  };
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from "@testing-library/react";

// override render method
export { render };
```

Los test unitarios que debemos aplicar en nuestro desarrollo son en el siguiente orden:

- Test Reducer
- Test Componente
- Test Funciones

Se debe tener en cuenta, que la forma de programar debe estar siempre orientada a la creación de componentes con tal de poder realizar los test unitarios de manera fácil. Las funciones a testear usualmente son las provenientes desde utils si es que es necesario.

> Si es necesario omitir algún archivo de la validación se debe agregar `/* istanbul ignore file */`al comienzo del archivo. Como por ejemplo los `Models`.

### Caso practico de Test Unitarios

_Se debe desplegar una lista de ítems con su precio a la izquierda de la pantalla y el total de ellos que se encuentran en el carrito más el total a pagar._

```txt
ítem1 $100  [ADD TO CART]   |     item1 x 2 = $200
ítem2 $200  [ADD TO CART]   |     item3 x 1 = $300
ítem3 $300  [ADD TO CART]   |    __________________
ítem4 $400  [ADD TO CART]   |     TOTAL       $500
```

Para esto podemos darnos cuenta que tenemos 1 contenedor inline-flex y 2 componentes (Lista de ítems y carrito de compras) y los test de ejemplo serán del Home y del componente Items.

Digamos que se tiene un `array` de objeto para los items.

```typescript
// src/__mock__/cartItems/index.ts

export const cartItems = [
  { id: 1, name: "ítem1", price: 100 },
  { id: 2, name: "ítem2", price: 200 },
  { id: 3, name: "ítem3", price: 300 },
  { id: 4, name: "ítem4", price: 400 },
];
```

y que su `reducer` respectivo seria el siguiente:

```typescript
// src/redux/cartSlice/index.ts

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchCartItems } from "../../api/fetchCartItems";
import { RootState } from "../../app/store";

export type IStatusAsyncThunk = "idle" | "loading" | "failed";

export interface IItem {
  id: number;
  name: string;
  price: number;
}

interface ICartItem extends IItem {
  quantity: number;
}

export type ICartReducer = {
  items: IItem[];
  cartList: ICartItem[];
  cartStatus: IStatusAsyncThunk;
};

export const initialState: ICartReducer = {
  status: "idle",
  items: [],
  cartList: [],
};

export const fetchCartItemsAsync = createAsyncThunk(
  "cart/fetchCartItems",
  async () => {
    const response = await fetchCartItems();
    return response;
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateCart: (state, action: PayloadAction<ICartReducer["cartList"]>) => {
      state.cartList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItemsAsync.pending, (state) => {
        state.cardStatus = "loading";
      })
      .addCase(fetchCartItemsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
      })
      .addCase(fetchCartItemsAsync.rejected, (state) => {
        state.status = "failed";
        state.items = [];
      });
  },
});

export const { updateCart } = cartSlice.actions;

export const getItems = (state: RootState) => state.cart.items;
export const getCartStatus = (state: RootState) => state.cart.cartStatus;
export const getCartList = (state: RootState) => state.cart.cartList;

export default cartSlice.reducer;
```

Su **test de reducer** debería tener más o menos esta forma:

```typescript
// src/redux/cartSlice/__test__/index.test.ts

import { store } from "../../../app/store";
import {
  updateCart,
  getItems,
  getCartList,
  getCartStatus,
  fetchCartItemsAsync,
} from "..";
import { fetchItems as fetched } from "../../../api/fetchItems";
import { cartItems } from "../../../__mock__/cartItems";

jest.mock("../../../api/fetchItems");

const fetchItems = fetched as jest.MockedFunction<typeof fetched>;

describe("Cart Reducer", () => {
  test("Should call fetchItemsAsync Success", async () => {
    fetchItems.mockResolvedValue(cartItems);
    await store.dispatch(fetchCartItemsAsync());
    const status = getItemsStatus(store.getState());
    expect(status).toEqual("idle");
  });

  test("Should call fetchItemsAsync Failed", async () => {
    fetchItems.mockRejectedValue("Error");
    await store.dispatch(fetchCartItemsAsync());
    expect(fetchItems).toBeCalled();
    const status = getItemsStatus(store.getState());
    expect(status).toEqual("failed");
  });

  test("getItems function should get an empty Array", () => {
    expect(getItems(store.getState())).toHaveLength(0);
  });

  test("getCart function should get an empty Array", () => {
    expect(getCartList(store.getState())).toHaveLength(0);
  });

  test("updateCart function should add an Item to cart", async () => {
    const firstItem = [{ id: 1, name: "ítem1", price: 100, quantity: 1 }];

    store.dispatch(updateCart(firstItem));
    expect(getCartList(store.getState())).toHaveLength(1);
  });
});
```

Ahora, si tenemos el siguiente componente `Home`:

```tsx
// src/feature/Home/index.tsx

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { HomeStyled } from "./styles";
import { Cart } from "./components/cart";
import { Items } from "./components/items";
import { fetchCartItemsAsync, getItems } from "../../redux/cart";

const Home = () => {
  const dispatch = useAppDispatch();
  const itemList = useAppSelector(getItems);

  useEffect(() => {
    dispatch(fetchCartItemsAsync());
  }, []);

  return (
    <HomeStyled>
      <Items list={itemList} />
      <Cart data-testid="cart-component" />
    </HomeStyled>
  );
};

export default Home;
```

Su respectivo **test de componente** para el componente `Home` seria algo asi:

```typescript
// src/feature/Home/__test__/index.test.ts

import Home from "..";
import { fetchItems as fetched } from "../../../api/fetchItems";
import { render } from "../../../utils/testing/reduxRender";
import { cartItems } from "../../../__mock__/cartItems";

jest.mock("../../../api/fetchItems");

describe("Home component", () => {
  test("should show the component", () => {
    const fetchItems = fetched as jest.MockedFunction<typeof fetched>;
    fetchItems.mockResolvedValue(cartItems);
    const component = <Home />;
    render(component);
    expect(component).toBeDefined();
  });
});
```

Y si tenemos el componente `Item` con la siguiente forma:

```tsx
// src/feature/Home/components/Items/index.tsx

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import {
  ItemWrapperStyled,
  ItemDetailStyled,
  Button,
  ContainerStyled,
} from "./styles";
import {
  getCart,
  ICartItem,
  IItem,
  updateCart,
} from "../../../../redux/cartSlice";

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

  const handleClickAddToCart = (item: IItem) => {
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
    <ContainerStyled data-testid="container-items">
      {list.map((item, i) => (
        <ItemWrapperStyled key={i}>
          <ItemDetailStyled>
            {item.name} (${item.price})
          </ItemDetailStyled>
          <Button onClick={() => handleClickAddToCart(item)}>
            Add to Cart
          </Button>
        </ItemWrapperStyled>
      ))}
    </ContainerStyled>
  );
};
```

Su respectivo **test de componente** seria algo asi:

```tsx
// src/feature/Home/components/Items/__test_/index.tsx

import { Items } from "..";
import {
  render,
  fireEvent,
  screen,
  waitFor,
} from "../../../../../utils/testing/reduxRender";
import { cartItems } from "../../../../../__mock__/cartItems";
import * as cartSlice from "../../../../../redux/cartSlice";

describe("Items Component", () => {
  test("Should display an empty view", () => {
    render(<Items list={[]} />);
    const container = screen.getByTestId("container-item");
    expect(container.childElementCount).toBe(0);
  });

  test("Should add an Item toCart", async () => {
    const updateCart = jest.spyOn(cartSlice, "updateCart");

    render(<Items list={cartItems} />);

    const container = screen.getByTestId("container-item");
    expect(container.childElementCount).toBe(4);

    const [firstButton] = screen.getAllByRole("button");
    await waitFor(() => {
      fireEvent.click(firstButton);
    });

    const first = [{ id: 1, name: "ítem1", price: 100, quantity: 1 }];
    expect(updateCart).toHaveBeenCalledWith(first);

    await waitFor(() => {
      fireEvent.click(firstButton);
    });

    const second = [{ id: 1, name: "ítem1", price: 100, quantity: 2 }];

    expect(updateCart).toHaveBeenCalledWith(second);
    expect(updateCart).toHaveBeenCalledTimes(2);
  });
});
```

## Anexo

### Codificación

El desarrollo de software, contempla muchas etapas de las cuales aca no se profundizara en 100%, pero si, se planteara algunas de las BUENAS PRACTICAS que adoptado como equipo de desarrollo.

#### DRY: Don't repeat yourself

No repitas código, modulariza tus desarrollos. Repetir partes de código a lo largo de un desarrollo solo sirve para dificultar el mantenimiento y aumentar la probabilidad de cometer errores. Agrupa en funciones las operaciones que se repitan, y aíslala del resto del código, el esfuerzo necesario para el mantenimiento del código disminuirá. Si estos trozos de código son requeridos por otros ficheros, no solo elimínalos del flujo natural, si no que colócalo en un fichero aparte y accesible por todos los elementos del código.

#### Comenta tu código

Para facilitar el entendimiento de las ideas que se codifican, te sugerimos comentar tu código.

#### Divide y vencerás

Divide los desarrollos complejos en varios más sencillos. Enrocarse en buscar una solución que abarque todas las posibilidades o funcionalidades te va a hacer perder mucho el tiempo. **Divide el desarrollo en funcionalidades y prográmarlas atendiendo a su función principal y a la integración con el resto.**

#### Optimización

No todas las instrucciones y módulos necesitan la misma capacidad de procesamiento intenta utilizar siempre las más sencillas.

### Extensiones de VisualStudio Code

#### Necesarios

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Jest](https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest)
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)
- [VSCode Styled Components](https://marketplace.visualstudio.com/items?itemName=jpoissonnier.vscode-styled-components)

#### Sugeridos

- [Auto Rename](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag): Ayuda para cambiar el nombre de las etiqueta.
- [Change Case](https://marketplace.visualstudio.com/items?itemName=wmaurer.change-case): Ayuda cambiar el formato de un texto, ejemplo: variable.
- [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker): Corrector de ortografía.
- [Colorize](https://marketplace.visualstudio.com/items?itemName=kamikillerto.vscode-colorize): Resalta con un color visite los códigos hexadecimal
- [Doxygen Documentation Generator](https://marketplace.visualstudio.com/items?itemName=cschlosser.doxdocgen): Ayuda a documentar tu código.
- [ES7 React/Redux/GraphQL/React-Native snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets): Ayuda a generar código base de react.
- [Git Graph](https://marketplace.visualstudio.com/items?itemName=mhutchie.git-graph): Ayuda a ver visualmente los commit y ramas de git.
- [GitLens - Git supercharged](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens): Ayuda a ver quien realizo un cambio por linea.
- [Indent Rainbow](https://marketplace.visualstudio.com/items?itemName=oderwat.indent-rainbow): Ayuda que coloriza la indentación.
- [Jest Snaphot Language Support](https://marketplace.visualstudio.com/items?itemName=tlent.jest-snapshot-language-support): Ayuda a formatear los SNAPHOT de jest.
- [Markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint): Ayuda a mejorar unos MarkDown.
- [Sort lines](https://marketplace.visualstudio.com/items?itemName=Tyriar.sort-lines): Ayuda a ordenar lineas, ejemplo definición de variables en orden alfabético.
- [Spanish - Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker-spanish): Corrector de ortografía en español.
- [Tabnine Autocomplete AI](https://marketplace.visualstudio.com/items?itemName=TabNine.tabnine-vscode): Excelente IA de copiloto para codificación.
- [Todo Highlight](https://marketplace.visualstudio.com/items?itemName=wayou.vscode-todo-highlight): Resaltado de TODO y FIXME
- [Todo Tree](https://marketplace.visualstudio.com/items?itemName=Gruntfuggly.todo-tree): Genera un indice de TODOs en el proyecto de rápido acceso.
- [Vscode Google Translate](https://marketplace.visualstudio.com/items?itemName=funkyremi.vscode-google-translate): Traductor de google en tu IDE.
- [Vscode Icons](https://marketplace.visualstudio.com/items?itemName=vscode-icons-team.vscode-icons): Paquete de icons para archivos deferentes lenguaje y carpetas bajo los estándares mas utilizado.

### Un regalo extra

#### Omitir multiples IF o condicionales ternarios

Usaremos un ejemplo un poco menos común. Cuando tenemos una variación donde se nos pide explícitamente modificar un atributo CSS en factor de una propiedad, lo primero que supondríamos es hacer una condición ternaria repetida cuantas veces se necesite. Cuando las condiciones son 3 o más, entonces lo mejor sería usar objetos. Esta solución es aplicable para varias situaciones, pero para este caso, lo usaremos como la definición de un Theme para un componente.

La situación es la siguiente. Tenemos los estados de carga de un **Fetch**, `idle`, `loading`, `failed` que podemos leer desde redux y queremos asignarle un color específico a un contenedor según ese estado. Usaremos azul para `idle`, gris para `loading`, y rojo para `failed`.

Entonces nuestro objeto será el siguiente:

```typescript
// src/theme/index.ts

export const Theme = {
  button: {
    idle: "blue",
    loading: "grey",
    failed: "red",
  },
};
```

```typescript
// components/index.tsx

type MyComponentProps = {
  status: "idle" | "loading" | "failed";
};
```

Para usarlo solo debemos instancia y usar de la siguiente forma.

```typescript
// components/styles/index.ts

import styled from "styled-components";
import { MyComponentProps } from "..";
import { Theme } from "../../*/theme";

export const MyComponentStyled = styled.div<MyComponentProps>`
  background-color: ${({ status }) => Theme.button[status]};
`;
```
