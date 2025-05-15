import { FiMenu } from 'react-icons/fi';
import styles from '../page.module.css';

export default function Header({ toggleSidebar }) {
  return (
    <header className={styles.header}>
      <button className={styles.menuButton} onClick={toggleSidebar}>
        <FiMenu />
      </button>
      <h1>AIW</h1>
    </header>
  );
}