import React, {useState} from 'react'
import classNames from 'classnames'

export type alertType = 'success' | 'primary' | 'warning' | 'danger' | 'default'

export interface alertBaseProps {
    title: string,
    description: string,
    type?: alertType,
    // 是否展示关闭图标
    closable?: boolean,
    children?: React.ReactNode,
    onClose?: (() => void)
}

const Alert: React.FC<alertBaseProps> = (props) => {
    const [visible, setVisible] = useState(true)
    const {
        title,
        description,
        type,
        closable,
        children,
        onClose
    } = props
    const classes = classNames('alert', {
        [`alert-${type}`]: type
    })

    const handleClick = () => {
        setVisible(false)
        if (onClose) {
            onClose()
        }
    }

    if (closable) {
        return visible ? (
            <div className={classes + ' chenYu-alert'}>
                {title ? <span className={description === '' ? 'chenYu-alert-title' : 'chenYu-alert-title bold-title'}>{title}</span> : null}
                <p className='chenYu-alert-desc'>{description}</p>
                {children ? <p>{children}</p> : null}
                <span className='chenYu-alert-close' onClick={handleClick}>
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times"
                     className="svg-inline--fa fa-times fa-w-11 viking-icon" role="img"
                     xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path fill="currentColor"
                     d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path>
                    </svg>
                </span>
            </div>
        ) : null
    } else {
        return visible ? (
            <div className={classes + ' chenYu-alert'}>
                {title ? <span className={description === '' ? 'chenYu-alert-title' : 'chenYu-alert-title bold-title'}>{title}</span> : null}
                <p className='chenYu-alert-desc'>{description}</p>
                {children ? <p>{children}</p> : null}
            </div>
        ) : null
    }
}

Alert.defaultProps = {
    type: 'primary',
    closable: true
}

export default Alert
