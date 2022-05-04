export default function addStudent(props) {
    const handleChange = (event) => {
        props.handleChange(event.target.id, event.target.value);
    };
    const { newStudent } = props; //const newStudent = props.newStudent;
    const getFormattedDate = (date) => {
        var year = date.getFullYear();
      
        var month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
      
        var day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;
        
        return month + '/' + day + '/' + year;
      }
    
      return (
        <div>
          <h2>Enter New Student Details</h2>
          <div>
            <label>Name:</label>
            <input
              type={"text"}
              id="name"
              value={newStudent.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type={"text"}
              id="email"
              value={newStudent.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>dob:</label>
            <input
              type={"text"}
              id="dob"
              value={newStudent.dob ? getFormattedDate(new Date(newStudent.dob)) : ''}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Gender:</label>
            <input
              type={"text"}
              id="gender"
              value={newStudent.gender}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Branch:</label>
            <input
              type={"text"}
              id="branch"
              value={newStudent.branch}
              onChange={handleChange}
            />
          </div>
          <div>
            {/* <button onClick={() => setShowForm(false)}>Cancel</button> */}
            <button onClick={props.handleAdd}>Submit</button> { /* this should get updated based on isEdit    */}
          </div>
        </div>
    )
}