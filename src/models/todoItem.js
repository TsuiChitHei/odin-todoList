import { v4 as uuidv4 } from "uuid";

export class toDoItem {
  #title;
  #description;
  #dueDate;
  #priority;
  #projectId;
  #id;
  constructor(createTodoItem) {
    this.#title = createTodoItem.title;
    this.#description = createTodoItem.description;
    this.#dueDate = createTodoItem.dueDate;
    this.#priority = createTodoItem.priority;
    this.#projectId = createTodoItem.projectId;
    this.#id = uuidv4();
  }

  get data() {
    return {
      title: this.#title,
      description: this.#description,
      dueDate: this.#dueDate,
      priority: this.#priority,
      id: this.#id,
      projectId: this.#projectId,
    };
  }

  set data(setTodoItem) {
    this.#title = setTodoItem.title;
    this.#description = setTodoItem.description;
    this.#dueDate = setTodoItem.dueDate;
    this.#priority = setTodoItem.priority;
    this.#projectId = setTodoItem.projectId;
  }
}
