import { Bounce, ToastContainer, ToastContainerProps } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ToastContainerConfigProps extends ToastContainerProps {}

const ToastConfig: React.FC<ToastContainerConfigProps> = (props) => {
  const { ...additionalProps } = props;

  const toastifyConfig: ToastContainerProps = {
    toastClassName: 'toast',
    bodyClassName: 'toast-body',
    progressClassName: 'toast-progress',
    position: 'bottom-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: 'touch',
    closeButton: true,
    stacked: true,
    limit: 5,
    transition: Bounce,
    theme: 'colored',
    ...additionalProps,
  };

  return <ToastContainer {...toastifyConfig} />;
};

export default ToastConfig;
