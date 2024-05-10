interface Props {
  isTyping: boolean;
}

const TypingIndicator = ({ isTyping }: Props) => {
  return <>{isTyping && <div className="animate-pulse">typing...</div>}</>;
};

export default TypingIndicator;
