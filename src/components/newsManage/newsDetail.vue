<template>
    <el-dialog
        :visible.sync="newsDstatus"
        class="newsEditor"
        center
        :close-on-click-modal="false"
        append-to-body
        @close="closeDialog"
    >
        <div slot="title" class="tit">
            <div class="line"></div>
            <p>新闻详情</p>
        </div>
        <el-form
            :model="ruleForm"
            ref="ruleForm"
            label-width="110px"
            class="demo-ruleForm"
            status-icon
            size="mini"
            label-position="right "
        >
            <el-form-item label="新闻来源:">
                <template>
                    <span v-if="ruleForm.radio =='0'">本地</span>
                    <span v-else-if="ruleForm.radio =='1'">外部</span>
                </template>
            </el-form-item>
            <el-form-item label="新闻标题:" placeholder="请输入新闻标题">
                <!-- <el-input v-model="ruleForm.newsTitle" readonly></el-input> -->
                <span>{{ruleForm.newsTitle}}</span>
            </el-form-item>
            <el-form-item label="新闻类型:">
                <span>{{ruleForm.firmName}}</span>
            </el-form-item>
            <el-form-item v-if="ruleForm.radio==1" label="URL链接地址:">
                <!-- <el-input v-model="ruleForm.urlAddres"></el-input> -->
                <span>{{ruleForm.urlAddres}}</span>
                <el-button
                    style="marginLeft:15px"
                    size="mini"
                    type="primary"
                    icon="el-icon-right"
                    @click="leaveFor"
                >前往</el-button>
            </el-form-item>
            <el-form-item label="内容:" v-if="ruleForm.radio==0">
                <quill-editor
                    ref="text"
                    v-model="content"
                    class="myQuillEditor"
                    :options="editorOption"
                    @focus="onEditorFocus($event)"
                />
            </el-form-item>

            <!-- <el-form-item label="内容:" v-if="ruleForm.radio==0">
                <template>
                    <p v-html="content"></p>
                </template>
            </el-form-item>-->
            <el-form-item label="封面图片:" prop="upload">
                <!-- <el-upload
                    ref="pic"
                    action="#"
                    list-type="picture-card"
                    :file-list="fileList"
                    :on-preview="handlePictureCardPreview"
                    :auto-upload="false"
                    :limit="limitCount"
                    :class="{hide:hideUpload}"
                >
                    <i class="el-icon-plus"></i>
                    <div slot="file" slot-scope="{file}">
                        <img
                            class="el-upload-list__item-thumbnail"
                            :src="file.url"
                            alt
                            style="height:100%"
                        />
                        <span class="el-upload-list__item-actions">
                            <span
                                class="el-upload-list__item-preview"
                                @click="handlePictureCardPreview(file)"
                            >
                                <i class="el-icon-zoom-in"></i>
                            </span>
                        </span>
                    </div>
                </el-upload>-->
                <div class="demo-image__preview">
                    <el-image
                        style="width: 100px; height: 100px"
                        :src="fileList[0]"
                        :preview-src-list="fileList"
                    ></el-image>
                </div>
            </el-form-item>
        </el-form>
        <el-dialog append-to-body :visible.sync="dialogVisible" width="50%">
            <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
    </el-dialog>
</template>

<script>

