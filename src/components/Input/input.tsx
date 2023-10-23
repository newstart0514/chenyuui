import React, {ChangeEvent, FC, InputHTMLAttributes, ReactElement} from "react";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import classNames from "classnames";
import Icon from "../Icon/icon";

type InputSize = 'lg' | 'sm'
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'>{
    disabled?: boolean;
    size?: InputSize;
    icon?: IconProp;
    prepand?: string | ReactElement;
    append?: string | ReactElement;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export const Input: FC<InputProps> = (props) => {
    // 取出各种的属性
    const {
        disabled,
        size,
        icon,
        prepand,
        append,
        style,
        ...restProps
    } = props
    // 根据属性计算不同的className
    const cnames = classNames('input-wrapper', {
        [`input-size-${size}`]: size,
        'is-disabled': disabled,
        'input-group': prepand || append,
        'input-group-append': !!append,
        'input-group-prepend': !!prepand
    })
    const fixControlledValue = (value: any) => {
        if (typeof value === 'undefined' || typeof value === 'null') {
            return ''
        }
        return value
    }
    if('value' in props) {
        delete restProps.defaultValue
        restProps.value = fixControlledValue(props.value)
    }
    return (
        // 根据属性判断是否要添加特定的节点
        <div className={cnames} style={style}>
            {prepand && <div className="input-group-prepend">{prepand}</div>}
            {icon && <div className="icon-wrapper"><Icon icon={icon} title={`title-${icon}`}/></div> }
            <input
                className="input-inner"
                disabled={disabled}
                {...restProps}
            />
            {append && <div className="input-group-append">{ append }</div>}
        </div>
    )
}

Input.defaultProps = {
    disabled: false
}

export default Input;
