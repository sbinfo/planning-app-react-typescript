import { useState, ChangeEvent, KeyboardEvent } from "react"


type AddItemFormPropsType = {
    addItem: (value: string) => void
}

function AddItemForm(props: AddItemFormPropsType) {

    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)


    const onNewTaskTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    const onClickHandler = () => {
        if (title.trim() !== '') {
            props.addItem(title.trim())
            setTitle('')
        } else {
            setError('Field is required')
        }
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            onClickHandler()
        }
    }

    return (
        <div>
            <input
                type="text"
                value={title}
                onChange={onNewTaskTitleChangeHandler}
                onKeyDown={onKeyDownHandler}
                className={error ? "error" : ""}
            />
            <button onClick={onClickHandler}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
    )
}

export default AddItemForm