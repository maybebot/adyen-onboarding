import { useEffect, useState } from "react";
import AdyenKyc from "@adyen/kyc-components";
import "@adyen/kyc-components/styles.css";

function App() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await fetch("/.netlify/functions/token");
        const data = await response.json();
        setToken(data.token);
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };
    fetchToken();
  }, []);

  useEffect(() => {
    if (!token) return;

    const legalEntityId = "LE3298G223226Q5N28LV6F6RM";

    const adyenKycHandler = new AdyenKyc({
      locale: "en-US",
      country: "US",
      environment: "https://test.adyen.com",
      sdkToken: token,
      getSdkToken: async () => ({ token }),
    });

    adyenKycHandler
      .create("createIndividualComponent", {
        legalEntityId,
        onSubmitSuccess: (submittedData) => {
          console.log(submittedData);
        },
        modalView: false,
        onClose: () => {},
      })
      .mount("#create-individual-container");
  }, [token]);

  return (
    <div>
      <div id="create-individual-container"></div>
    </div>
  );
}

export default App;
