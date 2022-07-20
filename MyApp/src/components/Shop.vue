<template>
  <div class="container-fluid mt-5 mb-5">
    <div class="row">
      <div class="col-md-2">
        <Filt
          @filtname="filtname($event)"
          @filtmin="filtmin($event)"
          @filtmax="filtmax($event)"
        />
      </div>
      <div class="col-md-7 mb-5">
        <div class="row row-cols-1 row-cols-md-4 g-4">
          <div
            class="col"
            v-for="product in productosFiltrados"
            :key="product.id"
          >
            <div class="card">
              <img
                :src="'../src/assets/images/' + product.imageName"
                class="card-img-top"
                alt="Laptop"
              />
              <div class="card-body">
                <!--<div class="d-flex justify-content-between">
                  <p class="small">
                    <a href="#!" class="text-muted">category</a>
                  </p>
                  <p class="small text-danger"><s>$1099</s></p>
                </div>-->

                <div class="d-flex justify-content-between mb-3">
                  <h5 class="mb-0">
                    <i>{{ product.name }}</i>
                  </h5>
                  <h5 class="text-dark mb-0">
                    <i>${{ product.price }}</i>
                  </h5>
                </div>

                <div class="d-flex justify-content-between mb-2">
                  <p class="text-muted mb-0">
                    Stock: <span class="fw-bold">{{ product.stock }}</span>
                  </p>
                  <div class="ms-auto text-warning">
                    <button
                      class="btn btn-sm btn-warning but"
                      @click="toCart(product)"
                    >
                      Comprar
                    </button>
                    <!--<i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>-->
                  </div>
                </div>
              </div>
            </div>
            <!--<div class="card" style="width: 15rem">
              <img
                :src="'../src/assets/images/' + product.imageName"
                class="card-img-top"
                alt=""
              />
              <div class="card-body">
                <h5 class="card-title">
                  <strong
                    ><i>{{ product.name }}</i></strong
                  >
                </h5>
                <p class="card-text text-sm">${{ product.price }}</p>
              </div>
              <div align="center">
                <button class="button-53" @click="toCart(product)">
                  Añadir al carrito
                </button>
              </div>
            </div>-->
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div
          v-if="cartProducts.length > 0"
          class="card border-3 p-1"
          style="opacity: 0.8"
        >
          <div align="center"><h4>Carrito de compras</h4></div>
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Producto</th>
                <th scope="col">Precio</th>
                <th scope="col">Cant</th>
                <th scope="col">Total</th>
                <th scope="col" align="center"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in cartProducts" :key="product.id">
                <td>
                  <img
                    :src="'../src/assets/images/' + product.imageName"
                    class="img-fluid img-thumbnail"
                    alt="img"
                  />
                </td>
                <td class="pt-4">{{ product.name }}</td>
                <td class="pt-4">${{ product.price }}</td>
                <td class="pt-3">
                  <input
                    type="text"
                    class="form-control"
                    v-model="product.quantity"
                    @blur="changeQuant(product._id, $event)"
                  />
                </td>
                <td class="pt-4">
                  ${{ parseInt(product.price) * parseInt(product.quantity) }}
                </td>
                <td class="pt-4">
                  <span @click="deleteProduct(product._id)">
                    <i class="fa-solid fa-trash-can fa-lg color"></i>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          <div align="center">
            <button @click="genOrder()" class="button-85 mb-2">
              Generar orden
            </button>
          </div>
        </div>
        <div v-if="generedOrder" class="alert alert-success text-dark ff">
          <p>
            <i
              >Tu orden fue generada exitosamente!<br />
              Por favor comunicate con nosotros al <b>1154678965</b> para
              coordinar la entrega de la orden:
              <b>{{ idGeneredOrder }}</b>
            </i>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Filt from "./Filt.vue";
import axios from "axios";

