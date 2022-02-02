import Swiper from 'https://unpkg.com/swiper@8/swiper-bundle.esm.browser.min.js'

export const swiper = new Swiper('.swiper', {
    direction: 'vertical',
    effect:'creative',
    /* 'cube' | 'fade' | 'coverflow' | 'flip' | 'creative' | 'cards' */
    speed: 1000,
    roundLengths: true,
});