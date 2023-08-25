import React, { ChangeEvent, KeyboardEvent, useState } from 'react';

import { Filters } from '../App';

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
    changeTodoStatus: (todolistId: string, id: string, isDone: boolean) => void
}

function TodoList (props: PropsType) {

    const {
        id,
        title,
        tasks,
        filter,
        deleteTodo,
        changeFilter,
        addNewTask,
        changeTodoStatus
    } = props

    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onAddNewTask = () => {
        if (newTaskTitle.trim() !== '') {
            addNewTask(id, newTaskTitle.trim())
            setNewTaskTitle('')
        } else {
            setError('Field is required')
        }
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            onAddNewTask()
        }
    }

    const onNewTaskTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.target.value)
    }
    
    return (
        <div>
            <h3>{ title }</h3>
            <div>
                <input
                    type="text"
                    value={newTaskTitle}
                    onChange={onNewTaskTitleChangeHandler}
                    onKeyDown={onKeyDownHandler}
                    className={ error ? "error" : "" }
                />
                <button onClick={onAddNewTask}>+</button>
                { error && <div className="error-message">{ error }</div>}
            </div>
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
                            <li key={ task.id }>
                                <input type="checkbox"
                                       checked={task.isDone}
                                       onChange={onChangeHandler}
                                />
                                <span className={ task.isDone ? 'is-done' : '' }>{ task.title }</span>
                                <button onClick={onClickHandler}>Delete</button>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button onClick={ () => changeFilter(id, Filters.all) }
                        className={ filter === Filters.all ? 'active-filter' : ''}>All</button>
                <button onClick={ () => changeFilter(id, Filters.active) }
                        className={ filter === Filters.active ? 'active-filter' : ''}>Active</button>
                <button onClick={ () => changeFilter(id, Filters.completed) }
                        className={ filter === Filters.completed ? 'active-filter' : ''}>Completed</button>
            </div>
        </div>
    )
}

export default TodoList