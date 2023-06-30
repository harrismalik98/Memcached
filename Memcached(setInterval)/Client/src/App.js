import React, { useEffect, useState } from "react";

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource('http://localhost:5000/statuses');
  
    eventSource.onmessage = (event) => {

      const responseData = JSON.parse(event.data);
      setData(responseData);
    };
  
    eventSource.onerror = (error) => {
      console.error('Error:', error);
      eventSource.close();
    };
  
    return () => {
      eventSource.close();
    };
  }, []);

  
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
