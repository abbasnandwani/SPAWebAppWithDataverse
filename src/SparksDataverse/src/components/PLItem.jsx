import PropTypes from 'prop-types';
function PLItem({ value }) {
    return (
        <tr>
            <td>{value.andemo_name}</td>
            <td>${value.andemo_price}</td>
            <td>Edit|Delete</td>
        </tr>
    );
}

PLItem.propTypes = {
    value: PropTypes.string.isRequired,    
};

export default PLItem;