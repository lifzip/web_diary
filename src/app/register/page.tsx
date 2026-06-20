import Link from "next/link";
import styles from "../login/page.module.css";

export default function RegisterPage() {
  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <h1 className={styles.title}>Daftar</h1>
        <p className={styles.subtitle}>Mulai perjalanan menulis diary Anda hari ini.</p>
        
        <form>
          <div className={styles.formGroup}>
            <label htmlFor="name">Nama Panggilan</label>
            <input type="text" id="name" name="name" required placeholder="Nama Anda" />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required placeholder="email@contoh.com" />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="password">Kata Sandi</label>
            <input type="password" id="password" name="password" required placeholder="••••••••" />
          </div>
          
          <button type="submit" className={`btn-primary ${styles.authButton}`}>
            Daftar Sekarang
          </button>
        </form>
        
        <div className={styles.authLinks}>
          Sudah punya akun? <Link href="/login">Masuk di sini</Link>
        </div>
      </div>
    </div>
  );
}
