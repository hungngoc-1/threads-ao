// ===================== Helpers =====================
const $ = (s) => document.querySelector(s);
const esc = (s = '') => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
const KEY = 'threads_ao_v2';

const DEFAULT_AVATAR = 'data:image/svg+xml;utf8,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="#e4e4e4"/><circle cx="50" cy="40" r="18" fill="#b5b5b5"/><path d="M15 95c5-22 20-32 35-32s30 10 35 32z" fill="#b5b5b5"/></svg>');

const LOGO = '<svg viewBox="-10 -6 212 204" class="th-logo"><g transform="translate(96 96) scale(1.07 0.97) translate(-96 -96)"><path stroke="currentColor" stroke-width="7.5" stroke-linejoin="round" d="M141.5 88.7c-.8-.4-1.7-.8-2.5-1.1-1.5-27-16.2-42.5-41-42.6h-.3c-14.8 0-27.1 6.3-34.7 17.8l13.6 9.4c5.7-8.6 14.6-10.4 21.1-10.4h.2c8.2.1 14.3 2.4 18.3 7 2.9 3.3 4.8 7.900 5.8 13.8-7.3-1.2-15.2-1.6-23.6-1.1-23.7 1.4-39 15.2-38 34.4.5 9.7 5.4 18.1 13.7 23.6 7 4.6 16.1 6.9 25.5 6.4 12.4-.7 22.2-5.4 29-14.1 5.2-6.6 8.5-15.2 9.9-26 5.9 3.6 10.3 8.3 12.7 14 4.1 9.7 4.4 25.6-8.6 38.6-11.4 11.4-25.1 16.3-45.8 16.4-23-.2-40.3-7.5-51.6-21.8C34.6 139.6 29.2 120.3 29 96c.2-24.3 5.6-43.600 16.1-57.1C56.4 24.6 73.7 17.3 96.7 17.1c23.1.2 40.8 7.5 52.5 21.8 5.7 7 10 15.8 12.9 26.1l16-4.3c-3.5-12.7-8.9-23.7-16.3-32.7C146.9 9.6 125.2.3 96.8 0h-.1C68.4.2 46.900 9.6 32.5 27.9 19.7 44.2 13.1 66.8 12.9 95.9v.2c.2 29.1 6.8 51.7 19.6 68 14.4 18.3 35.9 27.7 64.2 27.9h.1c25.2-.2 42.9-6.8 57.6-21.4 19.2-19.2 18.6-43.2 12.3-58-4.5-10.6-13.1-19.2-25.2-23.9zm-43.5 41c-10.5.6-21.4-4.1-22-14.2-.4-7.5 5.3-15.8 22.6-16.8 2-.1 3.9-.2 5.8-.2 6.3 0 12.2.6 17.5 1.8-2 24.7-13.7 28.8-23.9 29.4z"/></g></svg>';
const I = {
  heart: '<svg viewBox="0 0 24 24"><path d="M11.5 21.2c-.35 0-.7-.14-1-.38C7.05 18.05 1.8 13.7 1.8 8.6 1.8 5.2 4.35 2.7 7.4 2.7c1.82 0 3.25.88 4.1 2.25.85-1.37 2.28-2.25 4.1-2.25 3.05 0 5.6 2.5 5.6 5.9 0 5.1-5.25 9.45-8.7 12.22-.3.24-.65.38-1 .38Z"/></svg>',
  heartBadge: '<svg viewBox="0 0 24 24" class="al-heart"><path d="M12 21.3c-.38 0-.75-.15-1.05-.4C7.3 18 1.6 13.5 1.6 8.3 1.6 4.8 4.25 2.2 7.4 2.2c1.9 0 3.45.95 4.6 2.45 1.15-1.5 2.7-2.45 4.6-2.45 3.15 0 5.8 2.6 5.8 6.1 0 5.2-5.7 9.7-9.35 12.6-.3.25-.67.4-1.05.4Z"/></svg>',
  comment: '<svg viewBox="0 0 24 24"><path d="M19.6 16.5A9.5 9.5 0 1 0 16.5 19.6l4.3 1.5c.3.1.55-.15.45-.45l-1.65-4.15Z"/></svg>',
  repost: '<svg viewBox="0 0 24 24"><path d="M2 2.2V8h5.8"/><path d="M2.4 7.6A9.5 9.5 0 0 1 20.4 8.2"/><path d="M15.2 15.2H21V21"/><path d="M2.6 14.8a9.5 9.5 0 0 0 18 .6"/></svg>',
  share: '<svg viewBox="0 0 24 24"><path d="M4.8 11.5 2.3 4.2c-.45-1.3.85-2.5 2.1-1.85l15.8 7.8c1.15.57 1.15 2.13 0 2.7L4.4 20.65c-1.25.65-2.55-.55-2.1-1.85l2.5-7.3Zm0 0h16"/></svg>',
  menu: '<svg viewBox="0 0 24 24"><path d="M4 8h16M4 16h10"/></svg>',
  search: '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>',
  back: '<svg viewBox="0 0 24 24"><path d="m15 4-8 8 8 8"/></svg>',
  bell: '<svg viewBox="0 0 24 24"><path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 21h4"/></svg>',
  more: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9.5"/><circle cx="8" cy="12" r=".95" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r=".95" fill="currentColor" stroke="none"/><circle cx="16" cy="12" r=".95" fill="currentColor" stroke="none"/></svg>',
  home: '<svg viewBox="0 0 24 24"><path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/></svg>',
  plus: '<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>',
  user: '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4.5-6 8-6s7 2 8 6"/></svg>',
  photo: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15.5-5.2-5.2L5 21"/></svg>',
  dots: '<svg viewBox="0 0 24 24" class="dots-ico"><circle cx="3.8" cy="12" r="1.7" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.7" fill="currentColor" stroke="none"/><circle cx="20.2" cy="12" r="1.7" fill="currentColor" stroke="none"/></svg>',
  chevDown: '<svg viewBox="0 0 24 24" class="chev"><path d="m6 9 6 6 6-6"/></svg>',
  chevRight: '<svg viewBox="0 0 24 24" class="chev"><path d="m9 6 6 6-6 6"/></svg>',
};

