<style scoped>
.products {
  text-align: center;
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}

.product {
  margin-top: 50px;
  margin-bottom: 50px;
  padding: 50px;
}

/* unset the Bulma styles for notification */
/* keep the background-color tho, that is useful */
.notification {
  padding: unset;
}

#toast {
  visibility: hidden;
  max-width: 50px;
  height: 50px;
  /*margin-left: -125px;*/
  margin: auto;
  /* comment out for use with Bulma .notification .is-primary .is-danger */
  /* background-color: #333; */
  /* color: #fff; */
  text-align: center;
  border-radius: 2px;

  position: fixed;
  z-index: 1;
  left: 0;
  right: 0;
  bottom: 70px;
  font-size: 17px;
  white-space: nowrap;
}
#toast #img {
  width: 50px;
  height: 50px;

  float: left;

  padding-top: 16px;
  padding-bottom: 16px;

  box-sizing: border-box;

  background-color: #111;
  color: #fff;
}
#toast #desc {
  color: #fff;

  padding: 16px;

  overflow: hidden;
  white-space: nowrap;
}

#toast.show {
  visibility: visible;
  -webkit-animation: fadein 0.5s, expand 0.5s 0.5s, stay 3s 1s, shrink 0.5s 2s,
    fadeout 0.5s 2.5s;
  animation: fadein 0.5s, expand 0.5s 0.5s, stay 3s 1s, shrink 0.5s 4s,
    fadeout 0.5s 4.5s;
}

@-webkit-keyframes fadein {
  from {
    bottom: 0;
    opacity: 0;
  }
  to {
    bottom: 30px;
    opacity: 1;
  }
}

@keyframes fadein {
  from {
    bottom: 0;
    opacity: 0;
  }
  to {
    bottom: 30px;
    opacity: 1;
  }
}

@-webkit-keyframes expand {
  from {
    min-width: 50px;
  }
  to {
    min-width: 350px;
  }
}

@keyframes expand {
  from {
    min-width: 50px;
  }
  to {
    min-width: 350px;
  }
}
@-webkit-keyframes stay {
  from {
    min-width: 350px;
  }
  to {
    min-width: 350px;
  }
}

@keyframes stay {
  from {
    min-width: 350px;
  }
  to {
    min-width: 350px;
  }
}
@-webkit-keyframes shrink {
  from {
    min-width: 350px;
  }
  to {
    min-width: 50px;
  }
}

@keyframes shrink {
  from {
    min-width: 350px;
  }
  to {
    min-width: 50px;
  }
}

@-webkit-keyframes fadeout {
  from {
    bottom: 30px;
    opacity: 1;
  }
  to {
    bottom: 60px;
    opacity: 0;
  }
}

@keyframes fadeout {
  from {
    bottom: 30px;
    opacity: 1;
  }
  to {
    bottom: 60px;
    opacity: 0;
  }
}
</style>

<template>
  <div class="productview">
    <Header/>
    <div id="toast" class="notification is-primary">
      <div id="img">
        <font-awesome-icon icon="cart-plus"/>
      </div>
      <div id="desc">Item Added!</div>
    </div>
    <div style="text-align: center; margin-bottom:20em;margin-left:10%;margin-right:10%;">
      <h2 class="title is-2">{{product.title}}</h2>
      <p class="subtitle is-4">${{product.price}}</p>
      <figure name="image" class="image">
        <img
          style="height: 300px; width: auto; display: block; margin-left: auto; margin-right: auto"
          v-bind:src="getPic128()"
          v-bind:alt="'image of ' + product.title"
        >
      </figure>
      <p class="content is-large">{{product.desc}}</p>
      <p class="content is-large">Stock: {{product.stock}}</p>
      <div style="color: red" v-if="!product.canShipYN">Cannot Ship</div>
      <button class="button" v-on:click="addToCart(product)">Add To Cart</button>
    </div>
    <Footer/>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";
import axios, { AxiosResponse } from "axios";
import { APIConfig } from "../utils/api.utils";
import { iProduct } from "@/models/product.interface";

@Component({
  components: {
    Footer,
    Header
  }
})
export default class ProductView extends Vue {
  @Prop() id: string | undefined;
  product: iProduct = {
    id: 0,
    title: "",
    desc: "",
    brand: { id: 0, name: "" },
    categories: [{ id: 0, name: "" }],
    stock: 0,
    cartQuantity: 0,
    price: 0,
    saleYN: false,
    salesPrice: 0,
    canShipYN: false,
    photoURL: "",
    isActive: true
  };

  mounted() {
    axios.get(APIConfig.buildUrl("/shop/" + this.id)).then(response => {
      const dbProduct = response.data.product;
      const refToCart = this.$store.state.cart[dbProduct.id]
      this.product = refToCart || {...dbProduct, cartQuantity: 0};
    });
  }

  // given an iProduct, add it to cart
  addToCart(p: iProduct): void {
    console.log(p);
    // update the store using the addToCart mutator
    this.$store.commit("addToCart", p);
  }

  getPic128() {
    let p = this.product;
    return p ? p.photoURL : "../128x128.png";
  }
}
</script>

<style scoped>
</style>
