// let defaultMenu=[]
// try{
//     if(localStorage.getItem('menuPaths')){
//         defaultMenu = JSON.parse(localStorage.getItem('menuPaths'))
//     }
// }catch(e){}

export default ({
    token: '',  //用户的token
    adminId: '', //用户登陆成功返回的用户id
    msg: '权限管理',
    menuLeftwidth: '240px', //右侧菜单初始宽度
    breadArr: localStorage.breadArr ? JSON.parse(localStorage.breadArr) : [],  //动态面包屑
    hisDataall: '',  //历史数据不分页--折线图用
    hoursArr: [], //x轴坐标
    companyUseradd: false,   //企业管理下的 企业用户 添加企业用户dialog状态
    companyUseredi: false,   //企业管理下的 企业用户 编辑 企业用户dialog状态
    companyUseritem: '',  //企业管理下的 企业用户 编辑 行信息
    messageD: false,  //消息详情 dialog状态
    pwdDialog: false,  //头部右侧修改密码 dialog状态
    enterDialog: false, //企业管理下的企业信息中的详情 dialog状态
    enterRow: '',     //企业管理下的 当行详情数据
    enterAdd: false,   //企业管理下 企业信息  添加企业
    editorDialog: false,  //企业管理下的企业信息中的编辑 dialog状态
    // companyType: [],   //企业管理下的企业信息 编辑中需要获取企业类型
    baseAdd: false,  //企业管理下的基站管理中的添加基站 dialog状态
    Equilist: [],  //企业管理下的基站管理中的添加基站  所需的托管设备数组
    menuItemD: '',   //权限管理下的菜单管理  行信息详情，编辑要用
    baseDetail: false,    //企业管理下的基站管理中的基站详情  dialog状态
    siteRowlist: '',    //企业管理下的基站管理 点击基站详情  row
    baseEditor: false,    //企业管理下的基站管理中的编辑  dialog状态
    baseAudit: false,   //企业管理下的基站管理中 点击审核 dialog状态
    siteRowmn: '',     //企业管理下的 基站管理  审核  mn参数
    companyArr: [],       //企业管理中的基站管理中的编辑 所需的全部企业
    baseItemlist: '',   //企业管理下的基站管理中的编辑 所需的信息
    spamReply: false,   //企业管理下的留言回复
    enterAud: false,   //企业信息审核弹窗
    spamItemlist: [],    //企业管理写的 留言回复  单个留言id对应的内容
    enterId: '',   //企业信息审核行的id
    roleAdd: false,     //权限管理下的角色管理添加角色 dialog状态
    roleEditor: false,   //权限管理下的角色管理修改角色 dialog状态
    userAdd: false,   //权限管理下的用户管理添加用户 dialog状态
    userEditor: false, //权限管理下的用户管理编辑用户 dialog状态
    userItem: '',  //权限管理下的用户管理编辑用户 所需要的行数据
    deparArr: [],  //权限管理下的用户管理编辑用户 所需的部门数据下拉框数组
    roleList: [],   //权限管理下的用户管理编辑用户 所需的角色数据下拉框数组
    divAdd: false,    //权限管理下的部门管理添加部门 dialog状态
    divEditor: false,  //权限管理下的部门管理编辑部门 dialog状态
    divItem: [],  //权限管理下的部门管理编辑部门  所需的部门信息
    userAdddialog: false,    //权限管理下的菜单管理添加菜单 dialog状态
    menuE: false,   //权限管理下的菜单管理  编辑菜单 dialog状态
    roleTree: [],     //角色管理中的树状结构数组(所有的)
    roleItem: [],   //单个的角色对应的权限
    roleName: '',    //角色名称
    roleId: '',       //角色id
    spamIsshow: false,
    menulist: [],  //由角色权限和本地完整路由结合生成的实际菜单表
    defaultMenu: 'hisData',  //默认选中的是历史数据
    rolesRoutes: [],  //由角色权限和本地完整路由结合生成的实际角色路由
    asyncRoutes: [   //异步路由，本地完整路由
        {
            path: 'hisData',     //历史数据
            name: '历史数据',
            component: resolve => (require(["@/components/historyData/historyData"], resolve))
        }, {
            path: 'realData',     //实时数据
            name: '实时数据',
            component: resolve => (require(["@/components/realData/realData"], resolve))
        }, {
            path: 'enterMation',     //企业信息
            name: '企业信息',
            component: resolve => (require(["@/components/enterMation/enterMation"], resolve))
        },
        {
            path: 'spam',     //留言管理
            name: '留言管理',
            component: resolve => (require(["@/components/spam/spam"], resolve))
        },
        {
            path: 'baseManage',     //基站管理
            name: '基站管理',
            component: resolve => (require(["@/components/baseManage/baseManage"], resolve))
        },
        {
            path: 'roleManage',     //角色管理
            name: '角色管理',
            component: resolve => (require(["@/components/roleManage/roleManage"], resolve))
        },
        {
            path: 'userManage',     //用户管理
            name: '用户管理',
            component: resolve => (require(["@/components/userManage/userManage"], resolve))
        }, {
            path: 'divManage',     //部门管理
            name: '部门管理',
            component: resolve => (require(["@/components/divManage/divManage"], resolve))
        }, {
            path: 'menuManage',     //菜单管理
            name: '菜单管理',
            component: resolve => (require(["@/components/menuManage/menuManage"], resolve))
        },
        {
            path: 'message',     //消息
            name: '消息',
            component: resolve => (require(["@/components/common/message"], resolve))
        },
        {
            path: 'companyUser',     //企业用户
            name: '企业用户',
            component: resolve => (require(["@/components/companyUser/companyUser"], resolve))
        }
    ]
})