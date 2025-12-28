import { Controller } from "../controller/controller";

export const all = function (projects, controller) {
  const body = document.querySelector("body");
  const allDiv = document.createElement("div");
  allDiv.classList.add("all");

  for (const project of projects) {
    const projectDiv = document.createElement("div");
    projectDiv.classList.add("all-project");
    const projectName = document.createElement("h1");
    projectName.classList.add("all-project-name");
    projectName.textContent = project.data.name;
    projectDiv.appendChild(projectName);
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
      table.appendChild(row);
    }
    projectDiv.appendChild(table);
    allDiv.appendChild(projectDiv);
  }
  body.appendChild(allDiv);

  const dialog = document.createElement("dialog");
  dialog.setAttribute("data-modal", "");

  const form = document.createElement("form");
  form.classList.add("add-project-form");

  const projectNameDiv = document.createElement("div");
  const projectNameHeader = document.createElement("h3");
  projectNameHeader.textContent = "Add Project";
  projectNameDiv.appendChild(projectNameHeader);
  form.appendChild(projectNameDiv);

  const addProjectInputDiv = document.createElement("div");

  const projectNameLabel = document.createElement("label");
  projectNameLabel.textContent = "Project Name:";
  projectNameLabel.setAttribute("for", "title");
  projectNameDiv.appendChild(projectNameLabel);

  const projectNameInput = document.createElement("input");
  projectNameInput.setAttribute("type", "text");
  projectNameInput.setAttribute("id", "project-name");
  projectNameInput.setAttribute("required", "");
  projectNameDiv.appendChild(projectNameInput);

  form.appendChild(projectNameDiv);

  const addProjectButtonsDiv = document.createElement("div");
  addProjectButtonsDiv.classList.add("add-project-buttons");

  const addProjectBCancel = document.createElement("button");
  addProjectBCancel.setAttribute("data-close-modal", "");
  addProjectBCancel.textContent = "Cancel";
  addProjectButtonsDiv.appendChild(addProjectBCancel);
  addProjectBCancel.addEventListener("click", (event) => {
    event.preventDefault();
    dialog.close();
  });

  const addProjectBSubmit = document.createElement("button");
  addProjectBSubmit.setAttribute("type", "submit");
  addProjectBSubmit.setAttribute("value", "Submit");
  addProjectBSubmit.textContent = "Submit";
  addProjectButtonsDiv.appendChild(addProjectBSubmit);

  form.appendChild(addProjectButtonsDiv);

  form.addEventListener("submit", function (event) {
    if (event.submitter.textContent === "Submit") {
      event.preventDefault();
      const name = projectNameInput.value;
      controller.createProjectFromAll({ name: name });
      dialog.close();
    }
  });

  dialog.appendChild(form);

  const addProjectButton = document.createElement("button");
  addProjectButton.classList.add("add-project");
  addProjectButton.textContent = "+";

  addProjectButton.addEventListener("click", () => {
    dialog.showModal();
  });

  body.appendChild(dialog);
  body.appendChild(addProjectButton);
};
