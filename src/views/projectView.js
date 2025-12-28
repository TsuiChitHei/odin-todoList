export const projectView = function (project, controller) {
  const body = document.querySelector("body");
  const allDiv = document.createElement("div");
  allDiv.classList.add("all");
  const projectDiv = document.createElement("div");
  projectDiv.classList.add("all-project");

  const headerDiv = document.createElement("div");
  headerDiv.classList.add("all-project-header");

  const projectName = document.createElement("h1");
  projectName.classList.add("all-project-name");
  projectName.textContent = project.data.name;
  headerDiv.appendChild(projectName);

  const addTaskButton = document.createElement("button");
  addTaskButton.classList.add("all-project-add-task-button");
  addTaskButton.textContent = "Add Task";
  headerDiv.appendChild(addTaskButton);

  projectDiv.appendChild(headerDiv);

  const table = document.createElement("table");
  table.classList.add("all-task-table");
  const headerRow = document.createElement("tr");
  headerRow.classList.add("all-task-table-row");
  headerRow.innerHTML = `
  <th class="all-task-table-header">Name</th>
  <th class="all-task-table-header">Due Date</th>
  <th class="all-task-table-header">Priority</th>
  `;
  table.appendChild(headerRow);
  for (const item of project.data.toDoItems) {
    const row = document.createElement("tr");
    row.classList.add("all-task-table-row");
    row.innerHTML = `
      <td class="all-task-table-data">${item.data.title}</td>
      <td class="all-task-table-data">${item.data.dueDate}</td>
      <td class="all-task-table-data">${item.data.priority}</td>
    `;
    row.addEventListener("click", () => {
      editTaskTitle.value = item.data.title;
      editTaskDueDate.value = item.data.dueDate;
      editTaskPriority.value = item.data.priority;
      editTaskDescription.value = item.data.description;
      editTaskDialog.showModal();

      editTaskForm.dataset.taskId = item.data.id;
    });
    table.appendChild(row);
  }
  projectDiv.appendChild(table);
  allDiv.appendChild(projectDiv);
  body.appendChild(allDiv);

  const addTaskDialog = document.createElement("dialog");

  addTaskDialog.setAttribute("data-modal", "");
  addTaskDialog.classList.add("add-task-dialog");
  const addTaskForm = document.createElement("form");
  addTaskForm.classList.add("add-task-form");

  const addTaskFormTitleDiv = document.createElement("div");
  addTaskFormTitleDiv.classList.add("add-task-form-title");
  const addTaskFormTitle = document.createElement("h3");
  addTaskFormTitle.textContent = "Add Task";
  addTaskFormTitleDiv.appendChild(addTaskFormTitle);
  addTaskForm.appendChild(addTaskFormTitleDiv);

  const taskTitleDiv = document.createElement("div");
  taskTitleDiv.classList.add("add-task-form-input");
  const taskTitleLabel = document.createElement("label");
  taskTitleLabel.setAttribute("for", "task-title");
  taskTitleLabel.textContent = "Task Name";
  taskTitleDiv.appendChild(taskTitleLabel);
  const taskTitle = document.createElement("input");
  taskTitle.setAttribute("type", "text");
  taskTitle.setAttribute("id", "task-title");
  taskTitle.setAttribute("required", "");
  taskTitleDiv.appendChild(taskTitle);
  addTaskForm.appendChild(taskTitleDiv);

  const taskDueDateDiv = document.createElement("div");
  taskDueDateDiv.classList.add("add-task-form-input");
  const taskDueDateLabel = document.createElement("label");
  taskDueDateLabel.setAttribute("for", "task-due-date");
  taskDueDateLabel.textContent = "Due Date";
  taskDueDateDiv.appendChild(taskDueDateLabel);
  const taskDueDate = document.createElement("input");
  taskDueDate.setAttribute("type", "text");
  taskDueDate.setAttribute("id", "task-due-date");
  taskDueDate.setAttribute("required", "");
  taskDueDateDiv.appendChild(taskDueDate);
  addTaskForm.appendChild(taskDueDateDiv);

  const taskPriorityDiv = document.createElement("div");
  taskPriorityDiv.classList.add("add-task-form-input");
  const taskPriorityLabel = document.createElement("label");
  taskPriorityLabel.setAttribute("for", "task-priority");
  taskPriorityLabel.textContent = "Priority";
  taskPriorityDiv.appendChild(taskPriorityLabel);
  const taskPriority = document.createElement("input");
  taskPriority.setAttribute("type", "text");
  taskPriority.setAttribute("id", "task-priority");
  taskPriority.setAttribute("required", "");
  taskPriorityDiv.appendChild(taskPriority);
  addTaskForm.appendChild(taskPriorityDiv);

  const taskDescriptionDiv = document.createElement("div");
  taskDescriptionDiv.classList.add("add-task-form-input");
  const taskDescriptionLabel = document.createElement("label");
  taskDescriptionLabel.setAttribute("for", "task-description");
  taskDescriptionLabel.textContent = "Description";
  taskDescriptionDiv.appendChild(taskDescriptionLabel);
  const taskDescription = document.createElement("textarea");
  taskDescription.setAttribute("id", "task-description");
  taskDescription.setAttribute("required", "");
  taskDescriptionDiv.appendChild(taskDescription);
  addTaskForm.appendChild(taskDescriptionDiv);

  const addTaskFormButtonsDiv = document.createElement("div");
  addTaskFormButtonsDiv.classList.add("add-task-form-buttons");
  const addTaskFormCancelButton = document.createElement("button");
  addTaskFormCancelButton.setAttribute("type", "button");
  addTaskFormCancelButton.textContent = "Cancel";
  addTaskFormCancelButton.addEventListener("click", () => {
    addTaskDialog.close();
  });
  addTaskFormButtonsDiv.appendChild(addTaskFormCancelButton);
  const addTaskFormSubmitButton = document.createElement("button");
  addTaskFormSubmitButton.setAttribute("type", "submit");
  addTaskFormSubmitButton.setAttribute("value", "Submit");
  addTaskFormSubmitButton.textContent = "Submit";
  addTaskFormButtonsDiv.appendChild(addTaskFormSubmitButton);
  addTaskForm.appendChild(addTaskFormButtonsDiv);
  addTaskDialog.appendChild(addTaskForm);
  body.appendChild(addTaskDialog);

  addTaskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const taskObj = {
      title: taskTitle.value,
      dueDate: taskDueDate.value,
      priority: taskPriority.value,
      description: taskDescription.value,
    };
    controller.createTask(project.data.id, taskObj);
  });

  addTaskButton.addEventListener("click", () => {
    addTaskDialog.showModal();
  });

  const editTaskDialog = document.createElement("dialog");
  editTaskDialog.setAttribute("data-modal", "");
  editTaskDialog.classList.add("add-task-dialog");
  const editTaskForm = document.createElement("form");
  editTaskForm.classList.add("add-task-form");

  const editTaskTitleDiv = document.createElement("div");
  editTaskTitleDiv.classList.add("add-task-form-input");
  const editTaskTitleLabel = document.createElement("label");
  editTaskTitleLabel.setAttribute("for", "task-title");
  editTaskTitleLabel.textContent = "Task Name";
  editTaskTitleDiv.appendChild(editTaskTitleLabel);
  const editTaskTitle = document.createElement("input");
  editTaskTitle.setAttribute("type", "text");
  editTaskTitle.setAttribute("id", "task-title");
  editTaskTitle.setAttribute("required", "");
  editTaskTitleDiv.appendChild(editTaskTitle);
  editTaskForm.appendChild(editTaskTitleDiv);

  const editTaskDueDateDiv = document.createElement("div");
  editTaskDueDateDiv.classList.add("add-task-form-input");
  const editTaskDueDateLabel = document.createElement("label");
  editTaskDueDateLabel.setAttribute("for", "task-due-date");
  editTaskDueDateLabel.textContent = "Due Date";
  editTaskDueDateDiv.appendChild(editTaskDueDateLabel);
  const editTaskDueDate = document.createElement("input");
  editTaskDueDate.setAttribute("type", "text");
  editTaskDueDate.setAttribute("id", "task-due-date");
  editTaskDueDate.setAttribute("required", "");
  editTaskDueDateDiv.appendChild(editTaskDueDate);
  editTaskForm.appendChild(editTaskDueDateDiv);

  const editTaskPriorityDiv = document.createElement("div");
  editTaskPriorityDiv.classList.add("add-task-form-input");
  const editTaskPriorityLabel = document.createElement("label");
  editTaskPriorityLabel.setAttribute("for", "task-priority");
  editTaskPriorityLabel.textContent = "Priority";
  editTaskPriorityDiv.appendChild(editTaskPriorityLabel);
  const editTaskPriority = document.createElement("input");
  editTaskPriority.setAttribute("type", "text");
  editTaskPriority.setAttribute("id", "task-priority");
  editTaskPriority.setAttribute("required", "");
  editTaskPriorityDiv.appendChild(editTaskPriority);
  editTaskForm.appendChild(editTaskPriorityDiv);

  const editTaskDescriptionDiv = document.createElement("div");
  editTaskDescriptionDiv.classList.add("add-task-form-input");
  const editTaskDescriptionLabel = document.createElement("label");
  editTaskDescriptionLabel.setAttribute("for", "task-description");
  editTaskDescriptionLabel.textContent = "Description";
  editTaskDescriptionDiv.appendChild(editTaskDescriptionLabel);
  const editTaskDescription = document.createElement("textarea");
  editTaskDescription.setAttribute("id", "task-description");
  editTaskDescription.setAttribute("required", "");
  editTaskDescriptionDiv.appendChild(editTaskDescription);
  editTaskForm.appendChild(editTaskDescriptionDiv);

  const editTaskFormButtonsDiv = document.createElement("div");
  editTaskFormButtonsDiv.classList.add("add-task-form-buttons");
  const editTaskFormCancelButton = document.createElement("button");
  addTaskFormCancelButton.setAttribute("type", "button");
  editTaskFormCancelButton.textContent = "Cancel";
  editTaskFormCancelButton.addEventListener("click", () => {
    editTaskDialog.close();
  });

  editTaskFormButtonsDiv.appendChild(editTaskFormCancelButton);
  const editTaskFormSubmitButton = document.createElement("button");
  editTaskFormSubmitButton.setAttribute("type", "submit");
  editTaskFormSubmitButton.setAttribute("value", "Submit");
  editTaskFormSubmitButton.textContent = "Submit";
  editTaskFormButtonsDiv.appendChild(editTaskFormSubmitButton);
  editTaskForm.appendChild(editTaskFormButtonsDiv);
  editTaskDialog.appendChild(editTaskForm);
  body.appendChild(editTaskDialog);

  editTaskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const editTaskObj = {
      title: editTaskTitle.value,
      dueDate: editTaskDueDate.value,
      priority: editTaskPriority.value,
      description: editTaskDescription.value,
    };
    controller.editTask(
      project.data.id,
      editTaskForm.dataset.taskId,
      editTaskObj
    );
  });
};
