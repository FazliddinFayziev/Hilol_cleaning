let images = [...document.querySelectorAll(".img")];
let sliderInner = document.querySelector('.slider-inner');
let slider = document.querySelector('.slider');
let sliderWidth;

images.forEach((img, index) => {
    img.style.backgroundImage = `url(./assets/${index + 1}.jpg)`;
});

function init() {
    sliderWidth = sliderInner.scrollWidth; 
    gsap.set(sliderInner, { x: 0 });
    
    ScrollTrigger.create({
        trigger: "main", 
        start: "top top",
        end: () => `+=${sliderWidth - window.innerWidth}`, 
        pin: true, 
        scrub: 1, 
        anticipatePin: 1,
        onUpdate: self => {
            let progress = self.progress; 
            gsap.to(sliderInner, {
                x: -progress * (sliderWidth - window.innerWidth), 
                ease: "none"
            });
        }
    });
}

init();
