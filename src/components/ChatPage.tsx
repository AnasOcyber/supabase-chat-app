import ChatBubble from "./ChatBubble";
import MessageBox from "./MessageBox";
import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

const enum Styles {
  Container = "flex flex-col p-6 justify-center items-center",
}

interface Message {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
}

const ChatPage = () => {
  const [isReceived, setReceived] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [usernames, setUsernames] = useState<{ [userId: string]: string }>({});

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data: messages } = await apiClient.from("messages").select();
        if (messages) {
          setMessages(messages);
          setReceived(false);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchMessages();
  }, [messages]);

  useEffect(() => {
    const fetchUsernames = async () => {
      try {
        const userIds = messages.map((message) => message.user_id);
        const { data: profiles } = await apiClient
          .from("profiles")
          .select()
          .in("id", userIds);
        const usernameMap: { [userId: string]: string } = {};

        if (profiles)
          profiles.forEach((profile) => {
            usernameMap[profile.id] = profile.username;
          });
        setUsernames(usernameMap);
      } catch (error) {
        console.error("Error fetching profiles:", error);
      }
    };

    fetchUsernames();
  }, [messages]);

  return (
    <div className={Styles.Container}>
      {messages.map((message) => {
        return (
          <ChatBubble
            key={message.id}
            createdAt={message.created_at}
            username={usernames[message.user_id]}
          >
            {message.content}
          </ChatBubble>
        );
      })}
      <div className="fixed bottom-6">
        <MessageBox onClick={() => setReceived(!isReceived)} />
      </div>
    </div>
  );
};

export default ChatPage;
