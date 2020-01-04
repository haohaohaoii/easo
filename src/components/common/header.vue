<template>
    <!--头部菜单-->
    <div class="header">
        <el-menu
            :default-active="this.$route.path"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#FFFFFF"
            text-color="#333333"
            active-text-color="#5B8CFF"
            router
        >
            <el-submenu v-for="item of firstMenu" :key="item.name" :index="item.path" class="upopt">
                <template slot="title">
                    <i class="iconfont icon-shuju" style="font-size:20px"></i>
                    {{item.name}}
                </template>
                <el-menu-item
                    v-for="seciem of item.second"
                    :key="seciem.path"
                    :index="seciem.path"
                    class="opt"
                >{{seciem.name}}</el-menu-item>
            </el-submenu>
            <el-submenu v-for="item of secondMenu" :key="item.name" :index="item.path">
                <template slot="title">
                    <i class="iconfont icon-shuju"></i>
                    {{item.name}}
                </template>
                <el-menu-item
                    v-for="seciem of item.second"
                    :key="seciem.path"
                    :index="seciem.path"
                    class="opt"
                >{{seciem.name}}</el-menu-item>
            </el-submenu>
            <el-submenu v-for="item of thirdMenu" :key="item.name" :index="item.path">
                <template slot="title">
                    <i class="iconfont icon-shuju"></i>
                    {{item.name}}
                </template>
                <el-menu-item
                    v-for="seciem of item.second"
                    :key="seciem.path"
                    :index="seciem.path"
                    class="opt"
                >{{seciem.name}}</el-menu-item>
            </el-submenu>
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
            firstMenu: [
                {
                    name: "数据查看",
                    path: "/adataView",
                    second: [
                        { name: "历史数据", path: "/hisData" },
                        { name: "实时数据", path: "/realData" }
                    ]
                }
            ],
            secondMenu: [
                {
                    name: "企业管理",
                    path: "/busManage",
                    second: [
                        {
                            name: "企业信息",
                            path: "/enterMation"
                        },
                        {
                            name: "留言管理",
                            path: "/spam"
                        },
                        {
                            name: "基站管理",
                            path: "/baseManage"
                        }
                    ]
                }
            ],
            thirdMenu: [
                {
                    name: "权限管理",
                    path: "/authManage",
                    second: [
                        { name: "角色管理", path: "/roleManage" },
                        { name: "用户管理", path: "/userManage" },
                        { name: "部门管理", path: "/divManage" },
                        {
                            name: "菜单管理",
                            path: "/menuManage"
                        }
                    ]
                }
            ]
        };
    },
    computed: {
        ...mapState(["msg"])
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        }
    }
};
</script>

<style lang="scss" scoped>
.header {
    height: 10%;
    .tubiao {
        position: absolute;
        right: 0%;
        top: 1.5%;
        width: 20%;
        text-align: end;
        i {
            padding-right: 7%;
            font-size: 22px;
            color: #6d99f9;
        }
    }
}
//多级菜单(第一级)移入
.header >>> .el-submenu__title:hover {
    background-color: #1f87e7 !important; //改变背景颜色
    color: #ffffff !important; //改变字体颜色
}
//二级菜单移入的背景颜色
.opt:hover {
    background-color: #1f87e7 !important; //改变背景颜色
    color: #ffffff !important; //改变字体颜色
}
//二级菜单选中的背景颜色--可以
// .opt.is-active {
//     background-color: #1f87e7 !important;
//     color: #ffffff !important; //改变字体颜色
// }
</style>