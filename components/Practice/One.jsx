"use client";

import { useState } from "react";

const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
];

export default function Home() {
  const [currentUser, setCurrentUser] = useState(users[0]); // Default user
  const [groupName, setGroupName] = useState("");
  const [groups, setGroups] = useState([]); // List of groups
  const [selectedGroup, setSelectedGroup] = useState(null); // Active group
  const [message, setMessage] = useState("");

  // ✅ Group Create karne ka function
  const createGroup = () => {
    if (!groupName.trim()) return;
    const newGroup = { name: groupName, messages: [] };
    setGroups([...groups, newGroup]);
    setGroupName("");
  };

  // ✅ Message Send karne ka function (Selected Group mein)
  const sendMessage = () => {
    if (!message.trim() || !selectedGroup) return;

    const updatedGroups = groups.map((group) => {
      if (group.name === selectedGroup.name) {
        return {
          ...group,
          messages: [...group.messages, { user: currentUser.name, text: message }],
        };
      }
      return group;
    });

    setGroups(updatedGroups);
    setMessage("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">Group Chat App</h1>

      {/* Group Create Input */}
      <div className="mb-4 w-72 flex">
        <input
          type="text"
          placeholder="Enter group name..."
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button onClick={createGroup} className="ml-2 px-4 py-2 bg-green-500 text-white rounded">
          Create
        </button>
      </div>

      {/* Available Groups List */}
      <div className="mb-4 w-72">
        <h2 className="text-lg font-semibold mb-2">Groups:</h2>
        <div className="flex space-x-2">
          {groups.map((group, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded ${
                selectedGroup?.name === group.name ? "bg-purple-500 text-white" : "bg-gray-300"
              }`}
              onClick={() => setSelectedGroup(group)}
            >
              {group.name}
            </button>
          ))}
        </div>
      </div>

      {/* User Login Switch */}
      <div className="flex space-x-2 mb-4">
        {users.map((user) => (
          <button
            key={user.id}
            className={`px-4 py-2 rounded ${
              currentUser.id === user.id ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
            onClick={() => setCurrentUser(user)}
          >
            {user.name}
          </button>
        ))}
      </div>






      {/* Messages Display */}
      {selectedGroup && (
        <div className="w-72 h-40 overflow-y-auto border p-2 mb-4 rounded bg-gray-100">
          {selectedGroup.messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 my-1 rounded w-fit ${
                msg.user === currentUser.name ? "bg-blue-300 ml-auto" : "bg-green-300"
              }`}
            >
              <strong>{msg.user}:</strong> {msg.text}
            </div>
          ))}
        </div>
      )}










      {/* Message Input */}
      {selectedGroup && (
        <div className="flex w-72">
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 p-2 border rounded"
          />
          <button onClick={sendMessage} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded">
            Send
          </button>
        </div>
      )}
    </div>
  );
}