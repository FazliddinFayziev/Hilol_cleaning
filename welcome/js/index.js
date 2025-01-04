import { preloadImages, preloadVideo } from './utils.js';

let lenis;

const contentWithSVG = Array.from(document.querySelectorAll('.content')).filter(element => {
    return element.querySelector(':scope svg') !== null;
});


const initSmoothScrolling = () => {
	lenis = new Lenis({
		lerp: 0.2, 
		smoothWheel: true 
	});
	lenis.on('scroll', () => ScrollTrigger.update());
	const scrollFn = (time) => {
		lenis.raf(time);
		requestAnimationFrame(scrollFn);
	};
	requestAnimationFrame(scrollFn);
};

const applyCustomEffect_1 = (contentElement) => {
    const clipPathEl = contentElement.querySelector('svg clipPath');
    const poster = contentElement.querySelector('.poster');
    const posterInner = contentElement.querySelector('.poster__inner');    

    [...clipPath].forEach((clipPathEl, pos) => {
        gsap.timeline({
            scrollTrigger: {
                trigger: poster[pos],
                start: 'top bottom', 
                end: 'bottom top', 
                scrub: true, 
            }
        })
        .fromTo(clipPathEl, {
            xPercent: pos === 0 ? 40 : -80
        }, {
            ease: 'none',
            xPercent: pos === 0 ? -40 : 20 
        }, 0)
        .fromTo(posterInner[pos], {
            xPercent: pos === 0 ? -5 : 5,
            yPercent: pos === 0 ? -5 : 5 
        }, {
            xPercent: pos === 0 ? 5 : -5,
            yPercent: pos === 0 ? 5 : -5 
        }, 0);
    });

};

const scroll = () => {
    contentWithSVG.forEach((contentElement, position) => {
        switch (position) {
            case 0:
                applyCustomEffect_1(contentElement);
                break;
            default:
                break;
        }
    });
};

const init = () => {
    initSmoothScrolling();
    scroll(); 
};

Promise.all([preloadImages('.poster__inner'), preloadVideo('img/dragon.mp4')]).then(() => {
    document.body.classList.remove('loading');
    init();
});