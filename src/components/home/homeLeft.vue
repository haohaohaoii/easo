<template>
    <div class="menuNav" id="elmenu" ref="meu">
        <div class="userPic" v-show="isShow">
            <p class="titName">环境管理后台系统</p>
            <div class="userLog">
                <img src="../../assets/images/user.png" alt />
                <p>用户admin</p>
            </div>
        </div>
        <!-- <el-radio-group v-model="isCollapse" id="changeMenubtn">
            <el-radio-button :label="false">展开</el-radio-button>
            <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group>-->
        <div id="changeMenubtn">
            <el-button type="primary" :icon="showSide" @click="sideBtn" circle></el-button>
        </div>
        <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            :collapse="isCollapse"
            text-color="rgba(255,255,255,1)"
            active-text-color="rgba(255,255,255,1)"
        >
            <el-menu-item index="1">
                <i class="el-icon-menu"></i>
                <span slot="title">导航一</span>
            </el-menu-item>
            <el-menu-item index="2">
                <i class="el-icon-menu"></i>
                <span slot="title">导航二</span>
            </el-menu-item>
            <el-menu-item index="3">
                <i class="el-icon-document"></i>
                <span slot="title">导航三</span>
            </el-menu-item>
            <el-menu-item index="4">
                <i class="el-icon-setting"></i>
                <span slot="title">导航四</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
    data() {
        return {
            isCollapse: false, //控制是否折叠
            isShow: true,
            showSide: "el-icon-arrow-left"
        };
    },
    mounted() {
        let elmenu = document.getElementById("elmenu");
        let btnControl = document.getElementById("changeMenubtn");
        elmenu.style.width = this.menuLeftwidth;
        btnControl.style.left = this.menuLeftwidth;
    },
    computed: {
        ...mapState(["menuLeftwidth"])
    },
    methods: {
        sideBtn() {
            this.isCollapse = !this.isCollapse;
            if (this.isCollapse) {
                this.showSide = "el-icon-arrow-right";
            } else {
                this.showSide = "el-icon-arrow-left";
            }
        }
    },
    watch: {
        isCollapse(val, oldval) {
            if (!val) {
                //展开
                this.$store.commit("changeMenuleft", "240px");
                this.isShow = true;
            } else {
                //折叠
                this.$store.commit("changeMenuleft", "64px");
                this.isShow = false;
            }
        },
        menuLeftwidth(val, oldval) {
            if (val != oldval) {
                let elmenu = document.getElementById("elmenu");
                let btnControl = document.getElementById("changeMenubtn");
                btnControl.style.left = val;
                elmenu.style.width = val;
            }
        }
    }
};
</script>

<style lang="scss" scoped>
#elmenu {
    height: 100%;
    background: url("~@/assets/images/left.png") no-repeat;
    background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    #changeMenubtn {
        position: fixed;
        z-index: 55;
        top: 50%;
        width: 60px;
        transition: transform;
        transform: translateY(-50%);
    }
    i {
        color: rgba(255, 255, 255, 1);
    }
    .userPic {
        height: 24%;
        justify-content: center;
        border-bottom: 1px solid rgba(255, 255, 255, 1);
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;

        .titName {
            font-size: 26px;
            font-family: MFLiHei;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            line-height: 64px;
        }
        .userLog {
            display: flex;
            flex-direction: column;
            align-items: center;
            img {
                width: 68px;
                height: 68px;
            }
            p {
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: rgba(255, 255, 255, 1);
            }
        }
    }
}
//修改el-menu的背景颜色
.menuNav >>> .el-menu {
    border-right: 0;
    background-color: transparent !important;
}
menuNav >>> .el-menu-item{
    background-color: red !important
}
.menuNav >>> .el-menu-item:hover {
    background-color: #1f87e7 !important;
}
.menuNav >>> .el-submenu__title:hover {
    background-color: #1f87e7 !important;
}
.menuNav >>> .el-menu-item.is-active {
    background-color: #1f87e7 !important;
}
//解决左侧菜单折叠卡顿的问题
.menuNav >>> .collapse-transition {
    -webkit-transition: 0s height, 0s padding-top, 0s padding-bottom;
    transition: 0s height, 0s padding-top, 0s padding-bottom;
}

.menuNav >>> .horizontal-collapse-transition {
    -webkit-transition: 0s width, 0s padding-left, 0s padding-right;
    transition: 0s width, 0s padding-left, 0s padding-right;
}

.menuNav
    >>> .horizontal-collapse-transition
    .el-submenu__title
    .el-submenu__icon-arrow {
    -webkit-transition: 0s;
    transition: 0s;
    opacity: 0;
}
</style>