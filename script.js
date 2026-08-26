const editor = document.getElementById('editor');
const previewContent = document.getElementById('previewContent');
const frame = document.getElementById('frame');
const statusText = document.getElementById('statusText');
const fileNameText = document.getElementById('fileNameText');
const lineNumbersInner = document.getElementById('lineNumbersInner');
const cursorStatusEl = document.getElementById('cursorStatus');
const docStatsEl = document.getElementById('docStats');

// Bật breaks:true để giống HackMD -- 1 dấu xuống dòng đơn trong đoạn văn/list item
// sẽ giữ nguyên thành <br> thay vì bị CommonMark mặc định gộp lại thành khoảng trắng.
marked.setOptions({ breaks: true });

const defaultContent = `# Markdown Editor 👋

---

## Phần 1 — Giới thiệu

Đây là một **trình soạn thảo Markdown trực tiếp** (live editor). Gõ nội dung ở khung bên trái, kết quả sẽ được render và hiển thị ngay lập tức ở khung bên phải — không cần bấm nút "xem trước" hay tải lại trang.

Editor hỗ trợ 3 chế độ xem: **Edit** (chỉ soạn thảo, toàn màn hình), **Split** (soạn thảo song song xem trước — đang bật), và **Preview** (chỉ xem kết quả). Bạn có thể chuyển đổi qua nút ở góc trên bên phải.

Ngoài ra bạn có thể **Import** file \`.md\` có sẵn (kéo-thả hoặc chọn file), **Tải xuống** nội dung đang soạn thành file mới (.md / .html / PDF), **Copy** Markdown hoặc HTML đã render vào clipboard, bấm vào tên file ở góc trên bên trái để **đổi tên**, hoặc dùng nút **Clear** trên thanh công cụ để xoá sạch và bắt đầu lại từ đầu.

Nội dung được **tự động lưu** vào trình duyệt khi bạn gõ — đóng tab rồi mở lại vẫn còn nguyên.

---

## Phần 2 — Các chức năng & ví dụ

### In đậm, in nghiêng, gạch ngang
Cú pháp: \`**đậm**\`, \`*nghiêng*\`, \`~~gạch ngang~~\`

Ví dụ: đây là chữ **in đậm**, đây là chữ *in nghiêng*, và đây là ~~chữ bị gạch ngang~~.

### Tiêu đề (Heading)
Đặt nút **H** trên thanh công cụ ở đầu dòng bất kỳ để biến nó thành tiêu đề \`## \`.

### Trích dẫn (Quote)
Cú pháp: thêm \`> \` vào đầu dòng.

> Đây là một đoạn trích dẫn — thường dùng để nhấn mạnh 1 câu nói hoặc ghi chú quan trọng.

### Code — inline và block
Inline: dùng dấu backtick đơn, ví dụ biến \`total_cost\` trong đoạn văn.

Code block: dùng 3 dấu backtick, có thể ghi kèm tên ngôn ngữ để tô màu cú pháp.

\`\`\`python
def hello():
    print("Hello AWS!")
\`\`\`

### Danh sách gạch đầu dòng (Bullet list)
- AWS Budgets — cảnh báo ngân sách
- Cost Explorer — phân tích chi phí
- Trusted Advisor — kiểm tra tối ưu chi phí

### Danh sách đánh số (Ordered list)
Bấm nút **1.** trên thanh công cụ khi con trỏ ở dòng trống sẽ tự chèn số. Nhấn **Enter** ở cuối dòng sẽ tự động sinh số tiếp theo:

1. Tạo Pricing Calculator để ước tính chi phí
2. Theo dõi bằng AWS Budgets
3. Phân tích lại bằng Cost Explorer sau khi dùng

### Checklist (việc cần làm)
- [x] Thiết kế giao diện editor
- [x] Thêm chức năng Import / Export
- [ ] Viết thêm test case cho Undo/Redo

### Liên kết & hình ảnh
Liên kết: \`[chữ hiển thị](URL)\` → [Tài liệu AWS chính thức](https://aws.amazon.com)

Hình ảnh dùng cú pháp tương tự nhưng thêm dấu \`!\` ở đầu: \`![mô tả](URL ảnh)\`

### Bảng (Table)
Bấm nút bảng trên thanh công cụ để chèn khung mẫu, sau đó chỉnh nội dung từng ô:

| Dịch vụ | Mục đích |
|---|---|
| Cost Explorer | Phân tích chi phí |
| Budgets | Cảnh báo ngân sách |

### Đường kẻ ngang & Ghi chú
Đường kẻ ngang dùng để tách các phần nội dung:

---

Ghi chú dạng comment (không hiển thị ở bản xem trước): <!-- đây là ghi chú riêng, chỉ thấy trong phần Markdown -->
`;

