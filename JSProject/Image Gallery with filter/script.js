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

const previewBox = document.querySelector('.preview-box')
const imgBox = document.querySelector('.image-box')
const imgType = document.querySelector('.image-type')
const closeIcon = document.querySelector('.icon')
const shadow = document.querySelector('.shadow')
closeIcon.addEventListener('click',()=>{
    previewBox.classList.remove('showPreview')
    shadow.classList.remove('shadowOn')}
    
    )        
function preview(element){
        previewBox.classList.add('show')
    }

filterImg.forEach(img=>{
    img.addEventListener('click',(e)=>{
        console.log(img.getAttribute('data-name'))
        imgType.textContent = img.getAttribute('data-name')
        imgBox.querySelector('img').src = e.target.src
        previewBox.classList.add('showPreview')
        shadow.classList.add('shadowOn')
    })
})
