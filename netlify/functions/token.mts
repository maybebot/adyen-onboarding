import type { Context } from '@netlify/functions';

type CreateTokenPayload = {
  allowOrigin: string;
  product: 'onboarding';
  policy: {
    resources: { legalEntityId: string; type: string }[];
    roles: string[];
  };
};

export default async (_req: Request, _context: Context) => {
  const baseUrl = `${process.env.AUTHE_URL}/api/v1/sessions`;

  // Netlify's DEPLOY_PRIME_URL is not available in functions
  const staticSiteUrl = "https://adyen-onboarding.netlify.app";

  if (
    !process.env.VITE_ADYEN_LEGALENTITYID ||
    !process.env.AUTHE_URL ||
    !process.env.AUTHE_USERNAME ||
    !process.env.AUTHE_PASSWORD
  ) {
    throw new Error('Missing env vars');
  }

  const payload: CreateTokenPayload = {
    allowOrigin: staticSiteUrl,
    product: 'onboarding',
    policy: {
      resources: [{ legalEntityId: process.env.VITE_ADYEN_LEGALENTITYID, type: 'legalEntity' }],
      roles: ['hostedOnboardingComponent'],
    },
  };
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Basic ${btoa(`${process.env.AUTHE_USERNAME}:${process.env.AUTHE_PASSWORD}`)}`,
  };

  try {
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error creating token:', error);
    console.log(`Payload: ${JSON.stringify(payload)}`);
    console.log(baseUrl);
    return new Response('Internal Server Error', { status: 500 });
  }
};
