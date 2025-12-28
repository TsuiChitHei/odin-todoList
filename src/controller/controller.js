import { project } from "../models/project";
import { all } from "../views/all";
import { sidebar } from "../views/sidebar";
import { projectView } from "../views/projectView";
import {
  saveToLocalStorage,
  getFromLocalStorage,
} from "../service/localStorage";

export class Controller {
  #projects = [];
  constructor() {
    const prjcts = getFromLocalStorage();
    this.#projects = [];
    if (prjcts) {
      for (const prj of prjcts) {
        const newProject = new project({ name: prj.name });
        for (const item of prj.toDoItems) {
          const itemData = {
            title: item.data.title,
            description: item.data.description,
            dueDate: item.data.dueDate,
            priority: item.data.priority,
            projectId: item.data.projectId,
          };
          newProject.createToDoItem(itemData);
        }
        this.#projects.push(newProject);
      }
    } else {
      const myProject = new project({ name: "Test Project" });
      const toDoItem1 = {
        title: "Item 1",
        description: "Item 1 Description",
        dueDate: "2024-01-15",
        priority: "high",
      };
      const toDoItem2 = {
        title: "Item 2",
        description: "Item 2 Description",
        dueDate: "2024-01-16",
        priority: "low",
      };
      myProject.createToDoItem(toDoItem1);
      myProject.createToDoItem(toDoItem2);
      const myProject2 = new project({ name: "Test Project 2" });
      const toDoItem3 = {
        title: "Item 3",
        description: "Item 3 Description",
        dueDate: "2024-01-17",
        priority: "mid",
      };
      myProject2.createToDoItem(toDoItem3);
      const toDoItem4 = {
        title: "Item 4",
        description: "Item 4 Description",
        dueDate: "2024-01-18",
        priority: "mid",
      };
      myProject2.createToDoItem(toDoItem4);
      this.#projects = [myProject, myProject2];
    }
  }

  createProject(projectObj) {
    if (projectObj.name === "") {
      projectObj.name = "Unnamed Project";
    }
    const newProject = new project(projectObj);
    this.#projects.push(newProject);
    saveToLocalStorage(this.projects);
  }

  get projects() {
    return this.#projects;
  }

  switchView(data) {
    this.clearContent();
    switch (data.view) {
      case "all":
        console.log(this.projects);
        sidebar(this.projects, this);
        all(this.projects, this);
        break;
      case "project":
        sidebar(this.projects, this);
        const projectID = data.projectID;
        const projectview = this.projects.find(
          (project) => project.data.id === projectID
        );
        projectView(projectview, this);
        break;
    }
  }

  createProjectFromAll(projectObj) {
    this.createProject(projectObj);
    this.switchView({ view: "all" });
  }

  clearContent() {
    const body = document.querySelector("body");
    body.innerHTML = "";
  }

  createTask(projectID, taskObj) {
    const project = this.projects.find(
      (project) => project.data.id === projectID
    );
    project.createToDoItem(taskObj);
    saveToLocalStorage(this.projects);
    this.switchView({ view: "project", projectID: projectID });
  }

  editTask(projectID, taskID, taskObj) {
    const project = this.projects.find(
      (project) => project.data.id === projectID
    );
    project.editToDoItem(taskID, taskObj);
    saveToLocalStorage(this.projects);
    this.switchView({ view: "project", projectID: projectID });
  }
}
