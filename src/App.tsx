import React, { useState } from 'react';
import './App.css';
import TodoList, { TaskType } from './components/TodoList';
import { v1 } from 'uuid';
import AddItemForm from './components/AddItemForm';

export enum Filters {
    all = 'all',
    active = 'active',
    completed = 'completed'
}

type TodoListType = {
    id: string
    title: string
    filter: Filters
}

type TaskObjType = {
    [key: string]: Array<TaskType>
}

function App() {

    const idTodoList1 = v1()
    const idTodoList2 = v1()

    

    const [todoList, setTodoList] = useState<TodoListType[]>([
        { id: idTodoList1, title: 'What to learn?', filter: Filters.all },
        { id: idTodoList2, title: 'List for read', filter: Filters.all },
    ])

    const [tasks, setTasks] = useState<TaskObjType>({
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
        const newValue = { id: v1(), title: value, isDone: false }

        let tempTasks = tasks[todolistId]
        tasks[todolistId] = [newValue, ...tempTasks]

        setTasks({ ...tasks })
    }

    function changeTodoStatus(todolistId: string, id: string, isDone: boolean) {
        let tempTasks = tasks[todolistId]
        const findedTask = tempTasks.find(t => t.id === id)

        if (findedTask) {
            findedTask.isDone = isDone
            setTasks({ ...tasks })
        }
    }

    function changeTodoTitle(todolistId: string, id: string, title: string) {
        let tempTasks = tasks[todolistId]
        const findedTask = tempTasks.find(t => t.id === id)

        if (findedTask) {
            findedTask.title = title
            // tasks[todolistId] = [...tempTasks]
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

    function changeTodoListTitle(todolistId: string, title: string) {
        const findedList = todoList.find(item => item.id === todolistId)
        if (findedList) {
            findedList.title = title
            setTodoList([...todoList])
        }
    }

    function removeTodoList(todolistId: string) {
        const newTodoList = todoList.filter(todo => todo.id !== todolistId)
        setTodoList(newTodoList)
        
        delete tasks[todolistId]
        setTasks({ ...tasks })
    }

    function addTodoList (title: string) {
        let newTodoList: TodoListType = {
            id: v1(),
            title: title,
            filter: Filters.all
        }
        setTodoList([newTodoList, ...todoList])
        setTasks({
            ...tasks,
            [newTodoList.id]: []
        })
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodoList} />
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
                            todolistId={todo.id}
                            title={todo.title}
                            tasks={filteredTasks}
                            filter={todo.filter}
                            deleteTodo={deleteTodo}
                            changeFilter={changeFilter}
                            addNewTask={addNewTask}
                            changeTodoStatus={changeTodoStatus}
                            changeTodoTitle={changeTodoTitle}
                            removeTodoList={removeTodoList}
                            changeTodoListTitle={changeTodoListTitle}
                        />
                    )
                })
            }
        </div>
    );
}


export default App;
