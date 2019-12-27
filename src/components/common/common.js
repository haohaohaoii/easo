let commonJs = {
    //获取小时的方法,然后计算横坐标数组
    getHours(startTime, endTime) {
        return new Promise(function (reslove) {
            console.log(startTime)
            let stime = new Date(startTime).getTime();
            let etime = new Date(endTime).getTime();
            let usedTime = etime - stime;
            let hours = Math.floor(usedTime / (3600 * 1000)); //获取到小时
            let dataTimearr = []
            if (hours === 0) {
                reslove(dataTimearr)
            } else {
                for (let i = 0; i < hours + 1; i++) {
                    let changeTime = stime + (3600 * 1000 * i);
                    let oDate = new Date(changeTime);
                    let oYear = oDate.getFullYear();
                    let oMonth = oDate.getMonth() + 1;
                    let oDay = oDate.getDate();
                    let oHour = oDate.getHours();
                    let oMin = oDate.getMinutes();
                    let oSen = oDate.getSeconds();
                    let oTime = oYear + '-' + addZero(oMonth) + '-' + addZero(oDay) + ' ' + addZero(oHour) + ':' +
                        addZero(oMin) + ':' + addZero(oSen);
                    dataTimearr.push(oTime);
                    console.log(dataTimearr);
                }
                reslove(dataTimearr)
            }

        })
    },

}
//日期补零函数
function addZero(num) {
    if (parseInt(num) < 10) {
        num = '0' + num;
    }
    return num;
}
export default commonJs