# Markdown Editor
Một trình soạn thảo Markdown trực tiếp (live editor) — soạn thảo bên trái, xem kết quả ngay lập tức bên phải, không cần build hay cài đặt gì thêm.

---

## 👤 Thông tin tác giả

| | |
|---|---|
| **Tên** | Nguyen Thanh Dat |
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

### 5. Số dòng & vị trí con trỏ 
- Khung soạn thảo hiển thị **cột số dòng** bên trái, số dòng đang có con trỏ được tô sáng bằng màu accent của theme.
- **Status bar** ở cuối màn hình hiển thị:
  - Bên trái: `Dòng X, Cột Y — Tổng N dòng`
  - Bên phải: số từ · số ký tự · thời gian đọc ước tính (~200 từ/phút)
- Khung soạn thảo không tự xuống dòng khi câu quá dài (giống code editor thật) — dòng dài sẽ cuộn ngang thay vì bị gãy dòng, giúp số dòng luôn khớp chính xác với nội dung gốc.

### 6. Tự động lưu (Auto-save)
- Mọi thay đổi trong khung soạn thảo (nội dung + tên file) được **tự động lưu vào trình duyệt** sau khoảng 0.7 giây ngừng gõ — không cần bấm nút nào.
- Đóng tab hoặc tắt trình duyệt rồi mở lại `index.html`, nội dung và tên file sẽ **tự động được khôi phục** đúng như lúc đóng.
- Trạng thái lưu hiển thị ở góc trên bên trái (cạnh tên file): `Đang gõ...` → `Đã cập nhật` → `Đã lưu tự động`.
- ⚠️ Đây là bộ nhớ **riêng của trình duyệt trên máy đang dùng** — không đồng bộ giữa các máy/trình duyệt khác nhau. Vẫn nên bấm **Tải xuống (.md)** định kỳ nếu cần giữ file lâu dài hoặc mang sang máy khác.

### 7. Copy & Xuất file
Hai nút dropdown ở thanh tiêu đề:

**📋 Copy**
| Lựa chọn | Công dụng |
|---|---|
| Sao chép Markdown | Copy nguyên văn nội dung `.md` đang soạn vào clipboard |
| Sao chép HTML (đã render) | Copy phần đã render (có định dạng: heading, bảng, in đậm...) — dán thẳng vào Notion, Confluence, Gmail, Word... vẫn giữ định dạng |

**⬇️ Tải xuống**
| Lựa chọn | Công dụng |
|---|---|
| Tải Markdown (.md) | Như trước — tải file `.md` gốc |
| Tải HTML (.html) | Xuất file HTML độc lập, tự chứa CSS — mở được bằng bất kỳ trình duyệt nào, không cần phần mềm đọc Markdown |
| Xuất PDF (in để lưu) | Mở cửa sổ in của trình duyệt với nội dung đã định dạng sẵn — chọn máy in **"Save as PDF" / "Lưu dưới dạng PDF"** để xuất file PDF |

> 💡 Nếu trình duyệt chặn cửa sổ pop-up khi bấm "Xuất PDF", hãy cho phép pop-up cho trang này rồi thử lại.

---

## 💡 Ghi chú

- Toàn bộ nội dung Markdown chỉ tồn tại trong bộ nhớ trình duyệt khi đang mở trang — nhớ **Tải xuống** thường xuyên để không mất dữ liệu khi đóng tab.
- Editor hỗ trợ cú pháp Markdown chuẩn (CommonMark) + `breaks: true` 
