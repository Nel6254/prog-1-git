 const images = document.querySelectorAll('.js-image')
 const next = document.querySelector('.js-next')
 const prev = document.querySelector('.js-prev')
 let activeIndex = 0

const removeActiveFromAllImages =() => {
    images.forEach((images) => {
        images.classList.remove('active')
    })
}

 next.addEventListener('click', () => {
    removeActiveFromAllImages()

    if(activeIndex === images.length - 1) {
        activeIndex = 0
    } else {
        activeIndex = activeIndex + 1
    }

    image[activeIndex].classList.add('active')
 })

 prev.addEventListener('click', () => {
    removeActiveFromAllImages()

    if(activeIndex === 0) {
        activeIndex = images.length - 1
    } else {
        activeIndex = activeIndex -  1
    }

    image[activeIndex].classList.add('active')
 })