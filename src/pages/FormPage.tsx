import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBusinesses } from "../apis/chatApis";

const FormPage = () => {
  const [businessName, setBusinessName] = useState("");
  const [businessFromDB, setBussinessFromDB] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (businessName) {
      localStorage.setItem("businessName", businessName);
      navigate(`/chatbot/admin/${businessName}/question-answers`);
    }
  };

  useEffect(() => {
    getBusinesses()
      .then((res) => {
        console.log("Response ", res);
        const fetchedData = res.data.data;

        const businesses = fetchedData.map((item: any) => item.business);
        setBussinessFromDB(businesses);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center  min-h-screen bg-gray-100">
      <h2 className="text-xl font-semibold text-center mb-4 text-gray-800">
        Previously configured Businesses for demo
      </h2>
      <div className="flex flex-row items-center justify-center">
        {businessFromDB.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              setBusinessName(item);
              localStorage.setItem("businessName", item);
              navigate(`/chatbot/user/${item}`);
            }}
            className="p-4 m-2 bg-gray-200 rounded-md mb-2 shadow-md cursor-pointer"
          >
            {item}
          </div>
        ))}
      </div>
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
        <h1 className="text-2xl font-bold text-center mb-6">Business Name </h1>
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="businessName"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Business Name:
          </label>
          <input
            type="text"
            id="businessName"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            required
            className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="mt-4 w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormPage;
