<style scoped>

.input {

  width: 500px;

}

</style>
 
<template>
    <div class="Parts" style="margin-left: 20px">
        <h1> Inventory </h1>
        <!-- <h1> My Todo List </h1> -->
        <!-- this is now a data driven component
                that outputs anything in the todos array -->
        <div>
            <button class="button">Add Item</button>
        </div>
        <div v-for="(Part, index) in myParts" v-bind:key="index">
            <div class="table">
                <div class="row">
                    <div class="cell col1">
                    <input type="checkbox" name="name1" id="1"><br>
                    </div>
                    <div class="cell col2"> <span>{{ Part.name }}</span> </div>
                    <div class="cell col4">
                        <button type="button" name="btn-delete">Delete</button>
                        <button type="button" name="btn-Edit">Edit</button>
                    </div>
                    
                </div>
                </div>
        </div>
        <br>
        
    </div>
</template>

<script lang='ts'>


 
import Vue from "vue";


 
import { Component } from "vue-property-decorator";


 



 
/* NOTE: it is useful for only Api and Client 


 
 * in separate windows with VS Code */


 



 
/* this is creating a component */


 
@Component


 
// if default then


 
// import ToDos from './views/ToDos.vue'


 
//  if not default then


 
// import { ToDos } from './views/ToDos.vue'


 



 
// NOTE: do npm run serve in the client dir to compile


 
export default class Parts extends Vue {
  // this export says, if another files imports this file,
  // then it only gets this component
  myParts: Part[] = [
    { name: "Trek Bike" },
    { name: "Bike Pump" },
    { name: "Tire" }
  ];
  item: Part = {
    name: "",
  };
}
interface Part {
  name: string;
}
</script>