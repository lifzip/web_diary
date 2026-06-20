"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef } from "react";
import { register } from "../auth/actions";
import styles from "../login/page.module.css";

// Definisikan tipe untuk state agar TypeScript tenang
interface ActionState {
  error: string;
  success: boolean;
}

const initialState: ActionState = { error: '', success: false };

export default function RegisterPage() {
  // Gunakan type casting 'as any' sementara jika tipe fungsi register di actions.js belum sinkron
  const [state, formAction, isPending] = useActionState(register as any, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  // Otomatis reset form input ketika registrasi berhasil
  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
    }
  }, [state?.success]);

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <h1 className={styles.title}>Daftar</h1>
        <p className={styles.subtitle}>Mulai perjalanan menulis diary Anda hari ini.</p>

        {/* Notifikasi Sukses */}
        {state?.success && (
          <div style={{ textAlign: "center", padding: "15px", backgroundColor: "rgba(var(--primary-color-rgb), 0.1)", borderRadius: "8px", marginBottom: "20px", border: "1px solid var(--primary-color)" }}>
            <div style={{ color: "var(--primary-color)", fontSize: "1.1rem", fontWeight: "bold", marginBottom: "5px" }}>
              🎉 Registrasi Berhasil!
            </div>
            <p style={{ marginBottom: "10px", color: "var(--text-muted)", fontSize: "0.9rem" }}>
              Akun Anda telah berhasil dibuat. Silakan masuk untuk mulai menulis diary.
            </p>

          </div>
        )}

        {/* Notifikasi Error */}
        {state?.error && (
          <div style={{ color: "var(--error-color)", marginBottom: "15px", fontSize: "0.9rem" }}>
            {state.error}
          </div>
        )}

        {/* Form Registrasi (Tag Pembuka Sudah Dikembalikan) */}
        <form action={formAction} ref={formRef}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Nama Panggilan</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="Nama Anda"
              maxLength={30}
              pattern="^[a-zA-Z\s']+$"
              title="Nama panggilan hanya boleh berisi huruf, spasi, dan tanda petik satu (')."
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              required
              placeholder="Pilih username"
              maxLength={20}
              pattern="^[a-zA-Z0-9_]+$"
              title="Username hanya boleh berisi huruf, angka, dan garis bawah (_), tanpa spasi atau simbol luar."
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Kata Sandi</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              placeholder="••••••••"
              minLength={8}
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%_*?&])[A-Za-z\d@$!%_*?&]{8,}$"
              title="Kata sandi harus menyatu, minimal 8 karakter, mengandung huruf besar, huruf kecil, angka, dan simbol (misal: @$!%*_?&)."
            />
          </div>

          <button type="submit" className={`btn-primary ${styles.authButton}`} disabled={isPending}>
            {isPending ? "Mendaftar..." : "Daftar Sekarang"}
          </button>
        </form>

        <div className={styles.authLinks}>
          Sudah punya akun? <Link href="/login">Masuk di sini</Link>
        </div>
      </div>
    </div>
  );
}