import React from "react";
import {fireEvent, render} from "@testing-library/react";
import Alert, {alertBaseProps} from "./alert";

const defaultProps = {
    onclick: jest.fn()
}

const testProps: alertBaseProps = {
    title: '标题',
    description: '描述',
    type: 'danger'
}

const closeProps: alertBaseProps = {
    title: '标题',
    description: '描述',
    closable: false
}

describe('test Alert', () => {
    it('should render the correct default alert', () => {
        const wrapper = render(<Alert {...defaultProps}>Nice</Alert>)
        const element = wrapper.getByText('Nice') as HTMLDivElement
        expect(element).toBeInTheDocument()
        expect(element.tagName).toEqual('DIV')
        expect(element).toHaveClass('chenYu-alert alert-primary')
    });
    it('should render type alert when type set danger', () => {
        const wrapper = render(<Alert {...testProps}>Nice</Alert>)
    })
})
