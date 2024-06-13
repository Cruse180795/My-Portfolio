export function toggleHamburger(){
    const menu = document.querySelector('#menu');
    const hamburger = document.querySelector('#hamburger');

    hamburger.addEventListener('click', () =>{
        
        hamburger.classList.toggle('active');
        if(hamburger.classList.contains('active')){
            menu.classList.remove('hidden');
            menu.classList.add('animate-fade','animate-once', 'animate-delay-[5ms]', 'animate-ease-in-out');
        }else{
            
            menu.classList.add('hidden');
        }
    });

    //Close hamburger menu when link clicked
    const navLink = document.querySelectorAll('#menu > ul > li > a');

    navLink.forEach((element) =>{
        element.addEventListener('click', () =>{
            menu.classList.add('hidden');
            hamburger.classList.remove('active');
        });
    })
}