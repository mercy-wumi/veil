"use client";

import { useState, MouseEvent } from "react";

export default function page() {
  const [message, setMessage] = useState("");
  const handleeSendMessage = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("send message:", message);
    alert("Message sent!");
  };
  return (
    <div className="sent-messages">
      <p>Here is the sent messages page.</p>
      <div className="messages">
        <p>Message 1</p>
      </div>
    </div>
  );
}
