import { useState } from 'react';
import { FiFile, FiImage, FiX } from 'react-icons/fi';
import styles from '../page.module.css';

export default function FileAttachment({ attachment, onClose }) {
  const [showPreview, setShowPreview] = useState(false);
  
  if (!attachment) return null;
  
  const togglePreview = () => {
    setShowPreview(!showPreview);
  };
  
  return (
    <div className={styles.attachmentContainer}>
      <div className={styles.attachmentIcon} onClick={togglePreview}>
        {attachment.type === 'image' ? <FiImage /> : <FiFile />}
        <span className={styles.attachmentName}>{attachment.name}</span>
      </div>
      
      {showPreview && (
        <div className={styles.previewOverlay} onClick={(e) => {
          if (e.target === e.currentTarget) togglePreview();
        }}>
          <div className={styles.previewContent}>
            <button className={styles.closePreview} onClick={togglePreview}>
              <FiX />
            </button>
            
            {attachment.type === 'image' ? (
              <img 
                src={attachment.content} 
                alt={attachment.name} 
                className={styles.imagePreview} 
              />
            ) : (
              <pre className={styles.textPreview}>{attachment.content}</pre>
            )}
          </div>
        </div>
      )}
    </div>
  );
}