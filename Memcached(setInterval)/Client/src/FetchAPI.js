import React, { useEffect, useState } from "react";

const App = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/statuses');
      const reader = response.body.getReader();
      let result = '';
      let done = false;

      while (!done) {
        const { value, done: isDone } = await reader.read();
        done = isDone;

        if (value) {
          const chunk = new TextDecoder('utf-8').decode(value);
          result += chunk;

          const newData = parseData(result); // Custom parsing function
          if (newData) {
            setData(newData);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const parseData = (result) => {
    try {
      const lines = result.split('\n');

      let jsonData = null;
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].startsWith('data: ')) {
          const jsonStr = lines[i].substring(6);
          jsonData = JSON.parse(jsonStr);
        }
      }

      return jsonData;
    } catch (error) {
      console.error('Error parsing data:', error);
      return null;
    }
  };



  useEffect(() => {
    fetchData(); // Fetch initial data

    const interval = setInterval(fetchData, 3000); // Fetch data every 3 seconds

    return () => {
      clearInterval(interval); // Clear the interval on component unmount
    };
  }, []);


  return (
    <div>
      {console.log(data[0])}
      {data.map((item, index) => (
        <div key={index}>
          <p>Name: {item.name}</p>
          <p>Status: {item.active}</p>
        </div>
    ))}
    </div>
  );
};

export default App;