// Tăng/giảm số. Số dạng rút gọn ("13,5K") thì giữ nguyên.
function bump(str, d) {
  const s = String(str ?? '').trim();
  if (/[a-zA-Z]/.test(s)) return s;
  const v = Math.max(0, (parseInt(s.replace(/\D/g, ''), 10) || 0) + d);
  return v ? String(v) : '';
}
const newItem = (o) => ({ id: uid(), avatar: me.avatar, name: me.name, time: 'Vừa xong', text: '', image: '',
  likes: '', comments: '', reposts: '', shares: '', liked: false, authorLiked: false, ...o });

// ===================== State =====================
let me = load(KEY + '_me', { name: 'ban_cua_toi', avatar: DEFAULT_AVATAR });
let posts = load(KEY, null) || [
  { id: 'p1', avatar: DEFAULT_AVATAR, name: 'nguoidung_1', time: '18 giờ', views: '29,9K',
    text: 'Chạm vào bất kỳ chữ/số/avatar nào để sửa trực tiếp, chạm vào bài để xem và viết bình luận nha 😆',
    image: '', likes: '13,5K', comments: '2', reposts: '1,1K', shares: '249', liked: false,
    replies: [
      { id: 'r1', avatar: DEFAULT_AVATAR, name: 'tombofmycat', time: '10 giờ', text: 'Hay quá trời', image: '', likes: '5', comments: '', reposts: '', shares: '', liked: false, authorLiked: true, replies: [] },
      { id: 'r2', avatar: DEFAULT_AVATAR, name: 'n.hcuti_', time: '8 giờ', text: 'Chuẩn luôn :)', image: '', likes: '12', comments: '', reposts: '', shares: '', liked: true, authorLiked: false, replies: [] },
    ] },
];
let editing = false;

function load(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } }
function persist() {
  try { localStorage.setItem(KEY, JSON.stringify(posts)); localStorage.setItem(KEY + '_me', JSON.stringify(me)); }
  catch { alert('Bộ nhớ trình duyệt đã đầy, hãy xóa bớt ảnh.'); }
}

