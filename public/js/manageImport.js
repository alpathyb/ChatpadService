/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alert';
import { showLoader, hideLoader } from './loader';

export const manageImport = async (data) => {
  showLoader();
  try {
    const url = '/api/v1/trainings/insert-many';
    const method = 'POST';

    const res = await axios({
      method,
      url,
      data,
    });

    if (res.data.status === 'success') {
      window.setTimeout(() => {
        hideLoader();
        location.reload(true);
      }, 1000);
    }
  } catch (e) {
    hideLoader();
    showAlert('error', e.response.data.message);
  }
};
