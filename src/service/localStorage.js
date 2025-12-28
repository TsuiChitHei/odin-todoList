export function saveToLocalStorage(projects) {
  let obj = [];
  for (const project of projects) {
    const itemList = project.data.toDoItems;
    let itemsObj = [];
    for (const item of itemList) {
      itemsObj.push({ ...item.data });
    }
    project.data.toDoItems = itemsObj;
    obj.push({ ...project.data });
  }
  localStorage.setItem("projects", JSON.stringify(obj));
}

export function getFromLocalStorage() {
  const projects = JSON.parse(localStorage.getItem("projects"));
  //   console.log(projects);
  return projects;
}
