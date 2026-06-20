"use client";

import Link from "next/link";
import { useActionState } from "react";
import { login } from "../auth/actions";
import styles from "./page.module.css";

interface ActionState {
  error: string;
  success: boolean;
}

const initialState: ActionState = { error: '', success: false };

export default function LoginPage() {
  // Menggunakan useActionState agar bisa menangkap pesan error dari Server Action (login)
  const [state, formAction, isPending] = useActionState(login as any, initialState);

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <h1 className={styles.title}>Masuk</h1>
        <p className={styles.subtitle}>Selamat datang kembali di ruang amanmu.</p>

        {/* Notifikasi Error jika login gagal */}
        {state?.error && (
          <div style={{ color: "var(--error-color)", marginBottom: "15px", fontSize: "0.9rem" }}>
            {state.error}
          </div>
        )}

        <form action={formAction}>
          {/* Input Username + Proteksi XSS & SQLi */}
          <div className={styles.formGroup}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              required
              placeholder="Masukkan username Anda"
              maxLength={20}
              pattern="^[a-zA-Z0-9_]+$"
              title="Username hanya boleh berisi huruf, angka, dan garis bawah (_)."
            />
          </div>

          {/* Input Password + Batasan Karakter */}
          <div className={styles.formGroup}>
            <label htmlFor="password">Kata Sandi</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              placeholder="••••••••"
              minLength={8}
            />
          </div>

          <button type="submit" className={`btn-primary ${styles.authButton}`} disabled={isPending}>
            {isPending ? "Memverifikasi..." : "Masuk"}
          </button>
        </form>

        <div className={styles.authLinks}>
          Belum punya akun? <Link href="/register">Daftar sekarang</Link>
        </div>
      </div>
    </div>
  );
}