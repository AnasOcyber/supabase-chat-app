import ChatBubble from "./ChatBubble";
import MessageBox from "./MessageBox";
import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import ActiveUsers from "./ActiveUsers";
import { useNavigate } from "react-router-dom";

const enum Styles {
  Button = "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full w-auto px-5 py-2.5 text-center",
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
  const [onlineUsers, setOnlineUsers] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsernames();
    fetchMessages();
  }, [messages]);

  useEffect(() => {
    const channel = apiClient.channel("online");
    channel
      .on("presence", { event: "sync" }, () => {
        const userIds = [];
        const newState = channel.presenceState();

        for (let id in newState) {
          // @ts-ignore
          userIds.push(newState[id][0].user_id);
        }

        setOnlineUsers([...new Set(userIds)].length);
      })
      .subscribe(async (status) => {
        const currentUser = (await apiClient.auth.getUser()).data.user?.id;

        if (status === "SUBSCRIBED") {
          if (currentUser !== undefined)
            await channel.track({
              online_at: new Date().toISOString(),
              user_id: currentUser,
            });
        }
      });

    return () => {
      channel.unsubscribe();
    };
  }, []);

  const fetchUsernames = async () => {
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
  };

  const fetchMessages = async () => {
    const { data: messages } = await apiClient.from("messages").select();
    if (messages) {
      setMessages(messages);
      setReceived(false);
    }
  };

  const handleClick = async () => {
    try {
      const result = await apiClient.auth.signOut();
      if (result) navigate("/");
    } catch {
      console.log("Cannot sign out");
    }
  };

  return (
    <div className={Styles.Container}>
      <ActiveUsers activeUsersCount={onlineUsers} />
      <div className="mb-6">
        <button className={Styles.Button} onClick={handleClick}>
          Logout
        </button>
      </div>
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
