import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

var tasksToday = [];
var tasksWork = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("today.ejs", {
    tasksToday: tasksToday,
  });
});

app.post("/", (req, res) => {
  tasksToday.push(req.body.todoInput)
  
  // DELETING EACH TASK ON TRASH BTN CLICK
  if(req.body.delete){
    const index = tasksToday.indexOf(req.body.delete); 
    if (index > -1) { // only splice array when item is found
      tasksToday.splice(index, 1);
      for(var i = 0; i<tasksToday.length; i++){
        if (tasksToday[i] === undefined){
          tasksToday.splice(i, 1);
        }
      }
    }
  }
  res.redirect("/");
});


app.get("/remove", (req, res) => {
  res.render("today.ejs");
});

app.post("/remove", (req, res) => {
  tasksToday = [];
  res.redirect("/");
});


app.get("/work", (req, res) => {
  res.render("work.ejs", {
    tasksWork: tasksWork,
  });
});

app.post("/work", (req, res) => {
  tasksWork.push(req.body.todoInput)
  
  // DELETING EACH TASK ON TRASH BTN CLICK
  if(req.body.delete){
    const index = tasksWork.indexOf(req.body.delete); 
    if (index > -1) { // only splice array when item is found
      tasksWork.splice(index, 1);
      for(var i = 0; i<tasksWork.length; i++){
        if (tasksWork[i] === undefined){
          tasksWork.splice(i, 1);
        }
      }
    }
  }
  res.redirect("/work");
});

app.get("/removeWork", (req, res) => {
  res.render("work.ejs");
});

app.post("/removeWork", (req, res) => {
  tasksWork = [];
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
