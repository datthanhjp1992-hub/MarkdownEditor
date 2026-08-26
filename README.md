# Markdown Editor 

Một trình soạn thảo Markdown trực tiếp (live editor)

---

## 👤 Thông tin tác giả

| | |
|---|---|
| **Tên** | Nguyen Thanh Dat|
| **Quốc tịch** | Việt Nam 🇻🇳 |
| **Nơi làm việc** | Nhật Bản 🇯🇵 |
| **Vị trí** | IT Engineer |

---

## 📁 Cấu trúc project

```
├── index.html    # Cấu trúc giao diện (HTML)
├── style.css     # Toàn bộ giao diện, theme, màu sắc (CSS)
├── script.js     # Toàn bộ logic xử lý (JavaScript)
└── README.md     # File này
```

> Cần tải **cả 3 file** (`index.html`, `style.css`, `script.js`) về **cùng một thư mục**, sau đó mở `index.html` bằng trình duyệt (Chrome, Edge, Firefox...) để sử dụng. Không cần cài đặt hay chạy server gì thêm.

**Yêu cầu:** cần có kết nối mạng khi mở file lần đầu để trình duyệt tải font chữ (Google Fonts) và thư viện render Markdown (marked.js) từ CDN.

---

## 🚀 Cách sử dụng

### 1. Soạn thảo & xem trước
- Gõ nội dung Markdown ở khung bên trái (**Markdown**) → kết quả hiển thị ngay ở khung bên phải (**Xem trước**), không cần bấm nút nào.
- Ba chế độ xem ở góc trên bên phải:
  - **Edit** — chỉ hiện khung soạn thảo, toàn màn hình
  - **Split** — soạn thảo song song xem trước (mặc định)
  - **Preview** — chỉ hiện kết quả xem trước

### 2. Thanh công cụ định dạng
| Nút | Chức năng | Phím tắt |
|---|---|---|
| ↶ / ↷ | Undo / Redo | Ctrl+Z / Ctrl+Y |
| **B** | In đậm | Ctrl+B |
| *I* | In nghiêng | Ctrl+I |
| S̶ | Gạch ngang | |
| H | Tiêu đề | |
| `</>` | Code (inline hoặc block) | |
| " | Trích dẫn (quote) | |
| • | Danh sách gạch đầu dòng | |
| 1. | Danh sách đánh số | |
| ☑ | Checklist | |
| 🔗 | Chèn liên kết | |
| 🖼 | Chèn hình ảnh | |
| ▦ | Chèn bảng | |
| — | Đường kẻ ngang | |
| 💬 | Chèn ghi chú (comment) | |

Khi đang gõ trong danh sách (đánh số / gạch đầu dòng / checklist), nhấn **Enter** sẽ tự sinh tiếp dòng mới cùng định dạng; nhấn Enter ở dòng list trống sẽ thoát khỏi danh sách.

### 3. Quản lý file
- **Đổi tên file**: bấm vào tên file (`untitled.md`) ở góc trên bên trái, gõ tên mới, nhấn Enter.
- **Import**: bấm nút **Import** hoặc kéo-thả file `.md` / `.txt` trực tiếp vào cửa sổ để mở.
- **Tải xuống**: bấm nút **Tải xuống** để lưu nội dung đang soạn thành file `.md` về máy.
- **Clear**: xoá sạch nội dung đang soạn (có hộp thoại xác nhận trước khi xoá, không thể hoàn tác).

### 4. Cài đặt giao diện ⚙️
Bấm nút **Cài đặt** ở thanh tiêu đề để mở bảng tuỳ chỉnh:

- **Giao diện màu (Theme)** — chọn 1 trong 5 phong cách, mỗi theme đổi cả màu sắc, độ bo góc lẫn font tiêu đề:
  | Theme | Đặc điểm |
  |---|---|
  | 🌑 Tối | Dev tool cổ điển, nền đen, sắc nét |
  | ☀️ Sáng | Giấy trắng mát, hiện đại |
  | 📜 Ấm áp | Giấy kraft cũ, hoài cổ, chữ serif |
  | 🌫 Sương Sớm | Xám xanh lạnh, tĩnh lặng, bo tròn mềm mại |
  | 🍵 Trà Xanh | Giấy washi ấm + xanh trà, phong cách Nhật Bản |

- **Phông chữ & cỡ chữ** — chọn riêng cho khung soạn thảo (SF Mono, Fira Code, JetBrains Mono, Source Code Pro, Consolas) và bản xem trước (Sans-serif, Serif, Monospace), mỗi khung có cỡ chữ riêng.
- **Màu nền riêng cho từng khung** — khung soạn thảo và bản xem trước có thể chỉnh màu nền **độc lập** với nhau:
  - Dùng ô chọn màu (color picker) để tự phối màu, hoặc bấm nhanh vào các chấm màu gợi ý.
  - Bấm **"Dùng theo theme"** để quay về màu mặc định của theme đang chọn.
  - Màu chữ sẽ **tự động điều chỉnh sáng/tối** theo màu nền được chọn để luôn đảm bảo đọc rõ.
- Mọi cài đặt được **lưu tự động** và giữ nguyên cho lần mở sau, dùng nút **"Đặt lại mặc định"** nếu muốn quay về cấu hình gốc.

---

## 💡 Ghi chú

- Toàn bộ nội dung Markdown chỉ tồn tại trong bộ nhớ trình duyệt khi đang mở trang — nhớ **Tải xuống** thường xuyên để không mất dữ liệu khi đóng tab.
- Editor hỗ trợ cú pháp Markdown chuẩn (CommonMark) + `breaks: true` 