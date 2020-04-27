function deleteQuote(id) {
    console.log(id);

    document.getElementById(id).remove();
}

function saveEditQuote(id) {
    console.log('saveEdit');
    let author = document.getElementById('author' + id);
    let quote = document.getElementById('quote' + id);
    let saveEditButton = document.getElementById('saveEditButton' + id);

    if (author.disabled == false) {
        saveEditButton.innerHTML = 'Edit';
        author.disabled = true;
        quote.disabled = true;
    } else {
        saveEditButton.innerHTML = 'Save';
        author.disabled = false;
        quote.disabled = false;
    }
}

function newQuote() {
    console.log("newQuote");

    let quotes = document.getElementById('quotesContainer');
    let id = 'quote' + String(quotes.children.length - 2);
    console.log(id)

    let quote = document.createElement('div');
    quote.setAttribute('class', 'quote');
    quote.setAttribute('id', id);

    quote.innerHTML =
        `<input id="author${id}" class="input" />
        <input id="quote${id}" class="input" />
        <div class="buttonsBar label">
        <button id="saveEditButton${id}" onClick="saveEditQuote('${id}')">Save</button>
        <button onClick="deleteQuote('${id}')">Delete</button>
        </div>`;

    quotes.appendChild(quote);
}