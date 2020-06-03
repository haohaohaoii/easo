<template>
    <el-dialog
        :visible.sync="detailIsshow"
        class="stopRepDetail"
        center
        @close="closeDialog"
        :close-on-click-modal="false"
    >
        <div slot="title" class="tit">
            <div class="line"></div>
            <p>停产报告模板详情</p>
        </div>
        <el-table :data="tableData" border style="width: 100%" :show-header="false">
            <el-table-column prop="date" width="180" align="right"></el-table-column>
            <!-- <el-table-column prop="image" v-if="row.image" label="图片" min-width="20%"> -->

            <!-- <el-table-column prop="name" label align="left"></el-table-column> -->
            <el-table-column prop="name">
                <template slot-scope="scope">
                    <p>{{scope.row.name}}</p>
                </template>
            </el-table-column>
        </el-table>
        <div slot="footer" class="footer">
            <!-- <el-button type="primary" size="mini" @click="save">保存</el-button> -->
            <!-- <el-button size="mini" @click="cancel">关闭</el-button> -->
        </div>
    </el-dialog>
</template>

<script>
import { mapState,mapMutations} from "vuex";
export default {
    props:['isShow','item'],
    data() {
        return {
            detailIsshow:false,
            status: false, //控制表头不显示
            tableData: [
                {
                    date: "名称:",
                    name: ""
                },
                {
                    date: "地区:",
                    name: ""
                },
                {
                    date: "类型:",
                    name: ""
                },
                {
                    date: "模板代码:",
                    name: ''
                }

            ]
        };
    },
    methods:{
        closeDialog(){
 
            this.$emit('getDialogstatus',false)
        },
    },
    watch:{
        isShow(val){
            this.detailIsshow = val
        },
        item(val){

            if(val.type == 0){
                this.tableData[2].name  = '停产'
            }else if(val.type == 1){
                this.tableData[2].name  = '停电'
            }
            this.id =val.id
            this.tableData[0].name = val.name
            this.tableData[1].name = val.cityName  

            this.tableData[3].name = val.tplCode
           
        }
    }
};
</script>

<style lang="scss" scoped>
.stopRepDetail {
    .tit {
        display: flex;
        align-items: center;
        .line {
            background: #1e87f0;
            width: 0.5%;
            height: 20px;
            position: relative;
            left: 0;
        }
        p {
            margin-left: 2%;
        }
    }
}
// .stopRepDetail >>> .el-dialog {
//     margin-top: 0 !important;
//     position: relative;
//     margin: 0 auto;
//     width: 36%;
//     top: 50%;
//     transition: transform;
//     transform: translateY(-50%);
//     border: 1px solid #ebeef5;
// }
// .stopRepDetail >>> .el-dialog {
//     display: flex;
//     flex-direction: column;
//     margin: 0 !important;
//     position: absolute;
//     top: 50%;
//     width: 36% !important;
//     left: calc(50% + 120px);
//     transform: translate(-50%, -50%);
// }
.stopRepDetail >>> .el-table td.is-right {
    background: #ebf2fb;
}
.stopRepDetail >>> .el-table th.is-right {
    background: #ebf2fb;
}
</style>