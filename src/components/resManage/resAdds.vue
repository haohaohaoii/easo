<template>
    <el-dialog
        :visible.sync="newsAdd"
        class="dialog"
        center
        :close-on-click-modal="false"
        append-to-body
        @close="closeDialog"
    >
        <div class="updateFiles">
            <group>
                <cell class="addAnnex" title="上传附件" @click.native.stop="openFile">
                    <input type="file" @change="fileChange()" style="display: none" ref="file" />
                    <i class="fa fa-file"></i>
                </cell>
            </group>
            <group>
                <div class="fileList" v-for="(item,index) in filesList" :key="index">
                    <div class="left">
                        <div class="left-img">
                            <img slot="icon-active" :src="item.filesExtension | filesExtension" />
                        </div>
                        <div class="cont">
                            <div class="text">{{item.fileName}}</div>
                            <div class="date">{{item.fileSize}}M {{item.fileDate}}上传</div>
                        </div>
                    </div>
                    <div class="right" @click="delFiles(item, index)"></div>
                </div>
            </group>
        </div>
    </el-dialog>
</template>>


<script>
import {filesExtension} from '../clue/js/validate.js' // 这里是通过后缀名判断显示图标，不需要请移除
export default {
    props:['isShow'],
  data() {
    return {
        newsAdd:false,   //外层dialog是都显示
      filesList: [],
      files: {
        fileName: '', // 文件名
        filesExtension: '', // 扩展名
        fileDate: '', // 上传时间
        fileSize: '', // 上传大小
        fileData: '' // 文件数据
      },
    }
  },
  filters: {
    filesExtension(val) {
      return filesExtension(val)
    }
  },
  methods: {
    // 删除文件
    delFiles(item, index) {
      this.filesList.splice(index,1)
    },
    // 上传文件
    openFile(){
      this.$refs.file.click();
    },
    fileChange() {
      let myfile = this.$refs.file
      if (myfile.files[0] == undefined) {
        Toast('未上传任何文件！');
      } else {
        var filevalue = myfile.value;
        var index = filevalue.lastIndexOf('.');
        this.files.fileName = myfile.files[0].name
        this.files.filesExtension = filevalue.substring(index)
        let date = new Date()
        const Y = date.getFullYear()
        let m = date.getMonth() + 1
        let d = date.getDate()
        let H = date.getHours()
        let i = date.getMinutes()
        let s = date.getSeconds()
        m = m < 10 ? '0' + m : m
        d = d < 10 ? '0' + d : d
        H = H < 10 ? '0' + H : H
        i = i < 10 ? '0' + i : i
        s = s < 10 ? '0' + s : s
        this.files.fileDate = Y + '-' + m + '-' + d + ' ' + H + ':' + i + ':' + s
        this.files.fileSize = parseFloat(myfile.files[0].size / 1024 / 1024).toPrecision(2)
        let self = this
        self.getBase64(myfile.files[0]).then(res => {
          let unLoadFileData = res
          self.files.fileData = res.split(',')[1]
          self.filesList.push({
            fileName: self.files.fileName, // 文件名
            filesExtension: self.files.filesExtension, // 扩展名
            fileDate: self.files.fileDate, // 上传时间
            fileSize: self.files.fileSize, // 上传大小
            fileData: self.files.fileData
          })
        })
        self.$emit('getFilesList', self.filesList)
      }
    },
    getBase64(file) {
      return new Promise(function(resolve, reject) {
        let reader = new FileReader()
        let results = ''
        reader.readAsDataURL(file) // 读出 base64
        reader.onload = function () {
          results = reader.result
        }
        reader.onerror = function (error) {
          reject(error)
        }
        reader.onloadend = function () {
          resolve(results)
        }
      })
    },
    closeDialog(){
        
    }
  },
   watch:{
        isShow(val){
            this.newsAdd = val;
        }
    }
}
</script>

<style lang="scss" scoped>
.updateFiles {
    .addAnnex {
        width: 80%;
        padding: 11px 0;
        background: #f0f0f0;
        text-align: center;
        font-size: 14px;
        margin: 20px auto;
        border: 1px solid #e0e0e0;
        border-radius: 5px;
    }
    .fileList {
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 1em;
        border-bottom: 1px solid #f0f0f0;
        background: #fff;
        .left {
            width: 80%;
            display: flex;
            justify-content: left;
            .left-img {
                width: 3em;
                height: 3em;
                margin-right: 0.5em;
                display: flex;
                justify-content: center;
                align-items: center;
                img {
                    display: inline-block;
                    width: 3em;
                }
            }
            .left-notimg {
                background: #f0f0f0;
            }
            .cont {
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                .text {
                    font-size: 14px;
                    color: #4d4d4d;
                    padding-bottom: 0.3em;
                    display: flex;
                    justify-content: left;
                    flex-wrap: wrap;
                }
                .date {
                    font-size: 12px;
                    color: #bbb;
                    width: 100%;
                }
            }
        }
        .right {
            width: 20%;
            display: flex;
            justify-content: flex-end;
            align-items: center;
        }
    }
}
</style>