// ---- Render ----
function render() {
  previewContent.innerHTML = marked.parse(editor.value);
}

// ---- Cột số dòng (giống HackMD) ----
// Chỉ vẽ lại toàn bộ danh sách số khi số dòng thay đổi, tránh thao tác DOM thừa mỗi lần gõ 1 ký tự.
let lastLineCount = 0;
function updateLineNumbers() {
  const lineCount = editor.value.split('\n').length;
  if (lineCount !== lastLineCount) {
    let html = '';
    for (let i = 1; i <= lineCount; i++) html += `<div class="line-num-row">${i}</div>`;
    lineNumbersInner.innerHTML = html;
    lastLineCount = lineCount;
  }
  highlightCurrentLine();
}

// Đánh dấu số dòng đang có con trỏ (giống thanh gutter của các code editor)
function highlightCurrentLine() {
  const pos = editor.selectionStart;
  const currentLine = editor.value.slice(0, pos).split('\n').length;
  const prevActive = lineNumbersInner.querySelector('.line-num-row.active');
  if (prevActive) prevActive.classList.remove('active');
  const rowEl = lineNumbersInner.children[currentLine - 1];
  if (rowEl) rowEl.classList.add('active');
}

// Cuộn cột số dòng đồng bộ với cuộn dọc của khung soạn thảo
editor.addEventListener('scroll', () => {
  lineNumbersInner.style.transform = `translateY(${-editor.scrollTop}px)`;
});

// ---- Vị trí con trỏ: Dòng / Cột / Tổng số dòng ----
function updateCursorStatus() {
  const pos = editor.selectionStart;
  const before = editor.value.slice(0, pos);
  const lines = before.split('\n');
  const line = lines.length;
  const col = lines[lines.length - 1].length + 1;
  const totalLines = editor.value.split('\n').length;
  cursorStatusEl.textContent = `Dòng ${line}, Cột ${col} — Tổng ${totalLines} dòng`;
}
editor.addEventListener('click', updateCursorStatus);
editor.addEventListener('keyup', updateCursorStatus);

// ---- Đếm từ / ký tự / thời gian đọc ước tính ----
function updateDocStats() {
  const text = editor.value;
  const trimmed = text.trim();
  const words = trimmed.length === 0 ? 0 : trimmed.split(/\s+/).length;
  const chars = text.length;
  const readingMinutes = Math.max(1, Math.round(words / 200));
  docStatsEl.textContent = `${words} từ · ${chars} ký tự · ~${readingMinutes} phút đọc`;
}

// ---- Tự động lưu nháp vào trình duyệt (window.storage) ----
const DRAFT_KEY = 'draft:content';
let autosaveTimer = null;
function scheduleAutosave() {
  clearTimeout(autosaveTimer);
  autosaveTimer = setTimeout(async () => {
    try {
      await window.storage.set(DRAFT_KEY, JSON.stringify({
        content: editor.value,
        fileName: fileNameText.textContent,
        savedAt: Date.now(),
      }));
      statusText.textContent = 'Đã lưu tự động';
    } catch (err) {
      statusText.textContent = 'Lỗi lưu tự động';
      console.error('Không tự động lưu được:', err);
    }
  }, 700);
}

// Debounce nhẹ để không render lại quá dày khi gõ nhanh
let renderTimer = null;
function scheduleRender() {
  updateLineNumbers();
  updateCursorStatus();
  statusText.textContent = 'Đang gõ...';
  clearTimeout(renderTimer);
  renderTimer = setTimeout(() => {
    render();
    updateDocStats();
    statusText.textContent = 'Đã cập nhật';
  }, 150);
  scheduleAutosave();
}

editor.addEventListener('input', scheduleRender);

// ---- Khởi tạo: khôi phục bản nháp đã tự động lưu (nếu có), hoặc dùng nội dung mặc định ----
async function initEditor() {
  let restored = false;
  try {
    const result = await window.storage.get(DRAFT_KEY);
    if (result && result.value) {
      const draft = JSON.parse(result.value);
      if (draft && typeof draft.content === 'string' && draft.content.length > 0) {
        editor.value = draft.content;
        if (draft.fileName) fileNameText.textContent = draft.fileName;
        restored = true;
      }
    }
  } catch (err) {
    // Chưa có bản nháp nào được lưu trước đó -> dùng nội dung mặc định, không cần báo lỗi
  }
  if (!restored) editor.value = defaultContent;

  updateLineNumbers();
  updateCursorStatus();
  updateDocStats();
  render();
  statusText.textContent = restored ? 'Đã khôi phục bản nháp' : 'Đã cập nhật';
}
initEditor();

// ---- Chế độ hiển thị: Edit / Split / Preview ----
const btnEdit = document.getElementById('btnEdit');
const btnSplit = document.getElementById('btnSplit');
const btnPreview = document.getElementById('btnPreview');

