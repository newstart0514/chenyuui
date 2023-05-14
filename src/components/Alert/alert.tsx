import React, {useState} from 'react'
import classNames from 'classnames'

export enum alertType {
    Primary = 'primary',
    Default = 'default',
    Danger = 'danger',
    Success = 'success',
    Warning = 'warning'
}

interface alertBaseProps {
    title: string,
    description: string,
    type?: alertType,
    closable?: boolean
}

const Alert: React.FC<alertBaseProps> = (props) => {
    const [state, setState] = useState(true)
    const {
        title,
        description,
        type,
        closable
    } = props
    const classes = classNames('alt', {
        [`alt-${type}`]: type
    })
    const close = () => {
        setState(false)
    }
    if (closable) {
        return state ? (
            <div className={classes + ' chenYu-alert'}>
                <span className={description === '' ? 'chenYu-alert-title' : 'chenYu-alert-title bold-title'}>{title}</span>
                <p className='chenYu-alert-desc'>{description}</p>
                <span className='chenYu-alert-close' onClick={close}>
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times"
                     className="svg-inline--fa fa-times fa-w-11 viking-icon" role="img"
                     xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path fill="currentColor"
                     d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path>
                    </svg>
                </span>
            </div>
        ) : null
    } else {
        return state ? (
            <div className={classes + ' chenYu-alert'}>
                <span
                    className={description === '' ? 'chenYu-alert-title' : 'chenYu-alert-title bold-title'}>{title}</span>
                <p className='chenYu-alert-desc'>{description}</p>
            </div>
        ) : null
    }
}

Alert.defaultProps = {
    type: alertType.Default,
    closable: true
}

export default Alert
