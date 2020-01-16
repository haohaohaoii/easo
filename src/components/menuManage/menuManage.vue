<template>
    <div class="menuManage">
        <div class="menuTop">
            <div class="markMsg">
                <div></div>
                <p>菜单管理</p>
                <el-button
                    type="primary"
                    icon="el-icon-circle-plus-outline"
                    size="mini"
                    class="add"
                    @click="menuManage"
                >添加菜单</el-button>
            </div>
        </div>
        <menu-list></menu-list>
    </div>
</template>

<script>
import menuList from './menuList'
export default {
    components:{
        menuList
    },
    data() {
        return {};
    },
    methods:{
        //添加角色
        menuManage(){
            this.$router.push({path:'/menuAdd'});
            this.$store.commit('menuAdd',true);
        }
        
    }
};
</script>

<style lang="scss" scoped>
.menuManage {
    height: 100%;
    background: #ffff;
    box-sizing: border-box;
    padding: 1%;
    .menuTop {
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