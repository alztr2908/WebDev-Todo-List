const inputTodo = document.querySelector('#input-todo')
const submitTodo = document.querySelector('#submit-todo')
const todoList = document.querySelector('.todo-list')
const filterTodo = document.querySelector('#filter-todo')

window.addEventListener('DOMContentLoaded', getTodos)

submitTodo.addEventListener('click', e => {
  e.preventDefault()

  let todoValue = inputTodo.value

  if(!todoValue) { return } 
  else {
    saveLocalTodos(todoValue)
    displayTodo(todoValue)
  }

  inputTodo.value = ''
})

todoList.addEventListener('click', (e) => {
  let target = e.target

  let parent = target.parentElement

  if (target.classList[0] === 'delete') {
    parent.remove()
    removeTodos(parent)
  } else if (target.classList[0] === 'complete') {
    parent.classList.toggle('been-checked')
    target.previousSibling.classList.toggle('strikethrough')
  }
})

filterTodo.addEventListener('click', (e) => {
  todoState = todoList.childNodes

  todoState.forEach(todo => {
    switch(e.target.value) {
      case 'All':
        todo.style.display = 'flex'
        break
      case 'Complete':
        if(todo.classList.contains('been-checked')) {
          todo.style.display = 'flex'
        } else {
          todo.style.display = 'none'
        }
        break
      case 'INC':
        if(!todo.classList.contains('been-checked')) {
          todo.style.display = 'flex'
        } else {
          todo.style.display = 'none'
        }
        break
    }
  })
  
})

function displayTodo(todo) {
  var li = document.createElement('li')
  li.classList.add('todo')
  
  todoTask = document.createElement('p')
  todoTask.classList.add('todoTask')
  todoTask.appendChild(document.createTextNode(todo))

  //complete button
  const completeButton = document.createElement('button')
  completeButton.innerHTML = '<i class="fas fa-check-square"></i>'
  completeButton.classList.add('complete')
  //delete button
  const deleteButton = document.createElement('button')
  deleteButton.innerHTML = '<i class="fas fa-trash"></i>'
  deleteButton.classList.add('delete')
  
  li.appendChild(todoTask)
  li.appendChild(completeButton)
  li.appendChild(deleteButton)
  
  todoList.appendChild(li)
}


function saveLocalTodos(todo) {
  let todos 

  if (localStorage.getItem('todos') === null) {
    todos = []
  } else {
    todos = JSON.parse(localStorage.getItem('todos'))
  }

  todos.push(todo)
  localStorage.setItem('todos',JSON.stringify(todos))
}

function getTodos() {
  let todos
  if (localStorage.getItem('todos') === null) {
    todos = []
  } else {
    todos = JSON.parse(localStorage.getItem('todos'))
  }
  
  todos.forEach(todo => {
    displayTodo(todo)
  })
}

function removeTodos(todo) {
  let todos
  if (localStorage.getItem('todos') === null) {
    todos = []
  } else {
    todos = JSON.parse(localStorage.getItem('todos'))
  }

  todoIndex = todo.firstChild.textContent

  console.log(todos.indexOf(todoIndex))

  todos.splice(todos.indexOf(todoIndex),1)
  localStorage.setItem('todos',JSON.stringify(todos))
}