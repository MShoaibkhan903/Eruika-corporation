



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







// JavaScript 3D Triangles Animation
const canvas = document.getElementById('triangle-canvas');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = document.querySelector('.custom-services').offsetHeight;

// Triangle object
class Triangle {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 20 + 10;
        this.speedY = Math.random() * 0.5 + 0.2;
        this.rotation = Math.random() * 360;
        this.rotSpeed = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.3 + 0.1;
    }
    draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation * Math.PI / 180);
    ctx.beginPath();
    ctx.moveTo(0, -this.size/2);
    ctx.lineTo(-this.size/2, this.size/2);
    ctx.lineTo(this.size/2, this.size/2);
    ctx.closePath();
    // Triangle color set to black with opacity
    ctx.fillStyle = `rgba(255,255,255,${this.opacity})`;
    ctx.fill();
    ctx.restore();

    this.y -= this.speedY;
    this.rotation += this.rotSpeed;
    if(this.y < -this.size) this.reset();
}
}

// Create multiple triangles
const triangles = [];
for(let i=0; i<50; i++) triangles.push(new Triangle());

// Animation loop
function animate() {
    ctx.clearRect(0,0,width,height);
    triangles.forEach(tri => tri.draw());
    requestAnimationFrame(animate);
}
animate();

// Responsive
window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = document.querySelector('.custom-services').offsetHeight;
});



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


