function setMode(mode) {
  frame.classList.remove('mode-edit', 'mode-split', 'mode-preview');
  frame.classList.add('mode-' + mode);
  [btnEdit, btnSplit, btnPreview].forEach(b => b.classList.remove('active'));
  if (mode === 'edit') btnEdit.classList.add('active');
  if (mode === 'split') btnSplit.classList.add('active');
  if (mode === 'preview') { btnPreview.classList.add('active'); render(); }
}
btnEdit.addEventListener('click', () => setMode('edit'));
btnSplit.addEventListener('click', () => setMode('split'));
btnPreview.addEventListener('click', () => setMode('preview'));

// ---- Import file ----
const fileInput = document.getElementById('fileInput');
const btnImport = document.getElementById('btnImport');
const dropzone = document.getElementById('dropzone');

function loadMarkdownFile(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    editor.value = e.target.result;
    fileNameText.textContent = file.name;
    updateLineNumbers();
    updateCursorStatus();
    render();
    updateDocStats();
    scheduleAutosave();
    statusText.textContent = 'Đã nhập file';
  };
  reader.onerror = () => alert('Không đọc được file. Vui lòng dùng file .md hoặc .txt.');
  reader.readAsText(file, 'UTF-8');
}
btnImport.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', (e) => {
  loadMarkdownFile(e.target.files[0]);
  fileInput.value = '';
});

// Kéo & thả
['dragenter', 'dragover'].forEach(evt => {
  frame.addEventListener(evt, (e) => { e.preventDefault(); frame.classList.add('dragging'); });
});
['dragleave', 'drop'].forEach(evt => {
  frame.addEventListener(evt, (e) => { e.preventDefault(); frame.classList.remove('dragging'); });
});
frame.addEventListener('drop', (e) => loadMarkdownFile(e.dataTransfer.files[0]));

// ---- Toolbar: chèn / bọc cú pháp markdown tại vị trí con trỏ ----

// Bọc selection bằng syntax (vd: **text**). Nếu chưa chọn gì, chèn placeholder và bôi đen nó.
function wrapSelection(before, after, placeholder) {
  const start = editor.selectionStart;
  const end = editor.selectionEnd;
  const selected = editor.value.slice(start, end) || placeholder;
  const newText = before + selected + after;
  editor.setRangeText(newText, start, end, 'select');
  // Nếu không có selection ban đầu, bôi đen phần placeholder để gõ đè lên ngay
  if (start === end) {
    editor.selectionStart = start + before.length;
    editor.selectionEnd = start + before.length + placeholder.length;
  }
  editor.focus();
  scheduleRender();
}

// Thêm prefix vào đầu mỗi dòng đang được chọn (vd: "> ", "- ", "1. ")
function prefixLines(prefixFn) {
  const start = editor.selectionStart;
  const end = editor.selectionEnd;
  const value = editor.value;
  let lineStart = value.lastIndexOf('\n', start - 1) + 1;
  let lineEnd = value.indexOf('\n', end);
  if (lineEnd === -1) lineEnd = value.length;

  const block = value.slice(lineStart, lineEnd);
  const lines = block.split('\n');
  const newBlock = lines.map((line, i) => prefixFn(line, i)).join('\n');

  editor.setRangeText(newBlock, lineStart, lineEnd, 'select');
  editor.focus();
  scheduleRender();
}

// Chèn text tại vị trí con trỏ (không bọc)
function insertAtCursor(text, cursorOffset) {
  const start = editor.selectionStart;
  editor.setRangeText(text, start, editor.selectionEnd, 'end');
  if (cursorOffset !== undefined) {
    editor.selectionStart = editor.selectionEnd = start + cursorOffset;
  }
  editor.focus();
  scheduleRender();
}

// Bóc marker danh sách cũ (nếu có) khỏi 1 dòng, giữ lại phần thụt đầu dòng (indent) và nội dung thật.
function stripListMarker(line) {
  const m = line.match(/^(\s*)(?:[-*]\s+(?:\[[ xX]\]\s+)?|\d+\.\s+)?(.*)$/);
  return { indent: m[1], content: m[2] };
}

