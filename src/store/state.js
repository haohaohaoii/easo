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
    hoursArr: [], //x轴坐标
    enterDialog: false, //企业管理下的企业信息中的详情 dialog状态
    editorDialog: false,  //企业管理下的企业信息中的编辑 dialog状态
    baseAdd: false,  //企业管理下的基站管理中的添加基站 dialog状态
    baseDetail: false,    //企业管理下的基站管理中的基站详情  dialog状态
    spamReply: false,   //企业管理下的留言回复
    roleAdd: false,     //权限管理下的角色管理添加角色 dialog状态
    roleEditor: false,   //权限管理下的角色管理修改角色 dialog状态
    userAdd: false,   //权限管理下的用户管理添加用户 dialog状态
    divAdd: false,    //权限管理下的部门管理添加部门 dialog状态
    menuAdd: false,    //权限管理下的菜单管理添加菜单 dialog状态
    roleTree: [],     //角色管理中的树状结构数组(所有的)
    roleItem: [],   //单个的角色对应的权限
    roleName: '',    //角色名称
    roleId: '',       //角色id
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
        }
    ]
})