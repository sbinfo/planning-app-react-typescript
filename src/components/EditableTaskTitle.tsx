import { ChangeEvent, useState } from "react"

import { IconButton, TextField } from "@mui/material"


type EditableTitleProps = {
    title: string,
    onChange: (title: string) => void
}

function EditableTaskTitle (props: EditableTitleProps) {

    const [editMode, setEditMode] = useState(false)
    const [localTitle, setLocalTitle] = useState('')

    const activateEditMode = () => {
        setLocalTitle(props.title)
        setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        props.onChange(localTitle)
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setLocalTitle(e.target.value)
    }

    return (
        editMode 
        ? <TextField
            size="small"
            value={localTitle}
            onChange={onChangeTitleHandler}
            onBlur={deactivateEditMode}
            autoFocus
        />
        : <span onDoubleClick={activateEditMode} >{props.title}</span> 
    )
}

export default EditableTaskTitle