// Áp dụng / gỡ định dạng danh sách (ul, ol, task) theo đúng kiểu HackMD:
// - Nếu dòng đang trống (chưa gõ gì) -> LUÔN chèn marker mới để gõ tiếp (vd bấm Ordered list trên dòng trống -> ra "1. ")
// - Nếu khối dòng đang chọn ĐÃ là đúng loại marker này -> bấm lại sẽ GỠ marker (toggle off)
// - Ngược lại -> gắn/marker lại theo loại mới, đánh số liên tục bỏ qua dòng trống
function applyListFormat(markerType) {
  const start = editor.selectionStart;
  const end = editor.selectionEnd;
  const value = editor.value;
  let lineStart = value.lastIndexOf('\n', start - 1) + 1;
  let lineEnd = value.indexOf('\n', end);
  if (lineEnd === -1) lineEnd = value.length;

  const block = value.slice(lineStart, lineEnd);
  const lines = block.split('\n');
  const contentLines = lines.filter(l => l.trim() !== '');

  const testers = {
    ol: l => /^\s*\d+\.\s+/.test(l),
    ul: l => /^\s*[-*]\s+(?!\[[ xX]\])/.test(l),
    task: l => /^\s*[-*]\s+\[[ xX]\]\s+/.test(l),
  };
  // Đang bật = TẤT CẢ các dòng có nội dung trong khối đều đã đúng loại marker này
  const isActive = contentLines.length > 0 && contentLines.every(testers[markerType]);

  const markerOf = {
    ol: (n) => n + '. ',
    ul: () => '- ',
    task: () => '- [ ] ',
  };

  let n = 0;
  let caretOffsetInBlock = null; // vị trí đặt con trỏ sau khi chèn marker vào dòng trống đơn lẻ

  const newLines = lines.map((line, idx) => {
    if (!line.trim()) {
      // Dòng trống: nếu đây là dòng trống DUY NHẤT đang thao tác (không có dòng nào khác được chọn)
      // -> vẫn chèn marker để người dùng gõ tiếp ngay, giống HackMD
      if (lines.length === 1 && !isActive) {
        n++;
        const marker = markerOf[markerType](n);
        caretOffsetInBlock = marker.length;
        return marker;
      }
      return line; // dòng trống nằm giữa nhiều dòng khác -> giữ nguyên
    }
    if (isActive) {
      const { content } = stripListMarker(line); // TOGGLE OFF: gỡ marker
      return content;
    }
    n++;
    const { indent, content } = stripListMarker(line); // TOGGLE ON: gắn marker mới
    return indent + markerOf[markerType](n) + content;
  });

  const newBlock = newLines.join('\n');
  editor.setRangeText(newBlock, lineStart, lineEnd, 'select');
  if (caretOffsetInBlock !== null) {
    editor.selectionStart = editor.selectionEnd = lineStart + caretOffsetInBlock;
  }
  editor.focus();
  scheduleRender();
}

