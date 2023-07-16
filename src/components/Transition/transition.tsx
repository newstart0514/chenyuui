import React from "react"
// @ts-ignore
import { CSSTransition } from 'react-transition-group'
// @ts-ignore
import { CSSTransitionProps } from 'react-transition-group/CSSTransition'

type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-bottom' | 'zoom-in-right'

interface TransitionProps extends CSSTransitionProps {
    animation?: AnimationName
    children?: React.ReactNode
    className?: string
    in: boolean
    timeout: number
    // 添加一层dom, 避免 内置 transition冲突
    wrapper?: boolean
}

const Transition: React.FC<TransitionProps> = (props) => {
    const {
        children,
        className,
        animation,
        wrapper,
        ...restProps
    } = props
    return (
        <CSSTransition
            classNames={className ? className : animation}
            { ...restProps }
        >
            {/*添加一层dom, 避免 内置 transition冲突*/}
            {wrapper ? <div>{children}</div> : children}
        </CSSTransition>
    )
}

Transition.defaultProps = {
    // @ts-ignore
    unmountOnExit: true,
    appear: true
}

export default Transition