export default {
  components: {
    Filt,
  },
  created() {
    this.getProducts();
  },
  data() {
    return {
      criterioBusqueda: "",
      min: 0,
      max: 999999,
      products: null,
      cartProducts: [],
      urlBase: "https://yc2r3735b3.execute-api.sa-east-1.amazonaws.com/dev/",
      generedOrder: false,
      idGeneredOrder: null,
    };
  },
  methods: {
    genOrder() {
      const order = {
        user: "user",
        products: this.cartProducts,
      };
      axios
        .post(this.urlOrders, order)
        .then((response) => {
          this.generedOrder = true;
          this.cartProducts = [];
          this.idGeneredOrder = response.data.insertedId;
        })
        .catch((e) => console.log("ERROR", e));
    },
    getOrderPrice(arr) {
      let total = 0;
      arr.forEach(function (p) {
        total += parseInt(p.price) * parseInt(p.quantity);
      });
      return total;
    },
    deleteProduct(idProduct) {
      const index = this.cartProducts.findIndex((p) => p._id === idProduct);
      if (index > -1) {
        this.cartProducts.splice(index, 1);
      }
    },
    changeQuant(idProduct, e) {
      const found = this.cartProducts.find((p) => p._id === idProduct);
      if (found) {
        found.quantity = e.target.value;
      }
    },
    toCart(product) {
      const found = this.cartProducts.find((p) => p._id === product._id);
      if (found) {
        found.quantity++;
        found.stock--;
      } else {
        product.quantity = 1;
        product.stock--;
        this.cartProducts.push(product);
      }
      this.generedOrder = false;
    },
    filtname(product) {
      this.criterioBusqueda = product;
    },
    filtmin(preciomin) {
      if (preciomin != "*") {
        this.min = parseInt(preciomin);
      } else {
        this.min = 0;
      }
    },
    filtmax(preciomax) {
      if (preciomax != "*") {
        this.max = parseInt(preciomax);
      } else {
        this.max = 999999;
      }
    },
    async getProducts() {
      await axios
        .get(this.urlBase + "products")
        .then((response) => (this.products = response.data))
        .catch((e) => console.log("HTTP GET ERROR", e));
    },
  },
  computed: {
    productosFiltrados() {
      return this.products
        .filter((prod) => {
          const registroCompleto = `${prod.name}`;
          return registroCompleto
            .toLowerCase()
            .includes(this.criterioBusqueda.toLowerCase());
        })
        .filter((prod) => {
          return prod.price >= this.min && prod.price <= this.max;
        });
    },
  },
};
</script>

<style>
.ff {
  font-size: 18pt;
}

body {
  width: 100%;
}

.but {
  opacity: 0.8;
}

.color {
  color: red;
}
/* CSS */
.button-85 {
  padding: 0.6em 2em;
  border: none;
  outline: none;
  color: rgb(255, 255, 255);
  background: #111;
  cursor: pointer;
  position: relative;
  z-index: 0;
  border-radius: 10px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  opacity: 0.9;
}

.button-85:before {
  content: "";
  background: linear-gradient(
    45deg,
    #ff0000,
    #ff7300,
    #fffb00,
    #48ff00,
    #00ffd5,
    #002bff,
    #7a00ff,
    #ff00c8,
    #ff0000
  );
  position: absolute;
  top: -2px;
  left: -2px;
  background-size: 400%;
  z-index: -1;
  filter: blur(5px);
  -webkit-filter: blur(5px);
  width: calc(100% + 4px);
  height: calc(100% + 4px);
  animation: glowing-button-85 20s linear infinite;
  transition: opacity 0.3s ease-in-out;
  border-radius: 10px;
}

@keyframes glowing-button-85 {
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: 400% 0;
  }
  100% {
    background-position: 0 0;
  }
}

.button-85:after {
  z-index: -1;
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background: #222;
  left: 0;
  top: 0;
  border-radius: 10px;
}

/* CSS */
.button-53 {
  background-color: #dce137;
  border: 0 solid #e5e7eb;
  box-sizing: border-box;
  color: #000000;
  display: flex;
  font-family: ui-sans-serif, system-ui, -apple-system, system-ui, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-size: 1rem;
  font-weight: 700;
  justify-content: center;
  line-height: 0.85rem;
  padding: 0.75rem 1.65rem;
  position: relative;
  text-align: center;
  text-decoration: none #000000 solid;
  text-decoration-thickness: auto;
  width: 100%;
  max-width: 460px;
  position: relative;
  cursor: pointer;
  transform: rotate(-2deg);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  opacity: 0.5;
}

.button-53:focus {
  outline: 0;
}

.button-53:after {
  content: "";
  position: absolute;
  border: 1px solid #000000;
  bottom: 4px;
  left: 4px;
  width: calc(100% - 1px);
  height: calc(100% - 1px);
}

.button-53:hover:after {
  bottom: 2px;
  left: 2px;
}

@media (min-width: 768px) {
  .button-53 {
    padding: 0.75rem 3rem;
    font-size: 1.25rem;
  }
}
</style>
