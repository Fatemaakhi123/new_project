AOS.init();
//dot cursor part
const dotCursor = document.getElementById('dotCursor');

function getBackgroundColorAtCursor(x, y) {
    const element = document.elementFromPoint(x, y);
    if (element) {
        const bgColor = window.getComputedStyle(element).backgroundColor;
        console.log('Background color:', bgColor); 
        return bgColor;
    }
    return null;
}

document.addEventListener('mousemove', (e) => {
    dotCursor.style.left = `${e.pageX}px`;
    dotCursor.style.top = `${e.pageY}px`;
    
    const bgColor = getBackgroundColorAtCursor(e.clientX, e.clientY);
    
    if (bgColor) {
        const rgbValues = bgColor.match(/\d+/g);
        const r = parseInt(rgbValues[0]);
        const g = parseInt(rgbValues[1]);
        const b = parseInt(rgbValues[2]);
        if (r < 50 && g < 50 && b < 50) { 
            dotCursor.style.backgroundColor = 'white'; 
        } else {
            dotCursor.style.backgroundColor = 'black'; 
        }
    }
});
const dot = document.getElementById('dot');
const overlay = document.getElementById('blackOverlay');
const closeBtn = document.getElementById('closeBtn');

function handleDotVisibility() {
    if (window.innerWidth > 767) {
        if (window.scrollY > 100) {
            dot.style.display = 'block'; 
            dot.style.position = 'fixed'; 
            dot.style.right = '3rem'; 
            dot.style.top = '4rem'; 
            dot.style.transition = 'right 1s ease'; 
            closeBtn.style.right='3rem';
            closeBtn.style.top='4rem';
        } else {
            dot.style.display = 'none'; 
        }
    } else {
        dot.style.display = 'block'; 
        dot.style.position = 'fixed'; 
        dot.style.right = '2rem';
        dot.style.top = '3rem'; 
    }
}

handleDotVisibility();
window.addEventListener('scroll', handleDotVisibility);
dot.addEventListener('click', function() {
    overlay.style.display = 'block'; 
});
closeBtn.addEventListener('click', function() {
    overlay.style.display = 'none'; 
});

overlay.addEventListener('click', function(event) {
    if (event.target === overlay) {
        overlay.style.display = 'none'; 
    }
});



//image slider
    const slider = document.querySelector('.slider');
    const images = [
        'images/fairfax-and-favour-menu_2023-04-03-142639_ryye.jpg',
        'images/grace-home-3.jpg',
        'images/maia-lashes-home-1.jpg',
        'images/maze-home-1.jpg',
        'images/the-sports-edit-menu-4.jpg',
        'images/grace-cm.jpg',
        'images/hiding-space-home-1.jpg',
        'images/lounge-underwear-menu-2_2023-04-04-101749_iyhn.jpg'
    ];
    
    let c = 0;
    let isChanging = false; 
    slider.style.backgroundImage = `url(${images[c]})`;
    
    function changeImage(direction) {
        if (!isChanging) {
            isChanging = true;
    
            if (direction === 'down') {
                c = (c + 1) % images.length; 
            } else if (direction === 'up') {
                c = (c - 1 + images.length) % images.length; 
            }
    
            slider.style.backgroundImage = `url(${images[c]})`;
            setTimeout(() => {
                isChanging = false;
            }, 500); 
        }
    }
    window.addEventListener('wheel', (event) => {
        if (event.deltaY > 0) {
            changeImage('down');
        } else {
            changeImage('up');
        }
    });
    
window.onload = function() {
    const sliderTrack = document.querySelector('.slider-track');
    const sliderContainers = document.querySelectorAll('.slider-container');
    
    let totalWidth = 0;

    sliderContainers.forEach(container => {
        const images = container.querySelectorAll('img');
        images.forEach(image => {
            totalWidth += image.getBoundingClientRect().width + 40;
        });
    })

    sliderTrack.style.width = `${totalWidth}px`;

    const animationDuration = totalWidth / 200; 
    sliderTrack.style.animationDuration = `${animationDuration}s`;
};

