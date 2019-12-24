<template>
    <!--登录-->
    <div class="login">
        <!--登录页面中间内容-->
        <div class="loginContent">
            <div class="contentL">
            </div>
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
export default {
    data() {
        return {
            userName: "", //用户名
            userPaw: "", //密码
            isRemenber: true //记住密码
        };
    },
    methods: {
        login() {
            this.$router.push("/");
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
    .loginContent{
        display: flex;
        margin: 0 auto;
        width: 80%;
        height: 75%;
        align-items: center;
        position: relative;
        top: 50%;
        transition: transform;
        transform: translateY(-50%);

        /**登陆框左侧背景 */
        .contentL{
            background: url("../../assets/images/loginpic.png") no-repeat;
            width: 100%;
            height: 100%;
            background-size: cover;
        }
        /**登陆框右侧 */
        .contentR{
            background: url("../../assets/images/logc.png") no-repeat;
            width: 100%;
            height: 100%;
            background-size: cover;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
            .tit{
                p{
                    font-size:54px;
                    font-family:MF LiHei (Noncommercial);
                    font-weight:400;
                    color:rgba(255,255,255,1);
                }
                div{
                    width: 10%;
                    height: 2%;
                    position: relative;
                    left: 46%;
                    top: 11%;
                    background:rgba(255,255,255,1);
                }
            }
            /**登陆框中间部分 */
            .loginFill{
                width: 80%;
                height: 30%;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                .tip{
                    color: white;
                }
            }
            /**登陆框按钮 */
            .btn{
                width: 60%;
            }
        }
        .contentR >>>.el-input .el-input__clear{
            color: red;
        }
    }
}
</style>