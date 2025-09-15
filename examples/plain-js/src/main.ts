import '@adyen/kyc-components/experimental/manage-transfer-instruments';
import type { AdyenManageTransferInstrumentsProps } from '@adyen/kyc-components/experimental/manage-transfer-instruments';
import './main.css';

const fetchToken = async () => {
  try {
    const response = await fetch('/.netlify/functions/token');
    return response.json();
  } catch (error) {
    console.error('Error fetching token:', error);
  }
};

const webComponent = document.createElement(
  'adyen-manage-transfer-instruments',
) as unknown as AdyenManageTransferInstrumentsProps;
webComponent.rootlegalentityid = import.meta.env.VITE_ADYEN_LEGALENTITYID;
webComponent.locale = 'en-US';
webComponent.environment = 'test';
webComponent.fetchToken = fetchToken;
webComponent.onAdd = () => {};
webComponent.onEdit = () => {};

document.getElementById('root')!.appendChild(webComponent as unknown as HTMLElement);
