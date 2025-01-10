import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../authConfig.js';
import { getProducts } from '../dataverseapi';

//import TodoItem from './TodoItem';
//import './TodoList.css';

//const initialTasks = [
//    { id: self.crypto.randomUUID(), text: 'Drink some coffee' },
//    { id: self.crypto.randomUUID(), text: 'Create a TODO app' },
//    { id: self.crypto.randomUUID(), text: 'Drink some more coffee' }
//];



function ProductList() {
    const { instance, accounts } = useMsal();
    const [dvData, setDVData] = useState(null);

    function ProductData() {
        // Silently acquires an access token which is then attached to a request for MS Graph data
        instance
            .acquireTokenSilent({
                ...loginRequest,
                account: accounts[0],
            })
            .then((response) => {
                getProducts(response.accessToken).then((response) => setDVData(response));
            });
    }

    return (
        <div>
            <Button variant="secondary" onClick={ProductData}>Get Products</Button>
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>Name</th>
                <th>Price</th>
                <th>&nbsp;</th>
            </tr>
            </thead>
                <tbody>
                    {dvData.map((value, index)=>
                        <tr>
                            <td></td>
                            <td>$5.00</td>
                            <td>Edit|Delete</td>
                        </tr>
                    )}

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
        </div>
    );
}

export default ProductList;