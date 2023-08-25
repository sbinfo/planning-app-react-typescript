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

    const [tasks1, setTasks] = useState<Array<TaskType>>([
        { id: v1(), title: 'Html5 & CSS3', isDone: true },
        { id: v1(), title: 'Javascript', isDone: true },
        { id: v1(), title: 'React', isDone: false },
        { id: v1(), title: 'Node.js', isDone: false },
    ])

    const [todoList, setTodoList] = useState([
        { id: v1(), title: 'What to learn?', filter: Filters.active },
        { id: v1(), title: 'List for read', filter: Filters.completed },
    ])

    function addNewTask(value: string) {
        const newValue = {
            id: v1(),
            title: value,
            isDone: false
        }
        setTasks([newValue, ...tasks1])
    }

    function changeTodoStatus(id: string, isDone: boolean) {
        let task = tasks1.find(t => t.id === id)

        if (task) {
            task.isDone = isDone
        }

        setTasks([...tasks1])
    }

    function deleteTodo(id: string) {
        setTasks(tasks1.filter(task => task.id !== id))
    }

    function changeFilter(id: string, filter: Filters) {
        let todo = todoList.find(item => item.id === id)
        if (todo) {
            todo.filter = filter
            setTodoList([...todoList])
        }       
    }

    return (
        <div className="App">
            {
                todoList.map((todo) => {

                    let filteredTasks = tasks1
                    if (todo.filter === Filters.active) {
                        filteredTasks = tasks1.filter(task => !task.isDone)
                    } else if (todo.filter === Filters.completed) {
                        filteredTasks = tasks1.filter(task => task.isDone)
                    }

                    return (
                        <TodoList
                            key={todo.id}
                            id={todo.id}
                            title={todo.title}
                            tasks={filteredTasks}
                            filter={todo.filter}
                            deleteTodo={deleteTodo}
                            changeFilter={changeFilter}
                            addNewTask={addNewTask}
                            changeTodoStatus={changeTodoStatus}
                        />
                    )
                })
            }
        </div>
    );
}


export default App;
