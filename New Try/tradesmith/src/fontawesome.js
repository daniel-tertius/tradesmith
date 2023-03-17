import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
    faQuestionCircle,
    faSeedling,
    faCircleDot,
    faHistory,
    faArrowLeft,
    faSave
} from '@fortawesome/free-solid-svg-icons';

library.add(faQuestionCircle);
library.add(faSeedling);
library.add(faCircleDot);
library.add(faHistory);
library.add(faArrowLeft);
library.add(faSave);

export function addIcons(app) {
    app.component('font-awesome-icon', FontAwesomeIcon);

    return app;
}