import React from 'react';

import { Filters } from '../App';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string,
    tasks: Array<TaskType>,
    deleteTodo: (id: string) => void,
    changeFilter: (filter: Filters) => void
}

function TodoList ({ title, tasks, deleteTodo, changeFilter }: PropsType) {
    
    return (
        <div>
            <h3>{ title }</h3>
            <div>
                <input type="text" />
                <button>+</button>
            </div>
            <ul>
                {
                    tasks.map((task) => {
                        return (
                            <li key={ task.id }>
                                <input type="checkbox" checked={ task.isDone } />
                                <span>{ task.title }</span>
                                <button onClick={ () => deleteTodo(task.id) }>Delete</button>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button onClick={ () => changeFilter(Filters.all) }>All</button>
                <button onClick={ () => changeFilter(Filters.active) }>Active</button>
                <button onClick={ () => changeFilter(Filters.completed) }>Completed</button>
            </div>
        </div>
    )
}

export default TodoList