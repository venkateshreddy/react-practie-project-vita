import { useState } from "react";
import AddressCard from "./AddressCard";
import "./App.css";

function App1() {
  const [showForm, setShowForm] = useState(false);
  const [addresses, setAddresses] = useState([
    {
        id: 1,
      name: "Vijay Kumar K",
      age: 33,
      street: "Mankammathota",
      city: "Karimnagar",
      state: "Telangana",
    },
    {
        id: 2,
      name: "Suresh J",
      age: 34,
      street: "Some Street 2",
      city: "Karimnagar",
      state: "Telangana",
    },
    {
        id: 3,
      name: "Ramesh M",
      age: 36,
      street: "Some Street1",
      city: "Karimnagar",
      state: "Telangana",
    },
  ]);
  const [latestId, setLatestId] = useState(3);
  const dummyAddressObject = {
    name: "",
    age: 0,
    street: "",
    city: "",
    state: "",
  };
  const [newAddress, setNewAddress] = useState({ ...dummyAddressObject });

  const handleChange = (event) => {
    // console.log(`Changing ${event.target.id} with value ${event.target.value}`);
    
    // const tempNewAddress = { ...newAddress };
    // tempNewAddress[event.target.id] = event.target.value;
    // setNewAddress(tempNewAddress);
    setNewAddress({ ...newAddress, [event.target.id]: event.target.value });
  };

  const addAddress = () => {
    const newAddressList = [...addresses, { ...newAddress, id: latestId + 1 }];
    //const newAddressList = [ ...addresses ]; newAdressList.push(newAddress);
    //const newAddressList = [ ...addresses ].concat([newAddress])
    setLatestId(latestId + 1);
    setAddresses(newAddressList);
    setNewAddress({ ...dummyAddressObject });
    setShowForm(false);
  };

  const deleteAddress = (id) => {
      const newAddressList = addresses.filter(addr => addr.id !== id );
      setAddresses(newAddressList);
  }

  return (
    <div>
      <h1>
        Address Book{" "}
        {showForm === false && (
          <button onClick={() => setShowForm(true)}>Add New</button>
        )}
      </h1>
      {showForm && (
        <div>
          <h2>Enter New Address Details</h2>
          <div>
            <label>Name:</label>
            <input
              type={"text"}
              id="name"
              value={newAddress.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Age:</label>
            <input
              type={"number"}
              id="age"
              value={newAddress.age}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Address:</label>
            <input
              type={"text"}
              id="street"
              value={newAddress.street}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>City:</label>
            <input
              type={"text"}
              id="city"
              value={newAddress.city}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>State:</label>
            <input
              type={"text"}
              id="state"
              value={newAddress.state}
              onChange={handleChange}
            />
          </div>
          <div>
            <button onClick={() => setShowForm(false)}>Cancel</button>
            <button onClick={addAddress}>Submit</button>
          </div>
        </div>
      )}
      {addresses.map((addr) => (
        <AddressCard address={addr} handleDelete={deleteAddress} />
      ))}
    </div>
  );
}

export default App1;
