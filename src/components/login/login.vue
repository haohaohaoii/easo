<template>
    <!--登录-->
    <div class="login">
        <!--登录页面中间内容-->
        <div class="loginContent">
            <div class="contentL"></div>
            <div class="contentR">
                <div class="tit">
                    <p>环境管家后台管理系统</p>
                    <div></div>
                </div>

                <div class="loginFill">
                    <el-input placeholder="用户名" v-model="userName" clearable class="iptv"></el-input>
                    <el-input placeholder="密码" v-model="userPaw" show-password class="iptv"></el-input>
                    <el-checkbox v-model="remenbVal" class="tip">记住密码</el-checkbox>
                </div>
                <el-button round class="btn" @click="login">登录</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations } from "vuex";
import filterRoutes from "../../utils/filterRoutes";
import asyncRoutes from "../../utils/asyncRoutes.js";
const Base64 = require("js-base64").Base64;
export default {
    data() {
        return {
            userName: "", //用户名
            userPaw: "", //密码
            remenbVal: false //记住密码
        };
    },
    mounted() {
        //判断用户上一次操作是否是记住密码
        this.getPaw();
    },
    methods: {
        login() {
            if (this.userName && this.userPaw) {
                //调用登陆接口
                this.getAdminid();
            } else {
                this.$message.error("注意：账号或密码不能为空");
            }
        },

        //调用登陆接口获取adminId
        getAdminid() {
            let params = { username: this.userName, password: this.userPaw }; //获取参数
            this.$api.login
                .login(params)
                .then(res => {
                    console.log(res);
                    if (res.data.code == 0) {
                        //说明登陆成功
                        if (this.remenbVal) {
                            //说明是记住密码
                            localStorage.setItem("userName", this.userName); //存储账号
                            localStorage.setItem(
                                "userPaw",
                                Base64.encode(this.userPaw)
                            ); //存储密码(base64加密)
                        }
                        localStorage.setItem("token", res.data.data[0].token); //存储token
                        let adminId = res.data.data[0].id; //获取adminId
                        this.getMenu(adminId); //调用获取菜单权限方法
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },

        //用adminId获取菜单权限
        getMenu(adminId) {
            let adminid = adminId;
            let _this = this;
            this.$api.menu.getMenu(adminid).then(res => {
                console.log(res);
                if (res.status == 200) {
                    if (res.data.code == 0) {
                        //获取路由表
                        filterRoutes
                            .filters(asyncRoutes, res.data.data)
                            .then(menuRoutes => {
                                console.log(menuRoutes);
                                localStorage.setItem(
                                    "menuRoutes",
                                    JSON.stringify(menuRoutes)
                                ); //避免刷新的时候路由表
                                //添加路由表
                                menuRoutes.forEach(route => {
                                    _this.$router.options.routes[1].children.push(
                                        route
                                    );
                                });
                                _this.$router.addRoutes(
                                    _this.$router.options.routes
                                );
                            });
                        //获取菜单表
                        filterRoutes
                            .getMenus(asyncRoutes, res.data.data)
                            .then(menuItems => {
                                console.log(menuItems);
                                localStorage.setItem(
                                    "menuPaths",
                                    JSON.stringify(menuItems)
                                ); //避免刷新的时候菜单表丢失
                                _this.$store.commit("getMenulist", menuItems);
                            });
                    }
                    if (_this.$route.query.redirect) {
                        //重定向过来的
                        _this.$router.push(_this.$route.query.redirect);
                    } else {
                        _this.$router.push("/");
                    }
                }
            }).catch(error=>{
                console.log(error)
            })
        },

        //刚进页面的时候去获取用户名、密码、token
        getPaw() {
            let name = localStorage.getItem("userName");
            let password = Base64.decode(localStorage.getItem("userPaw")); //获取密码(base64解密)
            let token = localStorage.getItem("token");
            if (name && password && token) {
                //说明上一次登陆是记住密码
                this.userName = name;
                this.userPaw = password;
                this.remenbVal = true;
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.login {
    background: url("../../assets/images/loginbac.png") no-repeat;

    height: 100%;

    width: 100%;

    overflow: hidden;

    background-size: cover;
    /**登陆框 */
    .loginContent {
        display: flex;
        margin: 0 auto;
        width: 63%;
        height: 66%;
        align-items: center;
        position: relative;
        top: 50%;
        transition: transform;
        transform: translateY(-50%);

        /**登陆框左侧背景 */
        .contentL {
            background: url("../../assets/images/loginpic.png") no-repeat;
            width: 100%;
            height: 100%;
            background-size: cover;
        }
        /**登陆框右侧 */
        .contentR {
            background: url("../../assets/images/logc.png") no-repeat;
            width: 100%;
            height: 100%;
            background-size: cover;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
            .tit {
                p {
                    font-size: 54px;
                    font-family: "MFLiHei";
                    font-weight: 400;
                    color: rgba(255, 255, 255, 1);
                }
                div {
                    width: 10%;
                    height: 2%;
                    position: relative;
                    left: 46%;
                    top: 11%;
                    background: rgba(255, 255, 255, 1);
                }
            }
            /**登陆框中间部分 */
            .loginFill {
                width: 80%;
                height: 30%;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                .tip {
                    color: white;
                }
            }
            /**登陆框按钮 */
            .btn {
                width: 60%;
            }
        }
        //记住密码的时候改变字体颜色
        .contentR >>> .el-checkbox__input.is-checked + .el-checkbox__label {
            color: white;
        }
    }
}
</style>