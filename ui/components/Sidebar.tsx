export default function Sidebar() {
  const sendMessage = () => {
    figma.ui.postMessage({ type: 'send-to-api', payload: 'Hello from Sidebar!' });
  };

  return (
    <div className="sidebar">
      <h2 className="text-red-200">Sidebar Component</h2>
      <button onClick={sendMessage}>Send to api</button>
    </div>
  );
}