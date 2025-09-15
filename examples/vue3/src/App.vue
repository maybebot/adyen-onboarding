<template>
  <div>
    ToS
    <adyen-individual
      :rootlegalentityid="rootLegalEntityId"
      :fetchToken="fetchToken"
      locale="en-US"
      environment="test"
    ></adyen-individual>
  </div>
</template>

<script setup lang="ts">
import '@adyen/kyc-components/experimental/individual';

const rootLegalEntityId = import.meta.env.VITE_ADYEN_LEGALENTITYID;

const fetchToken = async () => {
  try {
    const response = await fetch('/.netlify/functions/token');
    return response.json();
  } catch (error) {
    console.error('Error fetching token:', error);
  }
};
</script>
