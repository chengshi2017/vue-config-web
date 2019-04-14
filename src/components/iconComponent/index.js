import { Icon } from 'ant-design-vue';
import { getHost } from '@/utils/common';

const IconCite = Icon.createFromIconfontCN({
  scriptUrl: getHost('VUE_APP_URL')
});

const IconFont = {
  install: function(Vue) {
    Vue.component('IconFont', IconCite);
  }
};

export default IconFont;
