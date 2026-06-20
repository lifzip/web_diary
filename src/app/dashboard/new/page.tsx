import Link from "next/link";
import { createDiary } from "../actions";
import styles from "../page.module.css";

export default function NewDiaryPage() {
  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>Tulis Catatan Baru</h1>
        <Link href="/dashboard" className="btn-secondary">
          Batal
        </Link>
      </header>

      <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <form action={createDiary}>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="title">Judul Catatan</label>
            <input 
              type="text" 
              id="title" 
              name="title" 
              required 
              placeholder="Contoh: Perasaanku Hari Ini" 
              autoFocus
            />
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="content">Ceritakan Semuanya</label>
            <textarea 
              id="content" 
              name="content" 
              required 
              placeholder="Tuliskan apa yang sedang kamu rasakan..." 
              rows={12}
            ></textarea>
          </div>
          
          <button type="submit" className="btn-primary" style={{ width: '100%' }}>
            Simpan Catatan
          </button>
        </form>
      </div>
    </div>
  );
}
