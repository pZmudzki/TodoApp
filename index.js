// import express from "express";
const express = require("express");
// import bodyParser from "body-parser";
const bodyParser = require("body-parser");
// import mongoose from "mongoose";
const mongoose = require("mongoose");
const ItemWork = require("./itemSchema.js");
const ItemToday = require("./itemSchema.js");
// import * as Item from "./itemSchema.js";

const app = express();
const port = 3000;

var tasksWork = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/todoListDB");

app.get("/", async (req, res) => {
  try {
    const findTasksToday = await ItemToday.find({}, { content: 1 });
    // console.log(findTasksToday);
    res.render("today.ejs", {
      tasksToday: findTasksToday,
    });
  } catch (e) {
    console.log(e.message);
  }
});

app.post("/", async (req, res) => {
  try {
    const itemContent = req.body.todoInput;
    const itemToday = await ItemToday.create({
      content: `${itemContent}`,
    });

    // DELETING EACH TASK ON TRASH BTN CLICK
    if (req.body.delete) {
      const id = req.body.delete;
      console.log(req.body.delete);
      // const item = await ItemToday.find({ _id: id });
      // console.log(item);
      await ItemToday.deleteOne({ _id: id });

      // if (index > -1) {
      //   // only splice array when item is found
      //   tasksToday.splice(index, 1);
      //   for (var i = 0; i < tasksToday.length; i++) {
      //     if (tasksToday[i] === undefined) {
      //       tasksToday.splice(i, 1);
      //     }
      //   }
      // }
    }

    res.redirect("/");
  } catch (e) {
    console.log(e.message);
  }
});

app.get("/remove", (req, res) => {
  res.render("today.ejs");
});

app.post("/remove", (req, res) => {
  tasksToday = [];
  res.redirect("/");
});

//  WORK SECTION

app.get("/work", (req, res) => {
  console.log(tasksWork);
  res.render("work.ejs", {
    tasksWork: tasksWork,
  });
});

app.post("/work", (req, res) => {
  tasksWork.push(req.body.todoInput);

  // DELETING EACH TASK ON TRASH BTN CLICK
  if (req.body.delete) {
    const index = tasksWork.indexOf(req.body.delete);
    if (index > -1) {
      // only splice array when item is found
      tasksWork.splice(index, 1);
      for (var i = 0; i < tasksWork.length; i++) {
        if (tasksWork[i] === undefined) {
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
  res.redirect("/work");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
