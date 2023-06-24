import Button from '@/components/BaseButton.vue';
import ButtonGroup from '@/components/BaseButtonGroup.vue';
import Banner from '@/components/BaseBanner.vue';
import Container from '@/components/BaseContainer.vue';
import InfoField from '@/components/InfoField.vue';
import ErrorAlert from '@/components/ErrorAlert.vue';
import SubHeading from '@/components/TradesmithSubHeading.vue';
import Heading from '@/components/TradesmithHeading.vue';
import BaseSpinner from '@/components/BaseSpinner.vue';

import { App } from 'vue';

export default function addGlobalComponents(app: App<Element>) {
    app.component("base-button", Button);
    app.component("base-button-group", ButtonGroup);
    app.component("base-banner", Banner);
    app.component("base-spinner", BaseSpinner);
    app.component("base-container", Container);
    app.component("info-field", InfoField);
    app.component("error-alert", ErrorAlert);

    app.component("tradesmith-sub-heading", SubHeading);
    app.component("tradesmith-heading", Heading);

    return app;
}