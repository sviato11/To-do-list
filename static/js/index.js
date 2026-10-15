const taskForm = document.querySelector('form');
const taskInput = document.querySelector('#task-input');
const ulList = document.querySelector('ul');


let tasks = [];
const savedTasks = localStorage.getItem('tasks');

if (savedTasks) {
  tasks = JSON.parse(savedTasks);
}

// Reverse a copy of the array so newer tasks appear at the top on page load
tasks.slice().reverse().forEach(el => {
  let completedClass = '';
  if (el.completed === true) {
    completedClass = 'completed';
  }

  ulList.insertAdjacentHTML('afterbegin', `
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

  tasks.unshift(newTask);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  



  ulList.insertAdjacentHTML('afterbegin', `
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
  if (parentCard === null) {
    return;
  }

  const id = Number(parentCard.dataset.id);

  if (event.target.classList.contains('delete-task')) {
    //  filter logic
    tasks = tasks.filter(el => el.id !== id);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    parentCard.remove();
  };
  if (event.target.classList.contains('complete-task')) {
    const foundTask = tasks.find(el => el.id === id);

    if (foundTask) {
      foundTask.completed = !foundTask.completed;
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
    parentCard.classList.toggle('completed');
  }
});
