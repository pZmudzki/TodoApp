// import express from "express";
const express = require("express");
// import bodyParser from "body-parser";
const bodyParser = require("body-parser");
// import mongoose from "mongoose";
const mongoose = require("mongoose");

const Item = require("./itemSchema.js");
// import * as Item from "./itemSchema.js";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/todolistDB"
);

app.get("/", (req, res) => {
  try {
    res.redirect("/today");
  } catch (e) {
    console.log(e.message);
  }
});

app.get("/favicon.ico", (req, res) => {
  return "your faveicon";
});

app.get("/:view", async (req, res) => {
  // console.log(req.params);
  const view = req.params.view;
  try {
    const findTasks = await Item.find({ category: `${view}` }, { content: 1 });
    // console.log(findTasksToday);
    res.render(`${view}.ejs`, {
      tasks: findTasks,
    });
  } catch (e) {
    console.log(e.message);
  }
});

app.post("/:view", async (req, res) => {
  const view = req.params.view;
  try {
    const itemContent = req.body.todoInput;
    const item = await Item.create({
      content: `${itemContent}`,
      category: `${view}`,
    });

    res.redirect(`/${view}`);
  } catch (e) {
    console.log(e.message);
  }
});

app.post("/:view/deleteTask", async (req, res) => {
  try {
    // console.log(req.body.delete);
    const view = req.params.view;
    const removeItem = await Item.findByIdAndDelete(req.body.delete);
    res.redirect(`/${view}`);
  } catch (e) {
    console.log(e.message);
  }
});

app.post("/:view/clearAll", async (req, res) => {
  try {
    const view = req.params.view;
    const deleteItem = await Item.deleteMany({ category: `${view}` });
    res.redirect(`/${view}`);
  } catch (e) {
    console.log(e.message);
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
