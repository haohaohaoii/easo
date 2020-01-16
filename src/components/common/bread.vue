<template>
    <div class="bread">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item
                v-for="(item,index) in breadArr"
                :key="index"
                :to="item.path"
            >{{item.name}}</el-breadcrumb-item>
            <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>
                <a href="/">活动管理</a>
            </el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>-->
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
    top: 10%;
}
</style>