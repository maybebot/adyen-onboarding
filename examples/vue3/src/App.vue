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
// @ts-ignore
import 'https://bae81f955b.cdn.adyen.com/kyc-components-sdk/3.73.0/adyen-individual.js';

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

<style>
:root {
  --adyen-sdk-text-body-font-family:
    'Inter', -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell,
    Fira Sans, Droid Sans, Helvetica Neue, sans-serif;

  --adyen-sdk-text-body-stronger-font-weight: 600;
  --adyen-sdk-text-caption-stronger-font-weight: 600;
  --adyen-sdk-text-body-strongest-font-weight: 700;
  --adyen-sdk-text-title-font-weight: 700;
  --adyen-sdk-text-title-m-font-weight: 700;
  --adyen-sdk-text-title-l-font-weight: 700;

  --adyen-sdk-color-outline-tertiary: #ebebeb;
  --adyen-sdk-color-outline-tertiary-hover: #ee5959;
  --adyen-sdk-color-outline-tertiary-active: #ee5959;

  --adyen-sdk-color-background-inverse-primary: #ee5959;
  --adyen-sdk-color-background-inverse-primary-hover: #ee5959;
  --adyen-sdk-color-background-inverse-primary-active: #ee5959;

  --adyen-sdk-color-label-primary: #293d50;
  --adyen-sdk-color-label-primary-hover: #293d50;
  --adyen-sdk-color-label-primary-active: #293d50;

  --adyen-sdk-color-label-secondary: rgba(117, 117, 117);
  --adyen-sdk-color-label-secondary-hover: rgba(117, 117, 117);
  --adyen-sdk-color-label-secondary-active: rgba(117, 117, 117);

  --adyen-sdk-color-link-primary: #ee5959;
  --adyen-sdk-color-link-primary-hover: #ee5959;
  --adyen-sdk-color-link-primary-active: #ee5959;
  --adyen-sdk-color-link-primary-disabled: #8d95a3;

  --adyen-sdk-color-label-highlight: #ee5959;
  --adyen-sdk-color-background-highlight: #ee5959;

  --adyen-sdk-border-radius-m: 15px;
}
</style>
