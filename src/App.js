
import { useState } from 'react';
import './App.scss';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Input from './Components/Input';
import List from './Components/List';

function App() {
  const [listTodo, setListTodo] = useState([])
  const [themeApp, setThemeApp] = useState("light")

  return (
    <div className={`App theme-${themeApp}`}>
      <Header themeApp={themeApp} setThemeApp={setThemeApp} />
      <Input listTodo={listTodo} setListTodo={setListTodo} />
      <List listTodo={listTodo} setListTodo={setListTodo} />
      <Footer />
    </div>
  );
}

export default App;
