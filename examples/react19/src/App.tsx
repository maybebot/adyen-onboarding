import '@adyen/kyc-components/experimental/individual';
import './App.css';

const fetchToken = async () => {
  try {
    const response = await fetch('/.netlify/functions/token');
    return response.json();
  } catch (error) {
    console.error('Error fetching token:', error);
  }
};

function App() {
  return (
    <div>
      ToS
      <adyen-individual
        locale="en-US"
        environment="test"
        fetchToken={fetchToken}
        rootlegalentityid={import.meta.env.VITE_ADYEN_LEGALENTITYID}
      ></adyen-individual>
    </div>
  );
}

export default App;
