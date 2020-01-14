<template>
    <div class="enterMation">
        <div class="enmationTop">
            <div class="markMsg">
                <div></div>
                <p>企业信息</p>
                <el-button
                    type="primary"
                    icon="el-icon-circle-plus-outline"
                    size="mini"
                    class="add"
                >添加企业</el-button>
            </div>
        </div>
        <enter-list></enter-list>
    </div>
</template>

<script>
import enterList from "./enterList";
export default {
    components: {
        enterList
    },
    data() {
        return {};
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
        height: 3%;
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