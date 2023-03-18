import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
    faQuestionCircle,
    faSeedling,
    faCircleDot,
    faHistory,
    faArrowLeft,
    faSave,
    faRepeat,
    faFlagCheckered,
    faEdit,
    faList
} from '@fortawesome/free-solid-svg-icons';

library.add(faQuestionCircle);
library.add(faSeedling);
library.add(faCircleDot);
library.add(faHistory);
library.add(faArrowLeft);
library.add(faSave);
library.add(faFlagCheckered);
library.add(faRepeat);
library.add(faEdit);
library.add(faList);

export function addIcons(app) {
    app.component('font-awesome-icon', FontAwesomeIcon);

    return app;
}