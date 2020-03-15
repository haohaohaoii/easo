<template>
    <div class="firstPage">
        <div class="contentLeft">
            <!-- <div class="tit">
                <span>
                    用户登陆信息
                    <span>当前登陆时间:2019/1/8 11:40</span>
                    <span>上次登陆时间:2019/1/8 11:40</span>
                </span>
            </div>-->
            <div class="contentL">
                <div class="itemL">
                    <div>
                        <img src="../../assets/images/addicon.png" alt />
                        <p>
                            <span class>本月新增企业1</span>
                            <span class="lsd">10</span>
                        </p>
                    </div>
                    <div>
                        <img src="../../assets/images/siteicon.png" alt />
                        <p>
                            <span class="lsu">本月新增企业2</span>
                            <span class="lsd">10</span>
                        </p>
                    </div>
                    <div>
                        <img src="../../assets/images/ccicon.png" alt />
                        <p>
                            <span class="lsu">本月新增企业3</span>
                            <span class="lsd">10</span>
                        </p>
                    </div>
                </div>
                <div class="itemL">
                    <div>
                        <img src="../../assets/images/csicon.png" alt />
                        <p>
                            <span class="lsu">本月新增企业4</span>
                            <span class="lsd">10</span>
                        </p>
                    </div>
                    <div>
                        <img src="../../assets/images/ycqyicon.png" alt />
                        <p>
                            <span class="lsu">本月新增企业5</span>
                            <span class="lsd">10</span>
                        </p>
                    </div>
                    <div>
                        <img src="../../assets/images/yczdicon.png" alt />
                        <p>
                            <span class="lsu">本月新增企业6</span>
                            <span>10</span>
                        </p>
                    </div>
                </div>
                <div class="itemL">
                    <div>
                        <img src="../../assets/images/yjqyicon.png" alt />
                        <p>
                            <span class="lsu">本月新增企业7</span>
                            <span class="lsd">10</span>
                        </p>
                    </div>
                    <div>
                        <img src="../../assets/images/yjzdicon.png" alt />
                        <p>
                            <span class="lsu">本月新增企业8</span>
                            <span class="lsd">10</span>
                        </p>
                    </div>
                    <div>
                        <img src="../../assets/images/zdzsicon.png" alt />
                        <p>
                            <span class="lsu">本月新增企业9</span>
                            <span class="lsd">10</span>
                        </p>
                    </div>
                </div>
            </div>

            <div class="footer">
                <bar-page></bar-page>
            </div>
        </div>
        <div class="contentRight">
            <div class="rigSpam">
                <el-card class="box-card">
                    <div slot="header" class="titRU">
                        <img src="../../assets/images/lyxxicon.png" alt />
                        <span>留言消息</span>
                    </div>
                    <div class="contentR">
                        <div class="itemR">
                            <div>
                                <p class="t">全部留言1</p>
                                <p class="nu">104</p>
                            </div>
                            <div>
                                <p class="t">全部留言2</p>
                                <p class="nu">104</p>
                            </div>
                            <div>
                                <p class="t">全部留言3</p>
                                <p class="nu">104</p>
                            </div>
                        </div>
                        <div class="itemR">
                            <div>
                                <p class="t">全部留言4</p>
                                <p class="nu">104</p>
                            </div>
                            <div>
                                <p class="t">全部留言5</p>
                                <p class="nu">104</p>
                            </div>
                            <div>
                                <p class="t">全部留言6</p>
                                <p class="nu">104</p>
                            </div>
                        </div>
                    </div>
                </el-card>
            </div>
            <div class="site">
                <cake-page></cake-page>
                <div class="sm">
                    <div class="smItem">
                        <p>
                            <img src="../../assets/images/onicon.png" alt />
                            在线
                        </p>

                        <span style="color:rgba(109,153,249,1)">1772个</span>
                    </div>
                    <div class="smItem">
                        <p>
                            <img src="../../assets/images/outicon.png" alt />
                            离线
                        </p>
                        <span style="color:rgba(109,153,249,1);">584个</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import barPage from './barPage'
import cakePage from './cakePage'
export default {
    components:{
        barPage,
        cakePage
    },
    data() {
        return {
        };
    }
};
</script>

<style lang="scss" scoped>
.firstPage {
    height: 100%;
    // background: rgb(255, 255, 255);
    box-sizing: border-box;

    display: flex;
    justify-content: space-between;
    .contentLeft {
        height: 100%;
        // border: 1px solid;
        width: 59%;

        .contentL {
            height: 50%;
            // border: 1px solid;
            display: flex;

            flex-direction: column;
            justify-content: space-around;
            .itemL {
                display: flex;
                justify-content: space-between;
                div {
                    width: 260px;
                    height: 120px;
                    // border: 1px solid;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: rgba(255, 255, 255, 1);
                    border-radius: 5px;
                    img {
                        width: 70px;
                    }
                    p {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        padding-left: 10px;
                        .lsu {
                            font-size: 18px;
                            font-family: Microsoft YaHei;
                            font-weight: 400;
                            color: rgba(102, 102, 102, 1);
                        }
                        .lsd {
                            font-size: 36px;
                            font-family: Microsoft YaHei;
                            font-weight: 400;
                        }
                    }
                }
            }
        }
        .footer {
            height: 50%;

            background: rgba(255, 255, 255, 1);
        }
    }
    .contentRight {
        height: 100%;
        // border: 1px solid;
        width: 39%;
        .rigSpam {
            height: 50%;

            // border: 1px solid;
            .box-card {
                height: 97%;
                .titRU {
                    height: 15%;
                    display: flex;
                    align-items: center;
                    span {
                        padding-left: 3%;
                        font-family: SimHei;
                        font-weight: 400;
                        color: rgba(255, 255, 255, 1);
                        font-size: 18px;
                    }
                }

                .contentR {
                    height: 100%;
                    display: flex;
                    justify-content: space-around;
                    flex-direction: column;
                    .itemR {
                        display: flex;
                        justify-content: space-around;
                        div {
                            width: 120px;
                            height: 120px;
                            background: rgba(255, 255, 255, 1);
                            box-shadow: 0px 6px 20px 0px rgba(90, 94, 253, 0.24);
                            border-radius: 10px;
                            // border: 1px solid;
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            align-items: center;
                            .nu {
                                font-size: 27px;
                                font-family: Microsoft YaHei;
                                font-weight: 400;
                                color: rgba(46, 101, 253, 1);
                            }
                            .t {
                                font-size: 18px;
                                font-family: Microsoft YaHei;
                                font-weight: 400;
                                color: rgba(51, 51, 51, 1);
                                opacity: 0.8;
                            }
                        }
                    }
                }
            }
        }
        .site {
            height: 50%;
            background: rgba(255, 255, 255, 1);
            display: flex;
            flex-direction: column;
            .sm {
                height: 120px;
                display: flex;
                justify-content: space-around;
                .smItem {
                    width: 150px;
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    p {
                        display: flex;
                        width: 70px;
                        justify-content: space-around;
                    }
                }
            }
        }
    }
}
.firstPage >>> .el-card__header {
    background: linear-gradient(
        142deg,
        rgba(90, 94, 253, 1) 0%,
        rgba(103, 182, 253, 1) 100%
    );
    border-radius: 5px 5px 0px 0px;
}
.firstPage >>> .el-card__body {
    height: 85%;
    padding: 0 !important;
}
</style>