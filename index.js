
  
  var data = [];
  var summary = [];
  
  function displayItems(){
    var items = '';
    data.forEach(function(item){
      items = items + '<div class="item"><img class="cart-display-image" src=' + item.image + '><div class="cart-offer">' + item.discount + '% Off</div><div class="item-info"><div class="cart-item-wrapper"><div class="mar-l10">' + item.name  + '</div></div><div><span class="mar-l10 cart-summary-strike">$'+ item.price.display +'</span><span class="mar-l10 cart-summary-display">$'+ item.price.actual + '</span></div><div class="cart-add-wrapper"><div class="cart-add" onclick="addToCart(\'' + item.name + '\')">Add to cart</div></div></div></div>';
    });
    document.getElementById('items').innerHTML = items;
  }
  
  fetch('data/items.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(jsonResponse) {
    data = jsonResponse ? jsonResponse.items : [];
	displayItems()
  });

  function calculateTotal(){
    var totalPrice = 0;
    var totalPriceWithoutDiscount = 0;
    summary.forEach(function(data){
      totalPrice = totalPrice + (data.qty * data.price.actual);
      totalPriceWithoutDiscount = totalPriceWithoutDiscount + (data.qty * data.price.display);
    });
    document.getElementById('total-price').innerHTML = totalPrice;
    document.getElementById('total-items-without-discount').innerHTML = totalPriceWithoutDiscount;
    document.getElementById('total-discount').innerHTML = totalPriceWithoutDiscount - totalPrice;
  }
  
  function addToCart(individualItem){
    document.getElementsByClassName('cart-header-alert')[0].style.display = 'block';
    document.getElementsByClassName('cart-header-alert')[0].innerHTML = individualItem + ' is added to the cart';
    setTimeout(function(){
      document.getElementsByClassName('cart-header-alert')[0].style.display = 'none';
    }, 2000);
    var found = false;
    var itemFound = {};
    summary.forEach(function(data){
      if(data.name === individualItem){
        found = true;
      }     
    });
    data.forEach(function(item){
      if(item.name === individualItem){
        itemFound = item;
      }
    })
    if(!found){
      summary.push(itemFound);
      summary.forEach(function(data){
        if(data.name === individualItem){
          data.qty = 1;
          data.total = data.price.actual;
        }
      });
    } else {
      summary.forEach(function(data){
        if(data.name === individualItem){
          data.qty = data.qty + 1;
          data.total = data.total + data.price.actual;
        }     
      });
  }
  formSummaryData();
    calculateTotal();
    totalItems();
  }

  function formSummaryData(){
    var items = '';
    summary.forEach(function(item){
        items = items + '<tr><td><div><img class="cart-summary-image" src=' + item.image + ' /><span>' + item.name + '</span><span class="cart-close pointer" onclick="removeItem(\'' + item.name + '\')"><i class="fa fa-times" aria-hidden="true"></i></span></div></td><td><i onclick="removeQty(\'' + item.name + '\')" class="fa fa-minus pointer" aria-hidden="true"></i><span>' + (item.qty ? item.qty : '1') + '</span><i onclick="addQty(\'' + item.name + '\')" class="fa fa-plus pointer" aria-hidden="true"></i></td><td>$' + (item.total ? item.total : item.price.actual) + '</td></tr>';
    });
    document.getElementById('cart-summary-row').innerHTML = items;
  }

  function totalItems(){
    document.getElementById('total-items').innerHTML = summary.length;
    document.getElementById('total-items-summary').innerHTML = summary.length;
  }

  function removeItem(name){
    summary.forEach(function(item, index){
      if(item.name === name){
        summary.splice(index);
      }
    });
    calculateTotal();
    totalItems();
    formSummaryData();
  }

  function addQty(item){
    console.log(item)
  }

  function removeQty(item){
    console.log(item)
  }

  fetch('data/items.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(jsonResponse) {
    data = jsonResponse ? jsonResponse.items : [];
	  displayItems();
  });