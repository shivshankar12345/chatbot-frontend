import { useState } from "react";
import axios from "axios";

function App() {
  const [business, setBusiness] = useState("");
  const [conversationTree, setConversationTree] = useState({});

  const handleSubmit = async () => {
    await axios.post("http://localhost:5000/api/bot-config", {
      business,
      conversationTree,
    });
    alert("Bot configuration saved!");
  };

  return (
    <div>
      <h1>Configure Chatbot</h1>
      <input
        type="text"
        placeholder="Business Name"
        value={business}
        onChange={(e) => setBusiness(e.target.value)}
      />
      <textarea
        placeholder="Conversation Tree (in JSON format)"
        rows={10}
        cols={50}
        value={JSON.stringify(conversationTree, null, 2)}
        onChange={(e) => setConversationTree(JSON.parse(e.target.value))}
      />
      <button onClick={handleSubmit}>Save Configuration</button>
    </div>
  );
}

export default App;
