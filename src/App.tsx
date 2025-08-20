import {  useState, type DOMAttributes } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import { TermsOfService } from "@adyen/kyc-components/experimental/react/terms-of-service";
import "@adyen/kyc-components/experimental/terms-of-service";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  const fetchToken = async () => {
    try {
      const response = await fetch("/.netlify/functions/token");
      console.log(response);
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
    environment: "test",
  };

  return (
    <>
      <div>
        ToS
        {/* <TermsOfService legalEntityId={process.env.VITE_ADYEN_LEGALENTITYID!} options={options} /> */}
        {/* @ts-expect-error wip */}
        <adyen-terms-of-service
          legalEntityId={legalEntityId}
          options={options}
          sdkOptions={options}
        >
          {/* @ts-expect-error wip */}
        </adyen-terms-of-service>
        {/* <adyen-terms-of-service
          legalEntityId={process.env.VITE_ADYEN_LEGALENTITYID}
          api-key={import.meta.env.VITE_ADYEN_LEM_API_KEY}
          allow-origin="https://adyen-onboarding.netlify.app"
          product="onboarding"
          policy='{"resources":[{"legalEntityId":"{legalEntityId}","type":"legalEntity"}],"roles":["hostedOnboardingComponent"]}'
        ></adyen-terms-of-service> */}
      </div>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CustomElement<T> = Partial<T & DOMAttributes<T> & { children?: any }>;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      "adyen-terms-of-service": CustomElement<any>;
    }
  }
}
