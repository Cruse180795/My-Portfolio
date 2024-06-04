export async function displaySkills(){
    const response = await fetch('/php/getSkills.php');
    const data = await response.json();
    
    console.log(data);
}