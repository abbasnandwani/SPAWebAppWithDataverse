import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../authConfig.js';
import { getProducts, deleteProduct } from '../dataverseapi';
import EditProduct from './EditProduct';
import AddProduct from './AddProduct';

function ProductList() {
    const { instance, accounts } = useMsal();
    const [data, setData] = useState([]);
    const [showEditForm, setShowEditForm] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showMainForm, setShowMainForm] = useState(true);
    const [productId, setProductId] = useState(0);


    useEffect(() => {
        ProductData();
    }, []);

    function ProductData() {
        // Silently acquires an access token which is then attached to a request for MS Graph data        
        instance
            .acquireTokenSilent({
                ...loginRequest,
                account: accounts[0],
            })
            .then((response) => {
                getProducts(response.accessToken).then((response) => setData(response));
            });
    }

    function DeleteData(productId) {
        // Silently acquires an access token which is then attached to a request for MS Graph data
        instance
            .acquireTokenSilent({
                ...loginRequest,
                account: accounts[0],
            })
            .then((response) => {
                deleteProduct(response.accessToken, productId).then(() => {
                    getProducts(response.accessToken).then((response) => setData(response));
                });                    
            })
           
    }

    function HandleShowEditForm(productId) {
        setShowEditForm(true);
        setShowAddForm(false);
        setShowMainForm(false);
        setProductId(productId);
    }

    function HandleShowAddForm(productId) {
        setShowEditForm(false);
        setShowAddForm(true);
        setShowMainForm(false);
        setProductId(productId);
    }

    async function HandleShowMainForm() {
        setShowEditForm(false);
        setShowAddForm(false);
        await sleep(1000);
        ProductData();
        setShowMainForm(true);
        //setProductId(productId);
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    return (
        <div>        
           {/* <Button variant="secondary" onClick={ProductData}>Get Products</Button>*/}
            {showMainForm &&
                <div>
                    <Button onClick={() => HandleShowAddForm(0)}>Add</Button>
                <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((value) =>
                        <tr key={value.andemo_demoproductid}>
                            <td>{value.andemo_name}</td>
                            <td>${value.andemo_price}</td>
                            <td><Button onClick={() => HandleShowEditForm(value.andemo_demoproductid)}>Edit</Button>&nbsp;
                                <Button onClick={() => DeleteData(value.andemo_demoproductid)} >Delete</Button></td>
                        </tr>
                    )}
                </tbody>
                    </Table>
                </div>
            }

            {showEditForm && <EditProduct productId={productId} hideCallBack={HandleShowMainForm} />}

            {showAddForm && <AddProduct productId={productId} hideCallBack={HandleShowMainForm} />}
            
        </div>
    );
}

export default ProductList;