//import { graphConfig } from "./authConfig";

//change [TABLENAME] and [COLUMNS] to your table and column definition
//change [DATAVERSE_ENVURL] to your dataverse environment url

/**
 * Attaches a given access token to a MS Graph API call. Returns information about the user
 * @param accessToken 
 */
export async function getProducts(accessToken) {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);
    headers.append("OData-MaxVersion", "4.0");
    headers.append("OData-Version", "4.0");
    headers.append("Prefer", "odata.include-annotations=*");
    headers.append("Content-Type", "application/json");

    const options = {
        method: "GET",
        headers: headers
    };

    return fetch("[DATAVERSE_ENVURL]/api/data/v9.2/[TABLENAME]?$select=[COLUMNS]", options)
        .then(response => response.json())
        .then(data => data.value)
        .catch(error => console.log(error));
}

export async function getProduct(accessToken, productId) {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);
    headers.append("OData-MaxVersion", "4.0");
    headers.append("OData-Version", "4.0");
    headers.append("Prefer", "odata.include-annotations=*");
    headers.append("Content-Type", "application/json");

    const options = {
        method: "GET",
        headers: headers
    };

    var url = "[DATAVERSE_ENVURL]/api/data/v9.2/[TABLENAME](" + productId + ")?$select=[COLUMNS]";

    return fetch(url, options)
        .then(response => response.json())
        .then(data => data)
        .catch(error => console.log(error));
}

export async function updateProduct(accessToken, product) {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);
    headers.append("OData-MaxVersion", "4.0");
    headers.append("OData-Version", "4.0");
    headers.append("Prefer", "return=representation");
    headers.append("Content-Type", "application/json");

    const url = "[DATAVERSE_ENVURL]/api/data/v9.2/[TABLENAME](" + product.demo_demoproductid + ")?$select=[TABLENAME]";
    
    console.log(product);

    const jsondata = JSON.stringify(product);

    console.log(jsondata);

    const options = {
        method: "PATCH",
        headers: headers,
        body: jsondata
    };

    return await fetch(url, options)
        .then(response => response.json())
        .then(data => data)
        .catch(error => console.log(error));
}

export async function createProduct(accessToken, product) {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);
    headers.append("OData-MaxVersion", "4.0");
    headers.append("OData-Version", "4.0");
    headers.append("Prefer", "return=representation");
    headers.append("Content-Type", "application/json");

    const url = "[DATAVERSE_ENVURL]/api/data/v9.2/[TABLENAME]?$select=[TABLENAME]";    

    console.log(product);

    const jsondata = JSON.stringify(product);

    console.log(jsondata);

    const options = {
        method: "POST",
        headers: headers,
        body: jsondata
    };

    return fetch(url, options)
        .then(response => response.json())
        .then(data => data)
        .catch(error => console.log(error));
}

export async function deleteProduct(accessToken, productId) {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);
    headers.append("OData-MaxVersion", "4.0");
    headers.append("OData-Version", "4.0");    

    const url = "[DATAVERSE_ENVURL]/api/data/v9.2/[TABLENAME](" + productId + ")";

    const options = {
        method: "DELETE",
        headers: headers
    };

    return fetch(url, options)
        .then(true)
        .catch(error => console.log(error));    
}
