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

function addTask(){
    
    // let ch = document.getElementById("todo-input").value;
    // document.getElementById("test").innerHTML = ch;
    
    //event.preventDefault();
    var radios = document.getElementsByName("taskPriority");
    var selectedPriority = Array.from(radios).find(radio => radio.checked);

    let task = {
        id: Date.now(),
        taskName: document.getElementById('todo-input').value,
        priority: selectedPriority.value,
        splits: document.getElementById('numOfPartsID').value,
        completed:0
    }
    tasks.push(task);

    document.querySelector('form').reset();
    btnSubmit.disabled = true;

    document.getElementById('test').innerHTML = JSON.stringify(tasks, null, 2);

    addCircle(task);

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


function increment(){
    document.getElementById('numOfPartsID').stepUp();
}

function decrement(){
    document.getElementById('numOfPartsID').stepDown();
}

var btnSubmit = document.getElementById("btnSubmit");
function EnableDisable(taskName) {

    //Verify the TextBox value.
    if (taskName.value.trim() != "") {
        //Enable the TextBox when TextBox has value.
        btnSubmit.disabled = false;
    } else {
        //Disable the TextBox when TextBox is empty.
        btnSubmit.disabled = true;
    }
};

    
let width=500;
let height=500;

var svg = d3.select(".d3Div")
.append("svg")
.attr("width", width)
.attr("height", height)
//.attr("viewBox", "0 0 100 100");

var circleScale = d3.scaleLinear() .domain([1, 3]) .range([40, 20]);

colorOnCompleteNum = ['white','#ede777', '#f5ec4c','#edbb55','orange','#3ad622']


function addCircle(){

    var g = svg.selectAll("g")
                .data(tasks)
                .enter()
                .append("g")
                .attr("transform", function(d, i) {
                    return "translate(0,0)";
                })
                .on("click", circleCLick);

                g.append("circle")
                .attr("class", "circleClass")
                .attr("cx", function(d, i) {
                    
                      return (i+1)*100 ;
                })
                .attr("cy", function(d, i) {
                      return 100;
                })
                .attr("r", function(d) {
                      return circleScale(d.priority);
                })
                .style("fill", function(d) {
                    cur_split = d.splits;
                    return color(d.completed);
              })


                g.append("text")
                .attr("x", function(d, i) {
                        return (i+1)*100;
                })
                .attr("y", 100)
                .attr("stroke", "teal")
                .attr("font-size", "12px")
                .attr("font-family", "sans-serif")
                .text(function(d) {
                        return d.taskName;
                });


                g.append("text")
                .attr("class", "progressInfo")
                .attr("x", function(d, i) {
                        return (i+1)*100 - 5;
                })
                .attr("y", function(d, i) {
                    return 100 + circleScale(d.priority) + 15;
            })
                .attr("stroke", "teal")
                .attr("font-size", "12px")
                .attr("font-family", "sans-serif")
                .text(function(d) {
                        return d.completed + "/" + d.splits;
                });
}


function circleCLick(clickRelated,d,i){
    
    d.completed = d.completed+1;
    d3.select(this).select("circle")
      .style("fill", function(d) {
          color.domain([0, d.splits])
        return color(d.completed);
        })

    d3.select(this).select(".progressInfo").text(function(d) {
        return d.completed + "/" + d.splits;});
    
    if(d.completed == d.splits){
        d3.select(this).transition().duration(500).remove();
        console.log(d,i);
        // tasks.pop(i);
    }

    
}

var color = d3.scaleLinear()
  .range(["#ede777", "#3ad622"]);


//D3-----------

// d3.select("p").style("color","red");
// d3.select("#p2").style("color", "blue");
// d3.selectAll("p").style("color", "green");
// d3.select(".pClass").style("color","yellow");
// d3.select("#p2").text("Modified text through d3");
// d3.select('.d3Tutorial').append("p").text("added this DOM element using d3 append ");
// d3.select(".d3Tutorial").insert("p").text("Second paragraph.");
// d3.select("p").remove();
// d3.select("p").html("<span>This is new inner html.</span>");
// d3.select("p").attr("class","error");
// d3.select(".d3Tutorial").select("input").property("checked",true);

// var data = ["280","272","285"];
// // d3.select(".d3Tutorial").append('p').data(data).text(function(d,i){
// //     console.log("d" + d + " i" + i + "this "+ this);
// //     return d;
// // });
// d3.select(".d3Tutorial").append('p').data(data).text(data);
// //d3.select("tr").selectAll("td").style('background-color','yellow');

// d3.selectAll("p").style("color", function(d, i) {
//     var text = this.innerText;

//     if (text.indexOf("Error") >= 0) {
//         return "red";
//     } else if (text.indexOf("Warning") >= 0) {
//         return "yellow";
//     }
// });

// d3.select("#mouseOver").on("mouseover", function(){
//     d3.select(".pClass").style("background-color", "black");  //d3.select(this)
    
// }).on("mouseout", function(){
//     d3.select(".pClass").style("background-color", "green");
// })

// //Transition
// d3.select(".containerTransition").transition().duration(1000).style("background-color", "green").delay(1000);










//alternative code - learning

//Radio

// document.getElementById('submit').onclick = function() {
//     var selected = document.querySelector('input[type=radio][name=contact]:checked');
//     alert(selected.value);
// }
