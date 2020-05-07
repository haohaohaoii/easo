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
            <template v-for="(item,index) of menulist">
                <template v-if="item.subMenus && item.subMenus.length==0">
                    <el-menu-item :index="item.path" :key="item.path">
                        <template v-if="item.menuType==0 && item.menuName=='首页'">
                            <span class="iconfont sy">&#xe723;</span>
                            <span slot="title">{{item.menuName}}</span>
                        </template>
                    </el-menu-item>
                </template>
                <template v-if="item.subMenus && item.subMenus.length>=1">
                    <el-submenu :key="index" class="upopt" :index="item.createTime">
                        <template slot="title" v-if="item.menuType==0 && item.menuName=='数据查看'">
                            <!-- <span class="iconfont sjck" style="font-size:26px">&#xe6b8;</span> -->
                            <span class="iconfont sjck">&#xe6b8;</span>
                            {{item.menuName}}
                            <span
                                class="iconfont"
                            >&#xe648;</span>
                        </template>
                        <template slot="title" v-else-if="item && item.menuName=='企业管理'">
                            <span class="iconfont qygl">&#xe626;</span>
                            <span>{{item.menuName}}</span>
                            <span class="iconfont">&#xe648;</span>
                        </template>
                        <template slot="title" v-else-if="item && item.menuName=='权限管理'">
                            <!-- <span class="iconfont qxgl" style="font-size:26px">&#xe63b;</span> -->
                            <span class="iconfont qxgl">&#xe63b;</span>
                            {{item.menuName}}
                            <span
                                class="iconfont"
                            >&#xe648;</span>
                        </template>
                        <template slot="title" v-else-if="item && item.menuName=='内容管理'">
                            <!-- <span class="iconfont nrgl" style="font-size:22px">&#xe646;</span> -->
                            <span class="iconfont nrgl">&#xe646;</span>
                            {{item.menuName}}
                            <span
                                class="iconfont"
                            >&#xe648;</span>
                        </template>
                        <template slot="title" v-else-if="item && item.menuName=='运维管理'">
                            <!-- <span class="iconfont ywgl" style="font-size:20px">&#xe604;</span> -->
                            <span class="iconfont ywgl">&#xe604;</span>
                            {{item.menuName}}
                            <span
                                class="iconfont"
                            >&#xe648;</span>
                        </template>
                        <template slot="title" v-else-if="item && item.menuName=='数据报表'">
                            <span class="iconfont sjbb">&#xe707;</span>
                            {{item.menuName}}
                            <span
                                class="iconfont"
                            >&#xe648;</span>
                        </template>
                        <template slot="title" v-else-if="item && item.menuName=='设置'">
                            <span class="iconfont sz">&#xe615;</span>
                            {{item.menuName}}
                            <span
                                class="iconfont"
                            >&#xe648;</span>
                        </template>
                        <el-menu-item
                            v-for="seciem of item.subMenus"
                            :key="seciem.path"
                            class="opt"
                            :index="seciem.path"
                        >{{seciem.menuName}}</el-menu-item>
                    </el-submenu>
                </template>
            </template>
        </el-menu>
        <div class="tubiao">
            <theme-picker></theme-picker>
            <!-- <i
                class="el-icon-s-custom ic"
                @mouseenter="cusEnter"
                @mouseleave="cusLeave"
                :style="cusObj"
            ></i>-->
            <el-badge :value="wdly" class="item">
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
const Base64 = require("js-base64").Base64;
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
            }
            
        };
    },
    computed: {
        ...mapState(["menulist", "defaultMenu","wdly"]),
        // menuList(){
        //      debugger
        //     let arr= []
        //     if(this.menulist && this.menulist.length>0){
                
        //         for(let k=0; k<this.menulist.length;k++){
        //             if(this.menulist[k].menuName == '企业管理'){
        //                 arr[0] = this.menulist[k]
        //             }
        //             if(this.menulist[k].menuName == '数据查看'){
        //                 arr[1] = this.menulist[k]
        //             }
        //             if(this.menulist[k].menuName == '数据报表'){
        //                 arr[2]=this.menulist[k]
        //             }
        //             if(this.menulist[k].menuName == '内容管理'){
        //                 arr[3]=this.menulist[k]
        //             }
        //             if(this.menulist[k].menuName == '运维管理'){
        //                 arr[4]=this.menulist[k]
        //             }
        //             if(this.menulist[k].menuName == '权限管理'){
        //                 arr[5]=this.menulist[k]
        //             }
        //             if(this.menulist[k].menuName == '设置'){
        //                 arr[6]=this.menulist[k]
        //             }
        //         }
          
               
        //     }
           
        //      return arr
        // }
        // menuList(){
        //     if(this.menulist && this.menulist.length>0){
        //         return this.menulist.reverse()
        //     }
        // }
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
            this.$router.push("/message");
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
                    
                    if(localStorage.getItem("userPaw")){  //说明是记住密码
                        let password = Base64.decode(localStorage.getItem("userPaw")); //获取密码(base64解密)
                        let name = localStorage.getItem("userName");
             
                        localStorage.removeItem('tremePackers')
                        localStorage.removeItem('breadArr')
                        localStorage.removeItem('adminId')
                        localStorage.removeItem('token')  
                        sessionStorage.clear(); //清空session中的数据
                        this.$store.commit("getToken", "");
                        this.$store.commit("getAdminid", "");
                        this.$router.push({name:'login',params:{name:name,pwd:password}});
                    }else{
                        localStorage.clear(); //清空local中的数据
                        sessionStorage.clear(); //清空session中的数据
                        this.$store.commit("getToken", "");
                        this.$store.commit("getAdminid", "");
                        this.$router.push("/login");
                    }
                   
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
    position: relative;
    top: 0;
    right: 0;
    .el-menu-demo {
        display: flex;
        align-items: center;
    }
}

//一级菜单移入 修改椭圆样式
.header >>> .el-submenu__title:hover {
    border: 1px solid #409eff;
    background-color: #1f87e7 !important; //改变背景颜色
    color: #ffffff !important; //改变字体颜色
}

//多级菜单父级点击修改椭圆样式
.header >>> .el-menu--horizontal > .el-submenu.is-active .el-submenu__title {
    border: 1px solid #409eff;
    background-color: #1f87e7 !important;
    color: #ffffff !important; //改变字体颜色
}
//二级菜单移入的背景颜色
.opt:hover {
    background-color: #1f87e7 !important; //改变背景颜色
    color: #ffffff !important; //改变字体颜色
}
//二级菜单选中的本身背景颜色--可以
.opt.is-active {
    background-color: #1f87e7 !important;
    color: #ffffff !important; //改变字体颜色
}

//一级菜单选中
.header >>> .el-menu-item.is-active {
    background-color: #1f87e7 !important;
    color: #ffffff !important; //改变字体颜色
}

//一级菜单
.header >>> .el-menu-item:hover {
    background-color: #1f87e7 !important;
    color: #ffffff !important; //改变字体颜色
}
//消除自带的箭头
.header >>> .el-menu--horizontal > .el-submenu .el-submenu__icon-arrow {
    display: none;
}
</style>