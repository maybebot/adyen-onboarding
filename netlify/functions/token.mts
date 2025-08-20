import type { Context } from "@netlify/functions";

type CreateTokenPayload = {
  allowOrigin: string;
  product: "onboarding";
  policy: {
    resources: { legalEntityId: string; type: string }[];
    roles: string[];
  };
};

export default async (req: Request, context: Context) => {
  const baseUrl = "https://test.adyen.com/authe/api/v1/sessions";
  const payload: CreateTokenPayload = {
    allowOrigin: "https://adyen-onboarding.netlify.app",
    product: "onboarding",
    policy: {
      resources: [{ legalEntityId: process.env.ADYEN_LEGALENTITYID!, type: "legalEntity" }],
      roles: ["hostedOnboardingComponent"],
    },
  };
  const headers = {
    "Content-Type": "application/json",
    "X-API-KEY": process.env.ADYEN_LEM_API_KEY!,
  };

  try {
    const response = await fetch(baseUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating token:", error);
    console.log(`Payload: ${JSON.stringify(payload)}`);
    console.log(baseUrl);
    return new Response("Internal Server Error", { status: 500 });
  }
};
