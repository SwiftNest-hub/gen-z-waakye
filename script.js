/* ============================================
   WAKYE POINT — DATA
   ============================================ */
function px(id,w){return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w||700}`;}

const MENU_ITEMS = [
  // GH₵45 — everyday wakye combos
  {id:'m01', name:'Wakye + Fish', desc:'Classic wakye with crispy fried fish.', price:45, category:'rice', tags:['wakye','rice','fish'], popular:false, img:px(8956671)},
  {id:'m02', name:'Wakye + Chicken', desc:'Wakye topped with grilled chicken.', price:45, category:'rice', tags:['wakye','rice','chicken'], popular:true, img:px(34134206)},
  {id:'m03', name:'Wakye + Egg', desc:'Wakye with boiled egg and shito.', price:45, category:'rice', tags:['wakye','rice','egg'], popular:false, img:px(18805640)},
  {id:'m04', name:'Wakye + Sausage', desc:'Wakye with glossy grilled sausage.', price:45, category:'rice', tags:['wakye','rice','sausage'], popular:false, img:px(34134206,700)},
  {id:'m05', name:'Wakye + Plantain', desc:'Wakye with sweet fried plantain.', price:45, category:'rice', tags:['wakye','rice','plantain'], popular:false, img:px(17952748)},
  {id:'m06', name:'Wakye + Fried Meat', desc:'Wakye with well-seasoned fried beef.', price:45, category:'rice', tags:['wakye','rice','beef'], popular:false, img:px(34284708)},
  {id:'m07', name:'Wakye + Fish + Egg', desc:'Fried fish and boiled egg together.', price:45, category:'rice', tags:['wakye','rice','fish','egg'], popular:false, img:px(8956671,700)},
  {id:'m08', name:'Wakye + Chicken + Plantain', desc:'Grilled chicken with sweet plantain.', price:45, category:'rice', tags:['wakye','rice','chicken','plantain'], popular:false, img:px(17952746)},
  {id:'m09', name:'Wakye + Mixed Protein', desc:'A little bit of everything, generously piled.', price:45, category:'rice', tags:['wakye','rice','chicken','beef','egg'], popular:true, img:px(33434014)},

  // GH₵65 — premium combos
  {id:'m10', name:'Wakye Deluxe — Chicken, Egg & Plantain', desc:'Grilled chicken, egg and sweet plantain.', price:65, category:'rice', tags:['wakye','rice','chicken','egg','plantain'], popular:true, img:px(21822134)},
  {id:'m11', name:'Wakye Deluxe — Fish, Sausage & Salad', desc:'Fried fish, sausage and fresh salad.', price:65, category:'rice', tags:['wakye','rice','fish','sausage','salad'], popular:false, img:px(37307214)},
  {id:'m12', name:'Wakye Deluxe — Beef, Egg & Gari', desc:'Seasoned beef, egg and toasted gari.', price:65, category:'rice', tags:['wakye','rice','beef','egg','gari'], popular:false, img:px(19781592)},

  // GH₵85 — special
  {id:'m13', name:'Wakye Special Platter', desc:'Chicken, fish, egg and plantain on one generous plate.', price:85, category:'rice', tags:['wakye','rice','chicken','fish','egg','plantain'], popular:false, img:px(37538487)},

  // GH₵100 — grand deluxe
  {id:'m14', name:'Wakye Grand Deluxe', desc:'Two chicken pieces, sausage, egg, plantain and salad.', price:100, category:'rice', tags:['wakye','rice','chicken','sausage','egg','plantain','salad'], popular:true, img:px(13915043)},

  // GH₵150 — luxury platter
  {id:'m15', name:'Wakye Royal Platter', desc:"Wakye Point's largest platter — chicken, fish, sausage, egg, beef, plantain, salad and gari.", price:150, category:'rice', tags:['wakye','rice','chicken','fish','sausage','egg','beef','plantain','salad','gari'], popular:false, img:px(13915043,900)},

  // Drinks
  {id:'d01', name:'Sobolo (Hibiscus Drink)', desc:'Chilled, spiced hibiscus juice.', price:10, category:'drinks', tags:['drink','sobolo'], popular:true, img:px(8678927)},
  {id:'d02', name:'Ginger & Pineapple Drink', desc:'Refreshing house-made ginger drink.', price:10, category:'drinks', tags:['drink','ginger'], popular:false, img:px(4134388)},
  {id:'d03', name:'Bottled Water', desc:'Chilled sachet-free bottled water.', price:5, category:'drinks', tags:['drink','water'], popular:false, img:px(357577)},
];

const TOPPINGS = [
  {id:'t01', name:'Egg', price:5, group:'proteins', img:px(18805640,300)},
  {id:'t02', name:'Fried Chicken', price:15, group:'proteins', img:px(34134206,300)},
  {id:'t03', name:'Fried Fish', price:15, group:'proteins', img:px(8956671,300)},
  {id:'t04', name:'Cow Meat', price:15, group:'proteins', img:px(19781592,300)},
  {id:'t05', name:'Cow Skin (Wele)', price:10, group:'proteins', img:px(34284708,300)},
  {id:'t06', name:'Sausage', price:10, group:'proteins', img:px(34134206,300)},
  {id:'t07', name:'Fried Plantain', price:8, group:'extras', img:px(17952748,300)},
  {id:'t08', name:'Spaghetti', price:8, group:'extras', img:px(9700895,300)},
  {id:'t09', name:'Salad', price:5, group:'extras', img:px(19781592,300)},
  {id:'t10', name:'Gari', price:5, group:'extras', img:px(9700896,300)},
  {id:'t11', name:'Shito', price:3, group:'extras', img:null},
];

const WA_NUMBER = '233245138854'; // WhatsApp number for checkout
const DELIVERY_FEE = 15;

/* ============================================
   CART — localStorage-backed
   ============================================ */
const CART_KEY = 'wakyePointCart';
function getCart(){
  try{
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  }catch(e){ return []; }
}
function saveCart(cart){
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
  renderCart();
}
function findItemById(id){
  return MENU_ITEMS.find(i=>i.id===id) || TOPPINGS.find(i=>i.id===id);
}
function addToCart(id, qty){
  qty = qty || 1;
  const item = findItemById(id);
  if(!item) return;
  const cart = getCart();
  const existing = cart.find(c=>c.id===id);
  if(existing){ existing.qty += qty; }
  else{ cart.push({id:item.id, name:item.name, price:item.price, img:item.img, qty:qty}); }
  saveCart(cart);
}
function updateQty(id, delta){
  const cart = getCart();
  const line = cart.find(c=>c.id===id);
  if(!line) return;
  line.qty += delta;
  const next = cart.filter(c=>c.qty>0);
  saveCart(next);
}
function removeFromCart(id){
  saveCart(getCart().filter(c=>c.id!==id));
}
function cartCount(){
  return getCart().reduce((sum,c)=>sum+c.qty,0);
}
function cartSubtotal(){
  return getCart().reduce((sum,c)=>sum+c.qty*c.price,0);
}
function updateCartBadge(){
  document.querySelectorAll('.cart-badge').forEach(b=>{
    const n=cartCount();
    b.textContent=n;
    b.style.display = n>0 ? 'flex' : 'none';
  });
}

function renderCart(){
  const wrap = document.getElementById('cartItems');
  if(!wrap) return;
  const cart = getCart();
  if(cart.length===0){
    wrap.innerHTML = `<div class="cart-empty"><i class="fa-solid fa-bowl-food"></i><p>Your cart is empty.<br>Add something delicious!</p></div>`;
  }else{
    wrap.innerHTML = cart.map(c=>`
      <div class="cart-item">
        <img src="${c.img||''}" alt="${c.name}" loading="lazy">
        <div class="info">
          <h5>${c.name}</h5>
          <span class="unit-price">GH₵ ${c.price} each</span>
          <div class="qty-row">
            <button aria-label="Decrease" onclick="updateQty('${c.id}',-1)"><i class="fa-solid fa-minus"></i></button>
            <span>${c.qty}</span>
            <button aria-label="Increase" onclick="updateQty('${c.id}',1)"><i class="fa-solid fa-plus"></i></button>
            <button class="remove" onclick="removeFromCart('${c.id}')">Remove</button>
          </div>
        </div>
        <div class="line-total">GH₵ ${c.qty*c.price}</div>
      </div>`).join('');
  }
  const subtotal = cartSubtotal();
  const delivery = subtotal>0 ? DELIVERY_FEE : 0;
  document.getElementById('cartSubtotal').textContent = `GH₵ ${subtotal}`;
  document.getElementById('cartDelivery').textContent = `GH₵ ${delivery}`;
  document.getElementById('cartTotal').textContent = `GH₵ ${subtotal+delivery}`;
  const checkoutBtn = document.getElementById('cartCheckoutBtn');
  if(checkoutBtn) checkoutBtn.disabled = cart.length===0;
}

function openCart(){
  document.getElementById('cartDrawer').classList.add('open');
  document.getElementById('cartOverlay').classList.add('open');
  renderCart();
}
function closeCart(){
  document.getElementById('cartDrawer').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('open');
}

/* WhatsApp checkout — sends full itemized cart */
function waLink(message){
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}
function checkoutViaWhatsApp(){
  const cart = getCart();
  if(cart.length===0) return;
  const subtotal = cartSubtotal();
  const delivery = DELIVERY_FEE;
  let msg = `Hello Wakye Point, I'd like to order:\n\n`;
  cart.forEach(c=>{
    msg += `• ${c.name} x${c.qty} — GH₵ ${c.qty*c.price}\n`;
  });
  msg += `\nSubtotal: GH₵ ${subtotal}\nDelivery: GH₵ ${delivery}\nTotal: GH₵ ${subtotal+delivery}\n\nThank you!`;
  window.open(waLink(msg),'_blank');
}

