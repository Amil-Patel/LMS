// ToastNotification.js
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const ToastMessage = () => {
  return <ToastContainer position="bottom-right" />;
};

export const notifySuccess = (message) => {
  toast.success(message);
};

export const notifyError = (message) => {
  toast.error(message);
};

export const notifyInfo = (message) => {
  toast.info(message);
};

export const notifyWarning = (message) => {
  toast.warning(message);
};

export default ToastMessage;
