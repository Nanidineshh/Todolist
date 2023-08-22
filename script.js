const addBtn = document.querySelector("#add-btn");
const newTaskInput =document.querySelector("#wrapper input");
const taskContainer = document.querySelector("#tasks");
const countVal =document.querySelector(".count-value");//its a class
const err=document.getElementById("error");
let taskCount = 0;

const displayCount = (taskCount) => {
    countVal.innerText = taskCount;
};

const addTask = () => {
    const taskName = newTaskInput.value.trim();// to hold the val and remove the space
    err.style.display="none"; //to hide the error
    if(!taskName)//to check if empty r whitespace
    {
        setTimeout(()=>{
            err.style.display="block";
        },200);
        return;
    }
   

const task= `<div class="task"> 
<input type="checkbox" class="task-check">
<span class="taskname">${taskName}</span>
<button class="edit">
<i class="fa-solid fa-pen-to-square"></i>
</button>
<button class="del"><i class="fa-solid fa-trash-can"></i></button>
</div>`;
//to add the task vertically checkbox,taskname,edit,delete. checkbox is a input type 
//button  is the parent element and i=icon is the child element
taskContainer.insertAdjacentHTML("beforeend",task);
//This line of code inserts the task element as the last child of the taskContainer 
//element, ensuring that it's positioned at the end of the container's content
//"beforebegin", "afterbegin", "beforeend", or "afterend"

const deletebuttons=document.querySelectorAll(".del");
deletebuttons.forEach((button) =>{
    button.onclick = ()=>{
        button.parentNode.remove();
        taskCount -= 1;
        displayCount(taskCount);
    };
});
const editbuttons=document.querySelectorAll(".edit");
editbuttons.forEach((edt)=>{
    edt.onclick=(e)=>{
        let targetEle = e.target;
        if(!(e.target.className == "edit")){
            //if i click on the icon = child element.
            // so we are making the child ele as targetEle.No matter what you click it will edit
            targetEle =e.target.parentElement;
        }
        newTaskInput.value = targetEle.previousElementSibling?.innerText;
        targetEle.parentNode.remove();
        taskCount -= 1;
        displayCount(taskCount);
    };
});
const taskCheck =document.querySelectorAll(".task-check");
taskCheck.forEach((checkbox)=>{
    checkbox.onchange=()=>{
        checkbox.nextElementSibling.classList.toggle("completed");
        if(checkbox.checked){
            taskCount-=1;
        }else{
            taskCount += 1;
        }
        displayCount(taskCount);
    };
});
taskCount += 1;
displayCount(taskCount);
newTaskInput.value = "";

};
addBtn.addEventListener("click",addTask);
window.onload = ()=>{
  taskCount=0;
  displayCount(taskCount);
  newTaskInput="";
};