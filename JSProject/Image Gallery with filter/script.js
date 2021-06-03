const filterItem = document.querySelector('.items')
const filterImg = document.querySelectorAll('.image')

window.onload = ()=>{//when window load
    filterItem.onclick = (e)=>{
        console.log(e.target)
        if(e.target.classList.contains('item')){
            filterItem.querySelector('.active').classList.remove('active') // ลบตัวที่กำลัง Active
            e.target.classList.add('active')
            let filterName = e.target.getAttribute('data-name')
            console.log(filterName)
            filterImg.forEach((image)=>{
                let filterImages = image .getAttribute('data-name')
                if((filterImages == filterName) || filterName == "all"){
                    image.classList.remove('hide')
                    image.classList.add('show')
                }
                else{
                    image.classList.add('hide')
                    image.classList.remove('show')
                }
            })
        }
    }
}
