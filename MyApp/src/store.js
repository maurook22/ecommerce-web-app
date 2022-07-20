import { createStore } from "vuex";
import axios from "axios";

const url = "https://yc2r3735b3.execute-api.sa-east-1.amazonaws.com/dev/products";

export default createStore({

  state() {
    return {
      products: [],
    };
  },

  actions: {
    async getProducts({ commit }) {
      await axios
        .get(url)
        .then((response) => commit("setProducts", response.data))
        .catch((e) => console.log("HTTP GET ERROR", e));
    },
  },

  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
  },
});
