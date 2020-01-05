<template>
    <div class="menuList">
         <div v-for="(item,index) of createMenu" :key="index">
                <el-submenu v-if="item.two && item.two.length>=1" class="upopt" :index='item.one.id'>
                    <template slot="title">
                        <i class="iconfont icon-shuju" style="font-size:20px"></i>
                        {{item.one.menuName}}
                    </template>
                    <el-menu-item
                        v-for="seciem of item.two"
                        :key="seciem.path"
                        class="opt"
                        :index="seciem.path"
                    >{{seciem.menuName}}</el-menu-item>
                </el-submenu>
                <el-menu-item v-else :index="item.one.id">{{item.one.menuName}}</el-menu-item>
            </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                 createMenu: [
                {
                    one: { id: "2", menuName: "数据查看"},
                    two: [
                        { id: "5", menuName: "实时数据", path:'realData'},
                        { id: "6", menuName: "历史数据", path:'hisData'}
                    ]
                },
                {
                    one: { id: "3", menuName: "企业管理" },
                    two: [
                        { id: "7", menuName: "企业信息" ,path: "enterMation"},
                        { id: "8", menuName: "留言管理",path: "spam" },
                        { id: "9", menuName: "基站管理",path: "baseManage" }
                    ]
                }
            ],
            }
        }
    }
</script>

<style lang="scss" scoped>
.menuList{
        display: flex
    }
    //多级菜单(第一级)移入
.menuList >>> .el-submenu__title:hover {
    background-color: #1f87e7 !important; //改变背景颜色
    color: #ffffff !important; //改变字体颜色
}
//二级菜单移入的背景颜色
.opt:hover {
    background-color: #1f87e7 !important; //改变背景颜色
    color: #ffffff !important; //改变字体颜色
}
//二级菜单选中的背景颜色--可以
.opt.is-active {
    background-color: #1f87e7 !important;
    color: #ffffff !important; //改变字体颜色
}
</style>