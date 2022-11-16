/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { toast, ToastOptions } from 'react-toastify';

interface Notify {
  [key: string]: any;
}

const toastify = (message: string, type: 'error' | 'info' | 'success'): void => {
  const toastConfig: ToastOptions<{}> = {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  const notifyTypes: Notify = {
    success: () => toast.success(message, toastConfig),
    error: () => toast.error(message, toastConfig),
    info: () => toast.info(message, toastConfig),
  };

  return (notifyTypes[type] || notifyTypes.success)();
};

export default toastify;
