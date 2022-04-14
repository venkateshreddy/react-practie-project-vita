import "./App.css";
import { useState } from "react";

function App() {
  const initialNamesList = [
    "Venkatesh Reddy",
    "Vijay Kumar",
    "Sai Krishna",
    "Naveena",
    "Sharaschandra",
    "Udayasri",
    "Srivani",
    "Raghavendra",
    "Vinay",
  ];
  
  const [namesArray, setNamesArray] = useState([]);

  const addNewName = () => {
    const newNamesArray = namesArray.concat([initialNamesList[namesArray.length]])
    setNamesArray(newNamesArray);
  };
  const deleteLastName = () => {
    const tempNamesArray = [...namesArray];
    tempNamesArray.splice(tempNamesArray.length - 1, 1);
    setNamesArray(tempNamesArray);
  }

  return (
    <div>
      {namesArray.map((name) => {
        return <h1>Hello {name}</h1>;
      })}
      <button onClick={addNewName} disabled={initialNamesList.length===namesArray.length}>Add Name</button>
      
      {
        namesArray.length > 0 && <button onClick={deleteLastName}>Delete Last Name</button>
      }
      
      <br />
      <span>We have {namesArray.length} names right now.</span>
    </div>
  );
}

export default App;
