<template>
    <el-dialog
        :visible.sync="detailIsshow"
        class="recodsDetail"
        center
        @close="closeDialog"
        :close-on-click-modal="false"
    >
        <div slot="title" class="tit">
            <div class="line"></div>
            <p>运维记录详情</p>
        </div>
        <el-table :data="tableData" border style="width: 100%" :show-header="false">
            <el-table-column prop="date" label width="180" align="right"></el-table-column>
            <el-table-column prop="name" label="描述图片"></el-table-column>
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
                    date: "运维站点:",
                    name: ""
                },
                {
                    date: "运维人员:",
                    name: ""
                },
                {
                    date: "运维时间:",
                    name: ""
                },
                {
                    date: "运维单号:",
                    name: ''
                },
            ]
        };
    },
    methods:{
        closeDialog(){
      
            this.$emit('changeDetailDialog',false)

        },
        // save(){
        //   this.closeDialog()
        // },
        // cancel(){
        //  this.closeDialog()
        // }
        /**以下异步方法监听的时候用 */
        //获取运维人员
        GetYWP(){
            return new Promise(resolve=>{
                this.$api.operp.getOperpAll().then(res=>{
                    if(res.data.code == 0){
                        let arr = res.data.data
                        let list = []
                        for(let i=0; i<arr.length; i++){
                            let obj={
                                label:arr[i].realName,
                                value:arr[i].id
                            }
                            list.push(obj)
                        }
                        resolve(list)
                    }
                })
            })
        },
    },
    watch:{
        isShow(val){
            this.detailIsshow = val
        },
        item(val){
        
            this.tableData[0].name = val.siteName //运维站点
            this.GetYWP().then(res=>{    //运维人员
                if(res && res.length>0){
                    for(let i=0; i<res.length; i++){
                        if(res[i].value == val.mtUserId){
                            this.tableData[1].name =res[i].label
                            break
                        }
                    }
                }
            })
            this.tableData[2].name = val.mtTime  //运维时间
            this.tableData[3].name  = val.mn  //运维单号
           
        }
    }
};
</script>

<style lang="scss" scoped>
.recodsDetail {
    .tit {
        display: flex;
        align-items: flex-end;
        .line {
            background: #1e87f0;
            width: 0.4%;
            height: 20px;
            position: relative;
            left: 0;
        }
        p {
            margin-left: 2%;
        }
    }
}
// .recodsDetail >>> .el-dialog {
//     margin-top: 0 !important;
//     position: relative;
//     margin: 0 auto;
//     width: 34%;
//     top: 50%;
//     transition: transform;
//     transform: translateY(-50%);
//     border: 1px solid #ebeef5;
// }
.recodsDetail >>> .el-dialog {
    display: flex;
    flex-direction: column;
    margin: 0 !important;
    position: absolute;
    top: 50%;
    width: 30% !important;
    left: calc(50% + 120px);
    transform: translate(-50%, -50%);
}

.recodsDetail >>> .el-dialog .el-dialog__body {
    flex: 1;
    overflow: auto;
}
.recodsDetail >>> .el-table td.is-right {
    background: #ebf2fb;
}
.recodsDetail >>> .el-table th.is-right {
    background: #ebf2fb;
}
</style>