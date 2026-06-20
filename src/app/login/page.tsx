import Link from "next/link";
import styles from "./page.module.css";

export default function LoginPage() {
  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <h1 className={styles.title}>Masuk</h1>
        <p className={styles.subtitle}>Selamat datang kembali di ruang amanmu.</p>
        
        <form>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required placeholder="email@contoh.com" />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="password">Kata Sandi</label>
            <input type="password" id="password" name="password" required placeholder="••••••••" />
          </div>
          
          <button type="submit" className={`btn-primary ${styles.authButton}`}>
            Masuk
          </button>
        </form>
        
        <div className={styles.authLinks}>
          Belum punya akun? <Link href="/register">Daftar sekarang</Link>
        </div>
      </div>
    </div>
  );
}
