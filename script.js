const products=[
{name:"Atta",price:45,unit:"1 kg",emoji:"🌾"},{name:"Rice",price:60,unit:"1 kg",emoji:"🍚"},
{name:"Sugar",price:48,unit:"1 kg",emoji:"🧂"},{name:"Salt",price:25,unit:"1 kg",emoji:"🧂"},
{name:"Cooking Oil",price:140,unit:"1 L",emoji:"🫗"},{name:"Toor Dal",price:125,unit:"1 kg",emoji:"🫘"},
{name:"Tea",price:95,unit:"250 g",emoji:"🍵"},{name:"Biscuits",price:30,unit:"Pack",emoji:"🍪"},
{name:"Maggi",price:70,unit:"Pack",emoji:"🍜"},{name:"Bath Soap",price:40,unit:"Pack",emoji:"🧼"},
{name:"Detergent",price:85,unit:"1 kg",emoji:"🧺"},{name:"Shampoo",price:110,unit:"Bottle",emoji:"🧴"}
];
let cart={};
function renderProducts(){let q=document.getElementById("search").value.toLowerCase();let list=products.filter(p=>p.name.toLowerCase().includes(q));document.getElementById("productsGrid").innerHTML=list.map((p,i)=>`<div class="card"><div class="emoji">${p.emoji}</div><h3>${p.name}</h3><span class="unit">${p.unit}</span><p class="price">₹${p.price}</p><button class="add" onclick="add(${products.indexOf(p)})">+ Add to cart</button></div>`).join("")}
function add(i){cart[i]=(cart[i]||0)+1;renderCart()}
function change(i,d){cart[i]=(cart[i]||0)+d;if(cart[i]<=0)delete cart[i];renderCart()}
function renderCart(){let keys=Object.keys(cart);let total=keys.reduce((s,i)=>s+products[i].price*cart[i],0);document.getElementById("cartCount").textContent=keys.reduce((s,i)=>s+cart[i],0);document.getElementById("total").textContent="₹"+total;
document.getElementById("cartItems").innerHTML=keys.length?keys.map(i=>`<div class="cart-row"><div><b>${products[i].name}</b><br><small>₹${products[i].price} × ${cart[i]}</small></div><div class="qty"><button onclick="change(${i},-1)">−</button><span>${cart[i]}</span><button onclick="change(${i},1)">+</button></div></div>`).join(""):'<p class="empty">Your cart is empty. Add grocery products above.</p>';
let ok=total>=500;document.getElementById("minimumMsg").style.display=ok?"none":"block";document.getElementById("orderBtn").disabled=!ok||!keys.length}
function scrollToCart(){document.getElementById("cart").scrollIntoView({behavior:"smooth"})}
function placeOrder(){let name=document.getElementById("customerName").value.trim(),phone=document.getElementById("customerPhone").value.trim(),address=document.getElementById("customerAddress").value.trim();let keys=Object.keys(cart);let total=keys.reduce((s,i)=>s+products[i].price*cart[i],0);if(!name||!phone||!address||total<500){alert("Please complete delivery details and keep the order at ₹500 or more.");return}let items=keys.map(i=>`${products[i].name} x${cart[i]}`).join(", ");alert(`Order ready!\\n\\nCustomer: ${name}\\nPhone: ${phone}\\nAddress: ${address}\\nItems: ${items}\\nTotal: ₹${total}\\n\\nAdd your shop WhatsApp number in script.js to enable direct WhatsApp ordering.`)}
renderProducts();renderCart();