import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { updateDiary } from "../../actions";
import styles from "../../page.module.css";

// Perbaikan tipe Params agar mendukung Promise di Next.js modern
export default async function EditDiaryPage({ params }: { params: Promise<{ id: string }> }) {
  // 1. Await params terlebih dahulu sebelum mengambil id-nya
  const resolvedParams = await params;
  const diaryId = resolvedParams.id;

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return notFound();
  }

  // 2. Gunakan diaryId yang sudah diekstrak dengan aman
  const { data: diary } = await supabase
    .from('diaries')
    .select('*')
    .eq('id', diaryId)
    .eq('user_id', user.id)
    .single();

  if (!diary) {
    return notFound();
  }

  // Gunakan .bind untuk meneruskan ID ke server action
  const updateDiaryWithId = updateDiary.bind(null, diary.id);

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>Edit Catatan</h1>
        <Link href="/dashboard" className="btn-secondary">
          Batal
        </Link>
      </header>

      <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <form action={updateDiaryWithId}>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="title">Judul Catatan</label>
            <input
              type="text"
              id="title"
              name="title"
              required
              defaultValue={diary.title}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="content">Ceritakan Semuanya</label>
            <textarea
              id="content"
              name="content"
              required
              defaultValue={diary.content}
              rows={12}
            ></textarea>
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%' }}>
            Perbarui Catatan
          </button>
        </form>
      </div>
    </div>
  );
}