<template>
    <!--角色管理-->
    <div class="roleManage">
        <role-add @addSuccsss="addSuccsss"></role-add>
        <role-editor @ediSuccess="ediT"></role-editor>
        <div class="roleTop">
            <div class="markMsg">
                <div></div>
                <p>角色管理</p>
                <el-button
                    type="primary"
                    icon="el-icon-circle-plus-outline"
                    size="mini"
                    class="add"
                    @click="addRole"
                    v-has="'添加角色'"
                >添加角色</el-button>
            </div>
        </div>
        <!--角色列表插槽-->
        <role-list v-show="roleList.length" :rolelist="roleList" @delSuccess="delSuccess">
            <div class="tabPage">
                <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="totalLength"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="pagesize"
                ></el-pagination>
            </div>
        </role-list>
        <no-data v-show="!roleList.length"></no-data>
    </div>
</template>

<script>
import roleAdd from "./roleAdd";
import roleEditor from "./roleEditor";
import noData from "../common/noData";
import roleList from "./roleList";
import { mapMutations } from "vuex";
export default {
    components: {
        roleList,
        noData,
        roleAdd,
        roleEditor
    },
    data() {
        return {
            totalLength: 0, //总共多少条数据
            currentPage: 1, //初始页码
            pagesize: 13, //一页多少条数据
            roleList: [] //所有角色数组
        };
    },
    created() {
        let pageNum = this.currentPage;
        this.getRoles(pageNum);
    },
    methods: {
        //父组件监听，子组件添加成功
        addSuccsss(status) {
            if (status == true) {
                //重新请求数据
                let pageNum = this.currentPage;
                this.getRoles(pageNum);
            }
        },
        //父组件监听，子组件删除成功
        delSuccess(status) {
            if (status == true) {
                //重新请求数据
                let pageNum = this.currentPage;
                this.getRoles(pageNum);
            }
        },
        //编辑成功
        ediT(val){
             if (val) {
                //重新请求数据
                let pageNum = this.currentPage;
                this.getRoles(pageNum);
            }
        },
        //获取角色数据
        getRoles(pageNum) {
            let pageSize = this.pagesize;
            this.$api.roles
                .getAllroles({
                    params: {
                        pageNum: pageNum,
                        pageSize: pageSize
                    }
                })
                .then(res => {
                    console.log(res);
                    if (res.data.code == 0) {
                        this.totalLength = res.data.pageInfo.total; //获取总条数
                        this.roleList = res.data.pageInfo.list; //获取数据

                    } else {
                    }
                })
                .catch(error => {});
        },
        //添加角色
        addRole() {
            this.$api.menu.getAllmenu().then(res => {
                if (res.data.code == 0) {
                    let obj = {
                        isTrue: true,
                        type: "add",
                        arr: res.data.data
                    };
                    this.$store.commit("roleAdd", obj);
                }
                console.log(res);
            });
        },
        //点击页码的时候
        handleCurrentChange(currentPage) {
            this.currentPage = currentPage;
            let pageNum = this.currentPage;
            this.getRoles(pageNum);
        }
    },
    watch:{
        //删除页面最后一条数据时，currentPage没有减一，页面列表为空
        totalLength(){
            if(this.totalLength==(this.currentPage-1)*this.pagesize&& this.totalLength!=0){
            this.currentPage-=1;
            this.getRoles(this.currentPage)
            }
        }
    }
};
</script>


<style lang="scss" scoped>
.roleManage {
    height: 100%;
    background: rgb(255, 255, 255);
    box-sizing: border-box;
    padding: 15px;
    .roleTop {
        height: 40px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .markMsg {
            display: flex;
            position: relative;
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
    .tabPage {
        text-align: center;
    }
}
</style>