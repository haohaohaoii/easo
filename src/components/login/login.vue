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
import { mapMutations, mapActions, mapState, getters, mapGetters } from "vuex";

const Base64 = require("js-base64").Base64;
export default {
    data() {
        return {
            userName: "", //用户名
            userPaw: "", //密码
            remenbVal: false //记住密码
        };
    },
    computed: {
        ...mapState(["rolesRoutes", "menulist","directName"]),
        ...mapGetters(["getRoles"])
    },
    mounted() {
        //判断用户上一次操作是否是记住密码
        this.getPaw();
        //绑定事件
        window.addEventListener('keydown',this.keyDown);
    },
    destroyed(){
        window.removeEventListener('keydown',this.keyDown,false);
    },

    methods: {
        keyDown(e){
        //如果是回车则执行登录方法
            if(e.keyCode == 13){
                this.login();
            }
        },
        login() {
            if (this.userName && this.userPaw) {
                //调用登陆接口
                this.getAdminid();
            } else {
                this.$message.error("注意：账号或密码不能为空");
            }
        },
        // login() {
        //     let adminId = 3;
        //     this.$store
        //         .dispatch("getRole", adminId)
        //         .then(res => {
        //             //跳转路由页面
        //             if (this.getRoles.length > 0) {
        //                 this.$store.commit("getToken", "asdasdas");
        //                 this.$store.commit("getAdminid", 2);
        //                 this.$router.addRoutes(this.getRoles);
        //                 if (this.$route.query.redirect) {
        //                     //重定向过来的
        //                     this.$router.push(this.$route.query.redirect);
        //                 } else {
        //                     //正常登陆的
        //                     this.$router.push("/");
        //                 }
        //             }
        //         })
        //         .catch(error => {
        //             alert("错误");
        //         });
        // },
        // getAdminid() {
        //     let params = { username: this.userName, password: this.userPaw }; //获取参数
        //     this.$api.login
        //         .login(params)
        //         .then(res => {
        //             console.log(res);
        //             if (res.data.code == 0) {
        //                 //登陆成功
        //                 if (this.remenbVal) {
        //                     //记住密码
        //                     localStorage.setItem("userName", this.userName); //存储账号
        //                     localStorage.setItem(
        //                         "userPaw",
        //                         Base64.encode(this.userPaw)
        //                     ); //存储密码(base64加密)
        //                 }
        //                 localStorage.setItem("token", res.data.data[0].token); //存储token
        //                 let adminId = res.data.data[0].id; //获取adminId
        //                 localStorage.setItem("adminId", adminId);
        //                 this.$store.commit("getToken", res.data.data[0].token);
        //                 this.$store.commit("getAdminid", res.data.data[0].id);
        //                 this.$store
        //                     .dispatch("getRoles", adminId)
        //                     .then(res => {
        //                         //跳转路由页面
        //                         if (this.getRoles.length > 0) {
        //                             this.$router.addRoutes(this.getRoles);
        //                             if (this.$route.query.redirect) {
        //                                 //重定向过来的
        //                                 this.$router.push(
        //                                     this.$route.query.redirect
        //                                 );
        //                             } else {
        //                                 //正常登陆的
        //                                 this.$router.push("/");
        //                             }
        //                         }
        //                     })
        //                     .catch(error => {});
        //             }
        //         })
        //         .catch(error => {
        //             console.log(error);
        //         });
        // },
 
        //调用登陆接口获取adminId
        getAdminid() {
            let params = { username: this.userName, password: this.userPaw }; //获取参数
            this.$api.login
                .login(params)
                .then(res => {
                    console.log(res);
                    if (res.data.code == 0) {
                        //登陆成功
                        if (this.remenbVal) {
                            //记住密码
                            localStorage.setItem(
                                "userPaw",
                                Base64.encode(this.userPaw)
                            ); //存储密码(base64加密)
                        }
                         localStorage.setItem("userName", this.userName); //存储账号
                        localStorage.setItem("token", res.data.data[0].token); //存储token
                        let adminId = res.data.data[0].id; //获取adminId
                        localStorage.setItem("adminId", adminId);
                        this.$store.commit("getToken", res.data.data[0].token);
                        this.$store.commit("getAdminid", res.data.data[0].id);
                        this.$store.dispatch("getRole", adminId).then(res => {
                            //跳转路由页面
                            if (this.getRoles.length > 0) {
                                // this.$router.matcher = new VueRouter({mode: 'history',routes: []}).matcher;
                                this.$router.selfaddRoutes(this.getRoles)
                                // this.$router.addRoutes(this.getRoles);
                                if (this.$route.query.redirect) {
                                    //重定向过来的
                                    this.$router.push(
                                        this.$route.query.redirect
                                    );
                                } else {
                                    //正常登陆的
                                    this.$router.push("/"+this.directName);
                                    this.$message({
                                        message: `登陆成功,欢迎${this.userName}`,
                                        type: 'success',
                                        duration:3000
                                    });
                                }
                            }
                        })
                        .catch(error => {});
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },

        //刚进页面的时候去获取用户名、密码、token
        getPaw() {
       
            if(this.$route.params.name && this.$route.params.pwd){
                let name = this.$route.params.name;
                let pwd  = this.$route.params.pwd;
                if (name && pwd) {
                    //说明上一次登陆是记住密码
                    this.userName = name;
                    this.userPaw = pwd;
                    this.remenbVal = true;
                }
            }
            
        }
    },
    watch:{
        remenbVal(val){
            if(!val){
                if(localStorage.getItem("userPaw")){
                    localStorage.removeItem('userPaw');
                    localStorage.removeItem("userName");
                    localStorage.removeItem("token");
                }
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.login >>> .el-input__suffix {
    display: flex;
    align-items: center;
}
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
                position: relative;
                p {
                    // font-size: 54px;
                    // font-family: "MFLiHei";
                    // font-weight: 400;
                    // color: rgba(255, 255, 255, 1);
                    // font-size: 54px;
                    font-family: SimHei;
                    font-weight: 400;
                    color: rgba(255, 255, 255, 1);
                }
                div {
                    // width: 8%;
                    // height: 0.5%;
                    // position: absolute;
                    // left: 71%;
                    // top: 23%;
                    // background: #fff;
                    width: 14%;
                    height: 2px;
                    position: absolute;
                    left: 43%;
                    background: #fff;
                    top: 106%;
                }
            }
            /**登陆框中间部分 */
            .loginFill {
                width: 80%;
                height: 30%;
                // margin-top: -10%;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                .tip {
                    color: white;
                }
            }
            /**登陆框按钮 */
            .btn {
                // width: 274px;
                // height: 56px;
                background: rgba(255, 255, 255, 1);
                // border-radius: 8px;
                // font-size: 28px;
                font-family: Adobe Heiti Std;
                font-weight: normal;
                color: rgba(51, 51, 51, 1);
                position: relative;
                /deep/ span {
                    display: inline-block;
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                }
            }
        }
        //记住密码的时候改变字体颜色
        .contentR >>> .el-checkbox__input.is-checked + .el-checkbox__label {
            color: white;
        }
    }
}
</style>