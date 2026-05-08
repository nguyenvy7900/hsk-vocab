# PLAN.md — Kế hoạch phát triển HSK Vocab

> File này được Claude Code tạo và cập nhật theo yêu cầu của BTVN SEONGON.

## Mục tiêu

Xây 1 web app full-stack cho người mới học tiếng Trung HSK 1-3, có:
- Hiển thị từ vựng (chữ Hán, pinyin, nghĩa Việt)
- Nghe phát âm bằng giọng AI
- Lọc theo cấp độ HSK 1/2/3
- Đánh dấu từ đã thuộc & xem tiến độ
- 3 mini-game ôn tập

## Các giai đoạn

### Giai đoạn 1 — MVP (✅)
- [x] Khởi tạo dự án Next.js 16 + TypeScript + Tailwind
- [x] Tạo file dữ liệu `src/data/vocab.ts` với ~150 từ HSK 1-3
- [x] Backend: API route `GET /api/vocab?level=1|2|3`
- [x] Frontend: trang chính với 3 nút lọc HSK, danh sách thẻ từ vựng
- [x] Phát âm bằng Web Speech API (lang = "zh-CN")
- [x] Flashcard: bấm thẻ ẩn/hiện pinyin & nghĩa
- [x] File README.md, CLAUDE.md, PLAN.md, .env.example
- [x] Push GitHub public + deploy Vercel

### Giai đoạn 2 — UI nổi & tracking (✅)
- [x] Pinyin chữ to xanh đậm trong khung viền
- [x] Nghĩa Việt khung vàng nhạt nổi bật
- [x] Nút "✅ Đã thuộc" trên mỗi thẻ, lưu localStorage
- [x] Thanh tiến độ "Đã thuộc x/y" theo từng cấp HSK

### Giai đoạn 3 — 3 mini-game (✅)
- [x] `/quiz/listen` — Nghe phát âm → chọn nghĩa Việt (4 đáp án, 10 câu)
- [x] `/quiz/pinyin` — Nhìn chữ Hán → chọn pinyin đúng (4 đáp án, 10 câu)
- [x] `/quiz/match` — Ghép chữ Hán với nghĩa Việt (6 cặp/vòng)

### Giai đoạn 4 — Tương lai (ngoài phạm vi BTVN)
- [ ] Đăng nhập Google + Magic Link Email (Supabase Auth)
- [ ] Database PostgreSQL (Supabase) lưu tiến độ theo tài khoản, đồng bộ đa thiết bị
- [ ] Game gõ pinyin (kiểu d)
- [ ] Mở rộng HSK 4-6
- [ ] Thêm câu ví dụ
- [ ] Luyện viết chữ Hán (canvas)
- [ ] Speech Recognition để chấm phát âm

## Quyết định kỹ thuật

| Vấn đề | Lựa chọn | Lý do |
|---|---|---|
| Framework | Next.js 16 (App Router) | Frontend + backend chung, deploy Vercel 1 click |
| Ngôn ngữ | TypeScript | An toàn kiểu, dễ refactor |
| Style | Tailwind CSS v4 | Viết UI nhanh |
| Lưu dữ liệu | File TS tĩnh | Dữ liệu cố định, không cần DB |
| Phát âm | Web Speech API | Miễn phí, không API key, có sẵn trên Chrome/Edge |
| Tracking | localStorage | Không cần login, đáp ứng 40 phút deadline |
| Hosting | Vercel | Miễn phí, HTTPS, auto deploy từ GitHub |
| Auth | Không có (giai đoạn này) | Giảm phạm vi để kịp deadline. Đã chuẩn bị `.env.example` cho Supabase ở giai đoạn 4 |

## 6 cấu trúc theo yêu cầu SEONGON

| # | Cấu trúc | Triển khai |
|---|---|---|
| 01 | Ngôn ngữ | TypeScript |
| 02 | Frontend | Next.js (App Router) + React + Tailwind CSS v4 |
| 03 | Backend | Next.js API Routes (REST) — `GET /api/vocab?level=…` |
| 04 | Security | `.env.example` + biến môi trường, CORS mặc định Next.js (cùng origin), không lưu dữ liệu nhạy cảm |
| 05 | Deployment | Vercel hosting + auto CI/CD qua tích hợp GitHub |
| 06 | Source Control | Git + GitHub public repo |
