import { FiX, FiPlus, FiMessageSquare, FiUser } from 'react-icons/fi';
import styles from '../page.module.css';

export default function Sidebar({ sidebarOpen, toggleSidebar, startNewChat, messages }) {
  return (
    <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
      <div className={styles.sidebarHeader}>
        <div className={styles.sidebarTop}>
          <h2 className={styles.sidebarTitle}>AIW</h2>
          <button className={styles.closeSidebarButton} onClick={toggleSidebar}>
            <FiX />
          </button>
        </div>
        <button className={styles.newChatButton} onClick={startNewChat}>
          <FiPlus /> New Chat
        </button>
      </div>
      
      <nav className={styles.sidebarNav}>
        {messages.length > 0 && (
          <div className={styles.conversations}>
            <div className={styles.sectionTitle}>
              <span>Recent Conversations</span>
              <div className={styles.divider}></div>
            </div>
            <div className={styles.conversationList}>
              <div className={styles.conversationItem + ' ' + styles.active}>
                <div className={styles.conversationIcon}>
                  <FiMessageSquare />
                </div>
                <div className={styles.conversationDetails}>
                  <span className={styles.conversationName}>Current Chat</span>
                  <span className={styles.conversationTime}>Just now</span>
                </div>
              </div>
              <div className={styles.conversationItem}>
                <div className={styles.conversationIcon}>
                  <FiMessageSquare />
                </div>
                <div className={styles.conversationDetails}>
                  <span className={styles.conversationName}>Previous Chat</span>
                  <span className={styles.conversationTime}>Yesterday</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className={styles.models}>
          <div className={styles.sectionTitle}>
            <span>AI Models</span>
            <div className={styles.divider}></div>
          </div>
          <div className={styles.modelList}>
            <div className={styles.modelItem + ' ' + styles.active}>
              <div className={styles.modelDot}></div>
              <div className={styles.modelDetails}>
                <span className={styles.modelName}>AIW Standard</span>
                <span className={styles.modelDesc}>General purpose assistant</span>
              </div>
            </div>
            <div className={styles.modelItem}>
              <div className={styles.modelDot + ' ' + styles.modelDotAlt}></div>
              <div className={styles.modelDetails}>
                <span className={styles.modelName}>AIW Creative</span>
                <span className={styles.modelDesc}>Enhanced creative capabilities</span>
              </div>
            </div>
            <div className={styles.modelItem}>
              <div className={styles.modelDot + ' ' + styles.modelDotAlt2}></div>
              <div className={styles.modelDetails}>
                <span className={styles.modelName}>AIW Technical</span>
                <span className={styles.modelDesc}>Technical and coding expertise</span>
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      <div className={styles.sidebarFooter}>
        <div className={styles.upgradeCard}>
          <div className={styles.upgradeIcon}>⭐</div>
          <div className={styles.upgradeDetails}>
            <span className={styles.upgradeTitle}>Upgrade to Pro</span>
            <span className={styles.upgradeDesc}>Get exclusive features</span>
          </div>
        </div>
        
        <div className={styles.userProfile}>
          <div className={styles.userAvatar}>
            <FiUser />
          </div>
          <div className={styles.userDetails}>
            <span className={styles.userName}>User</span>
            <span className={styles.userStatus}>Free Plan</span>
          </div>
        </div>
      </div>
    </aside>
  );
}