import React, {ChangeEvent, FC, useRef, useState} from 'react'
import axios from "axios"

import Button from "../Button/button"
import UploadList from "./uploadList";
import Dragger from "./dragger";

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'
export interface UploadFile {
    uid: string;
    size: number;
    name: string;
    status?: UploadFileStatus;
    percent?: number;
    raw?: File;
    response?: any;
    error?: any;
}
export interface UploadProps {
    action: string;
    beforeUpload?: (file: File) => boolean | Promise<File>;
    onProgress?: (percentage: number, file: File) => void;
    onSuccess?: (data: any, file: File) => void;
    onError?: (err: any, file: File) => void;
    onChange?: (file: File) => void;
    defaultFileList?: UploadFile[];
    onRemove?: (file: UploadFile) => void;
    headers?: {[key: string]: any};
    name?: string;
    data?: {[key: string]: any};
    withCredentials?: boolean;
    accept?: string;
    multiple?: boolean;
    children?: React.Component;
    drag?: boolean;
}

export const Upload: FC<UploadProps> = (props) => {
    const {
        action,
        onProgress,
        onSuccess,
        onError,
        beforeUpload,
        onChange,
        defaultFileList,
        onRemove,
        name,
        data,
        headers,
        withCredentials,
        accept,
        multiple,
        children,
        drag
    } = props;
    const fileInput = useRef<HTMLInputElement>(null)
    const [ fileList, setFileList ] = useState<UploadFile>(defaultFileList || [])

    const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
        setFileList(prevFileList => {
            return prevFileList.map(file => {
                if (file.uid === updateFile.uid) {
                    return { ...file, ...updateObj }
                } else {
                    return file
                }
            })
        })
    }
    const handleClick = () => {
        if (fileInput.current) {
            fileInput.current.click()
        }
    }
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files) {
            return;
        }
        uploadFiles(files)
        if (fileInput.current) {
            fileInput.current.value = ''
        }
    }
    const handleRemove = (file: UploadFile) => {
        setFileList((prevList) => {
            return prevList.filter(item => item.uid !== file.uid)
        })
        if (onRemove) {
            onRemove(file)
        }
    }
    const uploadFiles = (files: FileList) => {
        let postFiles = Array.from(files)
        postFiles.forEach(file => {
            if (beforeUpload) {
                const result = beforeUpload(file)
                if (result && result instanceof Promise) {
                    result.then(processedFile => {
                        post(processedFile)
                    })
                } else if (result !== false) {
                    post(file)
                }
            } else {
                post(file)
            }
        })
    }
    const post = (file: File) => {
        const _file: UploadFile = {
            uid: `${Date.now()}-upload-file`,
            status: 'ready',
            name: file.name,
            size: file.size,
            percent: 0,
            raw: file
        }
        // setFileList([_file, ...fileList])   // 多个文件时只会更新一个，因为会多次调用post，而filelist的值还不是最新的
        setFileList(prevList => {
            return [_file, ...prevList]
        })
        const formData = new FormData()
        formData.append(name || 'file', file)
        if (data) {
            // ???
            Object.keys(data).forEach(key => {
                formData.append(key, data[key])
            })
        }
        axios.post(action, formData, {
            headers: {
                ...headers,
                'Content-Type': "multipart/form-data"
            },
            // 是否携带cookie
            withCredentials,
            onUploadProgress: (e) => {
                let percentage = Math.round((e.loaded * 100) / e.total) || 0
                if (percentage < 100) {
                    updateFileList(_file, { percent: percentage, status: 'uploading' })
                    if (onProgress) {
                        onProgress(percentage, file)
                    }
                }
            }
        }).then(res => {
            console.log(res)
            updateFileList(_file, { status: "success", response: res.data })
            if (onSuccess) {
                onSuccess(res.data, file)
            }
            if (onChange) {
                onChange(file)
            }
        }).catch(err => {
            console.log(err)
            updateFileList(_file, { status: "error", error: err })
            if (onError) {
                onError(err, file)
            }
            if (onChange) {
                onChange(file)
            }
        })
    }

    return (
        <div
            className="upload-component"
        >
            <div className="upload-input" style={{display: 'inline-block'}} onClick={handleClick}>
                {drag ?
                    <Dragger onFile={}>
                        {children}
                    </Dragger>
                    : children
                }
                <input
                    className="file-input"
                    style={{display: 'none'}}
                    ref={fileInput}
                    onChange={handleFileChange}
                    accept={accept}
                    multiple={multiple}
                />
            </div>
            <UploadList fileList={fileList} onRemove={handleRemove}></UploadList>
        </div>
    )
}

Upload.defaultProps = {
    name: 'file'
}
export default Upload;
