const taskForm = document.querySelector('form');
const taskInput = document.querySelector('#task-input');
const ulList = document.querySelector('ul');


let tasks = [];
const savedTasks = localStorage.getItem('tasks');

if (savedTasks) {
  tasks = JSON.parse(savedTasks);
}

tasks.forEach(el => {
  let completedClass = '';
  if (el.completed === true) {
    completedClass = 'completed';
  }

  ulList.insertAdjacentHTML('beforeend', `
    <li class="task-card ${completedClass}" data-id="${el.id}">
      <p class="task">${el.text}</p>
      <div class="actions">
        <button class="complete-task">Complete</button>
        <button class="delete-task">Delete</button>
      </div>
    </li>
  `);
});



taskForm.addEventListener('submit', function(event) {
  event.preventDefault();
  
  const taskText = taskInput.value;
  taskInput.value = '';
  
  // .trim() removes the extra spaces
  if (taskText.trim() === '') {
    return;
  }

  const newTask = {
    id: Date.now(),
    text: taskText,
    completed: false,
  };

  tasks.push(newTask);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  



  ulList.insertAdjacentHTML('beforeend', `
    <li class="task-card" data-id="${newTask.id}">
      <p class="task">${taskText}</p>
      <div class="actions">
        <button class="complete-task">Complete</button>
        <button class="delete-task">Delete</button>
      </div>
    </li>
  `);
});


ulList.addEventListener('click', function(event) {
  const parentCard = event.target.closest('.task-card');
  const id = Number(parentCard.dataset.id);

  if (event.target.classList.contains('delete-task')) {
    const parentCard = event.target.closest('.task-card');
    //  filter logic
    tasks = tasks.filter(el => el.id !== id);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    parentCard.remove();
  };
  if (event.target.classList.contains('complete-task')) {
    const parentCard = event.target.closest('.task-card');
    const foundTask = tasks.find(el => el.id === id);

    if (foundTask) {
      foundTask.completed = !foundTask.completed;
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
    parentCard.classList.toggle('completed');
  }
});
