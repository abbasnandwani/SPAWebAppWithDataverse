import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../authConfig.js';
import { createProduct } from '../dataverseapi';

function AddProduct({ hideCallBack }) {
    const [addData, setAddData] = useState({ id: "", productName: "", price: 0 });
    const { instance, accounts } = useMsal();
   
    function HandleAdd() {
        // Silently acquires an access token which is then attached to a request for MS Graph data
        instance
            .acquireTokenSilent({
                ...loginRequest,
                account: accounts[0],
            })
            .then((response) => {

                var data = JSON.parse('{}');
                
                data.andemo_name = addData.productName;
                data.andemo_price = new Number(addData.price);

                createProduct(response.accessToken, data);
                hideCallBack();
            });
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        console.log(addData);
    };


    return (
        <div>
            <h1>Add Product</h1>
            <form>
                <Table striped bordered hover>
                    <tbody>                        
                        <tr>
                            <td>Name:</td>
                            <td><input name="productName" type="text" value={addData.productName || ''} onChange={handleChange} /></td>
                        </tr>
                        <tr>
                            <td>Price:</td>
                            <td><input name="price" type="text" value={addData.price || ''} onChange={handleChange} /></td>
                        </tr>
                    </tbody>
                </Table>
                <Button onClick={HandleAdd} type="submit">Save</Button>&nbsp;
                <Button type="submit">Back</Button>
            </form>
        </div>
    );
}


export default AddProduct;