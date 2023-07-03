import React, { createContext, useReducer, useEffect } from "react";

const cases = {
  ADD_TO_CART: "ADD_TO_CART",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
  INCREASE_QUANTITY: 'INCREASE_QUANTITY',
  DECREASE_QUANTITY: 'DECREASE_QUANTITY',
};

export default cases;

const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
};

export const AppContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case cases.ADD_TO_CART:
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        const updatedItems = state.cartItems.map((item) => {
          if (item.id === action.payload.id) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }
          return item;
        });

        return {
          ...state,
          cartItems: updatedItems,
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }],
        };
      }
    case cases.REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload),
      };
    case cases.INCREASE_QUANTITY:
      return {
        ...state,
        cartItems: state.cartItems.map((item) => {
          if (item.id === action.payload) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }
          return item;
        }),
      };
    case cases.DECREASE_QUANTITY:
      return {
        ...state,
        cartItems: state.cartItems
          .map((item) => {
            if (item.id === action.payload) {
              return {
                ...item,
                quantity: item.quantity - 1,
              };
            }
            return item;
          })
          .filter((item) => item.quantity > 0),
      };
    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
  }, [state.cartItems]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
