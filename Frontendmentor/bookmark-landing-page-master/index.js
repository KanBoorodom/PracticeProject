/* Mobile width 375px */
/* Nav *******************************************/
const hamburger = document.querySelector('#hamburger')
const hambars = document.querySelectorAll('.hambar')
const menu = document.querySelector('.menu')
const menuItems = document.querySelectorAll('.menu_items')
const logoChar = document.querySelector('.logoChar')
const circle = document.querySelector('.circle')
const path = document.querySelector('.path')
const logo = document.querySelector('.logo')

 /* Nav Function */
 const menuToggle = ()=>{
    hambars.forEach((hambar)=>{
        hambar.classList.toggle('active')
    })
    menu.classList.toggle('menuActive')
    logoChar.classList.toggle('logoActive')
    circle.classList.toggle('logoActive')
    path.classList.toggle('logoActiveBlue')
    logo.classList.toggle('logoActive')
}

hamburger.addEventListener('click',menuToggle)
menuItems.forEach((menuItem)=>{
    menuItem.addEventListener('click',menuToggle)
})



/* Scroll*******************************************/
var prevScrollpos = window.pageYOffset;
window.onscroll = ()=> {
    var currentPos = window.pageYOffset;
    if(prevScrollpos > currentPos){
        hamburger.style.top ="4%";
    }
    else{hamburger.style.top ="-100px";}
    prevScrollpos = currentPos
}


/* Tap and Feature Info*******************************************/
const tapHeads = document.querySelectorAll('.tap_head')
const firstTap = tapHeads[0]
const imgTwo = document.querySelector('.img_two')
const infoHead = document.querySelector('.feature_info_head')
const infoP = document.querySelector('.feature_info_p')
/* Default อยู่ที่ tap แรก */
firstTap.classList.toggle('tap_bottom_active')
firstTap.classList.toggle('tap_head_active')
tapHeads.forEach((tapHead)=>{
    tapHead.addEventListener('click',()=>{
        var alreadyActive = document.querySelector('.tap_bottom_active') /*เช็คเพิ่อเปลี่ยนตัวที่ active*/
        if(alreadyActive !== null){    
            alreadyActive.classList.toggle('tap_bottom_active')    
            alreadyActive.classList.toggle('tap_head_active')
        }
        tapHead.classList.toggle('tap_bottom_active')
        tapHead.classList.toggle('tap_head_active')
        if(tapHead.innerText === 'Simple Bookmarking'){
            imgTwo.src = './images/illustration-features-tab-1.svg'            
            infoHead.innerText = 'Bookmark in one click'
            infoP.innerText = 'Organize your bookmarks however you like.Our simple drag-and-drop interface gives you\
                                complete control over how you manage your favourite sites.'
            return
        }
        else if(tapHead.innerText === 'Speedy Searching'){
            imgTwo.src = './images/illustration-features-tab-2.svg'
            infoHead.innerText = 'Intelligent search'
            infoP.innerText = 'Our powerful search feature will help you find saved sites in no time at all.\
                                No need to trawl through all of your bookmarks.'
            return
        }
        imgTwo.src = './images/illustration-features-tab-3.svg'
        infoHead.innerText = 'Share your bookmarks'
        infoP.innerText = 'Easily share your bookmarks and collections with others. Create a shareable\
                            link that you can send at the click of a button.'
    })
})

/* FAQ */
const arrow = document.querySelector('.arrow')
const ans = document.querySelector('.answer')

arrow.addEventListener('click',()=>{
    ans.classList.toggle('answer_active')
    console.log('hi')
})


