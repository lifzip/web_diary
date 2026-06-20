'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

// Format username menjadi email dummy untuk Supabase
const formatUsernameToEmail = (username: string) => {
  // Hanya ambil karakter alfanumerik aman untuk email string
  const cleanUsername = username.toLowerCase().replace(/[^a-z0-9_]/g, '');
  return `${cleanUsername}@diary.internal`;
};

// Fungsi Sanitasi XSS sederhana untuk membersihkan karakter mencurigakan
const sanitizeInput = (text: string) => {
  return text
    .trim()
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
};

export async function login(prevState: any, formData: FormData) {
  const supabase = await createClient()

  let username = formData.get('username') as string
  const password = formData.get('password') as string

  // 1. Validasi Keamanan Server-side untuk login
  const usernameRegex = /^[a-zA-Z0-9_]+$/;
  if (!username || !usernameRegex.test(username)) {
    return { error: "Username tidak valid. Hanya boleh huruf, angka, dan underscore (_).", success: false };
  }

  username = sanitizeInput(username);
  const email = formatUsernameToEmail(username)

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    const friendlyError = error.message === "Invalid login credentials"
      ? "Username atau kata sandi salah."
      : error.message;
    return { error: `Login gagal: ${friendlyError}`, success: false }
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function register(prevState: any, formData: FormData) {
  const supabase = await createClient()

  let username = formData.get('username') as string
  const password = formData.get('password') as string
  let name = formData.get('name') as string

  // 1. Validasi Keamanan Server-side untuk Username dan Nama
  const usernameRegex = /^[a-zA-Z0-9_]+$/;
  const nameRegex = /^[a-zA-Z\s']+$/;

  if (!username || !usernameRegex.test(username)) {
    return { error: "Username hanya boleh berisi huruf, angka, dan underscore (_).", success: false };
  }
  if (!name || !nameRegex.test(name)) {
    return { error: "Nama panggilan hanya boleh berisi huruf, spasi, dan petik satu (').", success: false };
  }

  // 2. Validasi Kekuatan Kata Sandi (Minimal 8 karakter, Huruf Besar/Kecil, Angka, Simbol)
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%_*?&])[A-Za-z\d@$!%_*?&]{8,}$/;
  if (!password || !passwordRegex.test(password)) {
    return {
      error: "Kata sandi tidak memenuhi syarat keamanan. Pastikan minimal 8 karakter dan mengandung kombinasi huruf besar, huruf kecil, angka, serta simbol.",
      success: false
    };
  }

  // 3. Sanitasi data dari potensi XSS
  username = sanitizeInput(username);
  name = sanitizeInput(name);

  const email = formatUsernameToEmail(username)

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name: name,
        username: username
      }
    }
  })

  if (error) {
    return { error: `Gagal mendaftar: ${error.message}`, success: false }
  }

  await supabase.auth.signOut()

  return { error: '', success: true }
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()

  revalidatePath('/', 'layout')
  redirect('/login')
}