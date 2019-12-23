<template>
    <!--登录-->
    <div class="login">
        <!--登录页面中间内容-->
        <div class="loginContent">
            <img src="../../assets/images/loginpic.png" alt />
            <div class="contentR">
                <p class="tit">环境管家后台管理系统</p>
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

    .loginContent {
        width: 816px;
        display: flex;
        margin: 0 auto;
        transform: translateY(-50%);
        position: relative;
        top: 50%;
        img {
            width: 408px;
            height: 450px;
        }
        .contentR {
            width: 408px;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
            // background-color: #2d55ea;
            background: url("../../assets/images/logc.png") no-repeat;
            .tit {
                font-size: 30px;
                font-family: mf-lihei;
                font-weight: 400;
                color: rgba(255, 255, 255, 1);
            }
            .loginFill {
                padding: 0 35px;
                .tip {
                    color: rgba(255, 255, 255, 1);
                }
                .iptv {
                    padding-bottom: 10px;
                }
            }

            .btn {
                width: 163px;
                font-size: 17px;
                font-weight: normal;
                color: rgba(51, 51, 51, 1);
            }
        }
    }
}
</style>