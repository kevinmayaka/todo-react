import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import ListGroup from "react-bootstrap/ListGroup";

// Class-based component declaration
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: "",
      list: [],
    };
  }

  // Setting a user input value
  updateInput(value) {
    this.setState({
      userInput: value,
    });
  }

  // Add item if user input is not empty
  addItem() {
    if (this.state.userInput !== "") {
      const userInput = {
        // Generate a random id to delete items from the list
        id: Math.random(),
        value: this.state.userInput,
      };

      // Update list
      const list = [...this.state.list];
      list.push(userInput);

      // Reset state
      this.setState({
        list,
        userInput: "",
      });
    }
  }

  // Function to delete item from list (using the random id that was generated)
  deleteItem(key) {
    const list = this.state.list;
    const updateList = list.filter((item) => item.id !== key);
    this.setState({
      list: updateList,
    });
  }

  // Function to edit item
  editItem = (index) => {
    const Todos = [...this.state.list];
    const editedTodo = prompt("Edit the Todo:");
    if (editedTodo !== null && editedTodo.trim() !== "") {
      let updatedTodos = [...Todos];
      updatedTodos[index].value = editedTodo;
      this.setState({
        list: updatedTodos,
      });
    }
  };

  render() {
    return (
      <Container>
        <Row>
          <h2>TODO LIST</h2>
        </Row>
        <hr />
        <Row>
          <Col md={{ span: 4, offset: 4 }}>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Type here to add Item"
                size="lg"
                value={this.state.userInput}
                onChange={(item) => this.updateInput(item.target.value)}
                aria-label="add something"
                aria-describedby="basicaddon2"
              />
              <InputGroup.Append>
                <Button
                  variant="primary"
                  className="mt-2"
                  onClick={() => this.addItem()}
                >
                  ADD
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 4, offset: 4 }}>
            <ListGroup>
              {this.state.list.map((item, index) => {
                return (
                  <div key={item.id} style={{ display: "flex", justifyContent: "space-between", margin: "5px 0" }}>
                    <ListGroup.Item action variant="light">
                      {item.value}
                    </ListGroup.Item>
                    <span>
                      <Button
                        style={{ marginRight: "10px" }}
                        variant="danger"
                        onClick={() => this.deleteItem(item.id)}
                      >
                        DELETE
                      </Button>
                      <Button
                        variant="info"
                        onClick={() => this.editItem(index)}
                      >
                        EDIT
                      </Button>
                    </span>
                  </div>
                );
              })}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
