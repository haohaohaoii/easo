<template>
    <!--头部菜单-->
    <div class="header">
        <!--头部上右侧菜单-->
        <!-- <div class="headerTop">
            <img src="../../assets/images/admin.png" alt />

            <img src="../../assets/images/msg.png" alt />

            <img src="../../assets/images/change.png" alt />

            <img src="../../assets/images/out.png" alt />
        </div> -->
        <!--头部下导航栏菜单-->
        <el-menu
            :default-active="activeIndex2"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
        >
            <el-menu-item index="1">数据查看</el-menu-item>
            <el-submenu index="2">
                <template slot="title">企业管理</template>
                <el-menu-item index="2-1">选项1</el-menu-item>
                <el-menu-item index="2-2">选项2</el-menu-item>
                <el-menu-item index="2-3">选项3</el-menu-item>
            </el-submenu>
            <el-menu-item index="3">{{msg}}</el-menu-item>
            <!-- <el-menu-item index="4" class="floatR">
               <i class="el-icon-switch-button"></i>
            </el-menu-item>
            <el-menu-item index="5" class="floatR">
                <i class="el-icon-unlock"></i>
            </el-menu-item>
            <el-menu-item index="6" class="floatR">
                <i class="el-icon-message-solid"></i>
            </el-menu-item>
            <el-menu-item index="7" class="floatR">
                 <i class="el-icon-s-custom"></i>
            </el-menu-item> -->
        </el-menu>
        <div class="tubiao">
            <i class="el-icon-s-custom"></i>
            <i class="el-icon-message-solid"></i>
            <i class="el-icon-unlock"></i>
            <i class="el-icon-switch-button"></i>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    data() {
        return {
            activeIndex2: "1"
        };
    },
    computed: {
        ...mapState(["msg"])
    },
    methods: {
        handleSelect() {}
    }
};
</script>

<style lang="scss" scoped>
.header {
    height: 10%;
    // .headerTop {
    //     height: 40px;
    //     background: burlywood;
    //     line-height: 40px;
    //     z-index: 555;
    //     img {
    //         width: 1%;
    //         height: 40%;
    //         float: right;
    //         padding-right: 2%;
    //         padding-top: 0.7%;
    //     }
    // }
    .tubiao{
        position: absolute;
        right: 0%;
        top: 1.5%;
        width: 20%;
        text-align: end;
        i{
            padding-right: 7%;
            font-size: 22px;
            color: #6D99F9;
        }
    }
}
</style>