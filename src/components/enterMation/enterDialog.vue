<template>
    <el-dialog
        :visible.sync="enterDialog"
        class="dialog"
        center
        @close="closeDialog"
        :close-on-click-modal="false"
    >
        <div slot="title" class="tit">
            <div class="line"></div>
            <p>查看详情</p>
        </div>
        <el-table :data="tableData" border style="width: 100%" :show-header="false">
            <el-table-column prop="date" label width="180" align="right"></el-table-column>
            <!-- <el-table-column prop="image" v-if="row.image" label="图片" min-width="20%"> -->

            <!-- <el-table-column prop="name" label align="left"></el-table-column> -->
            <el-table-column prop="name" label="描述图片">
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
    data() {
        return {
            status: false, //控制表头不显示
            tableData: [
                {
                    date: "企业名称:",
                    name: "郑州富铭科技股份有限公司"
                },
                {
                    date: "企业地址:",
                    name: "郑州市金水区牛顿国际"
                },
                {
                    date: "联系人:",
                    name: "张冉冉"
                },
                {
                    date: "联系电话:",
                    name: `<img>`
                },
                {
                    date: "邮箱:",
                    name: "123456789@163.com"
                },
                {
                    date: "营业执照:",
                    pictures: []
                },
                 {
                    date: "排污执照:",
                    pictures: []
                },
                {
                    date: "注册时间:",
                    name: "19/12/16 16:40:20"
                }
            ]
        };
    },
    methods:{
        closeDialog(){
            this.$store.commit('getDialogstatus',false)  //关闭dialog
            this.tableData[5].pictures = []
            this.tableData[6].pictures = []
        },
        // save(){
        //   this.closeDialog()
        // },
        // cancel(){
        //  this.closeDialog()
        // }
    },
    computed: {
        ...mapState(["comDetail"]),
        enterDialog:{
            get(){
                return this.$store.state.enterDialog
            },
            set(){
               
            }
        }
    },
    watch:{
        comDetail(val){
           
            this.tableData[0].name = val.erpName;
            this.tableData[1].name = val.erpAddr;
            this.tableData[2].name = val.erpLinkMan;
            this.tableData[3].name = val.erpLinkTel;
            this.tableData[4].name = val.erpMail;
            let str = val.erpLicense;
            if(str){
                str = str.substring(0, str.lastIndexOf(","));
                let imgArr = str.split(",");
                if(imgArr && imgArr.length>0){
                    for(let i=0; i<imgArr.length; i++){
                        this.tableData[5].pictures.push(imgArr[i])
                    }
                }
            }
            
            let str2 = val.erpLicense2;
            if(str2){
                str2 = str2.substring(0, str2.lastIndexOf(","));
                let imgArr2 = str2.split(",");
                if(imgArr2 && imgArr2.length>0){
                    for(let i=0; i<imgArr2.length; i++){
                        this.tableData[6].pictures.push(imgArr2[i])
                    }
                }
            }
            
    
            // this.tableData[5].pictures.push('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584282637096&di=75fdad3e889cba12738f0855876ebe1e&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F68%2F61%2F300000839764127060614318218_950.jpg')
            //   this.tableData[].pictures.push('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584282637096&di=81d3ef87fe63235dcd3fc5af6f9fec8c&imgtype=0&src=http%3A%2F%2Fa0.att.hudong.com%2F78%2F52%2F01200000123847134434529793168.jpg')
            this.tableData[7].name = val.createTime
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
.dialog >>> .el-dialog {
    margin-top: 0 !important;
    position: relative;
    margin: 0 auto;
    width: 36%;
    top: 50%;
    transition: transform;
    transform: translateY(-50%);
    border: 1px solid #ebeef5;
}
.dialog >>> .el-table td.is-right {
    background: #ebf2fb;
}
.dialog >>> .el-table th.is-right {
    background: #ebf2fb;
}
</style>