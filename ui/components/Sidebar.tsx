import { api } from "@ui/lib/api";

export default function Sidebar() {
  const sendMessage = () => {
    api("greet", { name: "Asmoday" });
  };

  return (
    <div className="sidebar">
      <h2 className="text-red-200">Sidebar Component</h2>
      <button onClick={sendMessage}>Send to api</button>
    </div>
  );
}