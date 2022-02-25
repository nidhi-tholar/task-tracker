
let timerID;

function onPageLoad() {
    days_timer();
    today();
}

 //date
 function today(){
 let today = new Date();

 const daylist = ["Sunday","Monday","Tuesday","Wednesday ","Thursday","Friday","Saturday"];
 const monthNames = ["January", "February", "March", "April", "May", "June",
 "July", "August", "September", "October", "November", "December"
 ];

 var time = today.getHours() + ":" + today.getMinutes() 

 document.getElementById("date").innerHTML =  monthNames[today.getMonth()] +' '+today.getDate() + ' ' + today.getFullYear()
 document.getElementById("day").innerHTML = daylist[today.getDay()];
}



 //timer
function days_timer(){
    
    let countDownDate = new Date("April 20, 2022 00:00:00").getTime();

    // Update the count down every 1 second
    const x = setInterval(function() {

    // Get today's date and time
    let now = new Date().getTime();
  
    // Find the distance between now and the count down date
    let timeLeft = countDownDate - now;
  
    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    var hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
  
    // Display the result in the element with id="demo"
    document.getElementById("timer").innerHTML = days + "d " + hours + "h "
    + minutes + "m " + seconds + "s ";
  
    // If the count down is finished, write some text
    if (timeLeft < 0) {
      clearInterval(x);
      document.getElementById("timer").innerHTML = "EXPIRED";
    }
  }, 1000);
}

function task_timer(){

    clearInterval(timerID);
    timerID = null;
    
    document.getElementById("task-time-rem").innerHTML = "";
    let timer_value = document.getElementById("timer_value");

    // var selectedText = timer_value.options[timer_value.selectedIndex].innerHTML;
    // var selectedValue = timer_value.value;
    // alert("Selected Text: " + selectedText + " Value: " + selectedValue);

    let timer_end=parseInt(timer_value.value);
    const end_time =  new Date().getTime() + timer_end* 60 * 1000;
    console.log("out" + end_time)

    if(!timerID){
        timerID = setInterval(function() {

        let now = new Date().getTime();
        let timeLeft = end_time - now;
    
        let hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    
    document.getElementById("task-time-rem").innerHTML = hours + "h "
        + minutes + "m " + seconds + "s ";
    }, 1000);}
}

function stop_timer(){
    clearInterval(timerID);
    timerID = null;
}

todoList = document.querySelector('.todo-list');
tasks = [];

function addTask(event){
    
    // let ch = document.getElementById("todo-input").value;
    // document.getElementById("test").innerHTML = ch;
    
    //event.preventDefault();
    var radios = document.getElementsByName("taskPriority");
    var selectedPriority = Array.from(radios).find(radio => radio.checked);

    let task = {
        dateTime: Date.now(),
        taskName: document.getElementById('todo-input').value,
        priority: selectedPriority.value,
        splits: document.getElementById('numOfPartsID').value,
    }
    tasks.push(task);

    document.querySelector('form').reset();

    document.getElementById('test').innerHTML = JSON.stringify(tasks, null, 2);;

    // console.log(tasks);


    // const todoDiv = document.createElement("div");
    // todoDiv.classList.add("todo")

    // const newTodo = document.createElement('li');
    // newTodo.innerText = document.getElementById("todo-input").value;
    // newTodo.classList.add('todo-item')
    // todoDiv.appendChild(newTodo);

    // todoList.appendChild(todoDiv);
    // document.getElementById("todo-input").value = "";
    

}

function toggleBackground() 
{   
    let elem = document.getElementById("backgroundToggle");
    var body = document.body;
    let card = document.getElementsByClassName("card")[0];
    let card1 = document.getElementsByClassName("card")[1];

    if (elem.innerHTML== "Day Mode") {
        elem.innerHTML = "Night Mode";
        body.style.backgroundImage = "linear-gradient(120deg,#8e83be, #b36fb3)"; 
        card.style.backgroundColor = "white";
        card.style.color="black";   
    }
    else {
        elem.innerHTML = "Day Mode";
        body.style.backgroundImage = "linear-gradient(120deg, #0d0d0e, #0d0d0e)";
        card.style.backgroundColor = "#596e8d";
        card.style.color="white";
    }
    
}

//The SVG Container

// const DUMMY = [
//     {id:'d1', region:'USA'},
//     {id:'d2', region:'iNDIA'}
// ]
// d3.select("svg").selectAll('p').data(DUMMY).enter().append('p').text(dta=>dta.region).style('color', 'red'),font;
// d3.select('svg').style("stroke-width", 8)

// var s = d3.select('svg').text();
// console.log(s)

function increment(){
    document.getElementById('numOfPartsID').stepUp();
}

function decrement(){
    document.getElementById('numOfPartsID').stepDown();
}



//alternative code - learning

//Radio

// document.getElementById('submit').onclick = function() {
//     var selected = document.querySelector('input[type=radio][name=contact]:checked');
//     alert(selected.value);
// }
