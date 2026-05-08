import Link from "next/link";

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-4">
          <Link
            href="/"
            className="text-sm text-red-700 hover:underline"
          >
            ← Về trang chính
          </Link>
        </div>
        {children}
      </div>
    </main>
  );
}
