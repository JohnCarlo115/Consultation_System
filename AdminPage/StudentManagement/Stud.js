const PAGE_SIZE = 5;
const KEY = "students";
 
const seed = [
  { id: "2021-0145", name: "Maria Cruz",     course: "Computer Science",   year: "3rd Year", status: "Active" },
  { id: "2022-0388", name: "John Reyes",     course: "Information Technology", year: "2nd Year", status: "Active" },
  { id: "2023-0021", name: "Ana Santos",     course: "Psychology",         year: "1st Year", status: "Pending" },
  { id: "2020-0976", name: "Miguel Torres",  course: "Nursing",            year: "4th Year", status: "Inactive" },
  { id: "2022-0554", name: "Sofia Garcia",   course: "Business Administration", year: "2nd Year", status: "Active" },
  { id: "2021-0731", name: "Paolo Mendoza",  course: "Education",          year: "3rd Year", status: "Active" }
];
 
let students = load();
let page = 1;
let editingId = null;
 
const $ = (s) => document.querySelector(s);
const body = $("#tableBody"), modal = $("#modal"), form = $("#form");
 
function load() {
  try { return JSON.parse(localStorage.getItem(KEY)) || seed; } catch { return seed; }
}
function save() {
  try { localStorage.setItem(KEY, JSON.stringify(students)); } catch {}
}
const esc = (t) => String(t).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
 
function filtered() {
  const q = $("#search").value.trim().toLowerCase();
  const st = $("#statusFilter").value;
  return students.filter((s) =>
    (!st || s.status === st) &&
    (!q || [s.id, s.name, s.course].some((v) => v.toLowerCase().includes(q))));
}
 
function render() {
  const list = filtered();
  const pages = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
  page = Math.min(page, pages);
  const start = (page - 1) * PAGE_SIZE;
  const rows = list.slice(start, start + PAGE_SIZE);
 
  body.innerHTML = rows.length ? rows.map((s) => `
    <tr>
      <td>${esc(s.id)}</td>
      <td>${esc(s.name)}</td>
      <td>${esc(s.course)}</td>
      <td>${esc(s.year)}</td>
      <td><span class="badge ${esc(s.status)}">${esc(s.status)}</span></td>
      <td>
        <button class="link" data-edit="${esc(s.id)}">Edit</button>
        <button class="link danger" data-del="${esc(s.id)}">Delete</button>
      </td>
    </tr>`).join("") : `<tr><td colspan="6" class="empty">No students found. Try a different search or add a student.</td></tr>`;
 
  $("#count").textContent = list.length
    ? `Showing ${start + 1}–${start + rows.length} of ${list.length} students`
    : "Showing 0 students";
 
  let html = `<button data-p="${page - 1}" ${page === 1 ? "disabled" : ""} aria-label="Previous page">‹</button>`;
  for (let i = 1; i <= pages; i++) html += `<button data-p="${i}" class="${i === page ? "current" : ""}">${i}</button>`;
  html += `<button data-p="${page + 1}" ${page === pages ? "disabled" : ""} aria-label="Next page">›</button>`;
  $("#pager").innerHTML = html;
}
 
function openModal(student) {
  editingId = student ? student.id : null;
  form.reset();
  $("#formError").hidden = true;
  $("#modalTitle").textContent = student ? "Edit Student" : "Add Student";
  if (student) Object.entries(student).forEach(([k, v]) => (form.elements[k].value = v));
  modal.showModal();
}
 
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  Object.keys(data).forEach((k) => (data[k] = data[k].trim()));
  const duplicate = students.some((s) => s.id === data.id && s.id !== editingId);
  if (duplicate) {
    $("#formError").textContent = "That Student ID already exists. Use a different ID.";
    $("#formError").hidden = false;
    return;
  }
  if (editingId) students = students.map((s) => (s.id === editingId ? data : s));
  else students.unshift(data);
  save();
  modal.close();
  render();
});
 
$("#addBtn").addEventListener("click", () => openModal());
$("#cancelBtn").addEventListener("click", () => modal.close());
$("#search").addEventListener("input", () => { page = 1; render(); });
$("#statusFilter").addEventListener("change", () => { page = 1; render(); });
 
body.addEventListener("click", (e) => {
  const edit = e.target.dataset.edit, del = e.target.dataset.del;
  if (edit) openModal(students.find((s) => s.id === edit));
  if (del && confirm("Delete this student? This can't be undone.")) {
    students = students.filter((s) => s.id !== del);
    save();
    render();
  }
});
$("#pager").addEventListener("click", (e) => {
  const p = Number(e.target.dataset.p);
  if (p) { page = p; render(); }
});
 
render();