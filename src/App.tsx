import React from 'react';
import Button, {ButtonSize, ButtonType} from "./components/Button/button";
import Alert, {alertType} from "./components/Alert/alert";
import Menu from "./components/Menu/menu";
import MenuItem from "./components/Menu/menuItem";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Menu defaultIndex={0} onSelect={(index) => alert(index)} mode={'vertical'}>
          <MenuItem index={0}>Cool drink1</MenuItem>
          <MenuItem index={1} disabled>Cool drink2</MenuItem>
          <MenuItem index={2}>Cool drink3</MenuItem>
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
        <Alert description='你好' title='你好呀' type={alertType.Danger}></Alert>
        <Alert description='你好' title='你好呀' type={alertType.Success}></Alert>
        <Alert description='你好' title='你好呀' type={alertType.Warning}></Alert>
        <Alert description='你好' title='你好呀' type={alertType.Primary}></Alert>
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
