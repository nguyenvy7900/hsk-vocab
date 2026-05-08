# PLAN.md — Kế hoạch phát triển HSK Vocab

> File này được Claude Code tạo và cập nhật theo yêu cầu của BTVN SEONGON.

## Mục tiêu

Xây 1 web app full-stack cho người mới học tiếng Trung HSK 1-3, có:
- Hiển thị từ vựng (chữ Hán, pinyin, nghĩa Việt)
- Nghe phát âm bằng giọng AI
- Lọc theo cấp độ HSK 1/2/3

## Các giai đoạn

### Giai đoạn 1 — MVP (đã hoàn thành ✅)

- [x] Khởi tạo dự án Next.js 16 + TypeScript + Tailwind
- [x] Tạo file dữ liệu từ vựng `src/data/vocab.ts` với ~150 từ HSK 1-3 (mỗi cấp ~50 từ)
- [x] Backend: API route `GET /api/vocab?level=1|2|3`
- [x] Frontend: trang chính với 3 nút lọc HSK, danh sách thẻ từ vựng
- [x] Tích hợp Web Speech API để phát âm chữ Hán (lang = "zh-CN")
- [x] Flashcard: bấm thẻ để ẩn/hiện pinyin và nghĩa
- [x] Giao diện đơn giản, đỏ-cam theo phong cách Trung Hoa
- [x] File README.md, CLAUDE.md, PLAN.md
- [x] Push lên GitHub public repo
- [x] Deploy lên Vercel với URL công khai

### Giai đoạn 2 — Cải tiến (tương lai, ngoài phạm vi BTVN)

- [ ] Thêm chế độ "luyện nghe": chỉ nghe âm thanh, người dùng tự đoán nghĩa
- [ ] Thêm chế độ "kiểm tra": trắc nghiệm chọn nghĩa đúng
- [ ] Lưu trạng thái "đã thuộc" / "chưa thuộc" vào localStorage
- [ ] Mở rộng dataset lên HSK 4-6
- [ ] Thêm câu ví dụ cho mỗi từ
- [ ] Tích hợp luyện viết bằng cách vẽ chữ Hán (canvas)
- [ ] Tính năng nhận diện giọng nói để chấm phát âm (Web Speech Recognition)

## Quyết định kỹ thuật

| Vấn đề | Lựa chọn | Lý do |
|---|---|---|
| Framework full-stack | Next.js | Frontend + backend trong 1 dự án, deploy Vercel 1 click |
| Lưu dữ liệu | File TypeScript tĩnh | Dữ liệu nhỏ, không đổi → không cần database, dễ deploy |
| Phát âm | Web Speech API (browser native) | Miễn phí, không cần API key, hoạt động offline |
| Hosting | Vercel | Miễn phí cho dự án nhỏ, nối GitHub auto-deploy, mặc định HTTPS |
| Authentication | Không có | Yêu cầu BTVN không cần đăng nhập, giữ đơn giản |

## 6 cấu trúc theo yêu cầu SEONGON

1. **Ngôn ngữ:** TypeScript
2. **Frontend:** Next.js (App Router) + React + Tailwind CSS
3. **Backend:** Next.js API Routes + dữ liệu TS file (REST API)
4. **Security:** CORS mặc định + ENV variables + không lưu dữ liệu nhạy cảm
5. **Deployment:** Vercel (hosting) + auto CI/CD qua GitHub integration
6. **Source Control:** Git + GitHub (public)