const toolbarActions = {
  undo: () => { document.execCommand('undo'); scheduleRender(); },
  redo: () => { document.execCommand('redo'); scheduleRender(); },
  bold: () => wrapSelection('**', '**', 'in đậm'),
  italic: () => wrapSelection('*', '*', 'in nghiêng'),
  strike: () => wrapSelection('~~', '~~', 'gạch ngang'),
  heading: () => prefixLines(line => '## ' + line.replace(/^#{1,6}\s*/, '')),
  code: () => {
    const hasSelection = editor.selectionStart !== editor.selectionEnd;
    const selected = editor.value.slice(editor.selectionStart, editor.selectionEnd);
    if (!hasSelection || selected.includes('\n')) {
      // Không chọn gì, hoặc chọn nhiều dòng -> dùng code block (```)
      wrapSelection('```\n', '\n```', 'code');
    } else {
      // Chọn 1 đoạn text trên 1 dòng -> dùng inline code (`)
      wrapSelection('`', '`', 'code');
    }
  },
  quote: () => prefixLines(line => '> ' + line),
  ul: () => applyListFormat('ul'),
  ol: () => applyListFormat('ol'),
  task: () => applyListFormat('task'),
  link: () => wrapSelection('[', '](https://)', 'nội dung liên kết'),
  image: () => insertAtCursor('![mô tả ảnh](https://)', 2),
  table: () => insertAtCursor(
'\n| Cột 1 | Cột 2 | Cột 3 |\n|---|---|---|\n| ô 1 | ô 2 | ô 3 |\n| ô 4 | ô 5 | ô 6 |\n'
  ),
  hr: () => insertAtCursor('\n\n---\n\n'),
  comment: () => wrapSelection('<!-- ', ' -->', 'ghi chú'),
};

document.getElementById('toolbar').addEventListener('click', (e) => {
  const btn = e.target.closest('.tb-btn');
  if (!btn) return;
  const action = toolbarActions[btn.dataset.action];
  if (action) action();
});

// Phím tắt nhanh cho Bold / Italic (giống HackMD)
editor.addEventListener('keydown', (e) => {
  if (e.ctrlKey || e.metaKey) {
    if (e.key === 'b') { e.preventDefault(); toolbarActions.bold(); }
    if (e.key === 'i') { e.preventDefault(); toolbarActions.italic(); }
    return;
  }
  if (e.key === 'Enter') handleEnterKey(e);
});

// Nhấn Enter trong 1 dòng list -> tự tiếp tục list (số tăng dần / cùng dấu gạch đầu dòng),
// giống HackMD. Nhấn Enter trên 1 dòng list đang trống (mới gõ marker chưa có nội dung) -> thoát khỏi list.
function handleEnterKey(e) {
  const pos = editor.selectionStart;
  if (pos !== editor.selectionEnd) return; // có bôi đen -> để trình duyệt xử lý bình thường
  const value = editor.value;
  const lineStart = value.lastIndexOf('\n', pos - 1) + 1;
  const currentLine = value.slice(lineStart, pos);

  // Ordered list: "  3. nội dung"
  const olMatch = currentLine.match(/^(\s*)(\d+)\.\s+(.*)$/);
  if (olMatch) {
    e.preventDefault();
    const [, indent, numStr, content] = olMatch;
    if (content.trim() === '') {
      // Dòng list trống -> Enter để thoát khỏi list: xoá marker, xuống dòng trắng
      const lineEndIdx = value.indexOf('\n', pos);
      const realLineEnd = lineEndIdx === -1 ? value.length : lineEndIdx;
      editor.setRangeText('', lineStart, realLineEnd, 'end');
      scheduleRender();
      return;
    }
    const nextNum = parseInt(numStr, 10) + 1;
    insertAtCursor('\n' + indent + nextNum + '. ');
    return;
  }

  // Bullet list / Checklist: "  - nội dung" hoặc "  - [ ] nội dung"
  const ulMatch = currentLine.match(/^(\s*)([-*])\s+(?:(\[[ xX]\])\s+)?(.*)$/);
  if (ulMatch) {
    e.preventDefault();
    const [, indent, bullet, checkbox, content] = ulMatch;
    if (content.trim() === '') {
      const lineEndIdx = value.indexOf('\n', pos);
      const realLineEnd = lineEndIdx === -1 ? value.length : lineEndIdx;
      editor.setRangeText('', lineStart, realLineEnd, 'end');
      scheduleRender();
      return;
    }
    const marker = indent + bullet + ' ' + (checkbox ? '[ ] ' : '');
    insertAtCursor('\n' + marker);
    return;
  }
}

// ---- Đổi tên file: bấm vào tên -> chuyển thành ô input để sửa ----
const fileNameInput = document.getElementById('fileNameInput');

function startRenameFile() {
  fileNameInput.value = fileNameText.textContent;
  fileNameText.style.display = 'none';
  fileNameInput.style.display = 'inline-block';
  fileNameInput.focus();
  fileNameInput.select();
}
function commitRenameFile() {
  const newName = fileNameInput.value.trim();
  if (newName) fileNameText.textContent = newName;
  fileNameInput.style.display = 'none';
  fileNameText.style.display = '';
  scheduleAutosave();
}
fileNameText.addEventListener('click', startRenameFile);
fileNameText.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); startRenameFile(); }
});
fileNameInput.addEventListener('blur', commitRenameFile);
fileNameInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') { e.preventDefault(); fileNameInput.blur(); }
  if (e.key === 'Escape') { fileNameInput.value = fileNameText.textContent; fileNameInput.blur(); }
});

// ---- Clear: xoá toàn bộ nội dung, có hộp thoại xác nhận trước khi xoá ----
const clearModal = document.getElementById('clearModal');
document.getElementById('btnClear').addEventListener('click', () => {
  clearModal.classList.add('show');
});
document.getElementById('clearCancel').addEventListener('click', () => {
  clearModal.classList.remove('show');
});
document.getElementById('clearConfirm').addEventListener('click', () => {
  editor.value = '';
  updateLineNumbers();
  updateCursorStatus();
  render();
  updateDocStats();
  scheduleAutosave();
  statusText.textContent = 'Đã xoá toàn bộ';
  clearModal.classList.remove('show');
  editor.focus();
});
// Bấm ra ngoài hộp thoại hoặc nhấn Esc -> huỷ, không xoá
clearModal.addEventListener('click', (e) => {
  if (e.target === clearModal) clearModal.classList.remove('show');
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && clearModal.classList.contains('show')) {
    clearModal.classList.remove('show');
  }
  if (e.key === 'Escape' && settingsModal.classList.contains('show')) {
    settingsModal.classList.remove('show');
  }
});

// ---- Cài đặt giao diện: theme, phông chữ, cỡ chữ, màu nền riêng từng khung ----
const settingsModal = document.getElementById('settingsModal');
const btnSettings = document.getElementById('btnSettings');
const settingsClose = document.getElementById('settingsClose');
const settingsReset = document.getElementById('settingsReset');
const themeOptions = document.querySelectorAll('.theme-option');
const selEditorFont = document.getElementById('selEditorFont');
const selEditorSize = document.getElementById('selEditorSize');
const selPreviewFont = document.getElementById('selPreviewFont');
const selPreviewSize = document.getElementById('selPreviewSize');
const editorBgColor = document.getElementById('editorBgColor');
const editorBgReset = document.getElementById('editorBgReset');
const editorBgSuggestions = document.getElementById('editorBgSuggestions');
const previewBgColor = document.getElementById('previewBgColor');
const previewBgReset = document.getElementById('previewBgReset');
const previewBgSuggestions = document.getElementById('previewBgSuggestions');

