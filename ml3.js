 const images = document.querySelectorAll('.js-image')
 const next = document.querySelector('.js-next')
 const prev = document.querySelector('.js-prev')
 let activeIndex = 0

 next.addEventListener('click', () => {
    images.forEach((image) => {
        image.classList.remove('active')
    })

    activeIndex = activeIndex + 1

    image[activeIndex].classList.add('active')
 })