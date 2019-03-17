<style scoped>
</style>

<template>
  <div>
    <div v-for="(p, index) in products" v-bind:key="index">
      <ProductCard v-bind:product="p"
                   v-bind:hasAddButton="true"
                   v-bind:hasAdminButtons="hasAdmin"/>
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
  @Prop({
    default: () => {
      return [];
    }
  })
  products!: iProduct[];

  @Prop({ type: Boolean, default: false })
  hasAdmin!: boolean | null;
}
</script>

<style scoped>
</style>
