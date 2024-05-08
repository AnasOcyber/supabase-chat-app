const enum Styles {
  UserName = "text-sm font-semibold text-blue-500",
  Message = "text-sm font-normal py-2.5 text-gray-900",
  Status = "text-sm font-normal text-gray-500 text-gray-500",
  Background = "flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-xl mb-3",
}

interface Props {
  children: string;
  createdAt: string;
  username: string;
}

const ChatBubble = ({ children, createdAt, username }: Props) => {
  const friendlyDate = new Date(createdAt).toLocaleDateString();
  return (
    <div className={Styles.Background}>
      <div className="flex items-center space-x-2 rtl:space-x-reverse"></div>
      <span className={Styles.Status}>{username}</span>
      <p className={Styles.Message}>{children}</p>
      <span className={Styles.Status}>{friendlyDate}</span>
    </div>
  );
};

export default ChatBubble;
