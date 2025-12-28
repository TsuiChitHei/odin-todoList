export const sidebar = function (projects, controller) {
  const body = document.querySelector("body");
  const sidebar = document.createElement("div");
  sidebar.classList.add("sidebar");
  const listAll = document.createElement("h3");
  listAll.classList.add("sidebar-text");
  listAll.textContent = "List All";

  listAll.addEventListener("click", () => {
    controller.switchView({ view: "all" });
  });

  sidebar.appendChild(listAll);
  for (const project of projects) {
    const projectName = document.createElement("h3");
    projectName.classList.add("sidebar-text");
    projectName.textContent = project.data.name;
    projectName.addEventListener("click", () => {
      controller.switchView({ view: "project", projectID: project.data.id });
    });
    sidebar.appendChild(projectName);
  }
  body.appendChild(sidebar);
};
