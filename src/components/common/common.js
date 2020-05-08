let commonJs = {
    //获 取小时的方法,然后计算横坐标数组(测试用)
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

                }
                reslove(dataTimearr)
            }

        })
    },

    getXz(hisData) {
        let xArr = []  //x轴
        let codData = []  //cod
        let nh3nData = []  //nh3n
        let phData = []  //ph
        for (let i = 0; i < hisData.length; i++) {
            xArr.push(hisData[i].createTime)
            for (let k = 0; k < hisData[i].dataInfoList.length; k++) {
                if (hisData[i].dataInfoList[k].factorCode == 'cod') {
                    codData.push(hisData[i].dataInfoList[k].factorValue)
                } else if (hisData[i].dataInfoList[k].factorCode == "nh3n") {
                    nh3nData.push(hisData[i].dataInfoList[k].factorValue)
                } else if (hisData[i].dataInfoList[k].factorCode == "ph") {
                    phData.push(hisData[i].dataInfoList[k].factorValue)
                }
            }
        }
    }

}
//日期补零函数
function addZero(num) {
    if (parseInt(num) < 10) {
        num = '0' + num;
    }
    return num;
}
export default commonJs