import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { logout } from "../auth/actions";
import styles from "./page.module.css";

export default async function DashboardPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  // Fetch diaries for the current user
  const { data: diaries } = await supabase
    .from('diaries')
    .select('*')
    .order('created_at', { ascending: false });

  const displayName = user?.user_metadata?.display_name || user?.user_metadata?.username || "Pengguna";

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>Diary {displayName}</h1>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <form action={logout}>
            <button type="submit" className="btn-secondary">Keluar</button>
          </form>
          <Link href="/dashboard/new" className="btn-primary">
            + Catatan Baru
          </Link>
        </div>
      </header>

      {diaries && diaries.length > 0 ? (
        <div className={styles.grid}>
          {diaries.map((diary) => (
            <div key={diary.id} className={`card ${styles.diaryCard}`}>
              <h2 className={styles.diaryTitle}>{diary.title}</h2>
              <span className={styles.diaryDate}>
                {new Date(diary.created_at).toLocaleString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                }).replace(',', ' —')}
              </span>
              <p className={styles.diaryPreview}>{diary.content}</p>

              <div className={styles.diaryActions}>
                <Link href={`/dashboard/edit/${diary.id}`} className={styles.actionBtn}>Edit</Link>
                <form action={async () => {
                  "use server";
                  const { deleteDiary } = await import("./actions");
                  await deleteDiary(diary.id);
                }}>
                  <button type="submit" className={`${styles.actionBtn} ${styles.delete}`}>Hapus</button>
                </form>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <p>Belum ada catatan. Ayo mulai luapkan perasaanmu hari ini.</p>
          <Link href="/dashboard/new" className="btn-primary">
            Mulai Menulis
          </Link>
        </div>
      )}
    </div>
  );
}
