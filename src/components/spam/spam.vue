<template>
    <div class="spam">
        <div class="spamTop">
            <div class="markMsg">
                <div></div>
                <p>留言管理</p>
            </div>
        </div>
        <spam-list></spam-list>
    </div>
</template>
<script>
import spamList from './spamList'
export default {
    components:{
        spamList
    },  
    data() {
        return {};
    }
};
</script>

<style lang="scss" scoped>
.spam {
    height: 100%;
    background: #ffff;
    box-sizing: border-box;
    padding: 1%;
    .spamTop {
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
            
        }
    }
}
</style>