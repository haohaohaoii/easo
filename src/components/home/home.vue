<template>
    <!--首页面-->
    <div class="home">
        <!--左部导航栏组件-->
        <home-left></home-left>
        <!--右侧内容-->
        <div class="homeRight loading-area" ref="rig">
            <headert></headert>
            <div class="content" ref="heig">
                <bread></bread>
                <transition enter-active-class="animated zoomInUp">
                    <router-view></router-view>
                </transition>
            </div>
        </div>
        <spam-Reply></spam-Reply>
    </div>
</template>

<script>
import spamReply from './spamReply'
import SockJS from  'sockjs-client';
import  Stomp from 'stompjs';
import { mapState } from "vuex";
import headert from "../common/header";
import bread from "../common/bread";
import homecon from "./homeContent";
import left from "./homeLeft"; //引入左侧菜单组件
export default {
    components: {
        headert,
        homecon,
        bread,
        spamReply,
        homeLeft: left
    },
    data() {
        return {
            
        };
    },
    mounted() {
        console.log(this.$refs.rig);
        this.$refs.rig.style.marginLeft = this.menuLeftwidth;
        this.$refs.heig.style.height = (window.innerHeight-60)+'px'  //获取content的高度
         if(this.spamIsshow){   //是否有留言的权限
                this.connection();
        }
    },
    computed: {
        ...mapState(["menuLeftwidth","spamIsshow"])
    },
    methods:{
        connection() {
            // 建立连接对象
            let socket = new SockJS('http://172.16.23.5:8080/steward');
            // 获取STOMP子协议的客户端对象
            
            this.stompClient = Stomp.over(socket);
            // 定义客户端的认证信息,按需求配置
            let headers = {
                Authorization:''
            }
            // 向服务器发起websocket连接
            this.stompClient.connect(headers,() => {
                this.stompClient.subscribe('/topic/callback', (msg) => { // 订阅服务端提供的某个topic
                
                    console.log(msg);  // msg.body存放的是服务端发送给我们的信息
                    let msgObj = JSON.parse(msg.body);
                    console.log(msgObj)
                    this.$notify.info({
                        title: msgObj.title,
                        position: 'bottom-right',
                        offset: 60,
                        duration: 6000,
                        dangerouslyUseHTMLString: true,
                        message: `<p style="height:80px;overflow: hidden;">${msgObj.content}</p>`,
                        onClick: () => {
                            this.toSpam(msgObj.id)

                        },
                    });
                },headers);
            }, (err) => {
                // 连接发生错误时的处理函数
                console.log('失败')
                console.log(err);
            });
        },
        toSpam(id){
            debugger
            this.$store.dispatch('spamDetail',id)
        }
    },
    watch: {
        menuLeftwidth(val, oldval) {
            if (val != oldval) {
                this.$refs.rig.style.marginLeft = val;
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.home {
    width: 100%;
    height: 100%;
    position: relative;
    left: 0;
    top: 0;
    //右侧内容
    .homeRight {
        height: 100%;
        background: #ededed;
        .content {
            background: #ededed;

            box-sizing: border-box;
            padding: 30px 15px 15px 15px;
        }
    }
}
</style>