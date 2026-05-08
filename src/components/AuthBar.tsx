"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

export function AuthBar() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
  };

  if (loading) return null;

  return (
    <div className="mb-4 flex justify-end">
      {user ? (
        <div className="flex items-center gap-3 rounded-full bg-white px-4 py-2 text-sm shadow-sm ring-1 ring-gray-200">
          <span className="text-gray-700">
            👋 {user.email}
          </span>
          <button
            onClick={signOut}
            className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700 hover:bg-gray-200"
          >
            Đăng xuất
          </button>
        </div>
      ) : (
        <Link
          href="/login"
          className="rounded-full bg-red-600 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-red-700"
        >
          Đăng nhập
        </Link>
      )}
    </div>
  );
}
