import '@adyen/kyc-components/experimental/terms-of-service';

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
      <adyen-terms-of-service
        options={{
          locale: 'en-US',
          environment: 'test',
          fetchToken,
        }}
        rootlegalentityid={import.meta.env.VITE_ADYEN_LEGALENTITYID}
        settings={{
          acceptedCountries: ['AD', 'US', 'NZ'],
        }}
      ></adyen-terms-of-service>
    </div>
  );
}

export default App;
