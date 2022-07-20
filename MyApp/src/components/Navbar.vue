<template>
  <header class="bg-dark" style="opacity: 0.7">
    <ul>
      <li>
        <router-link class="rl" to="/"
          >Home <i class="fa-solid fa-house"></i
        ></router-link>
      </li>
      <li>
        <router-link class="rl" to="/shop"
          >Shop <i class="fa-brands fa-shopify"></i
        ></router-link>
      </li>
      <li>
        <router-link class="rl" to="/contact"
          >Contacto <i class="fa-solid fa-file-signature"></i
        ></router-link>
      </li>
      <li>
        <router-link class="rl" to="/aboutus"
          >Nosotros <i class="fa-solid fa-users"></i
        ></router-link>
      </li>
      <li>
        <router-link class="rl" to="/"
          ><i class="fa-solid fa-user-large"></i
        ></router-link>
      </li>
    </ul>
  </header>
</template>

<style>
body {
  background-image: url("../assets/images/fondo2.jpg");
}

.rl {
  color: #ffffff;
  font-size: 14pt;
  font-style: italic;
  text-decoration: none;
}

* {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

ul {
  display: flex;
  width: 100%;
  height: 7vh;
  margin: auto;
  max-width: 1000px;
  justify-content: space-between;
  text-align: center;
}

li {
  padding: 1rem 2rem 1.15rem;
  text-transform: uppercase;
  cursor: pointer;
  min-width: 80px;
  margin: auto;
}

li:hover {
  background-image: url("https://scottyzen.sirv.com/Images/v/button.png");
  background-size: 100% 100%;
  color: #27262c;
  animation: spring 300ms ease-out;
  text-shadow: 0 -1px 0 #ef816c;
  font-weight: bold;
}

li:active {
  transform: translateY(4px);
}
</style>
