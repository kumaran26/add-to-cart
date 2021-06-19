
  
  var data = []
  
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
  
  function addToCart(item){
	
  }