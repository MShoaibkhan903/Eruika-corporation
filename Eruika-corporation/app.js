

//////////////////////////////yellow animation

const canvas = document.getElementById('expensiveBG');
if(canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#ffd700','#ffb700','#ffffff','#e0e0e0'];

    // Reduced from 150 to 80 particles for better performance
    for(let i=0; i<80; i++){
        particles.push({
            x: Math.random()*canvas.width,
            y: Math.random()*canvas.height,
            radius: Math.random()*3 + 1,
            dx: (Math.random()-0.5)*0.5,  // Slower movement
            dy: (Math.random()-0.5)*0.5,
            color: colors[Math.floor(Math.random()*colors.length)]
        });
    }

    let animationId = null;
    function animate(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        
        for(let p of particles){
            p.x += p.dx;
            p.y += p.dy;

            if(p.x>canvas.width) p.x=0;
            if(p.x<0) p.x=canvas.width;
            if(p.y>canvas.height) p.y=0;
            if(p.y<0) p.y=canvas.height;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI*2);
            ctx.fillStyle = p.color;
            ctx.fill();
        }
        animationId = requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', ()=>{
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}




//////////////////////////////Card animation 

  AOS.init({
    duration: 1000,
    once: true
  });






// carasole card animation yellow 

// Check if carousel elements exist before running
const track = document.querySelector('.carousel-track');
if (track) {
  const cards = document.querySelectorAll('.carousel-card');
  const prev = document.querySelector('.carousel-arrow.prev');
  const next = document.querySelector('.carousel-arrow.next');

  let index = 0;
  let cardsToShow = 4;

  function updateCardsToShow() {
    if(window.innerWidth <= 600) cardsToShow = 1;
    else if(window.innerWidth <= 1024) cardsToShow = 2;
    else cardsToShow = 4;
  }

  updateCardsToShow();
  window.addEventListener('resize', updateCardsToShow);

  const cardWidth = () => cards[0].offsetWidth + 20; // including margin
  const maxIndex = () => cards.length - cardsToShow;

  // Move to slide function
  function moveTo(idx) {
    track.style.transition = 'transform 0.5s ease';
    track.style.transform = `translateX(${-idx * cardWidth()}px)`;
  }

  // Next Slide
  if(next) {
    next.addEventListener('click', () => {
      index++;
      if (index > maxIndex()) index = 0;
      moveTo(index);
    });
  }

  // Prev Slide
  if(prev) {
    prev.addEventListener('click', () => {
      index--;
      if (index < 0) index = maxIndex();
      moveTo(index);
    });
  }

  // Autoplay
  setInterval(() => { if(next) next.click(); }, 4000);

  // Mouse Drag
  let isDown = false, startX, scrollLeft;
  track.addEventListener('mousedown', e => { isDown = true; startX = e.pageX; scrollLeft = index * cardWidth(); track.style.cursor='grabbing'; });
  track.addEventListener('mouseup', e => { isDown = false; track.style.cursor='grab'; });
  track.addEventListener('mouseleave', e => { isDown = false; track.style.cursor='grab'; });
  track.addEventListener('mousemove', e => {
    if(!isDown) return;
    const x = e.pageX;
    const walk = (startX - x);
    const delta = Math.round(walk / cardWidth());
    let newIndex = index + delta;
    if (newIndex < 0) newIndex = 0;
    if (newIndex > maxIndex()) newIndex = maxIndex();
    moveTo(newIndex);
  });
}







//////////////////////////////  3D CAROUSEL CARD 

document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.getElementById("carousel");
    
    // Safety check
    if (!carousel) {
        console.warn("3D Carousel element not found");
        return;
    }

    const cards = document.querySelectorAll(".card");
    if (cards.length === 0) {
        console.warn("No carousel cards found");
        return;
    }

    const total = cards.length;
    let angle = 0;
    let activeIndex = 0;

    function getRadius() {
        if (window.innerWidth < 480) return 150;   // mobile
        if (window.innerWidth < 768) return 220;   // tablet
        return 240;                                // desktop
    }

    function updateCarousel() {
        const radius = getRadius();
        const step = 360 / total;

        cards.forEach((card, i) => {
            const a = angle + i * step;
            const rad = a * Math.PI / 180;

            const x = Math.sin(rad) * radius;
            const z = Math.cos(rad) * radius;

            card.style.transform = `translate(-50%, -50%) translateX(${x}px) translateZ(${z}px) rotateY(${a}deg)`;

            card.classList.remove("center", "back");

            const norm = (a % 360 + 360) % 360;
            if (norm < 30 || norm > 330) {
                card.classList.add("center");
                activeIndex = i;
            } else if (norm > 90 && norm < 270) {
                card.classList.add("back");
            }
        });

        updateDots();
    }

    function updateDots() {
        document.querySelectorAll(".dot").forEach((d, i) => {
            d.classList.toggle("active", i === activeIndex);
        });
    }

    // Arrow buttons
    const leftBtn = document.getElementById("left");
    const rightBtn = document.getElementById("right");

    if (leftBtn) {
        leftBtn.onclick = () => { 
            angle += 360 / total; 
            updateCarousel(); 
        };
    }
    if (rightBtn) {
        rightBtn.onclick = () => { 
            angle -= 360 / total; 
            updateCarousel(); 
        };
    }

    // Create dots
    const dotsContainer = document.getElementById("dots");
    if (dotsContainer) {
        cards.forEach((_, i) => {
            const d = document.createElement("div");
            d.className = "dot" + (i === 0 ? " active" : "");
            d.onclick = () => { 
                angle = -i * (360 / total); 
                updateCarousel(); 
            };
            dotsContainer.appendChild(d);
        });
    }

    // Window resize listener
    window.addEventListener("resize", updateCarousel);
    
    // Initial carousel render
    updateCarousel();
    
    console.log("3D Carousel initialized successfully with " + total + " cards");
});





// <!-- ===== MOBILE HOVER SUPPORT ===== -->

document.addEventListener('DOMContentLoaded', () => {
  const dropdowns = document.querySelectorAll('.nav-item.dropdown');

  dropdowns.forEach(drop => {
    drop.addEventListener('touchstart', function(e){
      if(!drop.classList.contains('show')){
        e.preventDefault();
        // close others
        dropdowns.forEach(d => {
          if(d!==drop) d.classList.remove('show');
          d.querySelector('.dropdown-menu')?.classList.remove('show');
        });
        // open this dropdown
        drop.classList.add('show');
        drop.querySelector('.dropdown-menu').classList.add('show');
      }
    });
  });

  // close dropdowns if tapped outside
  document.addEventListener('touchstart', function(e){
    dropdowns.forEach(drop => {
      if(!drop.contains(e.target)){
        drop.classList.remove('show');
        drop.querySelector('.dropdown-menu')?.classList.remove('show');
      }
    });
  });
});
 

//////////////////////////////  WHO WE ARE SECTION ADJUSTMENT
document.querySelectorAll('.dropdown-submenu > a').forEach(item => {
  item.addEventListener('click', function (e) {
    if (window.innerWidth < 992) {
      e.preventDefault();
      this.parentElement.classList.toggle('show');
    }
  });
});














