<template>
    <div class="menuNav">
        <div class="userPic">
            <p class="titName">环境管理后台系统</p>
            <div class="userLog">
                <img src="../../assets/images/user.png" alt />
                <p>用户admin</p>
            </div>
        </div>
        <el-menu
            class="el-menu-vertical-demo menuE"
            @open="handleOpen"
            @close="handleClose"
            text-color="#fff"
            active-text-color="#ffff"
        >
            <el-submenu index="1" class="e">
                <template slot="title">
                    <span>导航一</span>
                </template>
                <el-menu-item-group>
                    <template slot="title">分组一</template>
                    <el-menu-item index="1-1">选项1</el-menu-item>
                    <el-menu-item index="1-2">选项2</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="分组2">
                    <el-menu-item index="1-3">选项3</el-menu-item>
                </el-menu-item-group>
                <el-submenu index="1-4">
                    <template slot="title">选项4</template>
                    <el-menu-item index="1-4-1">选项1</el-menu-item>
                </el-submenu>
            </el-submenu>
            <el-menu-item index="2">
                <span slot="title">导航二</span>
            </el-menu-item>
            <el-menu-item index="3">
                <span slot="title">导航三</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.menuNav {
    height: 100%;
    background: url("~@/assets/images/left.png") no-repeat;
    background-size: 100% 100%;
    -moz-background-size: 100% 100%;
}
//修改el-menu的背景颜色
.menuNav >>> .el-menu {
    border-right: 0;
    background-color: unset !important;
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
.userPic {
    padding: 10px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-bottom: 1px solid #ffff;
    .titName {
        font-size: 26px;
        font-family: MF LiHei (Noncommercial);
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
</style>