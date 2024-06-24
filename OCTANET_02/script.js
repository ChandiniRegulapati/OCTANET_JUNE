document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    const removeCompletedButton = document.getElementById('remove-completed');
    let isDragging = false;
    let selectedTasks = new Set();

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addTask(taskInput.value);
        taskInput.value = '';
    });

    function addTask(task) {
        const li = document.createElement('li');
        
        const span = document.createElement('span');
        span.textContent = task;

        const editButton = document.createElement('button');
        editButton.classList.add('edit');
        editButton.innerHTML = '<i class="fas fa-edit"></i>';
        editButton.addEventListener('click', () => {
            editTask(span, editButton);
        });

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.addEventListener('click', () => {
            deleteTask(li); // Call deleteTask function instead of directly removing from DOM
        });

        const completeButton = document.createElement('button');
        completeButton.classList.add('complete');
        completeButton.innerHTML = '<i class="fas fa-check"></i>';
        completeButton.addEventListener('click', () => {
            completeTask(li);
        });

        li.appendChild(span);
        li.appendChild(editButton);
        li.appendChild(deleteButton);
        li.appendChild(completeButton);
        taskList.appendChild(li);

        li.addEventListener('mousedown', (e) => {
            isDragging = true;
            selectTask(li);
        });

        document.addEventListener('mouseup', (e) => {
            isDragging = false;
        });

        li.addEventListener('mousemove', (e) => {
            if (isDragging) {
                selectTask(li);
            }
        });
    }

    function editTask(span, editButton) {
        if (editButton.innerHTML.includes('fa-edit')) {
            const input = document.createElement('input');
            input.type = 'text';
            input.value = span.textContent;
            span.textContent = '';
            span.appendChild(input);
            editButton.innerHTML = '<i class="fas fa-save"></i>';
        } else {
            const input = span.querySelector('input');
            span.textContent = input.value;
            editButton.innerHTML = '<i class="fas fa-edit"></i>';
        }
    }

    function selectTask(task) {
        if (task.classList.contains('selected')) {
            task.classList.remove('selected');
            selectedTasks.delete(task);
        } else {
            task.classList.add('selected');
            selectedTasks.add(task);
        }
    }

    function deleteTask(task) {
        taskList.removeChild(task);
        selectedTasks.delete(task);
        toggleRemoveCompletedButton();
    }

    function completeTask(task) {
        task.classList.toggle('completed');
        toggleRemoveCompletedButton();
    }

    function removeCompletedTasks() {
        const completedTasks = document.querySelectorAll('.completed');
        completedTasks.forEach(task => {
            taskList.removeChild(task);
        });
        toggleRemoveCompletedButton();
    }

    removeCompletedButton.addEventListener('click', () => {
        removeCompletedTasks();
    });

    function toggleRemoveCompletedButton() {
        const completedTasks = document.querySelectorAll('.completed');
        if (completedTasks.length > 0) {
            removeCompletedButton.style.display = 'block';
        } else {
            removeCompletedButton.style.display = 'none';
        }
    }
});
