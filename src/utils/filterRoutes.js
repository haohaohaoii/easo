

let filterRoutes = {
    filters(asyncRoutes = [], menuTree = []) {
        return new Promise(function (resolve) {
            debugger
            let res = []
            let childrenName = []
            for (let i = 0; i < menuTree.length; i++) {
                if (menuTree[i].two) {
                    for (let j = 0; j < menuTree[i].two.length; j++) {
                        childrenName.push(menuTree[i].two[j])
                    }
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

}
export default filterRoutes;