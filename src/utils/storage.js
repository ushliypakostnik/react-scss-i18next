import Cookies from "js-cookie";

import {
  COOKIES,
  AUTO_LANG,
} from '../store/constants';

// Auto language
if (typeof(AUTO_LANG) !== 'undefined') {
  Cookies.set(COOKIES.LANG.name, AUTO_LANG, { expires: COOKIES.LANG.expires });
}

export const rememberLanguage = language => {
  if (typeof(language) !== 'undefined') {
    Cookies.set(COOKIES.LANG.name, language, { expires: COOKIES.LANG.expires });
  }
};

export default Storage;
