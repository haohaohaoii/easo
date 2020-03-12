<template>
    <!--头部菜单-->
    <div class="header">
        <change-pawd></change-pawd>
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
            <i
                class="el-icon-s-custom ic"
                @mouseenter="cusEnter"
                @mouseleave="cusLeave"
                :style="cusObj"
            ></i>
            <el-badge :value="1" class="item">
                <i
                    class="el-icon-message-solid ic"
                    @mouseenter="msgEnter"
                    @mouseleave="msgLeave"
                    :style="msgObj"
                    @click="message"
                ></i>
            </el-badge>
            <i
                class="el-icon-unlock ic"
                @mouseenter="lockEnter"
                @mouseleave="lockLeave"
                :style="lockObj"
                @click="changePawd"
            ></i>
            <i
                class="el-icon-switch-button ic"
                @mouseenter="logEnter"
                @mouseleave="logLeave"
                :style="logObj"
                @click="logOut"
            ></i>
        </div>
    </div>
</template>

<script>
import ThemePicker from "./ThemePicker";
import changePawd from "./changePawd";
import { mapState, mapMutations } from "vuex";
export default {
    components: {
        ThemePicker,
        changePawd
    },
    data() {
        return {
            cusObj: {
                //头部右侧小人
                background: "",
                color: ""
            },
            msgObj: {
                //头部右侧消息
                background: "",
                color: ""
            },
            lockObj: {
                //头部右侧锁
                background: "",
                color: ""
            },
            logObj: {
                //头部右侧退出登录
                background: "",
                color: ""
            },
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
        },
        //头部右侧小人头像
        cusEnter() {
            this.cusObj = {
                color: "#66b1ff"
            };
        },
        cusLeave() {
            this.cusObj = {
                color: ""
            };
        },
        //头部右侧消息
        msgEnter() {
            this.msgObj = {
                color: "#66b1ff"
            };
        },
        msgLeave() {
            this.msgObj = {
                color: ""
            };
        },
        //头部右侧锁
        lockEnter() {
            this.lockObj = {
                color: "#66b1ff"
            };
        },
        lockLeave() {
            this.lockObj = {
                color: ""
            };
        },
        //头部右侧退出登录
        logEnter() {
            this.logObj = {
                color: "#66b1ff"
            };
        },
        logLeave() {
            this.logObj = {
                color: ""
            };
        },
        //点击消息
        message() {
            this.$router.push("/spam");
        },
        //点击修改密码
        changePawd() {
            this.$store.commit("pwdDialog", true);
        },
        //点击退出图标
        logOut() {
            this.$confirm("确认要退出该系统吗？", "退出登录", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    localStorage.clear(); //清空local中的数据
                    sessionStorage.clear(); //清空session中的数据
                    this.$store.commit("getToken", "");
                    this.$store.commit("getAdminid", "");
                    this.$router.push("/login");
                })
                .catch(() => {
                    this.$message({
                        message: "已取消该操作"
                    });
                });
        }
    }
};
</script>

<style lang="scss" scoped>
.header {
    height: 60px;
    .el-menu-demo {
        display: flex;
    }
    .tubiao {
        position: absolute;
        right: 0%;
        top: 14px;
        width: 17%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .ic {
            font-size: 22px;
            color: #3a8ee6;
            font-weight: bolder;
            // padding: 6px 10px;
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