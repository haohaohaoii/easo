<template>
    <div class="homeRight" ref="rig">
        <headert></headert>
        <homecon></homecon>
    </div>
</template>

<script>
import headert from "../common/header";
import homecon from "./homeContent";
import { mapState } from "vuex";
export default {
    components: {
        headert,
        homecon
    },
    data() {
        return {};
    },
    mounted() {
        console.log(this.$refs.rig);
        this.$refs.rig.style.marginLeft = this.menuLeftwidth;
    },
    computed: {
        ...mapState(["menuLeftwidth"])
    },
    watch: {
        menuLeftwidth(val, oldval) {
            if (val != oldval) {
                this.$refs.rig.style.marginLeft = val;
            }
        }
    }
};
</script>

<style lang="scss" scoped>
//右侧内容
.homeRight {
    height: 100%;
    background: #ededed;
}
</style>