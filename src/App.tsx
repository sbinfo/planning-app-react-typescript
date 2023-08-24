import React, { useState } from 'react';
import './App.css';
import TodoList, { TaskType } from './components/TodoList';
import { v1 } from 'uuid';

export enum Filters {
    all = 'all',
    active = 'active',
    completed = 'completed'
}

function App() {

    const [ tasks1, setTasks ] = useState<Array<TaskType>>([
        { id: v1(), title: 'Html5 & CSS3', isDone: true },
        { id: v1(), title: 'Javascript', isDone: true },
        { id: v1(), title: 'React', isDone: false },
        { id: v1(), title: 'Node.js', isDone: false },
    ])

    console.log(tasks1)

    const [ filter, setFilter ] = useState(Filters.all)

    function addNewTask (value: string) {
        const newValue = {
            id: v1(),
            title: value,
            isDone: false
        }
        setTasks([newValue, ...tasks1])
    }

    function deleteTodo (id: string) {
        setTasks(tasks1.filter(task => task.id !== id))
    }

    function changeFilter (filter: Filters) {
        setFilter(filter)
    }

    let filteredTasks = tasks1
    if (filter === Filters.active) {
        filteredTasks = tasks1.filter(task => !task.isDone)
    } else if (filter === Filters.completed) {
        filteredTasks = tasks1.filter(task => task.isDone)
    }

  return (
    <div className="App">
        <TodoList title="What to learn?"
                  tasks={ filteredTasks }
                  deleteTodo={ deleteTodo }
                  changeFilter={ changeFilter }
                  addNewTask={ addNewTask }
        />
    </div>
  );
}


export default App;
