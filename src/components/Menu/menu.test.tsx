import Menu, {MenuProps} from "./menu";
import MenuItem from "./menuItem";
import React from "react";
import {cleanup, fireEvent, render, RenderResult, waitFor} from "@testing-library/react";
import SubMenu from "./subMenu";

const testProps: MenuProps = {
    children: undefined,
    defaultIndex: "0",
    onSelect: jest.fn(),
    className: 'test'
}
const testVerProps: MenuProps = {
    children: undefined,
    defaultIndex: "0",
    mode: 'vertical',
    defaultOpenSubMenus: ['4']
}
const CreateMenu = (props: MenuProps) => {
    return (
        <Menu {...props}>
            {/*使用了cloneelement，不用传入index*/}
            <MenuItem>active</MenuItem>
            <MenuItem disabled>disabled</MenuItem>
            <MenuItem>xyz</MenuItem>
            {/*<li>1111</li>*/}
            <SubMenu title="dropdown">
                <MenuItem>
                    drop1
                </MenuItem>
            </SubMenu>
            <SubMenu title="opened">
                <MenuItem>
                    opened1
                </MenuItem>
            </SubMenu>
        </Menu>
    )
}

const createStyleFile = () => {
    const cssFile: string = `
        .submenu {
            display: none;
        }
        .submenu.menu.menu-opened {
            display: block;
        }
    `
    const style = document.createElement('style')
    style.type = 'text/css'
    style.innerHTML = cssFile
    return style
}

let wrapper: RenderResult, wrapper2: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement
describe('test Menu and MenuItem component', () => {
    beforeEach(() => {
        wrapper = render(CreateMenu(testProps))
        wrapper.container.append(createStyleFile())
        menuElement = wrapper.getByTestId('test-menu')
        activeElement = wrapper.getByText('active')
        disabledElement = wrapper.getByText('disabled')
    })
    it('should render correct Menu and MenuItem based on default props', () => {
        expect(menuElement).toBeInTheDocument()
        expect(menuElement).toHaveClass('menu test')
        // expect(menuElement.getElementsByTagName('li').length).toEqual(3)
        expect(menuElement.querySelectorAll(':scope > li').length).toEqual(5)
        expect(activeElement).toHaveClass('menu-item is_active')
        expect(disabledElement).toHaveClass('menu-item is_disabled')
    })
    it('click items should change active and call the right callback', () => {
        const thirdItem = wrapper.getByText('xyz');
        fireEvent.click(thirdItem)
        expect(thirdItem).toHaveClass('is_active')
        expect(activeElement).not.toHaveClass('is_active')
        expect(testProps.onSelect).toHaveBeenCalledWith("2")
        fireEvent.click(disabledElement)
        expect(disabledElement).not.toHaveClass('is_active')
        expect(testProps.onSelect).not.toHaveBeenCalledWith("1")
    })
    it('should render vertical mode when mode is set to vertical', () => {
        cleanup();
        const wrapper = render(CreateMenu(testVerProps))
        const menuElement = wrapper.getByTestId('test-menu')
        expect(menuElement).toHaveClass('menu-vertical')
    })
    it('should show dropdown items when hover on subMenu', async () => {
        expect(wrapper.queryByText('drop1')).not.toBeVisible()
        const dropdownElement = wrapper.getByText('dropdown')
        fireEvent.mouseEnter(dropdownElement)
        // 点击后会有一定的延时时间，所以这里需要用wait等待一下
        await waitFor(() => {
            expect(wrapper.queryByText('drop1')).toBeVisible()
        })
        fireEvent.click(wrapper.getByText('drop1'))
        expect(testProps.onSelect).toHaveBeenCalledWith('3-0')
        fireEvent.mouseLeave(dropdownElement)
        expect(wrapper.queryByText('drop1')).not.toBeVisible()
    })
})
describe('test Menu and MenuItem component in vertical mode', () => {
    beforeEach(() => {
        wrapper2 = render(CreateMenu(testVerProps))
        wrapper2.container.append(createStyleFile())
    })
    it('should render vertical mode when mode is set to vertical', () => {
        const menuElement = wrapper2.getByTestId('test-menu')
        expect(menuElement).toHaveClass('menu-vertical')
    })
    it('should show dropdown items when click on submenu for vertical mode', async () => {
        const dropDownItem = wrapper2.getByText('drop1')
        expect(dropDownItem).not.toBeVisible()
        fireEvent.click(wrapper2.getByText('dropdown'))
        await waitFor(() => {
            expect(dropDownItem).toBeVisible()
        })
    })
    it('should show submenu dropdown when defaultOpenSubMenu set', async () => {
        await waitFor(() => {
            expect(wrapper2.queryByText('opened1')).toBeVisible()
        })
    })
})
