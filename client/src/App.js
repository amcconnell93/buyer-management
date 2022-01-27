import { useState, useEffect, Fragment } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useSearchParams
} from "react-router-dom";

const ManagePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.get("buyer_management_token"))
  return (
    <div>
      <p>Manage page</p>
    </div>
  );
}

const UpdatePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.get("buyer_management_token"))
  return (
    <div>
      <p>Update card page</p>
    </div>
  );
}

const ErrorPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.get("buyer_management_token"))
  return (
    <div>
      <p>Error page</p>
    </div>
  );
}

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  useEffect(() => {
    console.log(`data state updated: ${data}`)
  }, [data]);

  return (
    <Router>
      <Routes>
        <Route path="/buyer-subscriptions/manage" element={<ManagePage />} />
        <Route path="/buyer-subscriptions/update" element={<UpdatePage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
