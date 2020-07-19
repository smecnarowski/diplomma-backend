import Vue from 'vue'
import VueSanitize from 'vue-sanitize';

const defaultOptions = {
  allowedTags: [
    'b', 
    'br',
    'dd',
    'del',
    'dl',
    'dt',
    'h1',
    'h2',
    'h3',
    'hr',
    'i',
    'li',
    'ol',
    'p',
    's',
    'strong',
    'strike',
    'sub',
    'sup',
    'ul',
  ],
};

Vue.use(VueSanitize, defaultOptions);
