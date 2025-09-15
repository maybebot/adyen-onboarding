import '@adyen/kyc-components/experimental/individual';
import type { AdyenIndividualProps } from '@adyen/kyc-components/experimental/individual';
import './main.css';

const fetchToken = async () => {
  try {
    const response = await fetch('/.netlify/functions/token');
    return response.json();
  } catch (error) {
    console.error('Error fetching token:', error);
  }
};

const webComponent = document.createElement('adyen-individual') as unknown as AdyenIndividualProps;
webComponent.rootlegalentityid = import.meta.env.VITE_ADYEN_LEGALENTITYID;
webComponent.locale = 'en-US';
webComponent.environment = 'test';
webComponent.fetchToken = fetchToken;

document.getElementById('root')!.appendChild(webComponent as unknown as HTMLElement);
