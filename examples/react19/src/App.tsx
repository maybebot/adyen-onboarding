import '@adyen/kyc-components/experimental/manage-transfer-instruments';
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
      <adyen-manage-transfer-instruments
        locale="en-US"
        environment="test"
        fetchToken={fetchToken}
        rootlegalentityid={import.meta.env.VITE_ADYEN_LEGALENTITYID}
        onAdd={() => {}}
        onEdit={() => {}}
      ></adyen-manage-transfer-instruments>
    </div>
  );
}

export default App;
