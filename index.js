var data = [];
var summary = [];

function displayItems() {
    var items = '';
    data.forEach(function(item) {
        items = items + '<div class="item"><img class="cart-display-image" src=' + item.image + '><div class="cart-offer">' + item.discount + '% Off</div><div class="item-info"><div class="cart-item-wrapper"><div class="mar-l10">' + item.name + '</div></div><div><span class="mar-l10 cart-summary-strike-color"><span class="cart-summary-strike">$' + item.price.display + '</span></span><span class="mar-l10 cart-summary-display">$' + item.price.actual + '</span></div><div class="cart-add-wrapper"><div class="cart-add" onclick="addToCart(\'' + item.name + '\')">Add to cart</div></div></div></div>';
    });
    document.getElementById('items').innerHTML = items;
}

function handleAlert(name) {
    document.getElementsByClassName('cart-header-alert')[0].style.display = 'block';
    document.getElementsByClassName('cart-header-alert')[0].innerHTML = name + ' is added to the cart';
    setTimeout(function() {
        document.getElementsByClassName('cart-header-alert')[0].style.display = 'none';
    }, 2000);
}

function isItemFound(name) {
    var found = false;
    summary.forEach(function(item) {
        if (item.name === name) {
            found = true;
        }
    });
    return found;
}

function itemFound(name) {
    var itemFound = {};
    data.forEach(function(item) {
        if (item.name === name) {
            itemFound = item;
        }
    });
    return itemFound;
}

function addQtyAndTotalPrice(name, found) {
    summary.forEach(function(item) {
        if (item.name === name) {
            if (found) {
                item.qty = 1;
                item.total = item.price.actual;
            } else {
                item.qty = item.qty + 1;
                item.total = item.total + item.price.actual
            }
        }
    });
}


function formSummaryData() {
    var items = '';
    summary.forEach(function(item) {
        items = items + '<tr><td><div><img class="cart-summary-image" src=' + item.image + ' /><span>' + item.name + '</span><span class="cart-close pointer" onclick="removeItem(\'' + item.name + '\')"><i class="fa fa-times" aria-hidden="true"></i></span></div></td><td><i onclick="removeQty(\'' + item.name + '\')" class="fa fa-minus pointer" aria-hidden="true"></i><span>' + (item.qty ? item.qty : '1') + '</span><i onclick="addQty(\'' + item.name + '\')" class="fa fa-plus pointer" aria-hidden="true"></i></td><td>$' + (item.total ? item.total : item.price.actual) + '</td></tr>';
    });
    document.getElementById('cart-summary-row').innerHTML = items;
}

function calculateTotal() {
    var totalPrice = 0;
    var totalPriceWithoutDiscount = 0;
    summary.forEach(function(data) {
        totalPrice = totalPrice + (data.qty * data.price.actual);
        totalPriceWithoutDiscount = totalPriceWithoutDiscount + (data.qty * data.price.display);
    });
    document.getElementById('total-price').innerHTML = totalPrice;
    document.getElementById('total-items-without-discount').innerHTML = totalPriceWithoutDiscount;
    document.getElementById('total-discount').innerHTML = totalPriceWithoutDiscount - totalPrice;
}

function totalItems() {
    document.getElementById('total-items').innerHTML = summary.length;
    document.getElementById('total-items-summary').innerHTML = summary.length;
}

function addToCart(name) {
    handleAlert(name);
    if (!isItemFound(name)) {
        summary.push(itemFound(name));
        addQtyAndTotalPrice(name, true);
    } else {
        addQtyAndTotalPrice(name);
    }
    formSummaryData();
    calculateTotal();
    totalItems();
}

function removeItem(name) {
    summary.forEach(function(item, index) {
        if (item.name === name) {
            summary.splice(index, 1);
        }
    });
    calculateTotal();
    totalItems();
    formSummaryData();
}

function addQty(name) {
    summary.forEach(function(item) {
        if (item.name === name) {
            item.qty = item.qty + 1;
            item.total = item.total + item.price.actual;
        }
    });
    calculateTotal();
    totalItems();
    formSummaryData();
}

function removeQty(name) {
    summary.forEach(function(item, index) {
        if (item.name === name) {
            if (item.qty > 1) {
                item.qty = item.qty - 1;
                item.total = item.total - item.price.actual;
            } else {
                summary.splice(index);
            }
        }
    });
    calculateTotal();
    totalItems();
    formSummaryData();
}

fetch('data/items.json')
    .then(function(response) {
        return response.json();
    })
    .then(function(jsonResponse) {
        data = jsonResponse ? jsonResponse.items : [];
        displayItems();
    });