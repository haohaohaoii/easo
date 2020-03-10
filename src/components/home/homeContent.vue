<template>
    <div class="content" >
        <bread></bread>
        <router-view></router-view>
    </div>
</template>

<script>
import bread from "../common/bread";
import historyData from "../historyData/historyData";
export default {
    components: {
        bread,
        historyData
    },
    data(){
        return{
            
        }
    }
};
</script>

<style lang="scss" scoped>

</style>