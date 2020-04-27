<template>
    <div class="userList" v-if="tableData && tableData.length>0">
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
                <el-table-column align="center" prop="title" label="资源标题" width="260"></el-table-column>
                <el-table-column align="center" prop="format" label="资源格式"></el-table-column>
                <el-table-column align="center" prop="intro" label="资源介绍"></el-table-column>
                <el-table-column align="center" prop="imgPath" label="预览图片">
                    <template slot-scope="scope">
                        <img :src="scope.row.imgPath" alt style="width: 50px;height: 50px" />
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="createTime" label="发布时间" width="160px"></el-table-column>
                <el-table-column label="操作" align="center" fixed="right" width="180px">
                    <template slot-scope="scope">
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
        <res-editor :item="roWI" :isShow="editorDialog" @closeEdit="closeE"></res-editor>
    </div>
    <no-data v-else></no-data>
</template>

<script>
import resEditor from './resEditor'
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
        resEditor
    },
    data() {
        return {
    
            tableHeight:window.innerHeight -230,
            roWI:'', //行数据
            editorDialog:false   //编辑的弹窗是都显示
        };
    },
    computed: {
        iRowStyle:function ({row, rowIndex}) {
            return {height:'58px'};
        },
        iHeaderRowStyle:function ({row, rowIndex}) {
            return {height:'58px'};
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
                    let filevalue =  this.newsList[i].fileUrl;
                    let index = filevalue.lastIndexOf('.');
                    let filesExtension = filevalue.substring(index+1)
                    let dxName = filesExtension.toUpperCase()
                    let url = ''
                    if(filesExtension == 'pdf'){
                        url = require('../../assets/images/pdf.png')
                    }else if(filesExtension == 'doc'){
                        url = require('../../assets/images/doc.png')
                    }else if(filesExtension == 'docx'){
                        url = require('../../assets/images/docx.png')
                    }else if(filesExtension == 'xlsx'){
                        url = require('../../assets/images/xlsx.png')
                    }else if(filesExtension == 'rar'){
                        url = require('../../assets/images/rar.png')
                    }else if(filesExtension == 'zip'){
                        url = require('../../assets/images/zip.png')
                    }else if(filesExtension == 'xls'){
                        url = require('../../assets/images/xls.png')
                    }else if(filesExtension == 'ppt'){
                        url = require('../../assets/images/ppt.png')
                    }
                    let obj = {
                       title:this.newsList[i].fileName,  //资源标题
                       format:dxName,  //资源格式
                       intro:this.newsList[i].fileDesc, //资源介绍
                       imgPath:url, //预览图片
                       createTime:this.newsList[i].createTime,  //上传时间
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
        //关闭dialog弹窗
        closeE(){
            this.editorDialog = false
        },
        //点击编辑--跳转编辑dialog
        handleEdit(index, row) {
            console.log(index, row);
            let resId = row.id;
            let _this = this;
           this.$api.resManage.getResI(resId).then(res => {
           
                console.log(res)
                if (res.data.code == 0) {
                    _this.roWI = res.data.data[0]
                    _this.editorDialog = true
                }


            }).catch(error => {

            })
        },
        handleDel(index,row){
            this.$confirm("此操作将永久删除该条文件资源, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    let newId = row.id;
                    this.$api.resManage.deleteRes(newId).then(res=>{
               
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
    .tabE {
        margin-top: 15px;
    }
    .tabPage {
        text-align: center;
    }
}
.userList >>> .el-table::before {
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0;
}
</style>