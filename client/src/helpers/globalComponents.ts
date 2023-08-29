import { App } from 'vue';

// Import components
import Button from '@/components/BaseButton.vue';
import ButtonGroup from '@/components/BaseButtonGroup.vue';
import Banner from '@/components/BaseBanner.vue';
import Container from '@/components/BaseContainer.vue';
import InfoField from '@/components/InfoField.vue';
import ErrorAlert from '@/components/ErrorAlert.vue';
import SubHeading from '@/components/TradesmithSubHeading.vue';
import Heading from '@/components/TradesmithHeading.vue';
import BaseSpinner from '@/components/BaseSpinner.vue';

// Define component names and their corresponding imports
const components = {
  'base-button': Button,
  'base-button-group': ButtonGroup,
  'base-banner': Banner,
  'base-spinner': BaseSpinner,
  'base-container': Container,
  'info-field': InfoField,
  'error-alert': ErrorAlert,
  'tradesmith-sub-heading': SubHeading,
  'tradesmith-heading': Heading,
};

// Register components globally
export default function addGlobalComponents(app: App<Element>) {
  Object.entries(components).forEach(([name, component]) => {
    app.component(name, component);
  });

  return app;
}
