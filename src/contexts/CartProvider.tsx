import { useMemo, useReducer, createContext, ReactElement } from "react";

export type CartItem = {
  sku: string;
  name: string;
  price: number;
  quantity: number;
};

type CartState = {
  cart: CartItem[];
};

const REDUCER_ACTION_TYPE = {
  ADD: "ADD",
  REMOVE: "REMOVE",
  QUANTITY: "QUANTITY",
  SUBMIT: "SUBMIT",
};

export type ReducerActionType = typeof REDUCER_ACTION_TYPE;

export type ReducerAction = {
  type: string;
  payload?: CartItem;
};

type ChildrenType = { children?: ReactElement | ReactElement[] };

const initialCartState: CartState = { cart: [] };

const reducer = (state: CartState, action: ReducerAction): CartState => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.ADD: {
      if (!action.payload) {
        throw new Error("action.payload is missing in ADD action");
      }
      const { sku, name, price } = action.payload;
      const filteredCart: CartItem[] = state.cart.filter(
        (item) => item.sku !== sku
      );
      const itemExists: CartItem | undefined = state.cart.find(
        (item) => item.sku === sku
      );
      const quantity: number = itemExists ? itemExists.quantity + 1 : 1;

      return {
        ...state,
        cart: [...filteredCart, { sku, name, price, quantity }],
      };
    }
    case REDUCER_ACTION_TYPE.REMOVE: {
      if (!action.payload) {
        throw new Error("action.payload is missing in REMOVE action");
      }
      const { sku } = action.payload;
      const filteredCart: CartItem[] = state.cart.filter(
        (item) => item.sku !== sku
      );
      return { ...state, cart: [...filteredCart] };
    }
    case REDUCER_ACTION_TYPE.QUANTITY: {
      if (!action.payload) {
        throw new Error("action.payload is missing in QUANTITY action");
      }
      const { sku, quantity } = action.payload;

      const itemExists: CartItem | undefined = state.cart.find(
        (item) => item.sku === sku
      );
      if (!itemExists) {
        throw new Error("Item must exist in order to update the quantity");
      }
      const updatedItem: CartItem = { ...itemExists, quantity };

      const filteredCart: CartItem[] = state.cart.filter(
        (item) => item.sku !== sku
      );

      return { ...state, cart: [...filteredCart, updatedItem] };
    }
    case REDUCER_ACTION_TYPE.SUBMIT: {
      return { ...state, cart: [] };
    }
    default:
      throw new Error("Unidentified reducer action type");
  }
};

const useCartContext = (initialCartState: CartState) => {
  const [state, dispatch] = useReducer(reducer, initialCartState);

  // not worrying about reducer action causing re-rendering
  const REDUCER_ACTIONS = useMemo(() => {
    return REDUCER_ACTION_TYPE;
  }, []);

  const totalItems = state.cart.reduce((prev, cartItem) => {
    return prev + cartItem.quantity;
  }, 0);

  const totalPrice = new Intl.NumberFormat("be-FR", {
    style: "currency",
    currency: "EUR",
  }).format(
    state.cart.reduce((prev, cartItem) => {
      return prev + cartItem.quantity * cartItem.price;
    }, 0)
  );

  const cart = state.cart.sort((a, b) => {
    const itemA = Number(a.sku.slice(-4));
    const itemB = Number(b.sku.slice(-4));
    return itemA - itemB;
  });

  return { dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart };
};

export type UseCartContext = ReturnType<typeof useCartContext>;

const initialCartContextState: UseCartContext = {
  dispatch: () => {},
  REDUCER_ACTIONS: REDUCER_ACTION_TYPE,
  totalItems: 0,
  totalPrice: "",
  cart: [],
};

export const CartContext = createContext<UseCartContext>(
  initialCartContextState
);

export const CartProvider = ({ children }: ChildrenType): ReactElement => {
  return (
    <CartContext.Provider value={useCartContext(initialCartState)}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
