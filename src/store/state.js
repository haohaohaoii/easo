let defaultMenu=[]
try{
    if(localStorage.getItem('menuPaths')){
        defaultMenu = localStorage.getItem('menuPaths')
    }
}catch(e){}

export default ({
    token:'',  //用户的token
    msg: '权限管理',
    menuLeftwidth: '240px', //右侧菜单初始宽度
    hoursArr: [], //x轴坐标
    enterDialog: false, //企业管理下的企业信息中的详情 dialog状态
    editorDialog:false,  //企业管理下的企业信息中的编辑 dialog状态
    baseAdd:false,  //企业管理下的基站管理中的添加基站 dialog状态
    baseDetail:false,    //企业管理下的基站管理中的基站详情  dialog状态
    spamReply:false,   //企业管理下的留言回复
    roleAdd:false,     //权限管理下的角色管理添加角色 dialog状态
    userAdd :false,   //权限管理下的用户管理添加用户 dialog状态
    divAdd:false,    //权限管理下的部门管理添加部门 dialog状态
    menuAdd:false,    //权限管理下的菜单管理添加菜单 dialog状态
    menulist:defaultMenu  //后台根据不同角色返回的不同菜单表
 })