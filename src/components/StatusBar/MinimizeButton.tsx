import './MinimizeButton.css';
import { ipcRenderer } from 'electron';

const MinimizeButton = () => {
  const handleMinimize = () => {
    ipcRenderer.send('minimize-app');
  };

  return (
    <button className="minimize-button" onClick={handleMinimize}>
    </button>
  );
};

export default MinimizeButton;