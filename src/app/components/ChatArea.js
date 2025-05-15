import { FiUser, FiFile } from 'react-icons/fi';
import styles from '../page.module.css';
import FileAttachment from './FileAttachment';

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
            
            {message.files && message.files.length > 0 && (
              <div className={styles.messageFiles}>
                {message.files.map((file, fileIndex) => (
                  <div key={fileIndex} className={styles.embeddedFile}>
                    {file.type === 'image' ? (
                      <img 
                        src={file.content || file.preview} 
                        alt={file.name} 
                        className={styles.inlineImage} 
                      />
                    ) : (
                      <div className={styles.inlineFile}>
                        <div className={styles.inlineFileHeader}>
                          <FiFile /> {file.name}
                        </div>
                        {file.content && (
                          <pre className={styles.inlineText}>{file.content}</pre>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
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