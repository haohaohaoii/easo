<template>
    <el-dialog
        :visible.sync="detailIsshow"
        class="dialog"
        center
        @close="closeDialog"
        :close-on-click-modal="false"
    >
        <div slot="title" class="tit">
            <div class="line"></div>
            <p>运维人员详情</p>
        </div>
        <el-table :data="tableData" border style="width: 100%" :show-header="false">
            <el-table-column prop="date" width="180" align="right"></el-table-column>
            <el-table-column prop="name"></el-table-column>
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
                    date: "姓名:",
                    name: ""
                },
                {
                    date: "电话:",
                    name: ""
                },
                {
                    date: "邮箱:",
                    name: ""
                },
                {
                    date: "所属部门:",
                    name: ''
                },
                {
                    date: "用户名",
                    name: ""
                },
                {
                    date: "运维站点:",
                    name: ""
                },
                {
                    date: "创建日期:",
                    name: ""
                }
            ]
        };
    },
    methods:{
        closeDialog(){
            this.$emit('closeDetail',false)
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
            let siteArr = val.siteNames;
            let siteS = ''
            if(siteArr && siteArr.length>0){
                for(let i =0; i<siteArr.length; i++){
                    if(i==0){
                        siteS+=siteArr[i].siteName
                    }else{
                        siteS+=','+siteArr[i].siteName
                    }
                }
            }
            this.id =val.id
            this.tableData[0].name = val.realName //姓名
            this.tableData[1].name = val.phone  //电话
            this.tableData[2].name  = val.email  //邮箱
            this.tableData[3].name  = val.deptName //所属部门
            this.tableData[4].name =  val.username  //用户名
            this.tableData[5].name = siteS  //运维站点
            this.tableData[6].name  = val.createTime  //创建时间
        }
    }
};
</script>

<style lang="scss" scoped>
.dialog {
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

// .dialog >>> .el-dialog {
//     margin-top: 0 !important;
//     position: relative;
//     margin: 0 auto;
//     width: 30%;
//     top: 50%;
//     transition: transform;
//     transform: translateY(-50%);
//     border: 1px solid #ebeef5;
// }
.dialog >>> .el-dialog {
    display: flex;
    flex-direction: column;
    margin: 0 !important;
    position: absolute;
    top: 50%;
    left: calc(50% + 120px);
    transform: translate(-50%, -50%);
    width: 30% !important;
}

.dialog >>> .el-dialog .el-dialog__body {
    flex: 1;
    overflow: auto;
}
.dialog >>> .el-table td.is-right {
    background: #ebf2fb;
}
.dialog >>> .el-table th.is-right {
    background: #ebf2fb;
}
</style>