const express = require("express")
const { v4: uuidv4 } = require("uuid");

let arrayOfTasks = [
  {
    id: '6844da85-ca19-4e36-9d94-67ba86543f64',
    title: "Work Goal",
    body: "Go to work everyday",
    status: false,  //task status is false when not completed, task status is true when it is completed 
  },
];

const server = express();

server.use(express.json())

server.get("/", function(req, res) { //gets all tasks
    console.log('this is get request')
    res.send(arrayOfTasks);
});

server.get("/tasks/:id", function (req, res) { //gets task by id
  console.log("this is get request for single id", req.params.id);
  let selectedTask = arrayOfTasks.find(task => task.id === req.params.id)
  if (selectedTask) {
     res.send(selectedTask);
  } else {
    res.status(400).send('Task not found: Input valid task ID')
  }
 
});

server.post("/addTask", function (req, res) { //creates task
  console.log("this is post request", req.body.title);
  const taskTitles = arrayOfTasks.map(task => task.title)
  console.log('list of titles', taskTitles)
  let taskAlreadyExists = taskTitles.includes(req.body.title);
  console.log("check", taskAlreadyExists);
  if (!taskAlreadyExists) {
    const newUuid = uuidv4();
    let task = { ...req.body, id: newUuid };
    arrayOfTasks.push(task);
    res.send("Task Added Successfully");
  } else {
    res.send("Task Already Exists")
  }
  
});

server.put("/editTask/:id", function (req, res) { //edits title and body of task
  console.log("this is put request", req.params.id);
  const taskTitles = arrayOfTasks.map((task) => task.title);
  console.log("list of titles", taskTitles);
  let taskAlreadyExists = taskTitles.includes(req.body.title);
  if(!taskAlreadyExists){
    let selectedTaskToUpdate = arrayOfTasks.findIndex(
      (task) => task.id === req.params.id
    );
    arrayOfTasks[selectedTaskToUpdate] = {
      ...arrayOfTasks[selectedTaskToUpdate],
      ...req.body,
    };
    res.send("Task Updated Successfully");
  } else {
    res.send("Task Already Exists")
  }
  
});

server.patch("/updateTaskStatus/:id", function (req, res) { //updates task from true to false or vice versa
  console.log("this is put request", req.params.id);
   let selectedTaskToUpdate = arrayOfTasks.findIndex(
      (task) => task.id === req.params.id
    );
    arrayOfTasks[selectedTaskToUpdate].status =
      !arrayOfTasks[selectedTaskToUpdate].status;
    res.send("Task Status Updated Successfully");
});


server.delete("/deleteTask/:id", function (req, res) { //deletes tasks
  console.log("this is get request", req.params.id);
  arrayOfTasks = arrayOfTasks.filter((task) => task.id !== req.params.id);
  res.send("Task Removed Successfully");
});

server.listen(3000, function(){
  console.log('Server is up')
});

