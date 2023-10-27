
import { createApp } from 'vue';
import store from '../store/index';

export default ({ app }) => {
  app.use(store);
};
