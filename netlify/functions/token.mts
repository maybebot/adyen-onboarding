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
  const baseUrl = "https://test.adyen.com/authe/v1/sessions";
  const payload: CreateTokenPayload = {
    allowOrigin: "https://example.com",
    product: "onboarding",
    policy: {
      resources: [
        { legalEntityId: "123456789", type: "legalEntity" },
        { legalEntityId: "987654321", type: "legalEntity" },
      ],
      roles: [],
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
    return new Response("Internal Server Error", { status: 500 });
  }
};