// Màu nền mặc định theo từng theme -- chỉ dùng để hiển thị giá trị ban đầu trên color picker
// khi người dùng chưa tự chọn màu riêng (editorBg / previewBg = null).
const THEME_DEFAULT_COLORS = {
  dark:   { editorBg: '#0d1117', previewBg: '#161b22' },
  light:  { editorBg: '#f2f4f6', previewBg: '#fbfbfa' },
  sepia:  { editorBg: '#ece0c4', previewBg: '#f4ecd8' },
  mist:   { editorBg: '#e2e8ee', previewBg: '#eef2f5' },
  matcha: { editorBg: '#e6e0cf', previewBg: '#f0ece0' },
};

// Vài màu gợi ý nhanh cho mỗi theme (biến thể hài hoà với bảng màu của theme đó),
// hiển thị dưới dạng chấm tròn để bấm chọn nhanh thay vì phải tự mở color picker.
const THEME_SUGGESTED_COLORS = {
  dark: {
    editorBg:  ['#0d1117', '#000000', '#0f141b', '#161b22'],
    previewBg: ['#161b22', '#10141a', '#1b2029', '#0d1117'],
  },
  light: {
    editorBg:  ['#f2f4f6', '#ffffff', '#eef2ff', '#f7f5f0'],
    previewBg: ['#ffffff', '#f9fafb', '#eef2ff', '#fbfbfa'],
  },
  sepia: {
    editorBg:  ['#ece0c4', '#f4ecd8', '#e3d5b3', '#efe6cd'],
    previewBg: ['#f4ecd8', '#faf3e1', '#ece0c4', '#f0e8d2'],
  },
  mist: {
    editorBg:  ['#e2e8ee', '#eef2f5', '#dbe7ea', '#eef6f3'],
    previewBg: ['#eef2f5', '#f4f8fa', '#e2e8ee', '#eaf4f2'],
  },
  matcha: {
    editorBg:  ['#e6e0cf', '#f0ece0', '#dfe6d2', '#eae3cd'],
    previewBg: ['#f0ece0', '#f7f4ea', '#e6e0cf', '#eef0e2'],
  },
};

const DEFAULT_SETTINGS = {
  theme: 'dark',
  editorFont: '"SF Mono",Consolas,"Courier New",monospace',
  editorFontSize: '13.5px',
  previewFont: '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif',
  previewFontSize: '15px',
  editorBg: null,   // null = dùng màu mặc định theo theme
  previewBg: null,  // null = dùng màu mặc định theo theme
};
let currentSettings = { ...DEFAULT_SETTINGS };

// Chuyển mã màu hex (#rgb hoặc #rrggbb) sang {r,g,b}
function hexToRgb(hex) {
  let h = hex.replace('#', '');
  if (h.length === 3) h = h.split('').map(c => c + c).join('');
  const num = parseInt(h, 16);
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
}

// Tính màu chữ (sáng hoặc tối) sao cho luôn tương phản rõ với màu nền được chọn
function getReadableTextColor(hex) {
  const { r, g, b } = hexToRgb(hex);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.55 ? '#1a1f24' : '#e8edf2';
}

// Vẽ lại các chấm màu gợi ý cho 1 nhóm (editorBg / previewBg) theo theme hiện tại.
// Bấm vào 1 chấm -> áp dụng luôn màu đó cho phần tương ứng.
function renderColorSuggestions(container, groupKey, theme) {
  const colors = (THEME_SUGGESTED_COLORS[theme] || THEME_SUGGESTED_COLORS.dark)[groupKey];
  container.innerHTML = '';
  colors.forEach(hex => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'suggestion-swatch';
    dot.style.background = hex;
    dot.title = hex;
    dot.addEventListener('click', () => {
      currentSettings[groupKey] = hex;
      applySettings(currentSettings);
      saveSettings();
    });
    container.appendChild(dot);
  });
}

