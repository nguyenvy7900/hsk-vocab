# 学中文 · HSK Vocab — Web học từ vựng tiếng Trung HSK 1-3

Web app full-stack giúp người mới bắt đầu luyện tập từ vựng tiếng Trung trình độ HSK 1, 2, 3.

**Demo:** https://hsk-vocab.vercel.app *(cập nhật sau khi deploy)*

## Tính năng

- 📚 ~150 từ vựng HSK 1-3 (mỗi cấp ~50 từ), do AI sinh dựa trên giáo trình tiếng Trung cơ bản
- 🔊 **Nghe phát âm tiếng Trung** bằng giọng AI (Web Speech API – miễn phí, có sẵn trên trình duyệt)
- 📝 Hiển thị **chữ Hán + pinyin + nghĩa tiếng Việt**
- 🎯 Lọc theo cấp độ HSK 1 / 2 / 3
- 🃏 Thẻ học kiểu flashcard: bấm để hiện/ẩn pinyin và nghĩa
- 📱 Giao diện responsive, gọn gàng, dễ thao tác

## Công nghệ sử dụng (6 cấu trúc theo yêu cầu SEONGON)

| # | Lớp | Công cụ |
|---|---|---|
| 01 | Ngôn ngữ | TypeScript |
| 02 | Frontend | Next.js 16 (App Router) + React + Tailwind CSS |
| 03 | Backend | Next.js API Routes (REST), dữ liệu lưu trong file TS (không cần database vì dữ liệu tĩnh) |
| 04 | Security | Environment variables, CORS mặc định Next.js, web public không cần đăng nhập |
| 05 | Deployment | Vercel (hosting) + GitHub Actions (CI/CD do Vercel tự kết nối) |
| 06 | Source Control | Git + GitHub (public repo) |

## Cách chạy local

```bash
npm install
npm run dev
```

Mở http://localhost:3000

## Cấu trúc thư mục

```
hsk-vocab/
├── src/
│   ├── app/
│   │   ├── api/vocab/route.ts    # Backend API trả về từ vựng
│   │   ├── page.tsx              # Trang chính
│   │   └── layout.tsx
│   └── data/
│       └── vocab.ts              # Dữ liệu từ vựng HSK 1-3
├── README.md
├── CLAUDE.md                     # Hướng dẫn cho Claude Code
├── PLAN.md                       # Kế hoạch phát triển
└── package.json
```

## Lưu ý về đăng nhập

- Web dùng **Supabase Auth Magic Link**: nhập email → nhận link đăng nhập → bấm link là vào.
- Supabase **free tier** giới hạn ~2-3 email/giờ. Nếu thử nhiều lần sẽ gặp lỗi `email rate limit exceeded` — chờ 1 tiếng hoặc thử email khác.
- Email link có thể vào thư mục **Spam/Quảng cáo**. Người gửi: `noreply@mail.app.supabase.io`.

## Tác giả

BTVN SEONGON — Học viên: nguyenvy7900
