import '@adyen/kyc-components/experimental/individual';
import type { AdyenIndividualProps } from '@adyen/kyc-components/experimental/individual';

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
webComponent.options = {
  locale: 'en-US',
  environment: 'test',
  fetchToken,
};
webComponent.settings = {
  acceptedCountries: ['AD', 'US', 'NZ'],
};

document.getElementById('root')!.appendChild(webComponent as unknown as HTMLElement);
