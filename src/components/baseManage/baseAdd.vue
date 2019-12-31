<template>
    <el-dialog :visible.sync="baseAdd" class="baseAdd" center @close="closeDialog">
        <div slot="title" class="tit">
            <div class="line"></div>
            <p>基站添加</p>
        </div>
        <el-form ref="form" :model="form"  label-width="100px">
            <el-form-item label="基站名称:">
                <el-input v-model="form.baseName"></el-input>
            </el-form-item>
            <el-form-item label="进出口:">
                <el-select v-model="form.export" placeholder="请选择进出口">
                    <el-option label="进口" value="jinkou"></el-option>
                    <el-option label="出口" value="chukou"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="MN:">
                <el-input v-model="form.mnVal"></el-input>
            </el-form-item>
            <el-form-item label="托管设备:">
                <el-checkbox-group v-model="form.type">
                    <el-checkbox label="COD" name="type"></el-checkbox>
                    <el-checkbox label="氨氮" name="type"></el-checkbox>
                    <el-checkbox label="总磷" name="type"></el-checkbox>
                    <el-checkbox label="总氮" name="type"></el-checkbox>
                    <el-checkbox label="PH" name="type"></el-checkbox>
                    <el-checkbox label="流量" name="type"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="联系电话:">
                <el-input v-model="form.linkPhone"></el-input>
            </el-form-item>
            <el-form-item label="验证码:">
                <el-col :span="14">
                    <el-input v-model="form.veriCode" style="width:100%"></el-input>
                </el-col>
                <el-col :span="4" :offset="6">
                    <el-button type="primary" @click="getCode"  style="width:100%">获取验证码</el-button>
                </el-col>
            </el-form-item>
        </el-form>
        <div slot="footer" class="footer">
            <el-button type="primary" size="mini" @click="add">添加</el-button>
            <el-button size="mini" @click="cancel">取消</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
    data() {
        return {
            status: false, //控制表头不显示
            form:{
                baseName:'',  //基站名称
                export:'',  //选择的是哪个进出口值
                mnVal:'', //mn
                type:[], //托管设备
                linkPhone:'', //联系电话
                veriCode:'' //验证码
            }
        };
    },
    methods: {
        //点击x号关闭外层dialog
        closeDialog() {
            this.$store.commit("baseAdd", false); //关闭dialog
        },
        //点击添加基站
        add() {
            this.$store.commit("baseAdd", false); //关闭dialog
        },
        //点击取消
        cancel() {
            this.$store.commit("baseAdd", false); //关闭dialog
        },
        //获取验证码
        getCode(){

        }
    },
    computed: {
        ...mapState(["baseAdd"])
    }
};
</script>

<style lang="scss" scoped>
.baseAdd {
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
.baseAdd >>> .el-dialog {
    margin-top: 0 !important;
    position: relative;
    margin: 0 auto;

    top: 50%;
    transition: transform;
    transform: translateY(-50%);
    border: 1px solid #ebeef5;
    width: 40%;
    overflow-y: auto;
}
</style>