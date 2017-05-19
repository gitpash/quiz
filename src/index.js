import React from "react";
import ReactDOM from "react-dom";
//import App from './App';
//import './index.css';

const data = [
  { id: 2, name: "элемент" },
  { id: 1, name: "элемент" },
  { id: 0, name: "элемент" }
];

const appendItem = () => {
  data.unshift({
    id: data.length,
    name: "элемент"
  });
  render();
};

//Задание 1: увеличение счётчика не работает т.к. Реакт автоматически не делает функцию(handleClick) методом класса 
// для их связи применяется Autobinding this.handleClick = this.handleClick.bind(this)
// таким образом handleClick становится методом класса Counter

// забыл что arrow func делает это автоматически -> вернул обратно

// и ещё нельзя напрямую(явно) изменять state, нужно использовать конструкцию setState
// this.setState({count: this.state.count + 1})

class Counter extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      count: 0
    };
    //this.handleClick = this.handleClick.bind(this);
  }

  // handleClick() {
  //   this.setState({ count: this.state.count + 1 });
  // }
  handleClick = () => this.setState({count: this.state.count + 1})
  render() {
    const { count } = this.state;
    return (
      <span>
        {count}
        <button onClick={this.handleClick}>+</button>
      </span>
    );
  }
}

const ListItem = ({ item }) => <li>{item.id} - {item.name} - <Counter /></li>;

// Для бонусного задания решение такое: проблема в том, что при рендере элементов списка 
// Реакт ориентируется на key index, в данном примере он должен соответствовать item.id
// а не порядковому номеру элемента(idx) 


const renderListItem = (item) => <ListItem key={item.id} item={item} />;

const List = ({ data }) => (
  <ul>
    {data.map(renderListItem)}
  </ul>
);
const ListContainer = () => (
  <div>
    1. Счетчик для каждого элемента должен работать по нажатию на кнопкеу "+" у элемента
    <br />
    {" "}
    2. При добавлении нового элемента, счетчики сохраняются у элемента, у которого были созданы
    <List data={data} />
    <button onClick={appendItem}>добавить элемент</button>
  </div>
);
const render = () =>
  ReactDOM.render(<ListContainer />, document.getElementById("container"));

render();
