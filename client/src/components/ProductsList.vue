<style scoped>
</style>

<template>
  <div>
    <div v-for="(p, index) in products" v-bind:key="index">
      <ProductCard v-bind:product="p"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ProductCard from "@/components/ProductCard.vue";
import { iProduct } from "@/models/product.interface";

@Component({
  components: { ProductCard } 
})
export default class ProductsList extends Vue {
  // see 'github.com/vuejs/vue/issues/1032' for why function is used here
  @Prop({ default: () => { return [] } })
  products!: iProduct[];

  created() {
    console.log("created ProductCard");
  }

  mounted() {
    console.log("mounted ProductCard");
  }
}
</script>

<style scoped>
</style>
