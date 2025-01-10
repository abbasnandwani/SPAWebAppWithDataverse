import { useState } from 'react';
import Table from 'react-bootstrap/Table';
//import TodoItem from './TodoItem';
//import './TodoList.css';

//const initialTasks = [
//    { id: self.crypto.randomUUID(), text: 'Drink some coffee' },
//    { id: self.crypto.randomUUID(), text: 'Create a TODO app' },
//    { id: self.crypto.randomUUID(), text: 'Drink some more coffee' }
//];



function ProductEdit() {    
    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>Name</th>
                <th>Price</th>
                <th>&nbsp;</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>Lorium ipsom</td>
                <td>$5.00</td>
                <td>Edit|Delete</td>
            </tr>
            <tr>
                <td>Lorium ipsom</td>
                <td>$5.00</td>
                <td>Edit|Delete</td>
            </tr>
            <tr>
                <td>Lorium ipsom</td>
                <td>$5.00</td>
                <td>Edit|Delete</td>
            </tr>
            <tr>
                <td>Lorium ipsom</td>
                <td>$5.00</td>
                <td>Edit|Delete</td>
                </tr>
            </tbody>
        </Table>
    );
}

export default ProductEdit;