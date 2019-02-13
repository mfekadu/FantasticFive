<template>
<div class="orders">
    <AdminHeader/>
  <body>
    <h3 class="title" style="text-align: center">Orders</h3>
    <div>
        <div class="columns list-group-item">
            <div class="column is-4">
                <p>Order #P7G639</p>
            </div>
            <div class="column is-4">
                <p>Status: In Process</p>
            </div>
            <div class="column is-2">
                <button><router-link to="/orderDetails" exact-active-class="is-active">View</router-link></button>
            </div>
            <div class="column is-2">
                <button>Delete</button>
            </div>
        </div>
        <div class="columns list-group-item">
            <div class="column is-4">
                <p>Order #P7G640</p>
            </div>
            <div class="column is-4">
                <p>Status: Shipped</p>
            </div>
            <div class="column is-2">
                <button><router-link to="/orderDetails" exact-active-class="is-active">View</router-link></button>
            </div>
            <div class="column is-2">
                <button>Delete</button>
            </div>
        </div>
        <div class="columns list-group-item">
            <div class="column is-4">
                <p>Order #P7G641</p>
            </div>
            <div class="column is-4">
                <p>Status: Ready To Ship</p>
            </div>
            <div class="column is-2">
                <button><router-link to="/orderDetails" exact-active-class="is-active">View</router-link></button>
            </div>
            <div class="column is-2">
                <button>Delete</button>
            </div>
        </div>
    </div>
  </body>
  <Footer/>
</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Footer from "@/components/Footer.vue";
import AdminHeader from "@/components/AdminHeader.vue";

@Component({
  components: {
    Footer,
    AdminHeader
  }
})
export default class Orders extends Vue {}
</script>

<style scoped>
.column {
  margin: auto;
  width: 25%;
}

.center {
  text-align: center;
}

.list-group-item {
  position: relative;
  padding: .75rem 1.25rem;
  margin-bottom: -1px;
  background-color: #fff;
  border: 1px solid rgba(0,0,0,.125);
}
</style>
