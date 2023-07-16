import React, {useState} from 'react';
import Button from "./components/Button/button";
import Alert from "./components/Alert/alert";
import Menu from "./components/Menu/menu";
import MenuItem from "./components/Menu/menuItem";
import SubMenu from "./components/Menu/subMenu";
import Icon from "./components/Icon/icon";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Transition from "./components/Transition/transition";
library.add(fas)

function App() {
  const [ show, setShow ] = useState(false)

  return (
    <div className="App">
      <header className="App-header">
        <Button size="lg" onClick={() => { setShow(!show) }}>Toggle</Button>
        <Transition in={show} timeout={300} animation="zoom-in-left">
          <div>
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
          </div>
        </Transition>
        <Transition in={show} timeout={300} animation="zoom-in-left" wrapper>
          <Button btnType='primary' size='lg'>A Large Button</Button>
        </Transition>
        <Icon icon="coffee" theme="danger" size="10x"/>
        <Menu defaultIndex="0" onSelect={(index) => alert(index)} defaultOpenSubMenus={['2']}>
          <MenuItem>Cool drink1</MenuItem>
          <MenuItem disabled>Cool drink2</MenuItem>
          <SubMenu title="dropdown">
            <MenuItem>dropdown 1</MenuItem>
            <MenuItem>dropdown 2</MenuItem>
          </SubMenu>
          <MenuItem>Cool drink3</MenuItem>
        </Menu>
        <Button onClick={() => alert(123)}>Hello</Button>
        <Button disabled>Disabled Button</Button>
        <Button btnType='primary' size='lg'>
          Large Primary
        </Button>
        <Button btnType='danger' size='sm'>
          Small Danger
        </Button>
        <Button btnType='link' href='http://www.baidu.com'>
          Baidu Link
        </Button>
        <Button btnType='link' href='http://www.baidu.com' disabled>
          Disabled Link
        </Button>
        <hr/>
        <Alert description='你好' title='你好呀'></Alert>
        <Alert description='你好' title='你好呀' type='danger'></Alert>
        <Alert description='你好' title='你好呀' type='success'></Alert>
        <Alert description='你好' title='你好呀' type='warning'></Alert>
        <Alert description='你好' title='你好呀' type='primary'></Alert>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
