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
  faList,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import { App } from 'vue';

const icons = [
  faQuestionCircle,
  faSeedling,
  faCircleDot,
  faHistory,
  faArrowLeft,
  faSave,
  faFlagCheckered,
  faRepeat,
  faEdit,
  faList,
  faTimes
];

library.add(...icons);

export default function addIcons(app: App<Element>) {
  app.component('font-awesome-icon', FontAwesomeIcon);

  return app;
}
