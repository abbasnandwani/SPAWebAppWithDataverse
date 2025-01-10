import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../authConfig.js';
import { getProduct, updateProduct } from '../dataverseapi';

function EditProduct({ productId, hideCallBack }) {
    const [editData, setEditData] = useState({ id: productId, productName: "", price: 0 });
    const { instance, accounts } = useMsal();
        
    useEffect(() => {
        InitData();
    }, []);

    function InitData() {
        // Silently acquires an access token which is then attached to a request for MS Graph data
        instance
            .acquireTokenSilent({
                ...loginRequest,
                account: accounts[0],
            })
            .then((response) => {
                getProduct(response.accessToken, productId)
                    .then((response) => setEditData({ id: response.andemo_demoproductid, productName: response.andemo_name, price: response.andemo_price } ));

                //console.log("Abbas - " + editData);
            });
    }

    const HandleEdit = async (e)=> {
        e.preventDefault();
        // Silently acquires an access token which is then attached to a request for MS Graph data
        instance
            .acquireTokenSilent({
                ...loginRequest,
                account: accounts[0],
            })
            .then((response) => {

                //const data = '{ andemo_name: "test js", andemo_price: 10.00}';

                var data = JSON.parse('{}');

                data.andemo_demoproductid = editData.id;
                data.andemo_name = editData.productName;
                data.andemo_price = new Number(editData.price);

                console.log(data);

                updateProduct(response.accessToken, data);
                hideCallBack();

            });
    }
      

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        console.log(editData);
    };


    return (
        <div>
            <h1>Edit Product</h1>
            <form onSubmit={HandleEdit}>
                <Table striped bordered hover>
                    <tbody>                        
                        <tr>
                            <td>Name:</td>
                            <td><input name="productName" type="text" value={editData.productName || ''} onChange={handleChange} /></td>
                        </tr>
                        <tr>
                            <td>Price:</td>
                            <td><input name="price" type="text" value={editData.price || ''} onChange={handleChange} /></td>
                        </tr>
                    </tbody>
                </Table>
                <Button type="submit">Save</Button>&nbsp;<Button onClick={hideCallBack}>Back</Button>
            </form>
        </div>
    );
}

export default EditProduct;