//counter
document.addEventListener('DOMContentLoaded', function() {
    const counters = document.querySelectorAll('.counter');

    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target'); 
        let count = 1; 
        const increment = Math.ceil(target / 90); 

        const updateCount = () => {
            counter.textContent = `${count}%`; 
            if (count < target) {
                count += increment; 
                setTimeout(updateCount, 50); 
            } else {
                counter.textContent = `${target}%`; 
            }
        };

        updateCount();
    };

    const checkScroll = () => {
        const windowHeight = window.innerHeight;
        const elementTop = counters[0].getBoundingClientRect().top; 
        const elementVisible = 150; 

        if (elementTop < windowHeight - elementVisible) {
            counters.forEach(counter => {
                animateCounter(counter);
            });
            window.removeEventListener('scroll', checkScroll);
        }
    };

    window.addEventListener('scroll', checkScroll); 
});
//slide paragraph
document.addEventListener('DOMContentLoaded', function() {
    const pots = document.querySelectorAll('.pot');
    const hrs = document.querySelectorAll('.custom-hr');
    const colors = [
        'rgba(255, 255, 255, 0.7)', 
        'rgba(255, 255, 255, 0.8)', 
        'rgba(255, 255, 255, 0.9)', 
        'rgba(255, 255, 255, 1)'  
    ];
    let currentIndex = 0;

    pots.forEach((pot, index) => {
        pot.style.display = index === 0 ? 'flex' : 'none';  
    });

    hrs.forEach((hr, index) => {
        hr.style.backgroundColor = index === currentIndex ? colors[currentIndex] : 'rgba(255, 255, 255, 0.2)'; // Default color for other hrs
    });

    document.getElementById('after').addEventListener('click', function() {
        if (currentIndex < pots.length - 1) {
            pots[currentIndex].style.display = 'none';  
            currentIndex++;
            pots[currentIndex].style.display = 'flex'; 

            hrs.forEach((hr, index) => {
                hr.style.backgroundColor = index === currentIndex ? colors[currentIndex] : 'rgba(255, 255, 255, 0.2)'; // Default color for other hrs
            });
        }
    });

    document.getElementById('before').addEventListener('click', function() {
        if (currentIndex > 0) {
            pots[currentIndex].style.display = 'none';  
            currentIndex--;
            pots[currentIndex].style.display = 'flex'; 

            hrs.forEach((hr, index) => {
                hr.style.backgroundColor = index === currentIndex ? colors[currentIndex] : 'rgba(255, 255, 255, 0.2)'; // Default color for other hrs
            });
        }
    });
});

//image slider 2

const image = [
    "./images/grace-cm.jpg",
    "./images/fairfax-and-favour-menu_2023-04-03-142639_ryye.jpg",
    "./images/hiding-space-home-1.jpg",
    "./images/maze-clothing-menu-3_2023-04-05-130852_fjpg.jpg",
    "./images/tatti-lashes-menu-2_2023-04-20-120610_gndt.jpg",
    "./images/vervaunt-cm-2.jpg"
];

let currentIndex = 0;

function updateImages() {
    const img1 = document.querySelector("#imageContainer div:nth-child(1) img");
    const img2 = document.querySelector("#imageContainer div:nth-child(2) img");

    img1.src = image[currentIndex];
    img2.src = image[currentIndex + 1] || image[currentIndex]; 
}

document.getElementById('af').addEventListener('click', () => {
    if (currentIndex < image.length - 1) {
        currentIndex += 1; 
        updateImages();
    }
});

document.getElementById('bef').addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex -= 1; 
        updateImages();
    }
});

updateImages();

AOS.init({
    duration: 1000,  
    once: true      
});

// JavaScript to add "fixed" class when scrolling down
window.addEventListener('scroll', function() {
    const mafive = document.getElementById('fixedRow');
    const scrollPosition = window.scrollY;

    if (scrollPosition > 100) { // Adjust based on when you want the fix to happen
        mafive.classList.add('fixed');
    } else {
        mafive.classList.remove('fixed');
    }
});
