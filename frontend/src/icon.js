import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faTrash,
  faX,
  faFileExcel,
  faPlus,
  faBriefcaseMedical,
  faUpload,
  faDownload
} from '@fortawesome/free-solid-svg-icons';

// Add icons to the library
library.add(faTrash, faX, faFileExcel, faPlus, faBriefcaseMedical,faDownload,faUpload);

export { FontAwesomeIcon };
