export default function StudentCard(props) {
    return (<div className="address-block">
    <div><label>Name: </label><span>{props.student.name}</span></div>
    <div><label>Email: </label><span>{props.student.email}</span></div>
    <div><label>DOB: </label><span>{props.student.dob}</span></div>
    <div><label>Gender: </label><span>{props.student.gender}</span></div>
    <div><label>Branch: </label><span>{props.student.branch}</span></div>
    <div><a style={{ float: 'right' }} href="#" onClick={() => props.handleDelete(props.student._id)}>Delete</a></div>
    <div><a style={{ float: 'left' }} href="#" onClick={() => props.handleEdit(props.student._id)}>Edit</a></div>
</div>)
}