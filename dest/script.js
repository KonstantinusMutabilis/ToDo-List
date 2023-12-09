"use strict";
const searchInput = document.querySelector("#Search-Input");
const ClearButton = document.querySelector("#Clear");
const container = document.querySelector("#container");
const taskForm = document.querySelector("#task-form");
const taskTitle = document.querySelector("#Task-title");
const taskContext = document.querySelector("#Task-context");
const taskImportant = document.querySelector("#Task-importent");
const tasks = loadTasks();
tasks.forEach(addTaskListItem);
taskForm === null || taskForm === void 0 ? void 0 : taskForm.addEventListener("submit", e => {
    e.preventDefault();
    if ((taskTitle === null || taskTitle === void 0 ? void 0 : taskTitle.value) == "" || (taskTitle === null || taskTitle === void 0 ? void 0 : taskTitle.value) == null || (taskContext === null || taskContext === void 0 ? void 0 : taskContext.value) == "" || (taskContext === null || taskContext === void 0 ? void 0 : taskContext.value) == null)
        return;
    const newTask = {
        title: taskTitle.value,
        context: taskContext.value,
        importend: taskImportant.checked,
        complited: false,
        creationDate: new Date()
    };
    tasks.push(newTask);
    addTaskListItem(newTask);
    saveTasks();
    taskTitle.value = "";
    taskContext.value = "";
    taskImportant.checked = false;
});
function addTaskListItem(task) {
    const EditForm = document.querySelector("#Edit-Form");
    const EditTitle = document.querySelector("#Task-title-edit");
    const EditContext = document.querySelector("#task-context-edit");
    const EditImportent = document.querySelector("#importent-edit");
    EditImportent.checked = task.importend;
    const card = document.createElement("div");
    card.classList.add('card', 'taskcard', 'text-start', 'w-50', 'mb-4');
    const cardHeader = document.createElement("div");
    cardHeader.classList.add('card-header');
    card.appendChild(cardHeader);
    function ifTaskImportent(task) {
        switch (task.importend) {
            case true: {
                cardHeader.classList.add('bg-warning-subtle');
                break;
            }
            case false: {
                cardHeader.classList.remove('bg-warning-subtle');
                break;
            }
        }
    }
    const h = document.createElement("h5");
    h.classList.add('card-title', 'text-start');
    h.textContent += task.title;
    cardHeader.appendChild(h);
    const p = document.createElement("p");
    p.classList.add('card-text', 'text-start');
    p.textContent += task.context;
    cardHeader.appendChild(p);
    const cardBody = document.createElement("div");
    cardBody.classList.add('card-body', 'd-flex', 'justify-content-between', 'align-items-center', 'pt-0', 'pb-0');
    card.appendChild(cardBody);
    const formCheck = document.createElement("div");
    formCheck.classList.add('form-check');
    cardBody.appendChild(formCheck);
    const checkbox = document.createElement("input");
    checkbox.classList.add('form-check-input');
    checkbox.type = "checkbox";
    checkbox.checked = task.complited;
    checkbox.addEventListener("change", () => {
        task.complited = checkbox.checked;
        checkbox.id = "task-done";
        ifDoneCheck(checkbox);
        saveTasks();
    });
    function ifDoneCheck(checkbox) {
        switch (checkbox.checked) {
            case true: {
                h.classList.add('text-decoration-line-through');
                p.classList.add('text-decoration-line-through');
                console.log("trueeeeeeee");
                break;
            }
            case false: {
                h.classList.remove('text-decoration-line-through');
                p.classList.remove('text-decoration-line-through');
                console.log("false");
                break;
            }
        }
    }
    formCheck.appendChild(checkbox);
    const checkboxLabel = document.createElement("label");
    checkboxLabel.classList.add('form-check-label');
    checkboxLabel.textContent += "Done!";
    checkboxLabel.setAttribute("for", "flexCheck");
    formCheck.appendChild(checkboxLabel);
    const nav = document.createElement("nav");
    nav.classList.add('navbar', 'navbar-expand-lg');
    cardBody.appendChild(nav);
    const fluid = document.createElement("div");
    fluid.classList.add('container-fluid');
    fluid.id = "navbarNavDropdown";
    nav.appendChild(fluid);
    const collapse = document.createElement("div");
    collapse.classList.add('collapse', 'navbar-collapse');
    fluid.appendChild(collapse);
    const navbar = document.createElement("ul");
    navbar.classList.add('navbar-nav');
    collapse.appendChild(navbar);
    const Dropdown = document.createElement("li");
    Dropdown.classList.add('nav-item', 'dropdown');
    navbar.appendChild(Dropdown);
    const DropdownBtn = document.createElement("button");
    DropdownBtn.classList.add('btn');
    DropdownBtn.type = "button";
    DropdownBtn.setAttribute('data-bs-toggle', 'dropdown');
    DropdownBtn.setAttribute('aria-expanded', 'false');
    Dropdown.appendChild(DropdownBtn);
    const DropdownSpan = document.createElement("span");
    DropdownSpan.classList.add('navbar-toggler-icon');
    DropdownBtn.appendChild(DropdownSpan);
    const DropdownMenu = document.createElement("ul");
    DropdownMenu.classList.add('dropdown-menu', 'dropdown-menu-end');
    DropdownMenu.setAttribute('aria-labelledby', 'navbarDropdownMenuLink');
    Dropdown.appendChild(DropdownMenu);
    const menuList1 = document.createElement("li");
    const menuList2 = document.createElement("li");
    const item1 = document.createElement("a");
    item1.classList.add('dropdown-item');
    item1.setAttribute('href', '#');
    item1.setAttribute('data-bs-toggle', 'modal');
    item1.setAttribute('data-bs-target', '#task-edit');
    item1.textContent += "Edit";
    menuList1.appendChild(item1);
    const item2 = document.createElement("a");
    item2.classList.add('dropdown-item');
    item2.setAttribute('href', '#');
    item2.textContent += "Delete";
    menuList2.appendChild(item2);
    item2.addEventListener("click", () => {
        card.remove();
        let i = tasks.indexOf(task);
        tasks.splice(i, 1);
        saveTasks();
    });
    item1.addEventListener("click", () => {
        let i = tasks.indexOf(task);
        EditForm.addEventListener("submit", (el) => {
            el.preventDefault();
            if (EditTitle.value == null || EditTitle.value == "") {
                EditTitle.value = tasks[i].title;
            }
            else {
                tasks[i].title = EditTitle.value;
            }
            if (EditContext.value == null || EditContext.value == "") {
                EditContext.value = tasks[i].context;
            }
            else {
                tasks[i].context = EditContext.value;
            }
            tasks[i].importend = EditImportent.checked;
            saveTasks();
            ifTaskImportent(task);
            EditTitle.value = "";
            EditContext.value = "";
            location.reload();
        });
    });
    DropdownMenu.appendChild(menuList1);
    DropdownMenu.appendChild(menuList2);
    container === null || container === void 0 ? void 0 : container.appendChild(card);
    ifTaskImportent(task);
    ifDoneCheck(checkbox);
}
searchInput.addEventListener('input', elem => {
    const value = elem.target.value;
    const taskcards = document.querySelectorAll(".taskcard");
    Array.from(taskcards).forEach(taskcard => {
        const isVisible = taskcard.querySelector(".card-title").innerHTML.includes(value) || taskcard.querySelector(".card-text").innerHTML.includes(value);
        taskcard.classList.toggle("invisible", !isVisible);
    });
});
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function loadTasks() {
    const taskJSON = localStorage.getItem("tasks");
    if (!taskJSON)
        return [];
    return JSON.parse(taskJSON);
}
ClearButton.addEventListener("click", e => {
    e.preventDefault();
    localStorage.clear();
    location.reload();
});
