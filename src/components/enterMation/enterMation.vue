<template>
    <div class="enterMation">
        <enter-dialog></enter-dialog>
        <div class="enmationTop">
            <div class="markMsg">
                <div></div>
                <p>企业信息</p>
                <el-button
                    type="primary"
                    icon="el-icon-circle-plus-outline"
                    size="mini"
                    class="add"
                    @click="addQy"
                >添加企业</el-button>
            </div>
        </div>
        <enter-list></enter-list>
    </div>
</template>

<script>
import enterList from "./enterList";
import {mapMutations} from 'vuex'
import enterDialog from './enterDialog'
export default {
    components: {
        enterList,
        enterDialog
    },
    data() {
        return {};
    },
    methods:{
        addQy(){
            this.$store.commit('getDialogstatus',true)
        }
    }
};
</script>

<style lang="scss" scoped>
.enterMation {
    height: 100%;
    background: #ffff;
    box-sizing: border-box;
    padding: 1%;
    .enmationTop {
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