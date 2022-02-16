let main_url = 'https://aicfpredict.pythonanywhere.com/'


window.onload = function on_load() {
    document.getElementsByClassName('btn-one')[0].addEventListener('click', form_submit);
    document.getElementById('undo').addEventListener('click', undorow);

}

function form_submit(ev) {

    let url = new URL(main_url + 'add_coin');
    let format = document.getElementById('format').value
    let symbol_form = document.getElementById('symbol').value
    let expected_price = document.getElementById('expected_price').value
    if (!expected_price) {
        set_msg({ 'text': 'Please enter a valid number' })
        return
    }
    params = { timestamp: Math.floor(Date.now() / 1000), filename: format, symbol: symbol_form, expected_val: expected_price }
    let msg;
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    fetch(url).then(res => res.json()).then(res => set_msg(res)).catch(e => console.log(e));

}

function set_msg(msg) {
    document.getElementById('status_text').innerText = msg.text;
    undo_btn = document.getElementById('undo');
    if (undo_btn.className == 'dnone') {
        undo_btn.classList.remove('dnone');
    }
}
function undorow() {
    let filename = document.getElementById('format').value;
    let url = new URL(main_url + 'undo');
    let params = { filename: filename };
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    fetch(url).then(res => res.json()).then(res => set_msg(res)).catch(e => console.log(e));
}
