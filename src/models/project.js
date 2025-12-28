import { v4 as uuidv4 } from "uuid";
import { toDoItem } from "./todoItem";

export class project {
  #toDoItems = [];
  #name;
  #id;
  constructor(createProject) {
    this.#name = createProject.name;
    this.#id = uuidv4();
  }

  createToDoItem(todoItem) {
    todoItem.projectId = this.#id;
    const newTodoItem = new toDoItem(todoItem);
    this.#toDoItems.push(newTodoItem);
  }

  removeToDoItem(itemID) {
    this.#toDoItems = this.#toDoItems.filter((item) => item.data.id !== itemID);
  }

  get data() {
    return {
      name: this.#name,
      id: this.#id,
      toDoItems: this.#toDoItems.map((item) => {
        const dto = item.data;
        return {
          ...dto,
          get data() {
            return dto;
          },
        };
      }),
      // toDoItems: this.#toDoItems,
    };
  }

  set data(setProject) {
    this.#name = setProject.name;
  }

  editToDoItem(itemID, editData) {
    let toDoItem = this.#toDoItems.filter((item) => item.data.id === itemID)[0];
    editData.projectId = this.#id;
    toDoItem.data = editData;
  }
}
