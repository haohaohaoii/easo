<template>
    <!--头部菜单-->
    <div class="header">
        <el-menu
            :default-active="defaultMenu"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
        >
            <!-- <div v-for="(item,index) of createMenu" :key="index"> -->
            <el-submenu
                v-if="item.subMenus && item.subMenus.length>=1"
                v-for="(item,index) of menulist"
                :key="index"
                class="upopt"
                :index="item.createTime"
            >
                <template slot="title">
                    <i class="iconfont icon-shuju" style="font-size:20px"></i>
                    {{item.menuName}}
                </template>
                <el-menu-item
                    v-for="seciem of item.subMenus"
                    :key="seciem.path"
                    class="opt"
                    :index="seciem.path"
                >{{seciem.menuName}}</el-menu-item>
            </el-submenu>
            <!-- <el-menu-item v-else :index="item.one.path">{{item.one.menuName}}</el-menu-item> -->
            <!-- </div> -->

            <!-- <el-submenu v-for="item of firstMenu" :key="item.name" :index="item.path" class="upopt">
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
            </el-submenu>-->
        </el-menu>

        <div class="tubiao">
            <theme-picker></theme-picker>
            <i class="el-icon-s-custom ic"></i>
            <el-badge :value="12" class="item">
                <i class="el-icon-message-solid ic"></i>
            </el-badge>
            <!-- <i class="el-icon-message-solid">
                <el-badge :value="8"></el-badge>
            </i>-->

            <i class="el-icon-unlock ic"></i>
            <i class="el-icon-switch-button ic"></i>
        </div>
    </div>
</template>

<script>
import ThemePicker from "./ThemePicker";
import { mapState, mapMutations } from "vuex";
export default {
    components: {
        ThemePicker
    },
    data() {
        return {
            createMenu: [
                {
                    one: { id: "2", menuName: "数据查看" },
                    two: [
                        { id: "5", menuName: "实时数据", path: "realData" },
                        { id: "6", menuName: "历史数据", path: "hisData" }
                    ]
                },
                {
                    one: { id: "3", menuName: "企业管理" },
                    two: [
                        { id: "7", menuName: "企业信息", path: "enterMation" },
                        { id: "8", menuName: "留言管理", path: "spam" },
                        { id: "9", menuName: "基站管理", path: "baseManage" }
                    ]
                }
            ],
            firstMenu: [
                {
                    name: "数据查看",
                    path: "/a",
                    second: [
                        { name: "历史数据", path: "hisData" },
                        { name: "实时数据", path: "realData" }
                    ]
                }
            ],
            secondMenu: [
                {
                    name: "企业管理",
                    path: "/b",
                    second: [
                        {
                            name: "企业信息",
                            path: "enterMation"
                        },
                        {
                            name: "留言管理",
                            path: "spam"
                        },
                        {
                            name: "基站管理",
                            path: "baseManage"
                        }
                    ]
                }
            ],
            thirdMenu: [
                {
                    name: "权限管理",
                    path: "/c",
                    second: [
                        { name: "角色管理", path: "roleManage" },
                        { name: "用户管理", path: "userManage" },
                        { name: "部门管理", path: "divManage" },
                        {
                            name: "菜单管理",
                            path: "menuManage"
                        }
                    ]
                }
            ]
        };
    },
    computed: {
        ...mapState(["menulist", "defaultMenu"])
    },
    methods: {
        handleSelect(key, keyPath) {
            this.$store.commit("changeDefaultmenu", key);
            this.$router.push({ path: "/" + key });
        }
    }
};
</script>

<style lang="scss" scoped>
.header {
    height: 10%;
    .el-menu-demo {
        display: flex;
    }
    .tubiao {
        position: absolute;
        right: 0%;
        top: 15px;
        width: 17%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .ic {
            font-size: 22px;
            color: #6d99f9;
            font-weight: bolder;
        }
    }
}
//多级菜单(第一级)移入
.header >>> .el-submenu__title:hover {
    background-color: #1f87e7 !important; //改变背景颜色
    color: #ffffff !important; //改变字体颜色
}
// .header >>>.el-submenu__title i:hover {
//         color: red !important;
//     }
//二级菜单移入的背景颜色
.opt:hover {
    background-color: #1f87e7 !important; //改变背景颜色
    color: #ffffff !important; //改变字体颜色
}
//二级菜单选中的背景颜色--可以
.opt.is-active {
    background-color: #1f87e7 !important;
    color: #ffffff !important; //改变字体颜色
}
.header >>> .el-menu-item.is-active {
    background-color: #1f87e7 !important;
    color: #ffffff !important; //改变字体颜色
}
</style>