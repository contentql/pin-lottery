import React from 'react';
import { ToastContainer, ToastContainerProps } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ToastContainerConfigProps extends ToastContainerProps {}

const ToastConfig: React.FC<ToastContainerConfigProps> = (props) => {
  const { ...additionalProps } = props;

  const toastifyConfig: ToastContainerProps = {
    position: 'bottom-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: 'touch',
    progressClassName: 'toast-progress',
    closeButton: true,
    stacked: true,
    limit: 5,
    ...additionalProps,
  };

  return <ToastContainer {...toastifyConfig} />;
};

export default ToastConfig;
