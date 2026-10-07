const products=[
{id:1,name:"Hoodie Essential",cat:"hoodie",price:49.90,img:"https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=80"},
{id:2,name:"T-shirt Signature",cat:"tshirt",price:24.90,img:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80"},
{id:3,name:"Cargo Urban",cat:"pants",price:54.90,img:"https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=900&q=80"},
{id:4,name:"Hoodie Oversize",cat:"hoodie",price:59.90,img:"https://images.unsplash.com/photo-1578681994506-b8f463449011?auto=format&fit=crop&w=900&q=80"},
{id:5,name:"T-shirt Basic",cat:"tshirt",price:22.90,img:"https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=900&q=80"},
{id:6,name:"Pantalon Relax",cat:"pants",price:44.90,img:"https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=900&q=80"}];
let cart=JSON.parse(localStorage.getItem("novaCart")||"[]");
const euro=n=>n.toLocaleString("fr-FR",{style:"currency",currency:"EUR"});
function renderProducts(){let f=document.getElementById("filter").value;let list=products.filter(p=>f==="all"||p.cat===f);document.getElementById("products").innerHTML=list.map(p=>`<article class="card"><div class="pic" style="background-image:url('${p.img}')"></div><div class="info"><h3>${p.name}</h3><span class="price">${euro(p.price)}</span><button class="add" onclick="add(${p.id})">Ajouter au panier</button></div></article>`).join("")}
function add(id){let x=cart.find(i=>i.id===id);x?x.qty++:cart.push({id,qty:1});save();openCart()}
function save(){localStorage.setItem("novaCart",JSON.stringify(cart));renderCart()}
function renderCart(){let el=document.getElementById("cart-items"),count=cart.reduce((a,b)=>a+b.qty,0);document.getElementById("count").textContent=count;if(!cart.length){el.innerHTML='<div class="empty">Ton panier est vide.</div>';document.getElementById("total").textContent=euro(0);return}let total=0;el.innerHTML=cart.map(i=>{let p=products.find(x=>x.id===i.id);total+=p.price*i.qty;return `<div class="item"><img src="${p.img}"><div class="item-info"><strong>${p.name}</strong><span>${euro(p.price)}</span><div class="qty"><button onclick="change(${p.id},-1)">−</button> ${i.qty} <button onclick="change(${p.id},1)">+</button></div></div></div>`}).join("");document.getElementById("total").textContent=euro(total)}
function change(id,n){let x=cart.find(i=>i.id===id);x.qty+=n;if(x.qty<=0)cart=cart.filter(i=>i.id!==id);save()}
function toggleCart(){document.getElementById("cart").classList.toggle("open");document.getElementById("overlay").classList.toggle("show")}
function openCart(){document.getElementById("cart").classList.add("open");document.getElementById("overlay").classList.add("show")}
function checkout(){if(!cart.length)return alert("Ton panier est vide.");alert("Démo : ajoute ici ton lien de paiement Stripe/PayPal pour recevoir les commandes.");}
function sendContact(e){e.preventDefault();alert("Message envoyé (démo). Pour un vrai formulaire, connecte-le à un service de formulaire.");e.target.reset()}
renderProducts();renderCart();