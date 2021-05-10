const hamburger = document.querySelector('.hamburger')
const hambars = document.querySelectorAll('.hambar')
const menu = document.querySelector('.menu')
hamburger.addEventListener('click',()=>{
    hambars.forEach(hambar=>{
        hambar.classList.toggle('hambar_active')
    })
    menu.classList.toggle('menu_active')
})

const nav = document.querySelector('#navbar')
const profile = document.querySelector('.profile_info')
const obsever = new IntersectionObserver(
    function(entries,observer){
        entries.forEach(entry=>{
            if(!entry.isIntersecting){
                nav.classList.add('navbar_white')
            }
            else{
                nav.classList.remove('navbar_white')
                console.log('pro')
            }
        })
    }
)
obsever.observe(profile)