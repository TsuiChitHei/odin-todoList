import { project } from "./models/project";
import { Controller } from "./controller/controller";
import "./styles.css";

// const myProject = new project({ name: "Test Project" });

// console.log(myProject.data);

// myProject.data = { name: "Changed Project Name" };
// console.log(myProject.data);

// // Create objects separately first
// const toDoItem1 = {
//   title: "Item 1",
//   description: "Item 1 Description",
//   dueDate: "2024-01-15",
//   priority: "high",
// };

// const toDoItem2 = {
//   title: "Item 2",
//   description: "Item 2 Description",
//   dueDate: "2024-01-16",
//   priority: "low",
// };

// myProject.createToDoItem(toDoItem1);
// myProject.createToDoItem(toDoItem2);
// console.log(myProject.data);

// let itemID = myProject.data.toDoItems[0].id;
// console.log(itemID);
// myProject.removeToDoItem(itemID);
// console.log(myProject.data);

// // Create a completely separate object for editing
// const editedItem2 = {
//   title: "Edited Item 2",
//   description: "Edited Item 2 Description",
//   dueDate: "2024-01-16",
//   priority: "low",
// };

// let editItemID = myProject.data.toDoItems[0].data.id;
// myProject.editToDoItem(editItemID, editedItem2);
// console.log(myProject.data);

const controller = new Controller();
// controller.switchView({ view: "project", project: controller.projects[0] });
controller.switchView({ view: "all" });
