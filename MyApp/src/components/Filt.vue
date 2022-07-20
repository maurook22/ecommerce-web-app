<template>
  <div class="card" style="opacity: 0.8;">
    <article class="card-group-item p-2">
      <header class="card-header header pt-3">
        <h6 class="title"><strong>PRODUCTO</strong></h6>
      </header>
      <input
        v-model="criterioBusqueda"
        v-on:keyup="filtname"
        type="text"
        class="form-control input-sm"
        placeholder="Nombre del producto.."
      />
    </article>
    <article class="card-group-item p-2">
      <header class="card-header header pt-3">
        <h6 class="title"><strong>PRECIO</strong></h6>
      </header>
      <div class="input-group col-md-6">
        <input
          v-model="min"
          v-on:keyup="filtmin"
          type="text"
          class="form-control input-sm"
          placeholder="Precio min.."
        />
        <input
          v-model="max"
          v-on:keyup="filtmax"
          type="text"
          class="form-control input-sm"
          placeholder="Precio max.."
        />
      </div>
    </article>
  </div>
</template>

<script>
export default {
  name: "src-components-filtro",
  props: [],
  emits: ["filtname", "filtmin", "filtmax"],
  mounted() {},
  data() {
    return {
      criterioBusqueda: "",
      min: "",
      max: "",
    };
  },
  methods: {
    filtname() {
      this.$emit("filtname", this.criterioBusqueda);
    },
    filtmin() {
      if (!Number.isInteger(parseInt(this.min))) {
        this.$emit("filtmin", "*");
      } else {
        this.$emit("filtmin", this.min);
      }
    },
    filtmax() {
      if (!Number.isInteger(parseInt(this.max))) {
        this.$emit("filtmax", "*");
      } else {
        this.$emit("filtmax", this.max);
      }
    },
  },
};
</script>

<style>

.header{
  background-color: #000;
  color: #FFFFFF;
  opacity: 0.7;
}

</style>