import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'            
import { mapState, mapMutations } from "vuex";
import base from '../../api/base.js'
export default {
    components:{
         quillEditor
    },
    data() {
       
        // 工具栏配置
        const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线 -----['bold', 'italic', 'underline', 'strike']
        ['blockquote', 'code-block'], // 引用  代码块-----['blockquote', 'code-block']
        [{ header: 1 }, { header: 2 }], // 1、2 级标题-----[{ header: 1 }, { header: 2 }]
        [{ list: 'ordered' }, { list: 'bullet' }], // 有序、无序列表-----[{ list: 'ordered' }, { list: 'bullet' }]
        [{ script: 'sub' }, { script: 'super' }], // 上标/下标-----[{ script: 'sub' }, { script: 'super' }]
        [{ indent: '-1' }, { indent: '+1' }], // 缩进-----[{ indent: '-1' }, { indent: '+1' }]
        [{'direction': 'rtl'}], // 文本方向-----[{'direction': 'rtl'}]
        [{ size: ['small', false, 'large', 'huge'] }], // 字体大小-----[{ size: ['small', false, 'large', 'huge'] }]
        [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题-----[{ header: [1, 2, 3, 4, 5, 6, false] }]
        [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色-----[{ color: [] }, { background: [] }]
        [{ font: [] }], // 字体种类-----[{ font: [] }]
        [{ align: [] }], // 对齐方式-----[{ align: [] }]
        ['clean'], // 清除文本格式-----['clean']
        ['image'] // 链接、图片、视频-----['link', 'image', 'video']
        ]
        return {
             editorOption: {
                placeholder: '请输入文本...',
                theme: 'snow',
                modules: {
                    toolbar: {
                        container: toolbarOptions
                    }
                }
            },
            readonly: true,
            limitCount:1,  //最大上传几张
            content:'',
            dialogImageUrl: '',   //放大的url地址
            dialogVisible:false,  //放大的dialog是都显示
         
            fileList:[],  //服务器的图片
            ruleForm: {
                radio:1,  //0本地  1外部
                newsTitle: "", //新闻标题
                firmName: "", //新闻名称
                urlAddres:'', //链接地址
            }
        };
    },
    computed:{
        newsDstatus:{
            get(){
               return this.$store.state.newsDstatus
            },
            set(){}
        },
      
        newsDrow:{
            get(){
               return this.$store.state.newsDrow
            },
            set(){}
        }
      
    },

    methods: {
       
        //前往外部链接
        leaveFor(){
            window.open(this.ruleForm.urlAddres,'_blank') // 新窗口打开外链接
        },
        // 富文本获得焦点时的禁用编辑
        onEditorFocus(val,editor){ 
            console.log(editor); // 富文本获得焦点时的内容
            val.enable(false); // 在获取焦点的时候禁用
        },
        //关闭外层dialog
        closeDialog(type) {
            this.$store.commit('changeNewsD',false)
            this.content = '',    //文章内容清空

            this.fileList = []  //清空base64数组
            this.$refs.ruleForm.resetFields();  //重置from和rules
        }
    },
    watch:{
        newsDrow(val){
            this.ruleForm.newsTitle = val.title    //标题
            this.ruleForm.radio = val.typeId       //来源
            // let obj={
            //     url:val.imgUrl
            // }
            this.fileList.push(val.imgUrl)
            this.ruleForm.firmName = val.cateName   //新闻类型
            if(this.ruleForm.radio == 0){ //本地
                this.content = val.content  
            }else if(this.ruleForm.radio == 1){  //外部
                this.ruleForm.urlAddres = val.refLink
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.newsEditor {
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
    .codeBtn {
        display: block;
        width: 100%;
    }
    .foot {
        display: flex;
        justify-content: center;
    }
}
//最外层弹窗
// .dialog >>> .el-dialog {
//     margin-top: 0 !important;
//     position: relative;
//     margin: 0 auto;
//     // height: 46%;
//     overflow-y: auto;
//     top: 54%;
//     transition: transform;
//     transform: translateY(-50%);
//     border: 1px solid #ebeef5;
//     left: 4%;
//     width: 50%;
//     overflow-y: auto;
// }
// .newsEditor >>> .el-dialog {
//     display: flex;
//     flex-direction: column;
//     margin: 0 !important;
//     position: absolute;
//     top: 50%;
//     left: calc(50% + 120px);
//     transform: translate(-50%, -50%);
//     width: 34%;
//     height: 55%;
// }

.newsEditor >>> .el-dialog .el-dialog__body {
    flex: 1;
    overflow: auto;
}
.newsEditor >>> .hide .el-upload--picture-card {
    display: none;
}
.newsEditor >>> .ql-container.ql-snow {
    height: 260px;
    overflow-y: auto;
}
//表单校验的图标颜色
.newsEditor >>> .el-input__suffix {
    color: #67c23a !important;
}
//上传图片框
.newsEditor >>> .el-upload--picture-card {
    width: 90px;
    height: 90px;
    border: 2px solid rgba(153, 153, 153, 1);
    border-radius: 10px;
}
//上传图片 +框
.newsEditor >>> .el-upload--picture-card i {
    position: relative;
    top: -22px;
    color: #999999;
}
//已上传的图片框
.newsEditor >>> .el-upload-list--picture-card .el-upload-list__item {
    width: 90px;
    height: 90px;
    border: 2px solid rgba(153, 153, 153, 1);
    border-radius: 10px;
}
.newsEditor >>> .el-select {
    width: 100%;
}
.newsEditor >>> .ql-container.ql-snow::-webkit-scrollbar {
    display: none !important;
}
.newsEditor >>> .ql-editor::-webkit-scrollbar {
    display: none !important;
}
.newsEditor >>> .ql-snow .ql-tooltip[data-mode="link"]::before {
    content: "请输入链接地址:" !important;
}
.newsEditor >>> .ql-snow .ql-tooltip.ql-editing a.ql-action::after {
    border-right: 0px !important;
    content: "保存" !important;
    padding-right: 0px !important;
}

.newsEditor >>> .ql-snow .ql-tooltip[data-mode="video"]::before {
    content: "请输入视频地址:" !important;
}

.newsEditor >>> .ql-snow .ql-picker.ql-size .ql-picker-label::before,
.newsEditor >>> .ql-snow .ql-picker.ql-size .ql-picker-item::before {
    content: "14px" !important;
}
.newsEditor
    >>> .ql-snow
    .ql-picker.ql-size
    .ql-picker-label[data-value="small"]::before,
.newsEditor
    >>> .ql-snow
    .ql-picker.ql-size
    .ql-picker-item[data-value="small"]::before {
    content: "10px" !important;
}
.newsEditor
    >>> .ql-snow
    .ql-picker.ql-size
    .ql-picker-label[data-value="large"]::before,
.newsEditor
    >>> .ql-snow
    .ql-picker.ql-size
    .ql-picker-item[data-value="large"]::before {
    content: "18px" !important;
}
.newsEditor
    >>> .ql-snow
    .ql-picker.ql-size
    .ql-picker-label[data-value="huge"]::before,
.newsEditor
    >>> .ql-snow
    .ql-picker.ql-size
    .ql-picker-item[data-value="huge"]::before {
    content: "32px" !important;
}

.newsEditor >>> .ql-snow .ql-picker.ql-header .ql-picker-label::before,
.newsEditor >>> .ql-snow .ql-picker.ql-header .ql-picker-item::before {
    content: "文本" !important;
}
.newsEditor
    >>> .ql-snow
    .ql-picker.ql-header
    .ql-picker-label[data-value="1"]::before,
.newsEditor
    >>> .ql-snow
    .ql-picker.ql-header
    .ql-picker-item[data-value="1"]::before {
    content: "标题1" !important;
}
.newsEditor
    >>> .ql-snow
    .ql-picker.ql-header
    .ql-picker-label[data-value="2"]::before,
.newsEditor
    >>> .ql-snow
    .ql-picker.ql-header
    .ql-picker-item[data-value="2"]::before {
    content: "标题2" !important;
}
.newsEditor
    >>> .ql-snow
    .ql-picker.ql-header
    .ql-picker-label[data-value="3"]::before,
.newsEditor
    >>> .ql-snow
    .ql-picker.ql-header
    .ql-picker-item[data-value="3"]::before {
    content: "标题3" !important;
}
.newsEditor
    >>> .ql-snow
    .ql-picker.ql-header
    .ql-picker-label[data-value="4"]::before,
.newsEditor
    >>> .ql-snow
    .ql-picker.ql-header
    .ql-picker-item[data-value="4"]::before {
    content: "标题4" !important;
}
.newsEditor
    >>> .ql-snow
    .ql-picker.ql-header
    .ql-picker-label[data-value="5"]::before,
.newsEditor
    >>> .ql-snow
    .ql-picker.ql-header
    .ql-picker-item[data-value="5"]::before {
    content: "标题5" !important;
}
.newsEditor
    >>> .ql-snow
    .ql-picker.ql-header
    .ql-picker-label[data-value="6"]::before,
.newsEditor
    >>> .ql-snow
    .ql-picker.ql-header
    .ql-picker-item[data-value="6"]::before {
    content: "标题6" !important;
}

.newsEditor >>> .ql-snow .ql-picker.ql-font .ql-picker-label::before,
.newsEditor >>> .ql-snow .ql-picker.ql-font .ql-picker-item::before {
    content: "标准字体" !important;
}
.newsEditor
    >>> .ql-snow
    .ql-picker.ql-font
    .ql-picker-label[data-value="serif"]::before,
.newsEditor
    >>> .ql-snow
    .ql-picker.ql-font
    .ql-picker-item[data-value="serif"]::before {
    content: "衬线字体" !important;
}
.newsEditor
    >>> .ql-snow
    .ql-picker.ql-font
    .ql-picker-label[data-value="monospace"]::before,
.newsEditor
    >>> .ql-snow
    .ql-picker.ql-font
    .ql-picker-item[data-value="monospace"]::before {
    content: "等宽字体" !important;
}
</style>