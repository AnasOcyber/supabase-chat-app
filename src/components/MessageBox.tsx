import { useState, FormEvent, useRef, useEffect } from "react";
import apiClient from "../services/api-client";

const enum Styles {
  Box = "flex gap-3",
  Input = "w-full p-3 ps-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base",
  Button = "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-auto px-5 py-2.5 text-center",
}

interface Props {
  onClick: () => void;
}

const MessageBox = ({ onClick: handleClick }: Props) => {
  const contentRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState({
    content: "",
    user_id: "",
  });

  useEffect(() => {
    apiClient.auth.getUser().then(({ data }) => {
      if (data.user?.id) {
        setMessage((prevMessage) => ({
          ...prevMessage,
          user_id: data.user.id,
        }));
      }
    });
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (contentRef.current?.value && message.user_id) {
      const newMessage = {
        ...message,
        content: contentRef.current.value,
      };

      await apiClient.from("messages").insert(newMessage).select();
      contentRef.current.value = "";
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={Styles.Box}>
        <input
          ref={contentRef}
          type="text"
          className={Styles.Input}
          placeholder="New message"
        />
        <button type="submit" onClick={handleClick} className={Styles.Button}>
          Send
        </button>
      </div>
    </form>
  );
};

export default MessageBox;
