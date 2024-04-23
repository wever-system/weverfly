import './CloseButton.css'; // 스타일 시트 임포트
import { ipcRenderer } from 'electron';

const CloseButton = () => {
  const handleClose = () => {
    ipcRenderer.send('close-app');
  };

  return (
    <button className="close-button" onClick={handleClose}>
    </button>
  );
};

export default CloseButton;