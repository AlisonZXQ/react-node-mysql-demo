import React, { Component } from 'react';
import { Button, Form, Input, Row, Col } from 'antd';
import './App.css';

const { TextArea } = Input;
const FormItem = Form.Item;

class App extends Component {

  state = {
    todoList: [],
  }

  componentDidMount() {
    this.getTodo();
  }

  getTodo = () => {
    fetch('http://localhost:4000/todo/all')
      .then(response => response.json())
      .then(response => {
        console.log('response', response);
        this.setState({ todoList: response.data });
      })
      .catch(err => console.log(err));
  }

  addTodo = () => {
    const { form: { getFieldValue } } = this.props;
    console.log('getFieldValue', getFieldValue('todo'));
    fetch(`http://localhost:4000/todo/add?content=${getFieldValue('todo')}`)
      .then((res) => {
        this.getTodo();
      })
      .catch(err => console.log(err));
  }

  render() {
    const { form: { getFieldDecorator } } = this.props;
    const { todoList } = this.state;

    return (
      <div style={{ marginTop: '30vh', textAlign: 'center' }}>
        <div>
          {getFieldDecorator('todo', {
          })(
            <TextArea style={{ width: '500px', marginBottom: '10px' }} />
          )}
        </div>
        <div>
          <Button type="primary" onClick={() => this.addTodo()}>添加记录</Button>
        </div>
        <Row>
          {todoList.map(it => <Row>
            <Col span={6} offset={6}>{it.content}</Col>
            <Col span={6} className="f-fr">X</Col>
          </Row>)}
        </Row>
      </div>
    );
  }
}

export default Form.create()(App);