// Áp dụng 1 bộ settings lên giao diện thật (biến CSS) và đồng bộ lại các control trong modal
function applySettings(s) {
  document.documentElement.setAttribute('data-theme', s.theme);
  document.documentElement.style.setProperty('--editor-font', s.editorFont);
  document.documentElement.style.setProperty('--editor-font-size', s.editorFontSize);
  document.documentElement.style.setProperty('--preview-font', s.previewFont);
  document.documentElement.style.setProperty('--preview-font-size', s.previewFontSize);

  // Màu nền khung soạn thảo: nếu người dùng đã tự chọn -> áp dụng màu đó + tự tính màu chữ tương phản.
  // Nếu chưa (null) -> gỡ override để CSS tự rơi về màu mặc định theo theme.
  if (s.editorBg) {
    document.documentElement.style.setProperty('--editor-bg', s.editorBg);
    document.documentElement.style.setProperty('--editor-text', getReadableTextColor(s.editorBg));
  } else {
    document.documentElement.style.removeProperty('--editor-bg');
    document.documentElement.style.removeProperty('--editor-text');
  }

  // Tương tự cho màu nền bản xem trước
  if (s.previewBg) {
    document.documentElement.style.setProperty('--preview-bg', s.previewBg);
    document.documentElement.style.setProperty('--preview-text', getReadableTextColor(s.previewBg));
  } else {
    document.documentElement.style.removeProperty('--preview-bg');
    document.documentElement.style.removeProperty('--preview-text');
  }

  themeOptions.forEach(btn => btn.classList.toggle('active', btn.dataset.theme === s.theme));
  selEditorFont.value = s.editorFont;
  selEditorSize.value = s.editorFontSize;
  selPreviewFont.value = s.previewFont;
  selPreviewSize.value = s.previewFontSize;

  const themeDefaults = THEME_DEFAULT_COLORS[s.theme] || THEME_DEFAULT_COLORS.dark;
  editorBgColor.value = s.editorBg || themeDefaults.editorBg;
  previewBgColor.value = s.previewBg || themeDefaults.previewBg;

  renderColorSuggestions(editorBgSuggestions, 'editorBg', s.theme);
  renderColorSuggestions(previewBgSuggestions, 'previewBg', s.theme);
}

// Lưu settings hiện tại (lưu riêng cho từng người dùng, không chia sẻ)
async function saveSettings() {
  try {
    await window.storage.set('settings:appearance', JSON.stringify(currentSettings));
  } catch (err) {
    console.error('Không lưu được cài đặt giao diện:', err);
  }
}

// Đọc settings đã lưu từ trước (nếu có) khi mở lại trang
async function loadSettings() {
  try {
    const result = await window.storage.get('settings:appearance');
    if (result && result.value) {
      currentSettings = { ...DEFAULT_SETTINGS, ...JSON.parse(result.value) };
    }
  } catch (err) {
    // Chưa từng lưu cài đặt trước đó -> dùng mặc định, không cần báo lỗi
  }
  applySettings(currentSettings);
}
loadSettings();

btnSettings.addEventListener('click', () => settingsModal.classList.add('show'));
settingsClose.addEventListener('click', () => settingsModal.classList.remove('show'));
settingsModal.addEventListener('click', (e) => {
  if (e.target === settingsModal) settingsModal.classList.remove('show');
});

themeOptions.forEach(btn => {
  btn.addEventListener('click', () => {
    currentSettings.theme = btn.dataset.theme;
    applySettings(currentSettings);
    saveSettings();
  });
});
selEditorFont.addEventListener('change', () => {
  currentSettings.editorFont = selEditorFont.value;
  applySettings(currentSettings);
  saveSettings();
});
selEditorSize.addEventListener('change', () => {
  currentSettings.editorFontSize = selEditorSize.value;
  applySettings(currentSettings);
  saveSettings();
});
selPreviewFont.addEventListener('change', () => {
  currentSettings.previewFont = selPreviewFont.value;
  applySettings(currentSettings);
  saveSettings();
});
selPreviewSize.addEventListener('change', () => {
  currentSettings.previewFontSize = selPreviewSize.value;
  applySettings(currentSettings);
  saveSettings();
});
editorBgColor.addEventListener('input', () => {
  currentSettings.editorBg = editorBgColor.value;
  applySettings(currentSettings);
  saveSettings();
});
editorBgReset.addEventListener('click', () => {
  currentSettings.editorBg = null;
  applySettings(currentSettings);
  saveSettings();
});
previewBgColor.addEventListener('input', () => {
  currentSettings.previewBg = previewBgColor.value;
  applySettings(currentSettings);
  saveSettings();
});
previewBgReset.addEventListener('click', () => {
  currentSettings.previewBg = null;
  applySettings(currentSettings);
  saveSettings();
});
settingsReset.addEventListener('click', () => {
  currentSettings = { ...DEFAULT_SETTINGS };
  applySettings(currentSettings);
  saveSettings();
});

