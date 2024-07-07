function switchCase(obj, value, defaultValue) {
    return obj[value] || defaultValue;
}


function getDetailsOfFiles(getValue) {
    var bookName = document.getElementById('getBookName');
    var bookPrice = document.getElementById('getPrice');

    // if (getValue == 1) {
    //     bookName.textContent = 'JS';
    //     bookPrice.textContent = '$20';
    // } else if (getValue == 2) {
    //     bookName.textContent = 'CSS';
    //     bookPrice.textContent = '$15';
    // }
    // else if (getValue == 3) {
    //     bookName.textContent = 'HTML';
    //     bookPrice.textContent = '$10';
    // } else {
    //     bookName.textContent = '.NET';
    //     bookPrice.textContent = '$20';
    // }

    // switch (getValue) {
    //     case 1:
    //         bookName.textContent = 'JS';
    //         bookPrice.textContent = '$20';
    //         break;
    //     case 2:
    //         bookName.textContent = 'CSS';
    //         bookPrice.textContent = '$20';
    //         break;
    //     case 3:
    //         bookName.textContent = 'HTML';
    //         bookPrice.textContent = '$20';
    //         break;
    //     default:
    //         bookName.textContent = '.NET';
    //         bookPrice.textContent = '$20';
    // }

    const bookNames = {
        1: 'JS',
        2: 'CSS',
        3: 'HTML',
    }
    const bookPrices = {
        'JS': '$20',
        'CSS': '$20',
        'HTML': '$40',
    }


    bookName.textContent = switchCase(bookNames, getValue, ".NET");
    // bookName.textContent = booksNameDetails(getValue);

    bookPrice.textContent = switchCase(bookPrices, getValue, "$500");
    // bookPrice.textContent = booksPriceDetails(booksNameDetails(getValue));

}



function goTop() {
    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
}


