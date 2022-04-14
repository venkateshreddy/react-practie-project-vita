export default function AddressCard(props) {
    return (<div className="address-block">
    <div><label>Name: </label><span>{props.address.name}</span></div>
    <div><label>Age: </label><span>{props.address.age}</span></div>
    <div><label>Address: </label><span>{props.address.street}</span></div>
    <div><label>City: </label><span>{props.address.city}</span></div>
    <div><label>State: </label><span>{props.address.state}</span></div>
    <div><a style={{ float: 'right' }} href="#" onClick={() => props.handleDelete(props.address.id)}>Delete</a></div>
</div>)
}