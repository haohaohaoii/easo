<template>
    <el-dialog
        :visible.sync="detailIsshow"
        class="opertractDetail"
        center
        @close="closeDialog"
        :close-on-click-modal="false"
    >
        <div slot="title" class="tit">
            <div class="line"></div>
            <p>运维合同详情</p>
        </div>
        <el-table :data="tableData" border style="width: 100%" :show-header="false">
            <el-table-column prop="date" width="180" align="right"></el-table-column>
            <!-- <el-table-column prop="image" v-if="row.image" label="图片" min-width="20%"> -->

            <!-- <el-table-column prop="name" label align="left"></el-table-column> -->
            <el-table-column prop="name">
                <template slot-scope="scope">
                    <el-popover trigger="hover" v-if="scope.row.pictures" placement="right">
                        <img
                            v-for="item in scope.row.pictures"
                            :key="item"
                            :src="item"
                            width="40"
                            height="40"
                            class="head_pic"
                            slot="reference"
                            style="margin-right:25px"
                        />
                        <img
                            v-for="item in scope.row.pictures"
                            :key="item"
                            :src="item"
                            style="max-height: 600px;max-width: 330px"
                        />
                    </el-popover>
                    <p v-else>{{scope.row.name}}</p>
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
                    date: "运维部门:",
                    name: ""
                },
                {
                    date: "合同编号:",
                    name: ""
                },
                {
                    date: "合同名称:",
                    name: ""
                },
                {
                    date: "企业:",
                    name: ''
                },
                {
                    date: "站点",
                    name: ""
                },
                {
                    date: "开始日期:",
                    name: ""
                },
                {
                    date: "截止日期:",
                    name: ""
                },
                {
                    date:'合同状态',
                    name:''
                },
                {
                    date: "合同预览:",
                    pictures: []
                }
            ]
        };
    },
    methods:{
        closeDialog(){
            this.$store.commit('getDialogstatus',false)  //关闭dialog
            this.$emit('getDialogstatus',false)
            this.tableData[8].pictures = []
        },
        // save(){
        //   this.closeDialog()
        // },
        // cancel(){
        //  this.closeDialog()
        // }
    },
    watch:{
        isShow(val){
            this.detailIsshow = val
        },
        item(val){

            let arr = val.siteList
            let strS = ''
            if(arr && arr.length>0){
                for(let k=0; k<arr.length; k++){
                    if(k==0){
                        strS+=arr[k].siteName
                    }else{
                        strS+=','+arr[k].siteName
                    }
                }
            }
            let str = val.imgPath;
            if(str){
                str = str.substring(0, str.lastIndexOf(","));
                let imgArr = str.split(",");
                if(imgArr && imgArr.length>0){
                    for(let i=0; i<imgArr.length; i++){
                        this.tableData[8].pictures.push(imgArr[i])
                    }
                }
            }
            
            this.id =val.id
            this.tableData[0].name = val.mtDept.deptName //运维部门
            this.tableData[1].name = val.contractCode  //合同编号
            this.tableData[2].name  = val.contractName  //合同名称
            this.tableData[3].name  = val.company.erpName  //企业
            this.tableData[4].name =  strS  //站点
            this.tableData[5].name = val.startTime  //开始日期
            this.tableData[6].name  = val.endTime  //截止日期
            this.tableData[7].name  = val.state==0?'生效':'终止'  //合同状态
           
        }
    }
};
</script>

<style lang="scss" scoped>
.opertractDetail {
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
// .opertractDetail >>> .el-dialog {
//     margin-top: 0 !important;
//     position: relative;
//     margin: 0 auto;
//     width: 36%;
//     top: 50%;
//     transition: transform;
//     transform: translateY(-50%);
//     border: 1px solid #ebeef5;
// }
// .opertractDetail >>> .el-dialog {
//     display: flex;
//     flex-direction: column;
//     margin: 0 !important;
//     position: absolute;
//     top: 50%;
//     width: 36% !important;
//     left: calc(50% + 120px);
//     transform: translate(-50%, -50%);
// }
.opertractDetail >>> .el-table td.is-right {
    background: #ebf2fb;
}
.opertractDetail >>> .el-table th.is-right {
    background: #ebf2fb;
}
</style>