import React, {useContext} from "react";
import classNames from "classnames";
import {MenuContext} from "./menu";

export interface MenuItemProps {
    index?: string;
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
    children: React.ReactNode;
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
    const { index, style, className, disabled, children } = props
    const context = useContext(MenuContext)
    const classes = classNames('menu-item', className, {
        'is_disabled': disabled,
        'is_active': context.index === index
    })
    const handlerClick = () => {
        if(context.onSelect && !disabled && (typeof index === 'string')) {
            context.onSelect(index)
        }
    }
    return (
        <li className={classes} style={style} onClick={handlerClick}>
            {children}
        </li>
    )
}

MenuItem.displayName = 'MenuItem'
export default MenuItem
