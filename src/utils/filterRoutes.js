

let filterRoutes = {
    //根据角色不同，得到不同的路由表
    filters(asyncRoutes = [], menuTree= []) {
        return new Promise(function (resolve) {
            debugger
            let res = []
            let childrenName = []
            for (let i = 0; i < menuTree.length; i++) {
                if (menuTree[i].two) {
                    for (let j = 0; j < menuTree[i].two.length; j++) {
                        childrenName.push(menuTree[i].two[j])
                    }
                }else{
                    childrenName.push(menuTree[i].one)
                }
            }
            asyncRoutes.forEach((route) => {
                let routeItem = route
                childrenName.forEach((item) => {
                    if (routeItem.name == item.menuName) {
                        res.push(routeItem)
                    }
                })
            })
            debugger
            resolve(res)
        })
    },
    //根据角色不同，得到不同的菜单表
    getMenus(asyncRoutes,menuTree){
        return new Promise(function (resolve) {
            debugger
            // let menuT = menuTree;
            let menuList = []
            let childrenName = []
            // for (let i = 0; i < menuTree.length; i++) {
            //     if (menuTree[i].two) {
            //         for (let j = 0; j < menuTree[i].two.length; j++) {
            //             childrenName.push(menuTree[i].two[j])
            //         }
            //     }else{
            //         childrenName.push(menuTree[i].one)
            //     }
            // }
            asyncRoutes.forEach((route) => {
                let routeItem = route
                menuTree.forEach((item) => {

                    if (routeItem.name == item.two.menuName) {
                        iitem.two.path = routeItem.path
                        // menuList.push(item)
                    }
                })
            })
            for(let i=0; i<asyncRoutes.length; i++){
                // debugger
                for(let k=0; k<menuTree.length;k++){
                    if(menuTree[k].two && menuTree[k].two.length>=1){   //说明有二级菜单
                        for(let j=0; j<menuTree[k].two.length; j++){
                            // debugger
                            if(asyncRoutes[i].name == menuTree[k].two[j].menuName){
                                menuTree[k].two[j].path = asyncRoutes[i].path;
                            }
                        }
                    }else{
                        if(asyncRoutes[i].name == menuTree[k].one.menuName){ //说明是一级菜单
                            menuTree[k].one.path = asyncRoutes[i].path;
                        }
                    }
                }
            }
            debugger
            resolve(menuTree)
        })
    }

}
export default filterRoutes;