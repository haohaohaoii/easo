<template>
    <el-dialog :visible.sync="divAdd" class="dialog" center @close="closeDialog">
        <div slot="title" class="tit">
            <div class="line"></div>
            <p>添加用户信息</p>
        </div>
        <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
        >
            <el-form-item label="部门名称:" prop="divName">
                <el-input v-model="ruleForm.divName"></el-input>
            </el-form-item>
            <el-form-item label="部门地址:" prop="divAddress">
                <el-input v-model="ruleForm.divAddress"></el-input>
            </el-form-item>
            <el-form-item label="联系电话:" prop="linkPhone">
                <el-input v-model="ruleForm.linkPhone"></el-input>
            </el-form-item>
           
            <el-form-item label="部门联系人:" prop="divPeople">
                <el-input v-model="ruleForm.divPeople"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="footer">
            <el-button type="primary" size="mini" @click="save">保存</el-button>
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
            ruleForm: {
                divName: "", //部门名称
                divAddress: "", //部门地址
                linkPhone: "", //联系电话
                divPeople: "", //部门联系人
            },
            rules: {
                divName: [
                    {
                        required: true,
                        message: "请输入部门名称",
                        trigger: "blur"
                    },
                    
                ],
                divAddress: [
                    {
                        required: true,
                        message: "请输入部门地址",
                        trigger: "blur"
                    }
                ],
                linkPhone: [
                    {
                        required: true,
                        message: "请输入联系电话",
                        trigger: "blur"
                    }
                ],
                divPeople: [
                    {
                        required: true,
                        message: "请输入部门联系人",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    methods: {
        closeDialog() {
            this.$store.commit("divAdd", false); //关闭dialog
        },
        save() {
            this.$store.commit("divAdd", false); //关闭dialog
        },
        cancel() {
            this.$store.commit("divAdd", false); //关闭dialog
        }
    },
    computed: {
        ...mapState(["divAdd"])
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
    
    top: 50%;
    transition: transform;
    transform: translateY(-50%);
    border: 1px solid #ebeef5;
}
</style>