import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Container, Form, Button, ListGroup, Row, Col } from 'react-bootstrap';

const App = () => {
  const { register, handleSubmit, reset } = useForm();
  const [menuItems, setMenuItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('menuItems'));
    if (storedItems) {
      setMenuItems(storedItems);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('menuItems', JSON.stringify(menuItems));
  }, [menuItems]);

  const onSubmit = (data) => {
    if (editingItem) {
      const updatedItems = menuItems.map((item) =>
        item.id === editingItem ? { ...item, ...data } : item
      );
      setMenuItems(updatedItems);
      setEditingItem(null);
    } else {
      const newItem = { id: Date.now(), ...data };
      setMenuItems([...menuItems, newItem]);
    }
    reset();
  };

  const handleEdit = (id) => {
    const item = menuItems.find((item) => item.id === id);
    setEditingItem(id);
    reset(item);
  };

  const handleDelete = (id) => {
    const updatedItems = menuItems.filter((item) => item.id !== id);
    setMenuItems(updatedItems);
  };

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Restaurant Menu</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group as={Row} controlId="formCategory">
          <Form.Label column sm="2">Category</Form.Label>
          <Col sm="10">
            <Form.Control {...register('category')} placeholder="Category" required />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formName">
          <Form.Label column sm="2">Name</Form.Label>
          <Col sm="10">
            <Form.Control {...register('name')} placeholder="Name" required />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formPrice">
          <Form.Label column sm="2">Price</Form.Label>
          <Col sm="10">
            <Form.Control {...register('price')} type="number" step="0.01" placeholder="Price" required />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formCost">
          <Form.Label column sm="2">Cost</Form.Label>
          <Col sm="10">
            <Form.Control {...register('cost')} type="number" step="0.01" placeholder="Cost" required />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formAmountInStock">
          <Form.Label column sm="2">Amount in Stock</Form.Label>
          <Col sm="10">
            <Form.Control {...register('amountInStock')} type="number" placeholder="Amount in Stock" required />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formOptions">
          <Form.Label column sm="2">Options</Form.Label>
          <Col sm="10">
            <Form.Control {...register('options')} placeholder="Options (comma-separated)" />
          </Col>
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          {editingItem ? 'Update' : 'Add'} Item
        </Button>
      </Form>

      <ListGroup className="mt-4">
        {menuItems.map((item) => (
          <ListGroup.Item key={item.id} className="d-flex justify-content-between align-items-center">
            <div>
              <strong>{item.category}</strong> - {item.name} - ${item.price} - Cost: ${item.cost} - In Stock: {item.amountInStock}
            </div>
            <div>
              <Button variant="info" onClick={() => handleEdit(item.id)} className="me-2">Edit</Button>
              <Button variant="danger" onClick={() => handleDelete(item.id)}>Delete</Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default App;