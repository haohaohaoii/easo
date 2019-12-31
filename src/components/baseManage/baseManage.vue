<template>
    <div class="baseMation">
        <div class="baseTop">
            <div class="markMsg">
                <div></div>
                <p>基站管理</p>
                <el-button
                    type="primary"
                    icon="el-icon-circle-plus-outline"
                    size="mini"
                    class="add"
                    @click="baseAdd"
                >添加基站</el-button>
            </div>
        </div>
        <base-list></base-list>
    </div>
</template>

<script>
import baseList from './baseList';
import {mapMutations} from 'vuex';
export default {
    components:{
        baseList
    },
    data() {
        return {
            
        };
    },
    methods:{
        //点击基站添加
        baseAdd(){
            this.$router.push({path:'/baseAdd'})
            this.$store.commit('baseAdd',true)
        }
    }
};
</script>

<style lang="scss" scoped>
.baseMation {
    height: 100%;
    background: #ffff;
    box-sizing: border-box;
    padding: 1%;
    .baseTop {
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