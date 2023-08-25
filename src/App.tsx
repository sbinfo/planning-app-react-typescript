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

    const idTodoList1 = v1()
    const idTodoList2 = v1()

    

    const [todoList, setTodoList] = useState([
        { id: idTodoList1, title: 'What to learn?', filter: Filters.active },
        { id: idTodoList2, title: 'List for read', filter: Filters.completed },
    ])

    const [tasks, setTasks] = useState({
        [idTodoList1]: [
            { id: v1(), title: 'Html5 & CSS3', isDone: true },
            { id: v1(), title: 'Javascript', isDone: true },
            { id: v1(), title: 'React', isDone: false },
            { id: v1(), title: 'Node.js', isDone: false },
        ],
        [idTodoList2]: [
            { id: v1(), title: 'The Great Gatsby', isDone: true },
            { id: v1(), title: 'Don Quixote', isDone: true },
            { id: v1(), title: 'One Hundred Years of Solitude', isDone: false },
            { id: v1(), title: 'Nineteen Eighty-Four', isDone: true },
            { id: v1(), title: 'To Kill a Mockingbird', isDone: false },
        ]
    })

    function addNewTask(todolistId: string, value: string) {
        let tempTasks = tasks[todolistId]

        const newValue = {
            id: v1(),
            title: value,
            isDone: false
        }

        tasks[todolistId] = [newValue, ...tempTasks]
        setTasks({ ...tasks })
    }

    function changeTodoStatus(todolistId: string, id: string, isDone: boolean) {
        let tempTasks = tasks[todolistId]
        const findedTask = tempTasks.find(t => t.id === id)

        if (findedTask) {
            findedTask.isDone = isDone
            tasks[todolistId] = [...tempTasks]
            setTasks({ ...tasks })
        }
    }

    function deleteTodo(todolistId: string, id: string) {
        let tempTasks = tasks[todolistId]

        let changedTasks = tempTasks.filter(item => item.id !== id)

        tasks[todolistId] = changedTasks

        setTasks({...tasks})
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

                    let filteredTasks = tasks[todo.id]

                    if (todo.filter === Filters.active) {
                        filteredTasks = filteredTasks.filter(task => !task.isDone)
                    } else if (todo.filter === Filters.completed) {
                        filteredTasks = filteredTasks.filter(task => task.isDone)
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
