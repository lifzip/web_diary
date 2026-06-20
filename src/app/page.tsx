import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={`container ${styles.headerContainer}`}>
          <div className={styles.logo}>All About You</div>
          <nav className={styles.nav}>
            <Link href="/login" className={styles.navLink}>Masuk</Link>
            <Link href="/register" className={`btn-primary ${styles.navBtn}`}>Daftar</Link>
          </nav>
        </div>
      </header>

      <main className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <h1 className={styles.title}>Ruang Aman Untuk Pikiran Anda</h1>
            <p className={styles.subtitle}>
              Sebuah diary online bernuansa tenang yang mengerti perasaan Anda. 
              Luapkan segala emosi dan cerita Anda di sini.
            </p>
            <div className={styles.actions}>
              <Link href="/dashboard" className="btn-primary">
                Mulai Menulis
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
