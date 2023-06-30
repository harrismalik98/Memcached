import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);

  useEffect(()=> {

    const fetchData = async () => {
      try
      {
        const response = await fetch('http://localhost:5000/statuses');
        const data = await response.json();
        // console.log(data);
        setData(data);
      }
      catch(error)
      {
        console.log('Error:', error);
      }
    };

    fetchData();

  },[setData]);

  
  return (
    <div className='table-container'>
      <table className='styled-table'>
              <thead>
                <tr>
                  <th>User's Name</th>
                  <th>Active Status</th>
                </tr>
              </thead>
        {data.map((item) => (
              <tbody key={item.name}>
                <tr>
                  <td>{item.name}</td>
                  <td>{item.active}</td>
                </tr>
              </tbody>
        ))}
      </table>
    </div>
  );
};

export default App;
