export const sortData = data => {
    const sortedData = [...data]
    return sortedData.sort((a,b) => a.cases>b.cases ? -1 :1)
 }
/* 
sortedData.sort((a,b)=>{
    if(a.cases > b.cases){
        return -1 //-1 = false แต่ถ้าใช้ false จะไม่ sort
    }
    else{
        return 1 //1 = true
    }
})
return sortedData
 */