/* Generic Order/Buy/Book/Checkout CTAs sitewide */
function initWaCtas(){
  document.querySelectorAll('.wa-generic-cta').forEach(el=>{
    el.addEventListener('click',(e)=>{
      e.preventDefault();
      window.open(waLink(`Hello Wakye Point, I'd like to order…`),'_blank');
    });
  });
}

/* ============================================
   CARD RENDERING
   ============================================ */
function foodCardHTML(item){
  const isFav = (getFavs().includes(item.id));
  return `
  <div class="food-card" data-search="${item.name.toLowerCase()} ${item.tags.join(' ')}" data-category="${item.category}" data-popular="${item.popular}">
    <div class="img-wrap">
      ${item.popular ? '<span class="popular-tag">Popular</span>' : ''}
      <button class="fav ${isFav?'active':''}" aria-label="Favorite" onclick="toggleFav('${item.id}',this)"><i class="fa-solid fa-heart"></i></button>
      <img src="${item.img}" alt="${item.name}" loading="lazy">
    </div>
    <div class="body">
      <h4>${item.name}</h4>
      <p class="desc">${item.desc}</p>
      <div class="foot-row">
        <span class="price">GH₵ ${item.price}</span>
        <button class="add-btn" aria-label="Add to cart" onclick="handleAddClick('${item.id}', this)"><i class="fa-solid fa-plus"></i></button>
      </div>
    </div>
  </div>`;
}
function handleAddClick(id, btn){
  addToCart(id,1);
  btn.classList.add('added');
  btn.innerHTML='<i class="fa-solid fa-check"></i>';
  setTimeout(()=>{btn.classList.remove('added');btn.innerHTML='<i class="fa-solid fa-plus"></i>';},1100);
}

