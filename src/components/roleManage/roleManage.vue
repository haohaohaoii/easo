<template>
    <div class="roleManage">
        <div class="roleTop">
            <div class="markMsg">
                <div></div>
                <p>角色管理</p>
                <el-button
                    type="primary"
                    icon="el-icon-circle-plus-outline"
                    size="mini"
                    class="add"
                    @click="addRole"
                >添加角色</el-button>
            </div>
        </div>
        <role-list></role-list>
    </div>
</template>

<script>
import roleList from './roleList';
import {mapMutations} from 'vuex';
export default {
    components:{
        roleList
    },
    data() {
        return {};
    },
    methods:{
        //添加角色
        addRole(){
            this.$router.push({path:'/roleAdd'})
            this.$store.commit('roleAdd',true)
        }
        
    }
};
</script>


<style lang="scss" scoped>
.roleManage {
    height: 100%;
    background: #ffff;
    box-sizing: border-box;
    padding: 1%;
    .roleTop {
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