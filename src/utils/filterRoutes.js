

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
            let menuList = []
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
                        item.path = routeItem.path
                        menuList.push(item)
                    }
                })
            })
            debugger
            resolve(menuList)
        })
    }

}
export default filterRoutes;