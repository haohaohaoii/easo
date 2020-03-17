<template>
    <div class="bread">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item to="/">当前位置</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item,index) in breadArr" :key="index">{{item.name}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    computed:{
        ...mapState(['breadArr'])
    }
};

</script>

<style lang="scss" scoped>
.bread {
    position: absolute;
    top: 67.5px;
}
</style>