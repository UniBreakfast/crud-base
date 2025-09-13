let liTemplate, editableLiTemplate;

prepareNewRecordForm();
prepareRecordsList();

function prepareNewRecordForm() {
  const form = document.getElementById('new');

  form.onsubmit = handleSubmitNewRecord;
}

function prepareRecordsList() {
  const ul = document.getElementById('records');

  prepareLiTemplates();

  ul.onclick = handleRecordClick;
  ul.onsubmit = handleSubmitUpdateRecord;
}

function handleSubmitNewRecord(event) {
  const form = event.target;
  const str = form.record.value.trim();

  if (!str) return;

  addNewRecord(str);

  form.reset();
}

function addNewRecord(str) {
  const ul = document.getElementById('records');
  const li = createRecordElement(str);

  ul.append(li);
}

function createRecordElement(str) {
  const li = liTemplate.content.firstElementChild.cloneNode(true);
  const output = li.querySelector('output');

  output.append(str);

  return li;
}

function prepareLiTemplates() {
  [liTemplate, editableLiTemplate] = document.querySelectorAll('#records>template');

  liTemplate.remove();
  editableLiTemplate.remove();
}

function handleRecordClick(event) {
  const btn = event.target.closest('button');

  if (!btn) return;

  const li = btn.closest('.record');
  const i = getIndex(li);

  if (btn.matches('.edit')) {
    //if (btn.classList.contains('edit')) {
    //if (btn.className === 'edit') {
    //if (btn.getAttribute('class') === 'edit') {
    enableRecordEditing(i);
  }

  if (btn.matches('.delete')) {
    deleteRecord(i);
  }
}

function getIndex(li) {
  const ul = li.closest('ul');
  const children = Array.from(ul.children);

  return children.indexOf(li);
}

function enableRecordEditing(i) {
  const ul = document.getElementById('records');
  const li = ul.children[i];
  const output = li.querySelector('output');
  const str = output.value;
  const editableLi = editableLiTemplate.content.firstElementChild.cloneNode(true);
  const editForm = editableLi.querySelector('#edit');

  editForm.record.setAttribute('value', str);
  li.replaceWith(editableLi);

  editForm.record.focus();
  editForm.record.select();
}

function deleteRecord(i) {
  const ul = document.getElementById('records');
  const li = ul.children[i];

  li.remove();
}

function handleSubmitUpdateRecord(event) {
  const form = event.target;
  const btn = event.submitter;
  const ul = document.getElementById('records');
  const li = form.closest('.record');
  const i = getIndex(li);
  const str = form.record.value.trim();

  if (btn.matches('.cancel')) disableRecordEditing(i);

  if (btn.matches('.save')) updateRecord(i, str);
}

function disableRecordEditing(i) {
  const ul = document.getElementById('records');
  const editableLi = ul.children[i];
  const form = editableLi.querySelector('#edit');
  const str = form.record.getAttribute('value');
  const li = createRecordElement(str);

  editableLi.replaceWith(li);
}

function updateRecord(i, str) {
  const ul = document.getElementById('records');
  const editableLi = ul.children[i];
  const li = createRecordElement(str);
  
  editableLi.replaceWith(li);
}
  
