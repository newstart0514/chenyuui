import React from 'react';
import Button, {ButtonSize, ButtonType} from "./components/Button/button";
import Alert from "./components/Alert/alert";
import Menu from "./components/Menu/menu";
import MenuItem from "./components/Menu/menuItem";
import SubMenu from "./components/Menu/subMenu";
import Icon from "./components/Icon/icon";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Icon icon="coffee" theme="danger" size="10x"/>
        <Menu defaultIndex="0" onSelect={(index) => alert(index)} mode="vertical" defaultOpenSubMenus={['2']}>
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
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>
          Large Primary
        </Button>
        <Button btnType={ButtonType.Danger} size={ButtonSize.Small}>
          Small Danger
        </Button>
        <Button btnType={ButtonType.Link} href='http://www.baidu.com'>
          Baidu Link
        </Button>
        <Button btnType={ButtonType.Link} href='http://www.baidu.com' disabled>
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
