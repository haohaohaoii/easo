<template>
    <div class="userManage">
        <div class="userTop">
            <div class="markMsg">
                <div></div>
                <p>用户管理</p>
                <el-button
                    type="primary"
                    icon="el-icon-circle-plus-outline"
                    size="mini"
                    class="add"
                    @click="addRole"
                >添加用户</el-button>
            </div>
        </div>
        <user-list></user-list>
    </div>
</template>

<script>
import userList from './userList'
export default {
    components:{
        userList
    },
    data() {
        return {};
    },
    methods:{
        //添加角色
        addRole(){
            this.$router.push({path:'/userAdd'});
            this.$store.commit('userAdd',true);
        }
        
    }
};
</script>


<style lang="scss" scoped>
.userManage {
    height: 100%;
    background: #ffff;
    box-sizing: border-box;
    padding: 1%;
    .userTop {
        height: 16.5%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .markMsg {
            display: flex;
            div {
                width: 0.15%;
                background: rgba(30, 135, 240, 1);
                position: relative;
                right: 1%;
                top: 10%;
            }
            p {
                font-size: 20px;
                font-family: Adobe Heiti Std;
                font-weight: bold;
                color: rgba(51, 62, 68, 1);
            }
            .add {
                position: absolute;
                right: 4%;
            }
        }
    }
}
</style>