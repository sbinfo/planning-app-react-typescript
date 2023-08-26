import React, { ChangeEvent } from 'react';

import { Filters } from '../App';
import AddItemForm from './AddItemForm';
import EditableTaskTitle from './EditableTaskTitle';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistId: string,
    title: string,
    tasks: Array<TaskType>,
    filter: Filters,
    deleteTodo: (todolistId: string, id: string) => void,
    changeFilter: (id: string, filter: Filters) => void,
    addNewTask: (todolistId: string, value: string) => void,
    changeTodoStatus: (todolistId: string, id: string, isDone: boolean) => void,
    changeTodoTitle: (todolistId: string, id: string, title: string) => void,
    removeTodoList: (todolistId: string) => void,
    changeTodoListTitle: (todolistId: string, title: string) => void,
}

function TodoList(props: PropsType) {

    const {
        todolistId,
        title,
        tasks,
        filter,
        deleteTodo,
        changeFilter,
        addNewTask,
        changeTodoStatus,
        changeTodoTitle,
        removeTodoList,
        changeTodoListTitle
    } = props

    const onChangeTodoListTitle = (title: string) => {
        changeTodoListTitle(todolistId, title)
    }

    const onRemoveTodoListHandler = () => {
        removeTodoList(todolistId)
    }

    const addTask = (title: string) => {
        addNewTask(todolistId, title)
    }

    return (
        <div>
            <h3>
                <EditableTaskTitle title={title} onChange={onChangeTodoListTitle} />
                <button onClick={onRemoveTodoListHandler}>x</button>    
            </h3>
            <AddItemForm
                addItem={addTask}
            />
            <ul>
                {
                    tasks.map((task) => {

                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            changeTodoStatus(todolistId, task.id, e.currentTarget.checked)
                        }

                        const onChangeTitleHandler = (title: string) => {
                            changeTodoTitle(todolistId, task.id, title)
                        }

                        const onClickHandler = () => {
                            deleteTodo(todolistId, task.id)
                        }

                        return (
                            <li key={task.id } className={task.isDone ? 'is-done' : ''}>
                                <input type="checkbox"
                                    checked={task.isDone}
                                    onChange={onChangeStatusHandler}
                                />
                                <EditableTaskTitle title={task.title} onChange={onChangeTitleHandler} />
                                <button onClick={onClickHandler}>Delete</button>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button onClick={() => changeFilter(todolistId, Filters.all)}
                    className={filter === Filters.all ? 'active-filter' : ''}>All</button>
                <button onClick={() => changeFilter(todolistId, Filters.active)}
                    className={filter === Filters.active ? 'active-filter' : ''}>Active</button>
                <button onClick={() => changeFilter(todolistId, Filters.completed)}
                    className={filter === Filters.completed ? 'active-filter' : ''}>Completed</button>
            </div>
        </div>
    )
}


export default TodoList