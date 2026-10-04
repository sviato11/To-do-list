const taskForm = document.querySelector('form');
const taskInput = document.querySelector('#task-input');
const ulList = document.querySelector('ul');

taskForm.addEventListener('submit', function(event) {
  event.preventDefault();
  
  const taskText = taskInput.value;
  taskInput.value = '';
  
  // .trim() removes the extra spaces
  if (taskText.trim() === '') {
    return;
  }


  ulList.insertAdjacentHTML('beforeend', `
    <li class="task-card">
      <p class="task">${taskText}</p>
      <div class="actions">
        <button class="complete-task">Complete</button>
        <button class="delete-task">Delete</button>
      </div>
    </li>
  `);
});

