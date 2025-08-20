import { useEffect, useState } from "react";

function App() {
  const fetchToken = async () => {
    try {
      const response = await fetch("/.netlify/functions/token");
      return response.json();
    } catch (error) {
      console.error("Error fetching token:", error);
    }
  };

  const legalEntityId = "LE3298G223226Q5N28LV6F6RM";

  const options = {
    locale: "en-US",
    country: "US" as const,
    fetchToken,
    environment: "test" as const,
  };

  const [loadedWc, setLoadedWc] = useState(false);
  useEffect(() => {
    // @ts-expect-error TODO: seems the declaration file is not read correctly
    import("@adyen/kyc-components/experimental/terms-of-service").then(() => setLoadedWc(true));
  });

  return (
    <div>
      ToS
      {loadedWc ? (
        <adyen-terms-of-service
          legalEntityId={legalEntityId}
          options={options}
        ></adyen-terms-of-service>
      ) : undefined}
    </div>
  );
}

export default App;

interface AdyenTermsOfService {
  legalEntityId: string;
  options: {
    locale: string;
    country: "US";
    fetchToken: () => Promise<{ token: string }>;
    environment: "test" | "live";
  };
}
/**
 * The syntax for adding the type of a custom element in react/TS seems to
 * have changed in react 19. This is different in react <18
 * @see https://github.com/DefinitelyTyped/DefinitelyTyped/discussions/71395
 */

declare module "react/jsx-runtime" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "adyen-terms-of-service": AdyenTermsOfService;
    }
  }
}
