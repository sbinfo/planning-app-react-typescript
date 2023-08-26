import React, { ChangeEvent } from 'react';

import { Filters } from '../App';
import AddItemForm from './AddItemForm';
import EditableTaskTitle from './EditableTaskTitle';

// Material
import { Button, ButtonGroup, IconButton, Checkbox } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

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
                <IconButton aria-label="delete" onClick={onRemoveTodoListHandler}>
                    <DeleteIcon />
                </IconButton>
            </h3>
            <AddItemForm
                addItem={addTask}
            />
            <ul className='todo-list'>
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
                            <li key={task.id} className={task.isDone ? 'is-done' : ''}>

                                <Checkbox
                                    checked={task.isDone}
                                    onChange={onChangeStatusHandler}
                                />
                                
                                {/* <input type="checkbox"
                                    checked={task.isDone}
                                    onChange={onChangeStatusHandler}
                                /> */}
                                <EditableTaskTitle title={task.title} onChange={onChangeTitleHandler} />
                                <IconButton aria-label="delete" onClick={onClickHandler}>
                                    <DeleteIcon />
                                </IconButton>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <ButtonGroup variant="outlined" aria-label="outlined button group">
                    <Button
                        onClick={() => changeFilter(todolistId, Filters.all)}
                        variant={filter === Filters.all ? "contained" : "outlined"}
                    >
                        All
                    </Button>
                    <Button
                        onClick={() => changeFilter(todolistId, Filters.active)}
                        variant={filter === Filters.active ? "contained" : "outlined"}
                    >
                        Active
                    </Button>
                    <Button
                        onClick={() => changeFilter(todolistId, Filters.completed)}
                        variant={filter === Filters.completed ? "contained" : "outlined"}
                    >
                        Completed
                    </Button>
                </ButtonGroup>
            </div>
        </div>
    )
}


export default TodoList