// ---- Dropdown menu dùng chung cho Copy & Tải xuống ----
function setupDropdown(rootId, toggleId, menuId) {
  const root = document.getElementById(rootId);
  const toggle = document.getElementById(toggleId);
  const menu = document.getElementById(menuId);
  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const willShow = !menu.classList.contains('show');
    document.querySelectorAll('.dropdown-menu.show').forEach(m => m.classList.remove('show'));
    if (willShow) menu.classList.add('show');
  });
  return { root, menu };
}
const copyDropdown = setupDropdown('copyDropdown', 'btnCopyToggle', 'copyMenu');
const exportDropdown = setupDropdown('exportDropdown', 'btnExportToggle', 'exportMenu');

document.addEventListener('click', () => {
  document.querySelectorAll('.dropdown-menu.show').forEach(m => m.classList.remove('show'));
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.dropdown-menu.show').forEach(m => m.classList.remove('show'));
  }
});

// Hiện tạm thông báo trạng thái ở góc trên (VD "Đã copy Markdown"), sau đó trả lại trạng thái lưu bình thường
function flashStatus(message) {
  statusText.textContent = message;
  setTimeout(() => { statusText.textContent = 'Đã lưu tự động'; }, 1800);
}

// ---- Copy Markdown / Copy HTML vào clipboard ----
document.getElementById('copyMarkdownBtn').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(editor.value);
    flashStatus('Đã copy Markdown');
  } catch (err) {
    flashStatus('Không copy được — trình duyệt chặn clipboard');
  }
});

document.getElementById('copyHtmlBtn').addEventListener('click', async () => {
  const htmlString = previewContent.innerHTML;
  try {
    if (window.ClipboardItem) {
      // Copy cả HTML (để dán có định dạng vào Notion/Confluence/Word) lẫn text thường (để dán vào nơi không hỗ trợ HTML)
      const item = new ClipboardItem({
        'text/html': new Blob([htmlString], { type: 'text/html' }),
        'text/plain': new Blob([previewContent.innerText], { type: 'text/plain' }),
      });
      await navigator.clipboard.write([item]);
    } else {
      await navigator.clipboard.writeText(htmlString);
    }
    flashStatus('Đã copy HTML');
  } catch (err) {
    flashStatus('Không copy được — trình duyệt chặn clipboard');
  }
});

// ---- Tải xuống: Markdown (.md) / HTML (.html) / PDF (qua hộp thoại in) ----
function escapeHtml(str) {
  return str.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function getBaseFileName() {
  return fileNameText.textContent.replace(/\.(md|markdown|html?)$/i, '');
}

function downloadBlob(content, mimeType, filename) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Dựng 1 file HTML độc lập (tự chứa CSS, không phụ thuộc theme đang chọn) để gửi cho người không có Markdown viewer
function buildStandaloneHtml() {
  const title = getBaseFileName();
  return `<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escapeHtml(title)}</title>
<style>
  body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif;line-height:1.65;color:#1f2328;background:#fff;max-width:820px;margin:40px auto;padding:0 24px;}
  h1{font-size:1.9em;margin-bottom:.3em;}
  h2{font-size:1.4em;margin-top:1.6em;border-bottom:1px solid #e1e4e8;padding-bottom:.3em;}
  h3{font-size:1.15em;margin-top:1.3em;}
  pre{background:#f6f8fa;border:1px solid #e1e4e8;border-radius:6px;padding:12px 14px;overflow-x:auto;font-size:13px;}
  code{font-family:"SF Mono",Consolas,monospace;}
  table{border-collapse:collapse;width:100%;margin:12px 0;}
  th,td{border:1px solid #e1e4e8;padding:6px 10px;font-size:13px;}
  blockquote{border-left:3px solid #58a6ff;margin:0;padding:2px 14px;color:#57606a;}
  img{max-width:100%;}
  @media print{ body{margin:0;padding:16px;} }
</style>
</head>
<body>
${previewContent.innerHTML}
</body>
</html>`;
}

document.getElementById('exportMdBtn').addEventListener('click', () => {
  const filename = fileNameText.textContent.endsWith('.md') ? fileNameText.textContent : fileNameText.textContent + '.md';
  downloadBlob(editor.value, 'text/markdown;charset=utf-8', filename);
});

document.getElementById('exportHtmlBtn').addEventListener('click', () => {
  downloadBlob(buildStandaloneHtml(), 'text/html;charset=utf-8', getBaseFileName() + '.html');
});

document.getElementById('exportPdfBtn').addEventListener('click', () => {
  const printWin = window.open('', '_blank');
  if (!printWin) {
    alert('Trình duyệt đã chặn cửa sổ pop-up. Vui lòng cho phép pop-up cho trang này để xuất PDF.');
    return;
  }
  printWin.document.open();
  printWin.document.write(buildStandaloneHtml());
  printWin.document.close();
  // Đợi nội dung/ảnh load xong rồi mới mở hộp thoại in -> trong hộp thoại chọn "Save as PDF" để lưu file
  printWin.onload = () => {
    printWin.focus();
    printWin.print();
  };
});
