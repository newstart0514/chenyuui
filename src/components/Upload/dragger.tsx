import React, {FC, useState, DragEvent} from "react";
import classNames from "classnames";

interface DraggerProps {
    onFile: (files: FileList) => void;
    children: React.Component;
}

export const Dragger: FC<DraggerProps> = (props) => {
    const {
        onFile,
        children
    } = props

    const [dragOver, setDragOver] = useState(false)
    const classes = classNames('uploader-dragger', {
        'is-dragover': dragOver
    })

    const handleDrag = (e: DragEvent<HTMLElement>, over: boolean) => {
        e.preventDefault()
        setDragOver(over)
    }
    const handleDrop = (e: DragEvent<HTMLElement>) => {
        e.preventDefault()
        setDragOver(false)
        onFile(e.dataTransfer.files)
    }

    return (
        <div
            className={classes}
            onDragOver={e => handleDrag(e, true)}
            onDragLeave={e => handleDrag(e, false)}
            onDrop={handleDrop}
        >

        </div>
    )
}

export default Dragger
