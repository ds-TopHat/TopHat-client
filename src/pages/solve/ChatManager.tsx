import * as styles from './solve.css';

export type Chat = {
  from: 'me' | 'server';
  text?: string; // 일반 텍스트 또는 HTML(SVG 포함)
  imageUrl?: string;
};

interface ChatManagerProps {
  chat: Chat;
}

const ChatManager = ({ chat }: ChatManagerProps) => {
  const renderText = () => {
    if (!chat.text) {
      return null;
    }

    if (chat.from === 'server') {
      // 서버 메시지는 이미 HTML/SVG일 수 있으므로 그대로 렌더링
      return (
        <div
          className={styles.chatServerText}
          dangerouslySetInnerHTML={{ __html: chat.text }}
        />
      );
    }

    // 사용자의 메시지는 일반 텍스트로
    return <div className={styles.chatText}>{chat.text}</div>;
  };

  return (
    <div
      className={
        chat.from === 'me' ? styles.chatBubbleRight : styles.chatBubbleLeft
      }
    >
      {chat.imageUrl && (
        <img src={chat.imageUrl} alt="" className={styles.chatImage} />
      )}
      {renderText()}
    </div>
  );
};

export default ChatManager;
