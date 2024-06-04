export async function displayProjects(){
    const response = await fetch('/php/getProjects.php');
    const data = await response.json();

    console.log(data);
}