<template>
  <div id="test">
      <diy-dashed></diy-dashed>
  </div>
</template>

<script>
import diyDashed from "@/components/dialog.vue";
export default {
    components: { diyDashed },
data(){
    return{

    }
}
}
</script>

<style scoped> 
#test{
    width: 100%;
    height: 100%;
}
</style>