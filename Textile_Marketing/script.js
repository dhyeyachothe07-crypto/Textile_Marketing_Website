const products = [
 {id:1,name:"The Gulabi Banarasi",type:"Silk",tag:"BESTSELLER",price:4299,desc:"Rich pink · Woven zari border",img:"https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=700&q=85"},
 {id:2,name:"Ivory Bloom Cotton",type:"Cotton",tag:"EVERYDAY",price:1899,desc:"Soft ivory · Floral detailing",img:"https://images.unsplash.com/photo-1583391733958-6c78276477e7?auto=format&fit=crop&w=700&q=85"},
 {id:3,name:"Rani Festive Edit",type:"Festive",tag:"FESTIVE PICK",price:3599,desc:"Royal pink · Celebration ready",img:"https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=700&q=85"},
 {id:4,name:"Midnight Blue Silk",type:"Silk",tag:"NEW ARRIVAL",price:5199,desc:"Deep blue · Classic elegance",img:"https://images.unsplash.com/photo-1610189012906-4c9e4f1f3a0b?auto=format&fit=crop&w=700&q=85"},
 {id:5,name:"Mogra Daily Drape",type:"Everyday",tag:"EASY DRAPE",price:1499,desc:"Lightweight · All-day comfort",img:"https://images.unsplash.com/photo-1610030469668-8e9f641aaf35?auto=format&fit=crop&w=700&q=85"},
 {id:6,name:"Temple Gold Kanjivaram",type:"Silk",tag:"TIMELESS",price:6899,desc:"Traditional gold · Statement border",img:"https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=700&q=85"},
 {id:7,name:"Saffron Celebration",type:"Festive",tag:"OCCASION WEAR",price:3299,desc:"Warm saffron · Festive finish",img:"https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=700&q=85"},
 {id:8,name:"Sage Green Cotton",type:"Cotton",tag:"LIGHT & LOVELY",price:1799,desc:"Sage green · Breezy texture",img:"https://images.unsplash.com/photo-1583391733958-6c78276477e7?auto=format&fit=crop&w=700&q=85"}
];
let cart=[];
const grid=document.getElementById('productGrid');
function renderProducts(filter='All'){
 const shown=filter==='All'?products:products.filter(p=>p.type===filter);
 grid.innerHTML=shown.map(p=>`<article class="product-card"><div class="product-photo"><img src="${p.img}" alt="${p.name}" loading="lazy"><span class="tag">${p.tag}</span><button class="quick-add" onclick="addToCart(${p.id})">ADD TO BAG +</button></div><div class="product-info"><h3>${p.name}</h3><p>${p.desc}</p><span class="price">₹${p.price.toLocaleString('en-IN')}</span></div></article>`).join('');
}
renderProducts();
document.getElementById('filters').addEventListener('click',e=>{const b=e.target.closest('[data-filter]');if(!b)return;document.querySelectorAll('.filter').forEach(x=>x.classList.remove('active'));b.classList.add('active');renderProducts(b.dataset.filter)});
function addToCart(id){const p=products.find(x=>x.id===id);const found=cart.find(x=>x.id===id);found?found.qty++:cart.push({...p,qty:1});updateCart();openCart()}
function updateCart(){
 document.getElementById('cartCount').textContent=cart.reduce((s,p)=>s+p.qty,0);
 document.getElementById('cartTotal').textContent='₹'+cart.reduce((s,p)=>s+p.price*p.qty,0).toLocaleString('en-IN');
 document.getElementById('cartItems').innerHTML=cart.length?cart.map(p=>`<div class="cart-row"><img src="${p.img}" alt=""><div><strong>${p.name}</strong><small>₹${p.price.toLocaleString('en-IN')} × ${p.qty}</small><button class="remove-item" onclick="removeItem(${p.id})">REMOVE</button></div></div>`).join(''):'<p class="empty-cart">Your bag is waiting for something beautiful.</p>';
}
function removeItem(id){cart=cart.filter(p=>p.id!==id);updateCart()}
const drawer=document.getElementById('cartDrawer'),overlay=document.getElementById('overlay');
function openCart(){drawer.classList.add('open');overlay.classList.add('show');drawer.setAttribute('aria-hidden','false')}
function closeCart(){drawer.classList.remove('open');overlay.classList.remove('show');drawer.setAttribute('aria-hidden','true')}
document.getElementById('cartButton').onclick=openCart;document.getElementById('closeCart').onclick=closeCart;overlay.onclick=closeCart;
document.getElementById('checkoutButton').onclick=()=>{if(!cart.length){alert('Your bag is empty. Add a saree first!');return}const lines=cart.map(p=>`${p.name} x ${p.qty} — ₹${p.price*p.qty}`).join('%0A');const total=cart.reduce((s,p)=>s+p.price*p.qty,0);const msg=`Hello Vastra! I would like to enquire about:%0A${lines}%0AEstimated total: ₹${total}`;window.open(`https://wa.me/919876543210?text=${msg}`,'_blank')};
document.getElementById('newsletterForm').addEventListener('submit',e=>{e.preventDefault();document.getElementById('newsletterMessage').textContent='Thank you! You are on the list. (Demo form)';e.target.reset()});
document.getElementById('menuToggle').onclick=()=>document.getElementById('mainNav').classList.toggle('show');
document.querySelectorAll('#mainNav a').forEach(a=>a.addEventListener('click',()=>document.getElementById('mainNav').classList.remove('show')));
