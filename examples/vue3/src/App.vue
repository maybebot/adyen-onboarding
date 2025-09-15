<template>
  <div>
    ToS
    <adyen-terms-of-service
      :rootlegalentityid="rootLegalEntityId"
      :options="{
        locale: 'en-US',
        environment: 'test',
        fetchToken,
      }"
    ></adyen-terms-of-service>
  </div>
</template>

<script setup lang="ts">
import '@adyen/kyc-components/experimental/terms-of-service';

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
