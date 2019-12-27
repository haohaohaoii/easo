export default ({
    getXzhou(state){
        console.log(state.searchHours);
        if(state.searchHours != 0){
            let arr =[];
            for(let i=0; i<state.searchHours;i++){
                arr.push(i)
            }
            return arr;
        }
    }

})