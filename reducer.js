// State-ul initial:
export const initialState = {
  products: []
};

export function favoritesReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_FAVORITES": {
      // Pentru adaugarea la favorite, cautam produsul in lista existenta.
      const foundProduct = state.products.find((product) => {
        return product.id === action.payload.id;
      });
      // Daca avem deja produsul in lista de favorite, returnam lista, nemodificata.
      if (foundProduct) {
        return state;
        // Daca nu avem produsul in lista, il adaugam.
      } else {
        return {
          products: [...state.products, action.payload]
        };
      }
    }
    case "REMOVE_FROM_FAVORITES": {
      // Pentru a sterge un produs din lista de favorite, filtram lista, excluzand produsul cu id-ul egal cu cel primit ca payload.
      const filteredProducts = state.products.filter((product) => {
        return product.id !== action.payload;
      });
      return {
        products: filteredProducts
      };
    }
    // Nu uitam de cazul default.
    default: {
      return state;
    }
  }
}
