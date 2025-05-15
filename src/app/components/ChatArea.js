import { FiUser } from 'react-icons/fi';
import styles from '../page.module.css';

export default function ChatArea({ messages, loading, messagesEndRef }) {
  return (
    <div className={styles.chatArea}>
      {messages.map((message, index) => (
        <div 
          key={index} 
          className={`${styles.message} ${message.role === 'user' ? styles.userMessage : styles.assistantMessage}`}
        >
          <div className={styles.messageAvatar}>
            {message.role === 'user' ? <FiUser /> : 'AI'}
          </div>
          <div className={styles.messageContent}>
            {message.content}
          </div>
        </div>
      ))}
      {loading && (
        <div className={`${styles.message} ${styles.assistantMessage}`}>
          <div className={styles.messageAvatar}>AI</div>
          <div className={styles.messageContent}>
            <div className={styles.loadingDots}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}