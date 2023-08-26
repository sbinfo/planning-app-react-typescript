import { useState, ChangeEvent, KeyboardEvent } from "react"

import { IconButton, TextField } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';


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
            <TextField
                size="small"
                placeholder="Type new task..."
                value={title}
                onChange={onNewTaskTitleChangeHandler}
                onKeyDown={onKeyDownHandler}
                error={!!error}
                helperText={error}
                sx={{ mr: '8px' }}
            />
            <IconButton aria-label="delete" 
                color="primary"
                onClick={onClickHandler}
            >
                <AddIcon />
            </IconButton>
        </div>
    )
}

export default AddItemForm