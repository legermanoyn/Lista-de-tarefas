const form = document.querySelector("#taskForm");

const input = document.querySelector("#taskInput");

const list = document.querySelector("#taskList");

const emptyMessage = document.querySelector("#emptyMessage");

const taskCount = document.querySelector("#taskCount");

const doneCount = document.querySelector("#doneCount");

let tasks = [];

function updateSummary() {

    const completed = tasks.filter(
        task => task.done
    ).length;

    taskCount.textContent =
        `${tasks.length} ${tasks.length === 1 ? "tarefa" : "tarefas"}`;

    doneCount.textContent =
        `${completed} concluída${completed === 1 ? "" : "s"}`;

    emptyMessage.hidden = tasks.length > 0;
}

function renderTasks() {

    list.innerHTML = "";

    tasks.forEach(task => {

        const item = document.createElement("li");

        if (task.done) {
            item.classList.add("completed");
        }

        const check = document.createElement("button");

        check.className = "check";

        check.type = "button";

        check.textContent = task.done ? "✓" : "";

        check.addEventListener("click", () => {

            task.done = !task.done;

            renderTasks();

        });

        const text = document.createElement("span");

        text.className = "task-text";

        text.textContent = task.text;

        const remove = document.createElement("button");

        remove.className = "delete";

        remove.type = "button";

        remove.textContent = "×";

        remove.addEventListener("click", () => {

            tasks = tasks.filter(
                current => current.id !== task.id
            );

            renderTasks();

        });

        item.append(check, text, remove);

        list.append(item);

    });

    updateSummary();
}

form.addEventListener("submit", event => {

    event.preventDefault();

    const text = input.value.trim();

    if (!text) return;

    tasks.push({
        id: Date.now(),
        text: text,
        done: false
    });

    input.value = "";

    renderTasks();

    input.focus();

});

renderTasks();
