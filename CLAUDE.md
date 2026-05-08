# CLAUDE.md — Hướng dẫn cho Claude Code

## Mô tả dự án

Web app full-stack học từ vựng tiếng Trung HSK 1-3, làm BTVN SEONGON.
Người dùng cuối: học viên tiếng Trung trình độ sơ cấp.

## Stack

- **Next.js 16** (App Router) — full-stack framework
- **TypeScript** — toàn bộ code
- **Tailwind CSS v4** — styling
- **Web Speech API** — phát âm tiếng Trung (chạy phía client)
- **Vercel** — hosting + auto deploy từ GitHub

## Quy ước

- Dữ liệu từ vựng nằm ở `src/data/vocab.ts` — chỉnh sửa file này khi muốn thêm/sửa từ.
- API route duy nhất: `GET /api/vocab?level={1|2|3}` — trả JSON.
- UI là 1 trang đơn `src/app/page.tsx`, dùng `"use client"` để gọi `speechSynthesis`.
- Không dùng database — dữ liệu là static, lưu trong code.
- Không có authentication — web public, ai vào cũng dùng được.

## Khi sửa code, lưu ý

- Giữ giao diện đơn giản, gọn gàng (yêu cầu của chủ dự án — non-tech).
- Mọi text hướng dẫn người dùng phải bằng **tiếng Việt**.
- Phát âm dùng `lang = "zh-CN"` (Mandarin giản thể).
- Nếu thêm tính năng mới (luyện nghe, viết, nói), tạo route riêng dưới `src/app/`.

## Deploy

- Push lên branch `main` → Vercel tự động build và deploy.
- Domain mặc định: `hsk-vocab.vercel.app`.
