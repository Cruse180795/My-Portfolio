export function animationObserver(){
    const sections = document.querySelectorAll('.section__content');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const sectionObserver = new IntersectionObserver((entries, observer) =>{
        entries.forEach((entry) =>{
            console.log('entry:' ,entry);
            if(entry.isIntersecting){
                console.log('Observer:', entry.target);
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);


    sections.forEach((section) =>{
        sectionObserver.observe(section);
    });

}