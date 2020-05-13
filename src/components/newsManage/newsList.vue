<template>
    <div class="userList" v-if="tableData && tableData.length>0">
        <news-detail></news-detail>
        <div class="tabE">
            <el-table
                :height="tableHeight"
                :data="tableData"
                stripe
                style="width: 100%"
                class="tab"
                :row-style="iRowStyle"
                :cell-style="iCellStyle"
                :header-row-style="iHeaderRowStyle"
                :header-cell-style="iHeaderCellStyle"
            >
                <el-table-column align="center" prop="title" label="新闻标题" width="260"></el-table-column>
                <el-table-column align="center" prop="cateName" label="新闻分类"></el-table-column>
                <el-table-column align="center" prop="imgUrl" label="封面图片">
                    <template slot-scope="scope">
                        <el-popover trigger="hover" placement="right">
                            <img :src="scope.row.imgUrl" width="50" height="50" slot="reference" />
                            <img :src="scope.row.imgUrl" style="max-width: 480px" />
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="typeId" label="新闻来源">
                    <template slot-scope="scope">
                        <span v-if="scope.row.typeId==1">外部</span>
                        <span v-else-if="scope.row.typeId==0">内部</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="createTime" label="发布时间" width="160px"></el-table-column>
                <el-table-column label="操作" align="center" min-width="100px">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="detail(scope.$index, scope.row)">详情</el-button>
                        <el-button
                            size="mini"
                            type="primary"
                            @click="handleEdit(scope.$index, scope.row)"
                            v-has="'编辑'"
                        >编辑</el-button>

                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDel(scope.$index, scope.row)"
                            v-has="'删除'"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <slot></slot>
        </div>
    </div>
    <no-data v-else></no-data>
</template>

<script>
import newsDetail from './newsDetail'
import { mapMutations } from "vuex";
import noData from "../common/noData"
export default {
    props: {
        newsList: {
            type: Array,
            default: function() {
                return [];
            }
        }
    },
    components:{
        noData,
        newsDetail
    },
    data() {
        return {
    
            tableHeight:window.innerHeight -230
        };
    },
    computed: {
        iRowStyle:function ({row, rowIndex}) {
            return {height:'62px'};
        },
        iHeaderRowStyle:function ({row, rowIndex}) {
            return {height:'62px'};
        },
        iCellStyle:function ({row, column, rowIndex, columnIndex}) {
            return {padding:'0'};
        },
        iHeaderCellStyle:function ({row, column, rowIndex, columnIndex}) {
            return {padding:'0px',background:'rgba(237,237,237,1)'}
        },
        tableData() {
            let newsArr = [];
            if (this.newsList && this.newsList.length > 0) {
                
                for (let i = 0; i < this.newsList.length; i++) {
                    let obj = {
                       title:this.newsList[i].title,  //新闻标题
                       cateName:this.newsList[i].cateName, //新闻类型
                       typeId:this.newsList[i].typeId, //新闻来源
                       imgUrl:this.newsList[i].imgUrl, //封面图片
                       createTime:this.newsList[i].createTime,  //发布时间
                       id:this.newsList[i].id
                    };
                    newsArr.push(obj);
                }
                return newsArr;
            }else{
                 return newsArr;
            }
        }
    },
    methods: {
        //点击查看详情
        detail(index,row){
            console.log(index, row);
            let newsId = row.id;
            this.$store.dispatch("getNewsDetail", newsId);
        },
        //点击编辑--跳转编辑dialog
        handleEdit(index, row) {
            console.log(index, row);
            let newsId = row.id;
            this.$store.dispatch("getNewsitem", newsId);
        },
        handleDel(index,row){
            this.$confirm("此操作将永久删除该条新闻, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    let newId = row.id;
                    this.$api.news.deleteNews(newId).then(res=>{
                        if(res.data.code == 0){
                            this.$message({
                                type: "success",
                                message: "删除成功!"
                            });
                            this.$emit('delSuccess',true)
                        }
                    })
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
           
        }
    }
};
</script>

<style lang="scss" scoped>
.userList {
    height: calc(100% - 40px);
    .tabE {
        height: 100%;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-top: 15px;
    }
}
.userList >>> .el-table::before {
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0;
}
</style>