/* Favorites (local, cosmetic) */
const FAV_KEY='wakyePointFavs';
function getFavs(){ try{return JSON.parse(localStorage.getItem(FAV_KEY))||[];}catch(e){return [];} }
function toggleFav(id, btn){
  let favs = getFavs();
  if(favs.includes(id)){ favs = favs.filter(f=>f!==id); btn.classList.remove('active'); }
  else{ favs.push(id); btn.classList.add('active'); }
  localStorage.setItem(FAV_KEY, JSON.stringify(favs));
}

function toppingCardHTML(t){
  return `
  <div class="topping-card" data-search="${t.name.toLowerCase()} topping ${t.group}">
    <div class="img ${t.img?'':'swatch'}" ${t.img?'':'style="background:linear-gradient(135deg,var(--orange),var(--orange-deep));"'}>
      ${t.img ? `<img src="${t.img}" alt="${t.name}" loading="lazy">` : `<i class="fa-solid fa-pepper-hot"></i>`}
    </div>
    <h5>${t.name}</h5>
    <span class="price">+GH₵ ${t.price}</span>
    <button class="add-btn" onclick="handleToppingAdd('${t.id}', this)">Add</button>
  </div>`;
}
function handleToppingAdd(id, btn){
  addToCart(id,1);
  btn.classList.add('added');
  const original = btn.textContent;
  btn.textContent='Added ✓';
  setTimeout(()=>{btn.classList.remove('added');btn.textContent=original;},1100);
}

