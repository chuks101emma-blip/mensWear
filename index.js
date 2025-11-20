// //Smooth scroll to section 
// function scrollToSection(SectionID)
// {document.getElementById(SectionID).scrollIntoView({behavior:"smooth",block:"start"})}
// const body = document.querySelector("body");

// //Enlarge image on click (simple modal-like effect)
// function enlargeImage(img) {
//     const enlarged = document.createElement('div');
//     enlarged.style.position = 'fixed';
//     enlarged.style.top = '0';
//     enlarged.style.left = '0';
//     enlarged.style.width = '100%';
//     enlarged.style.height = '100%';
//     enlarged.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
//     enlarged.style.display = 'flex';
//     enlarged.style.alignItems = 'center';
//     enlarged.style.justifyContent = 'center';
//     enlarged.style.cursor = 'pointer';
//     enlarged.style.zIndex = '1000';

//     const imgClone = img.cloneNode();
//     largeImg.style.maxWidth = '80%';
//     largeImg.style.maxHeight = '80%';

//     enlarged.appendChild(largeImg);
//     enlarged.onclick = function() 
//     {body.appendChild(enlarged);}
// }
// //Contact form validation and submission
// const contactForm = document.getElementById('contactForm');
// contactForm.addEventListener('submit', function(event) {
//     event.preventDefault();     
//     const name = document.getElementById('name').value.trim();
//     const email = document.getElementById('email').value.trim();
//     const message = document.getElementById('message').value.trim();

//     if (name === '' || email === '' || message === '') {
//         alert(`Thank you, ${name}!. your message has been sent.`);
//         this.reset(); //clear form 

//     } else {
//         alert('Please fill in all fields.');
//     }
// })
 /* ---------- Preloader ---------- */
    window.addEventListener('load', () => document.getElementById('preloader').remove());

    /* ---------- Mobile Menu ---------- */
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks   = document.querySelector('.nav-links');
    menuToggle.addEventListener('click', () => navLinks.classList.toggle('active'));

    /* ---------- Cart (localStorage) ---------- */
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.getElementById('cart-count');
    const updateCartUI = () => cartCount.textContent = cart.reduce((s,i)=>s+i.qty,0);
    updateCartUI();

    /* ---------- Add to Cart ---------- */
    document.querySelectorAll('.add-to-cart').forEach(btn => {
      btn.addEventListener('click', () => {
        const card   = btn.closest('.product-card') || btn.closest('.modal-body');
        const name   = card.querySelector('h3').textContent;
        const price  = parseFloat(card.querySelector('.price').textContent.replace(/[^0-9.]/g,''));
        const item   = cart.find(p => p.name===name);
        if (item) item.qty++; else cart.push({name,price,qty:1});
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartUI();
        alert(`${name} added to cart!`);
      });
    });

    /* ---------- Search Filter ---------- */
    document.getElementById('search').addEventListener('input', e => {
      const term = e.target.value.toLowerCase();
      document.querySelectorAll('.product-card').forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        card.style.display = title.includes(term) ? '' : 'none';
      });
    });

    /* ---------- Modal Quick-View ---------- */
    const modal = document.getElementById('modal');
    document.querySelectorAll('.product-card').forEach(card => {
      card.addEventListener('click', () => {
        document.getElementById('modal-img').src = card.querySelector('img').src;
        document.getElementById('modal-title').textContent = card.querySelector('h3').textContent;
        document.getElementById('modal-price').textContent = card.querySelector('.price').textContent;
        modal.style.display = 'flex';
      });
    });
    document.getElementById('close-modal').onclick = () => modal.style.display='none';
    modal.onclick = e => { if (e.target===modal) modal.style.display='none'; };

    /* ---------- Dark / Light Toggle ---------- */
    const themeBtn = document.getElementById('theme-toggle');
    themeBtn.style.position='fixed'; themeBtn.style.bottom='20px'; themeBtn.style.right='20px';
    themeBtn.style.padding='10px 15px'; themeBtn.style.borderRadius='50%'; themeBtn.style.background='#d4af37';
    themeBtn.style.border='none'; themeBtn.style.zIndex='2000';
    themeBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      themeBtn.textContent = document.body.classList.contains('dark') ? 'Sun' : 'Moon';
    });

    /* ---------- Scroll Reveal for Cards ---------- */
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, {threshold:0.1});
    document.querySelectorAll('.product-card').forEach(c => observer.observe(c));

    /* ---------- Smooth Scroll for Anchor Links ---------- */
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(a.getAttribute('href'));
        if (target) target.scrollIntoView({behavior:'smooth'});
      });
    });