export async function displaySkills(){
    const response = await fetch('/php/getSkills.php');
    const data = await response.json();
    
    let skillsContainer = document.querySelector('#skillsContainer');

        data['data'].forEach((entry) =>{


        //Skills Card Div
        let skillsCard = document.createElement('div');
        skillsCard.classList.add( 'rounded-2xl', 'space-y-2', 'p-5', 'border', 'border-black', 'shadow-xl',  'w-full', 'h-full', 'flex', 'flex-col', 'justify-center', 'items-center', 'transition', 'ease-in-out', 'duration-500', 'hover:scale-105');
        skillsContainer.append(skillsCard);

        //Skills Card Title
        let skillsTitle = document.createElement('h2');
        skillsTitle.classList.add('font-bold', 'text-2xl', 'leading-10', 'tracking-[-1px]');
        skillsTitle.textContent = `${entry.title}`;
        skillsCard.append(skillsTitle);
    });
}