/* ============================================
   SEARCH (instant filter across visible cards)
   ============================================ */
function initSearch(){
  const openBtns=document.querySelectorAll('.open-search');
  const bar=document.getElementById('searchBar');
  const input=document.getElementById('searchInput');
  const closeBtn=document.getElementById('closeSearch');
  if(!bar) return;
  openBtns.forEach(b=>b.addEventListener('click',(e)=>{
    e.preventDefault();
    bar.classList.add('open');
    setTimeout(()=>input.focus(),350);
  }));
  closeBtn.addEventListener('click',()=>{bar.classList.remove('open'); input.value=''; filterCardsBySearch('');});
  input.addEventListener('input',()=>filterCardsBySearch(input.value.trim().toLowerCase()));
}
function filterCardsBySearch(q){
  document.querySelectorAll('.food-card, .topping-card').forEach(card=>{
    const hay=card.dataset.search||'';
    card.style.display = (!q || hay.includes(q)) ? '' : 'none';
  });
  document.querySelectorAll('.menu-section').forEach(sec=>{
    const visible=[...sec.querySelectorAll('.food-card')].some(c=>c.style.display!=='none');
    if(sec.querySelectorAll('.food-card').length>0){ sec.style.display = visible ? '' : 'none'; }
  });
}

/* ============================================
   NAVBAR / MOBILE MENU / CART WIRING
   ============================================ */
function initChrome(){
  const nav=document.getElementById('navbar');
  if(nav){
    window.addEventListener('scroll',()=>nav.classList.toggle('solid', window.scrollY>50));
  }
  const burger=document.getElementById('burger');
  const mobileMenu=document.getElementById('mobileMenu');
  if(burger){
    burger.addEventListener('click',()=>mobileMenu.classList.toggle('open'));
    mobileMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>mobileMenu.classList.remove('open')));
  }
  document.querySelectorAll('.open-cart').forEach(b=>b.addEventListener('click',(e)=>{e.preventDefault();openCart();}));
  const closeCartBtn=document.getElementById('closeCart');
  if(closeCartBtn) closeCartBtn.addEventListener('click',closeCart);
  const overlay=document.getElementById('cartOverlay');
  if(overlay) overlay.addEventListener('click',closeCart);
  const checkoutBtn=document.getElementById('cartCheckoutBtn');
  if(checkoutBtn) checkoutBtn.addEventListener('click',checkoutViaWhatsApp);

  updateCartBadge();
  renderCart();
  initSearch();
  initWaCtas();
}

/* Reveal-on-scroll */
function initReveal(){
  const els=document.querySelectorAll('[data-reveal]');
  if(!('IntersectionObserver' in window)){ els.forEach(e=>e.classList.add('visible')); return; }
  const io=new IntersectionObserver((entries)=>{
    entries.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add('visible'); io.unobserve(en.target); } });
  },{threshold:.15});
  els.forEach(e=>io.observe(e));
}

document.addEventListener('DOMContentLoaded',()=>{
  initChrome();
  initReveal();
  if(document.getElementById('year')) document.getElementById('year').textContent = new Date().getFullYear();
});