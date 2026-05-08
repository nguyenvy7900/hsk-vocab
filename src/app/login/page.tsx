"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [errorMsg, setErrorMsg] = useState("");

  const sendMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) {
      setStatus("error");
      setErrorMsg(error.message);
    } else {
      setStatus("sent");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 px-4 py-10">
      <div className="mx-auto max-w-md">
        <div className="mb-4">
          <Link href="/" className="text-sm text-red-700 hover:underline">
            ← Về trang chính
          </Link>
        </div>

        <div className="rounded-2xl bg-white p-8 shadow">
          <h1 className="mb-2 text-3xl font-bold text-red-700">Đăng nhập</h1>
          <p className="mb-6 text-sm text-gray-600">
            Nhập email — bạn sẽ nhận được 1 đường link đăng nhập (Magic Link).
            Bấm vào link là xong, không cần mật khẩu.
          </p>

          {status === "sent" ? (
            <div className="rounded-lg bg-green-50 p-4 ring-1 ring-green-200">
              <p className="font-semibold text-green-800">
                ✓ Đã gửi link đăng nhập!
              </p>
              <p className="mt-1 text-sm text-green-700">
                Vào hộp thư <strong>{email}</strong>, mở email từ Supabase và
                bấm vào link. (Kiểm tra cả thư mục Spam/Quảng cáo nếu không
                thấy.)
              </p>
            </div>
          ) : (
            <form onSubmit={sendMagicLink} className="space-y-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-200"
              />
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full rounded-full bg-red-600 px-6 py-3 font-semibold text-white shadow hover:bg-red-700 disabled:opacity-50"
              >
                {status === "sending" ? "Đang gửi..." : "Gửi link đăng nhập"}
              </button>
              {status === "error" && (
                <p className="text-sm text-red-600">Lỗi: {errorMsg}</p>
              )}
            </form>
          )}
        </div>

        <p className="mt-6 text-center text-xs text-gray-500">
          Tài khoản giúp lưu tiến độ học của bạn — học máy nào cũng thấy lại.
        </p>
      </div>
    </main>
  );
}
