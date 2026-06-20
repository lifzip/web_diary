import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.hero}>
      <div className="container">
        <div className={styles.heroContent}>
          <h1 className={styles.title}>All About You</h1>
          <p className={styles.subtitle}>
            Ruang aman untuk meluapkan segala emosi, pikiran, dan cerita Anda.
            Sebuah diary online bernuansa tenang yang mengerti perasaan Anda.
          </p>
          <div className={styles.actions}>
            <Link href="/dashboard" className="btn-primary">
              Mulai Menulis
            </Link>
            <Link href="/login" className="btn-secondary">
              Masuk
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
