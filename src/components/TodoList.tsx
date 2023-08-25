import React, { ChangeEvent } from 'react';

import { Filters } from '../App';
import AddItemForm from './AddItemForm';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string,
    title: string,
    tasks: Array<TaskType>,
    filter: Filters,
    deleteTodo: (todolistId: string, id: string) => void,
    changeFilter: (id: string, filter: Filters) => void,
    addNewTask: (todolistId: string, value: string) => void,
    changeTodoStatus: (todolistId: string, id: string, isDone: boolean) => void,
    removeTodoList: (todolistId: string) => void
}

function TodoList(props: PropsType) {

    const {
        id,
        title,
        tasks,
        filter,
        deleteTodo,
        changeFilter,
        addNewTask,
        changeTodoStatus,
        removeTodoList
    } = props


    const onRemoveTodoListHandler = () => {
        removeTodoList(id)
    }

    const addTask = (title: string) => {
        addNewTask(id, title)
    }

    return (
        <div>
            <h3>{title} <button onClick={onRemoveTodoListHandler}>x</button></h3>
            <AddItemForm
                addItem={addTask}
            />
            <ul>
                {
                    tasks.map((task) => {

                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            changeTodoStatus(id, task.id, e.currentTarget.checked)
                        }

                        const onClickHandler = () => {
                            deleteTodo(id, task.id)
                        }

                        return (
                            <li key={task.id}>
                                <input type="checkbox"
                                    checked={task.isDone}
                                    onChange={onChangeHandler}
                                />
                                <span className={task.isDone ? 'is-done' : ''}>{task.title}</span>
                                <button onClick={onClickHandler}>Delete</button>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button onClick={() => changeFilter(id, Filters.all)}
                    className={filter === Filters.all ? 'active-filter' : ''}>All</button>
                <button onClick={() => changeFilter(id, Filters.active)}
                    className={filter === Filters.active ? 'active-filter' : ''}>Active</button>
                <button onClick={() => changeFilter(id, Filters.completed)}
                    className={filter === Filters.completed ? 'active-filter' : ''}>Completed</button>
            </div>
        </div>
    )
}


export default TodoList