import React, { createContext, useContext } from "react";
import { useCartReducer } from './reducers'

const StoreContext = createContext();
const { Provider } = StoreContext;



const StoreProvider = ({ value = [], ...props }) => {
  
  const [state, dispatch] = useCartReducer({
    cart: [],
  
    cartOpen: false,
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
