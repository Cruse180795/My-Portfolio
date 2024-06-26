export async function displayProjects(){
    const response = await fetch('/php/getProjects.php');
    const data = await response.json();

    let projectContainer = document.querySelector('#projectContainer');
                
                data['data'].forEach((entry) => {
                    let container = document.createElement('div');
                    container.classList.add('flex', 'flex-col', 'justify-between', 'h-full', 'shadow-md',  'rounded-lg', 'shadow-80082-LightGray',  'space-y-5', 'text-white', 'font-nunito'); 
                
                    

                    // Image
                    let projectImage = document.createElement('img');
                    projectImage.setAttribute('src', `${entry.imagePath}`);
                    projectImage.setAttribute('alt', `${entry.alt}`)
                    projectImage.classList.add( 'aspect-video', 'rounded-lg','rounded-b-none'); 
                    container.append(projectImage);
                
                    // Project Details Container
                    let projectDetailsContainer = document.createElement('div');
                    projectDetailsContainer.classList.add('space-y-3', 'flex-grow', 'p-4'); 
                    container.append(projectDetailsContainer);
                
                    // Title
                    let title = document.createElement('h2');
                    title.classList.add('font-bold', 'text-xl', 'leading-8','font-poppins',  'underline', 'underline-offset-4', 'decoration-80082-Pink', 'lg:text-2xl');
                    title.textContent = `${entry.title}`;
                    projectDetailsContainer.append(title);
                
                    //Description
                    let description = document.createElement('h3');
                    description.classList.add('font-medium','leading-7', 'text-xl')
                    description.textContent = `${entry.description}`;
                    projectDetailsContainer.append(description);


                    // List
                    let list = document.createElement('ul');
                    list.classList.add('flex', 'gap-3', 'flex-wrap');
                    projectDetailsContainer.append(list);
                
                    // List Items
                    entry.techStack.forEach(tech => {
                        let listItem = document.createElement('li');
                        listItem.classList.add('font-medium', 'text-sm', 'leading-7', 'font-poppins');
                        listItem.textContent = tech;
                        list.append(listItem);
                    });
                
                    // Visit Links Container
                    let linksContainer = document.createElement('div');
                    linksContainer.classList.add('flex', 'justify-between', 'mt-5', 'p-4'); 
                    container.append(linksContainer);
                
                    // Visit Project Link
                    let visitProject = document.createElement('a');
                    visitProject.setAttribute('href', `${entry.viewProjectLink}`);
                    visitProject.setAttribute('target', '_blank');
                    visitProject.classList.add('uppercase', 'block', 'font-bold', 'leading-6', 'tracking-widest', 'underline', 'underline-offset-4', 'decoration-80082-Blue', 'transition-all', 'duration-500', 'hover:text-80082-Blue');
                    visitProject.textContent = 'View Project';
                    linksContainer.append(visitProject);
                
                    // Visit Code Link
                    let visitCode = document.createElement('a');
                    visitCode.setAttribute('href', `${entry.viewCodeLink}`);
                    if(!entry.viewCodeLink){
                        visitCode.classList.add('hidden');
                    }else{
                        visitCode.classList.add('uppercase', 'block', 'font-bold', 'leading-6', 'tracking-widest', 'underline', 'underline-offset-4', 'decoration-80082-Blue', 'transition-all', 'duration-500', 'hover:text-80082-Blue');
                        visitCode.textContent = 'View Code';
                    }
                    linksContainer.append(visitCode);
                    projectContainer.append(container);
                });
                
}