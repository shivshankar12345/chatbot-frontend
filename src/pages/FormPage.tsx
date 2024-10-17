import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FormPage = () => {
  const [businessName, setBusinessName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (businessName) {
      localStorage.setItem('businessName', businessName);
      navigate(`/chatbot/user/${businessName}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
        <h1 className="text-2xl font-bold text-center mb-6">Business Name Form</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-2">
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
