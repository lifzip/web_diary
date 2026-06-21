import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import styles from "../../page.module.css";

export default async function ViewDiaryPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    const diaryId = resolvedParams.id;

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return notFound();
    }

    const { data: diary } = await supabase
        .from('diaries')
        .select('*')
        .eq('id', diaryId)
        .eq('user_id', user.id)
        .single();

    if (!diary) {
        return notFound();
    }

    return (
        <div className={styles.dashboardContainer} style={{ position: 'relative', overflow: 'hidden' }}>

            {/* --- EFEK BUNGA TERBANG (Ditaruh di latar belakang) --- */}
            <div className={styles.flowersContainer}>
                <div className={styles.flower}></div>
                <div className={styles.flower}></div>
                <div className={styles.flower}></div>
                <div className={styles.flower}></div>
                <div className={styles.flower}></div>
                <div className={styles.flower}></div>
                <div className={styles.flower}></div>
                <div className={styles.flower}></div>
            </div>
            {/* ----------------------------------------------------- */}

            <header className={styles.header} style={{ position: 'relative', zIndex: 2 }}>
                <h1 className={styles.title}>Detail Catatan</h1>
                <Link href="/dashboard" className="btn-secondary">
                    Kembali
                </Link>
            </header>

            <div className="card" style={{ maxWidth: '800px', margin: '0 auto', padding: '30px', position: 'relative', zIndex: 2 }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '10px', color: 'var(--text-main)' }}>
                    {diary.title}
                </h2>

                <p style={{ fontSize: '0.9rem', color: '#888', marginBottom: '25px' }}>
                    {new Date(diary.created_at).toLocaleString('id-ID', {
                        timeZone: 'Asia/Jakarta',
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    }).replace(',', ' —')}
                </p>

                <hr style={{ border: '0', borderTop: '1px solid #eee', marginBottom: '25px' }} />

                <p style={{
                    fontSize: '1.1rem',
                    lineHeight: '1.8',
                    whiteSpace: 'pre-wrap',
                    color: 'var(--text-body)'
                }}>
                    {diary.content}
                </p>

                <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'flex-end' }}>
                    <Link href={`/dashboard/edit/${diary.id}`} className={styles.actionBtn} style={{ padding: '8px 20px' }}>
                        Edit Catatan Ini
                    </Link>
                </div>
            </div>
        </div>
    );
}