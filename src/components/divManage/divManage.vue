<template>
    <div class="divManage">
        <div class="divTop">
            <div class="markMsg">
                <div></div>
                <p>部门管理</p>
                <el-button
                    type="primary"
                    icon="el-icon-circle-plus-outline"
                    size="mini"
                    class="add"
                    @click="addManage"
                >添加部门</el-button>
            </div>
        </div>
        <div-list></div-list>
    </div>
</template>

<script>
import divList from './divList'
export default {
    components:{
        divList
    },
    data() {
        return {};
    },
    methods:{
        //添加角色
        addManage(){
            this.$router.push({path:'/divAdd'});
            this.$store.commit('divAdd',true);
        }
        
    }
};
</script>


<style lang="scss" scoped>
.divManage {
    height: 100%;
    background: #ffff;
    box-sizing: border-box;
    padding: 1%;
    .divTop {
        margin-top: 1%;
        margin-bottom: 2%;
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