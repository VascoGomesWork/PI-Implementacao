import React from "react";
import Router from "./Router";
// install axios -> npm install axios
//https://www.youtube.com/watch?v=sBw0O5YTT4Q @ 24.48

function App() {
  return <div>
    <Router />
  </div>;
}

export default App;

//const [data, setData] = useState([{}]);

/**useEffect(() => {
    fetch("/members")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        //console.log(data);
      });
  }, []);*/