// Điều hướng bằng hash để nút Back của điện thoại hoạt động
const currentThread = () => { const m = location.hash.match(/^#\/t\/(.+)$/); return m && posts.find((p) => p.id === m[1]); };

// Kiểm tra một mục có phải của Tác giả bài viết hay không & đồng bộ tên/avatar Tác giả
function isItemAuthor(item, thread) {
  if (!item || !thread) return false;
  return item === thread || (item.isAuthor ?? item.name === thread.name);
}
function forEachAuthorItem(thread, fn) {
  if (!thread) return;
  fn(thread);
  (thread.replies || []).forEach((r) => {
    if (isItemAuthor(r, thread)) fn(r);
    (r.replies || []).forEach((n) => {
      if (isItemAuthor(n, thread)) fn(n);
      (n.replies || []).forEach((s) => {
        if (isItemAuthor(s, thread)) fn(s);
      });
    });
  });
}
function syncAuthorAvatar(thread, url) {
  forEachAuthorItem(thread, (it) => { it.avatar = url; });
}
function syncAuthorName(thread, newName, activeEl) {
  forEachAuthorItem(thread, (it) => {
    it.isAuthor = true;
    it.name = newName;
    const domName = document.querySelector(`.post[data-id="${it.id}"] > .p-body > .p-head > .p-name, .post.main[data-id="${it.id}"] .p-name`);
    if (domName && domName !== activeEl) domName.textContent = newName;
  });
}

// Chuẩn hóa danh sách ảnh của một mục (tương thích cả dữ liệu cũ p.image lẫn mảng p.images)
function getImages(p) {
  if (!p) return [];
  if (Array.isArray(p.images)) return p.images;
  p.images = p.image ? [p.image] : [];
  delete p.image;
  return p.images;
}
function mediaHTML(imgs) {
  if (!imgs || !imgs.length) return '';
  if (imgs.length === 1) {
    return `<div class="p-img-wrap"><img class="p-img" src="${imgs[0]}" data-act="change-image" data-idx="0" title="Bấm vào ảnh để đổi ảnh này" alt=""><button class="rm-img" data-act="rm-image" data-idx="0" title="Xóa ảnh này">✕</button></div>`;
  }
  return `<div class="p-gallery">${imgs.map((src, i) => `
    <div class="p-gal-item">
      <img class="p-gal-img" src="${src}" data-act="change-image" data-idx="${i}" title="Bấm vào ảnh để đổi ảnh này" alt="">
      <button class="rm-img" data-act="rm-image" data-idx="${i}" title="Xóa ảnh này">✕</button>
    </div>`).join('')}</div>`;
}

// ===================== Render =====================
const ce = () => 'contenteditable="true" spellcheck="false"';

// Trạng thái trả lời bình luận
let replyTo = null; // { cid, nid, targetId, sub, name }
let replyAsAuthor = false;
let draft = '';
let replyImgs = [];

// main = bài gốc · comment = bình luận · nested = trả lời bình luận
function itemHTML(p, { main = false, parent = null, cparent = null, nparent = null, sub = false, feed = false, author = false, threadAvatar = '', threadName = '', hasReplies = false, chainPrev = false } = {}) {
  const e = ce();
  const isAuthor = p.isAuthor ?? author;
  const avatarSrc = (!main && isAuthor && threadAvatar) ? threadAvatar : p.avatar;
  const displayName = (!main && isAuthor && threadName) ? threadName : p.name;
  const imgs = getImages(p);
  const rightIcon = main ? `<span class="wordmark">${LOGO}threads</span>` : cparent ? I.dots : LOGO;
  const authorHeartHTML = !main && !feed && p.authorLiked
    ? `<button class="author-like" data-act="toggle-author-like" title="Tác giả đã thả tim (bấm để tắt)"><img class="al-avatar" src="${threadAvatar || p.avatar}" alt="">${I.heartBadge}</button>`
    : '';
  const head = `
    <div class="p-head">
      <span class="p-name" data-f="name" ${e} title="Bấm để sửa tên">${esc(displayName)}</span>
      <span class="p-time" data-f="time" ${e} title="Bấm để sửa thời gian">${esc(p.time)}</span>
      ${!main && !feed ? `<span class="badge ${isAuthor ? '' : 'off'}" data-act="toggle-author" title="Bấm để bật/tắt nhãn Tác giả">Tác giả</span>` : ''}
      <div class="p-right">
        ${authorHeartHTML}
        <div class="menu-wrap">
          <button class="more-btn" data-act="item-menu" title="Tùy chọn / Xóa">${rightIcon}</button>
          <div class="pop-menu">
            ${!main && !feed ? `<button class="pop-item" data-act="toggle-author-like">❤️ ${p.authorLiked ? 'Bỏ' : 'Bật'} Tác giả thả tim</button>` : ''}
            ${!main && !feed ? `<button class="pop-item" data-act="reply-as-author">✍️ Tác giả trả lời</button>` : ''}
            <button class="pop-item" data-act="add-images">🖼 ${imgs.length ? 'Thêm ảnh nữa' : 'Thêm ảnh'}</button>
            ${imgs.length ? `<button class="pop-item" data-act="clear-images">✕ Gỡ hết ảnh (${imgs.length})</button>` : ''}
            ${!main && !feed ? `<button class="pop-item" data-act="toggle-author">🏷️ ${isAuthor ? 'Ẩn' : 'Hiện'} nhãn Tác giả</button>` : ''}
            <button class="pop-item danger" data-act="del">🗑️ Xóa</button>
          </div>
        </div>
      </div>
    </div>`;
  const content = `
    <div class="p-text" data-f="text" ${e} title="Bấm để sửa nội dung">${esc(p.text)}</div>
    ${mediaHTML(imgs)}
    <button class="add-img" data-act="add-images">🖼 ${imgs.length ? `Thêm ảnh nữa (${imgs.length})` : 'Thêm ảnh'}</button>
    <div class="p-actions">
      <div class="act like ${p.liked ? 'liked' : ''}">
        <button class="act-btn" data-act="like" title="Bấm để thả tim">${I.heart}</button>
        <span class="num" data-f="likes" ${e} data-ph="0" title="Bấm để nhập số tim">${esc(p.likes)}</span>
      </div>
      <div class="act">
        <button class="act-btn" data-act="${parent ? 'reply-to' : 'open'}" title="${parent ? 'Trả lời mục này' : 'Mở bình luận'}">${I.comment}</button>
        <span class="num" data-f="comments" ${e} data-ph="0" title="Bấm để nhập số bình luận">${esc(p.comments)}</span>
      </div>
      <div class="act">
        <button class="act-btn" data-act="repost" title="Đăng lại">${I.repost}</button>
        <span class="num" data-f="reposts" ${e} data-ph="0" title="Bấm để nhập số đăng lại">${esc(p.reposts)}</span>
      </div>
      <div class="act">
        <button class="act-btn" data-act="share" title="Chia sẻ">${I.share}</button>
        <span class="num" data-f="shares" ${e} data-ph="0" title="Bấm để nhập số chia sẻ">${esc(p.shares)}</span>
      </div>
    </div>`;
  const attrs = `data-id="${p.id}" ${parent ? `data-pid="${parent}"` : ''} ${cparent ? `data-cid="${cparent}"` : ''} ${nparent ? `data-nid="${nparent}"` : ''}`;
  if (main) return `<article class="post main" ${attrs}>
      <div class="p-head-row"><img class="avatar lg" src="${avatarSrc}" data-act="avatar" title="Bấm để đổi avatar" alt=""><div class="p-body">${head}</div></div>
      <div>${content}</div></article>`;
  const cls = ['post', cparent ? 'nested' : '', sub ? 'sub' : '', hasReplies ? 'has-replies' : '', chainPrev ? 'chain-prev' : ''].filter(Boolean).join(' ');
  return `<article class="${cls}" ${attrs} ${feed ? 'data-open="1"' : ''}>
      <img class="avatar ${cparent ? 'sm' : ''}" src="${avatarSrc}" data-act="avatar" title="Bấm để đổi avatar" alt="">
      <div class="p-body">${head}${content}</div></article>`;
}

function render() {
  document.body.classList.toggle('editing', editing);
  const t = currentThread();
  const editBtn = `<button class="icon-btn ${editing ? 'on' : ''}" data-act="toggle-edit" title="Hiện/ẩn khung chỉnh sửa">${t ? I.more : I.menu}</button>`;

  if (t) {
    // ---- Trang chi tiết thread ----
    $('#topbar').className = 'topbar thread-bar';
    $('#topbar').innerHTML = `
      <button class="back" data-act="back">${I.back}<span>Quay lại</span></button>
      <div class="t-title"><b>Thread</b><span><span data-f="views" data-thread="1" ${ce()} title="Bấm để sửa lượt xem">${esc(t.views || '0')}</span> lượt xem</span></div>
      <div class="t-right"><button class="icon-btn dark" data-act="toggle-edit" title="Bật/tắt khung sửa">${I.bell}</button>${editBtn.replace('icon-btn', 'icon-btn dark')}</div>`;
    $('#view').className = 'view thread';
    $('#view').innerHTML = itemHTML(t, { main: true, threadAvatar: t.avatar, threadName: t.name }) +
      `<div class="section-title"><span class="sec-left">Hàng đầu ${I.chevDown}</span><span class="sec-right">Xem hoạt động ${I.chevRight}</span></div>` +
      (t.replies.length ? t.replies.map((r) => {
          const list = r.replies || [];
          return `<div class="group">` +
            itemHTML(r, { parent: t.id, author: r.name === t.name, threadAvatar: t.avatar, threadName: t.name, hasReplies: list.length > 0 }) +
            list.map((n, i) => {
              const subs = n.replies || [];
              return `<div class="branch ${i < list.length - 1 ? 'more' : ''}">` +
                itemHTML(n, { parent: t.id, cparent: r.id, author: n.name === t.name, threadAvatar: t.avatar, threadName: t.name, chainPrev: subs.length > 0 }) +
                subs.map((s, j) => itemHTML(s, {
                  parent: t.id, cparent: r.id, nparent: n.id, sub: true,
                  author: s.name === t.name, threadAvatar: t.avatar, threadName: t.name, chainPrev: j < subs.length - 1,
                })).join('') +
                `</div>`;
            }).join('') +
            `</div>`;
        }).join('')
        : '<p class="empty">Chưa có câu trả lời nào. Hãy là người đầu tiên!</p>');
    const canSend = draft.trim() || replyImgs.length > 0;
    const compAvatar = replyAsAuthor ? t.avatar : me.avatar;
    const ph = replyTo
      ? (replyAsAuthor ? `Tác giả trả lời ${esc(replyTo.name)}...` : `Trả lời ${esc(replyTo.name)}...`)
      : (replyAsAuthor ? `Trả lời bằng Tác giả (${esc(t.name)})...` : 'Thêm câu trả lời...');
    $('#bottom').innerHTML = `
      ${replyTo ? `<div class="reply-chip"><span>Đang trả lời <b>@${esc(replyTo.name)}</b></span><div class="chip-acts"><button class="chip-img" data-act="reply-img">🖼 Chọn ảnh</button><button data-act="cancel-reply" title="Hủy trả lời">✕</button></div></div>` : ''}
      ${replyImgs.length ? `<div class="reply-preview-list">${replyImgs.map((u, idx) => `<div class="reply-preview"><img src="${u}" alt=""><button class="rm-preview" data-act="rm-reply-img" data-idx="${idx}" title="Bỏ ảnh này">✕</button></div>`).join('')}</div>` : ''}
      <div class="composer">
        <img class="avatar xs" src="${compAvatar}" data-act="my-avatar" title="Bấm để đổi avatar" alt="">
        <button class="comp-author ${replyAsAuthor ? 'on' : ''}" data-act="toggle-reply-author" title="Bật để trả lời với tư cách Tác giả">Tác giả</button>
        <input id="reply-input" value="${esc(draft)}" placeholder="${ph}" maxlength="1000" enterkeyhint="send">
        <button class="comp-icon" data-act="reply-img" title="Đính kèm 1 hoặc nhiều ảnh">${I.photo}</button>
        <button id="reply-send" class="send" data-act="reply" ${canSend ? '' : 'disabled'}>Đăng</button>
      </div>`;
  } else {
    // ---- Trang chủ (feed) ----
    $('#topbar').className = 'topbar';
    $('#topbar').innerHTML = `${editBtn}<div class="logo">${LOGO}<span>threads</span></div><button class="icon-btn" data-act="toggle-edit" title="Hiện/ẩn khung chỉnh sửa">${I.search}</button>`;
    $('#view').className = 'view feed';
    $('#view').innerHTML = posts.length ? posts.map((p) => itemHTML(p, { feed: true, threadAvatar: p.avatar, threadName: p.name })).join('')
      : '<p class="empty">Chưa có bài nào. Chạm dấu + để đăng bài đầu tiên.</p>';
    $('#bottom').innerHTML = `
      <nav class="nav">
        <button class="active" data-act="home">${I.home}</button>
        <button>${I.share}</button>
        <button class="plus" data-act="new">${I.plus}</button>
        <button>${I.heart}</button>
        <button>${I.user}</button>
      </nav>`;
  }
}

// Tìm item (bài chính / bình luận / trả lời bình luận / trả lời của trả lời) từ một phần tử
function findItem(el) {
  const art = el.closest('.post'); if (!art) return {};
  const { pid, cid, nid, id } = art.dataset;
  if (pid) {
    const thread = posts.find((p) => p.id === pid);
    if (cid) {
      const c = thread?.replies.find((r) => r.id === cid);
      if (nid) {
        const n = c?.replies?.find((r) => r.id === nid);
        return { item: n?.replies?.find((s) => s.id === id), parent: n, comment: c, thread };
      }
      return { item: c?.replies?.find((r) => r.id === id), parent: c, comment: c, thread };
    }
    return { item: thread?.replies.find((r) => r.id === id), parent: thread, thread };
  }
  return { item: posts.find((p) => p.id === id) };
}

// ===================== Sự kiện =====================
document.addEventListener('click', (e) => {
  // Đóng menu 3 chấm nếu bấm ra ngoài
  if (!e.target.closest('.menu-wrap')) {
    document.querySelectorAll('.pop-menu.show').forEach((m) => m.classList.remove('show'));
  }
  const app = e.target.closest('#app'); if (!app) return;
  if (e.target.closest('[contenteditable]')) return; // bấm vào chữ/số → để con trỏ gõ chữ trực tiếp
  const btn = e.target.closest('[data-act]');
  const act = btn?.dataset.act;
  const { item, parent, thread } = findItem(e.target);

  switch (act) {
    case 'item-menu': {
      const menu = btn.parentElement.querySelector('.pop-menu');
      const isOpen = menu.classList.contains('show');
      document.querySelectorAll('.pop-menu.show').forEach((m) => m.classList.remove('show'));
      menu.classList.toggle('show', !isOpen);
      return;
    }
    case 'toggle-edit': editing = !editing; render(); return;
    case 'back': replyTo = null; draft = ''; replyImgs = []; location.hash = ''; return;
    case 'home': location.hash = ''; scrollTo({ top: 0, behavior: 'smooth' }); return;
    case 'new': openSheet(); return;
    case 'reply': addReply(); return;
    case 'reply-img':
      pickImages((urls) => { replyImgs.push(...urls); render(); $('#reply-input')?.focus(); });
      return;
    case 'rm-reply-img': {
      const idx = Number(btn.dataset.idx);
      replyImgs.splice(idx, 1);
      render(); $('#reply-input')?.focus();
      return;
    }
    case 'open': {
      const art = e.target.closest('.post');
      if (art && !art.dataset.pid) location.hash = '#/t/' + art.dataset.id;
      return;
    }
    case 'reply-to':
    case 'reply-as-author': {
      const art = btn.closest('.post');
      const { cid, nid, id } = art.dataset;
      if (act === 'reply-as-author') replyAsAuthor = true;
      if (cid) {
        // Bấm 💬 ở một câu trả lời → trả lời nối tiếp dưới người đó (vạch thẳng giữa 2 avatar nhỏ)
        replyTo = { cid, nid: nid || id, targetItem: item, sub: true, name: item.name };
      } else {
        // Bấm 💬 ở bình luận gốc → trả lời bình luận gốc (vạch cong từ bình luận gốc)
        replyTo = { cid: id, sub: false, name: item.name };
      }
      render(); $('#reply-input').focus(); return;
    }
    case 'toggle-reply-author':
      replyAsAuthor = !replyAsAuthor; render(); $('#reply-input')?.focus(); return;
    case 'cancel-reply': replyTo = null; render(); return;
    case 'like':
      item.liked = !item.liked; item.likes = bump(item.likes, item.liked ? 1 : -1); persist(); render();
      document.querySelector(`.post[data-id="${item.id}"] .like`)?.classList.add('pop'); return;
    case 'repost':
      item.reposts = bump(item.reposts, 1); persist(); render(); return;
    case 'share':
      item.shares = bump(item.shares, 1); persist(); render(); return;
    case 'toggle-author-like':
      if (!item) return;
      item.authorLiked = !item.authorLiked;
      persist(); render(); return;
    case 'toggle-author':
      if (!item) return;
      item.isAuthor = !(item.isAuthor ?? (thread && item.name === thread.name));
      if (item.isAuthor && thread) {
        item.avatar = thread.avatar;
        item.name = thread.name;
      }
      persist(); render(); return;
    case 'avatar':
      if (!item) return;
      pickImage((url) => {
        const targetThread = thread || item;
        if (item === targetThread || isItemAuthor(item, targetThread)) {
          syncAuthorAvatar(targetThread, url);
        } else {
          item.avatar = url;
        }
        persist(); render();
      }, 'avatar');
      return;
    case 'my-avatar':
      pickImage((url) => {
        const t = currentThread();
        if (replyAsAuthor && t) syncAuthorAvatar(t, url);
        else me.avatar = url;
        persist(); render();
      }, 'avatar');
      return;
    case 'change-image': {
      if (!item) return;
      const idx = Number(btn.dataset.idx || 0);
      pickImage((url) => {
        const imgs = getImages(item);
        imgs[idx] = url;
        persist(); render();
      }, 'single');
      return;
    }
    case 'rm-image': {
      if (!item) return;
      const idx = Number(btn.dataset.idx || 0);
      getImages(item).splice(idx, 1);
      persist(); render();
      return;
    }
    case 'add-images':
      if (!item) return;
      pickImages((urls) => {
        getImages(item).push(...urls);
        persist(); render();
      });
      return;
    case 'clear-images':
      if (!item) return;
      item.images = []; delete item.image;
      persist(); render();
      return;
    case 'del':
      if (parent) {
        parent.replies = (parent.replies || []).filter((r) => r !== item);
        parent.comments = bump(parent.comments, -1);
        if (parent !== thread) thread.comments = bump(thread.comments, -1);
        if (replyTo && (replyTo.cid === item.id || replyTo.nid === item.id)) replyTo = null;
      } else {
        posts = posts.filter((p) => p !== item);
        if (location.hash && !currentThread()) location.hash = '';
      }
      persist(); render(); return;
  }
  // Chạm vào khoảng trống của bài ở trang chủ → mở trang chi tiết
  const art = e.target.closest('.post');
  if (art && !editing && art.dataset.open && !art.dataset.pid) location.hash = '#/t/' + art.dataset.id;
});

// Sửa chữ trực tiếp ở bất kỳ đâu (bài chính, bình luận, câu trả lời)
document.addEventListener('input', (e) => {
  const el = e.target;
  if (el.id === 'reply-input') { draft = el.value; $('#reply-send').disabled = !draft.trim() && !replyImgs.length; return; }
  const f = el.dataset?.f; if (!f) return;
  const val = el.innerText.replace(/\n$/, '').trim();
  if (el.dataset.thread) { currentThread().views = val; persist(); return; }
  const { item, thread } = findItem(el);
  if (item) {
    const targetThread = thread || item;
    if (f === 'name' && (item === targetThread || isItemAuthor(item, targetThread))) {
      syncAuthorName(targetThread, val, el);
    } else {
      item[f] = val;
    }
    persist();
  }
});
document.addEventListener('keydown', (e) => {
  if (e.target.id === 'reply-input' && e.key === 'Enter') { e.preventDefault(); addReply(); return; }
  if (e.target.isContentEditable && e.target.dataset.f !== 'text' && e.key === 'Enter') { e.preventDefault(); e.target.blur(); }
});
// Dán chữ thuần (không mang định dạng)
document.addEventListener('paste', (e) => {
  if (!e.target.isContentEditable) return;
  e.preventDefault(); document.execCommand('insertText', false, e.clipboardData.getData('text/plain'));
});
// Khi rời ô sửa số trống → làm sạch ký tự xuống dòng thừa mà KHÔNG render lại toàn trang
document.addEventListener('focusout', (e) => {
  const el = e.target;
  if (el.isContentEditable && !el.innerText.trim()) el.textContent = '';
});

window.addEventListener('hashchange', () => { replyTo = null; draft = ''; replyImgs = []; render(); scrollTo(0, 0); });

function addReply() {
  const t = currentThread();
  const text = ($('#reply-input')?.value || '').trim();
  if ((!text && !replyImgs.length) || !t) return;
  let targetId;
  const authorProps = replyAsAuthor ? { name: t.name, avatar: t.avatar, isAuthor: true } : {};
  const imgs = [...replyImgs];
  const c = replyTo && t.replies.find((r) => r.id === replyTo.cid);
  if (c && replyTo.sub) {
    const n = (c.replies || []).find((r) => r.id === replyTo.nid);
    if (n) {
      (n.replies ||= []).push(newItem({ text, images: imgs, ...authorProps }));
      if (replyTo.targetItem) replyTo.targetItem.comments = bump(replyTo.targetItem.comments, 1);
      else n.comments = bump(n.comments, 1);
      targetId = n.replies[n.replies.length - 1].id;
    }
  } else if (c) {
    (c.replies ||= []).push(newItem({ text, images: imgs, replies: [], ...authorProps }));
    c.comments = bump(c.comments, 1);
    targetId = c.replies[c.replies.length - 1].id;
  } else {
    t.replies.push(newItem({ text, images: imgs, replies: [], ...authorProps }));
    targetId = t.replies[t.replies.length - 1].id;
  }
  t.comments = bump(t.comments, 1);
  replyTo = null; draft = ''; replyImgs = [];
  persist(); render();
  document.querySelector(`.post[data-id="${targetId}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// ===================== Chọn & thu nhỏ ảnh (1 hoặc nhiều ảnh) =====================
let pickCb = null, pickMode = 'single';
function compressFile(file, mode) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const c = document.createElement('canvas'), ctx = c.getContext('2d');
      if (mode === 'avatar') {
        const m = Math.min(img.width, img.height); c.width = c.height = 160;
        ctx.drawImage(img, (img.width - m) / 2, (img.height - m) / 2, m, m, 0, 0, 160, 160);
      } else {
        const r = Math.min(1, 900 / img.width); c.width = img.width * r; c.height = img.height * r;
        ctx.drawImage(img, 0, 0, c.width, c.height);
      }
      URL.revokeObjectURL(img.src);
      resolve(c.toDataURL('image/jpeg', 0.85));
    };
    img.src = URL.createObjectURL(file);
  });
}
function pickImage(cb, mode = 'single') {
  pickCb = (urls) => cb(urls[0]);
  pickMode = mode;
  $('#file-input').multiple = false;
  $('#file-input').click();
}
function pickImages(cb) {
  pickCb = cb;
  pickMode = 'multi';
  $('#file-input').multiple = true;
  $('#file-input').click();
}
$('#file-input').addEventListener('change', async (e) => {
  const files = Array.from(e.target.files || []);
  e.target.value = '';
  if (!files.length || !pickCb) return;
  const cb = pickCb; pickCb = null;
  const urls = await Promise.all(files.map((f) => compressFile(f, pickMode)));
  cb(urls);
});

// ===================== Sheet tạo bài mới =====================
let draftImages = [];
function renderSheetImgs() {
  $('#sheet-imgs').innerHTML = draftImages.length
    ? `<div class="reply-preview-list" style="margin:8px 0 0">${draftImages.map((u, idx) => `<div class="reply-preview"><img src="${u}" alt=""><button type="button" class="rm-preview" data-sidx="${idx}">✕</button></div>`).join('')}</div>`
    : '';
  $('#sheet-add-img').textContent = draftImages.length ? `🖼 Thêm ảnh nữa (${draftImages.length})` : '🖼 Thêm ảnh (1 hoặc nhiều)';
  $('#sheet-post').disabled = !$('#sheet-text').value.trim() && !draftImages.length;
}
$('#sheet-imgs').addEventListener('click', (e) => {
  const rm = e.target.closest('[data-sidx]');
  if (!rm) return;
  draftImages.splice(Number(rm.dataset.sidx), 1);
  renderSheetImgs();
});
function openSheet() {
  draftImages = [];
  $('#sheet-avatar').src = me.avatar; $('#sheet-name').value = me.name; $('#sheet-text').value = '';
  renderSheetImgs();
  $('#sheet').classList.remove('hidden');
  setTimeout(() => $('#sheet-text').focus(), 50);
}
const closeSheet = () => $('#sheet').classList.add('hidden');
$('#sheet-cancel').onclick = closeSheet;
$('#sheet').onclick = (e) => { if (e.target.id === 'sheet') closeSheet(); };
$('#sheet-text').oninput = () => { $('#sheet-post').disabled = !$('#sheet-text').value.trim() && !draftImages.length; };
$('#sheet-avatar').onclick = () => pickImage((url) => { me.avatar = url; $('#sheet-avatar').src = url; persist(); }, 'avatar');
$('#sheet-add-img').onclick = () => {
  pickImages((urls) => { draftImages.push(...urls); renderSheetImgs(); });
};
$('#sheet-post').onclick = () => {
  me.name = $('#sheet-name').value.trim() || me.name;
  posts.unshift(newItem({ text: $('#sheet-text').value.trim(), images: [...draftImages], views: '0', replies: [] }));
  persist(); closeSheet(); location.hash = ''; render(); scrollTo({ top: 0, behavior: 'smooth' });
};

// Đảm bảo dữ liệu cũ có mảng replies
posts.forEach((p) => { p.replies ||= []; });
render();
