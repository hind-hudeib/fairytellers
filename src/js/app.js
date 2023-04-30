$(document).ready(function(){
    $("#myModal").modal('show');
});
configObj = { "buttonD": "M11.384 13.333h9.232c.638 0 .958.68.505 1.079l-4.613 4.07c-.28.246-.736.246-1.016 0l-4.613-4.07c-.453-.399-.133-1.079.505-1.079z", "buttonT": "translate(-1028 -172) translate(832 140) translate(32 32) translate(164) matrix(1 0 0 -1 0 32)", "shadowSize": "none", "roundnessSize": "999px", "buttonDToBottom": "32px", "buttonDToRight": "24px", "selectedBackgroundColor": "#7036ab", "selectedIconColor": "#ffffff", "buttonWidth": "48px", "buttonHeight": "48px", "svgWidth": "40px", "svgHeight": "40px" };
function createButton(obj, pageSimulator) {
    const body = document.querySelector("body");
    backToTopButton = document.createElement("span");
    backToTopButton.classList.add("softr-back-to-top-button");
    backToTopButton.id = "softr-back-to-top-button";
    pageSimulator ? pageSimulator.appendChild(backToTopButton) : body.appendChild(backToTopButton);
    backToTopButton.style.width = obj.buttonWidth; backToTopButton.style.height = obj.buttonHeight;
    backToTopButton.style.marginRight = obj.buttonDToRight; backToTopButton.style.marginBottom = obj.buttonDToBottom;
    backToTopButton.style.borderRadius = obj.roundnessSize; backToTopButton.style.boxShadow = obj.shadowSize;
    backToTopButton.style.color = obj.selectedBackgroundColor; backToTopButton.style.backgroundColor = obj.selectedBackgroundColor; pageSimulator ? backToTopButton.style.position = "absolute" : backToTopButton.style.position = "fixed";
    backToTopButton.style.outline = "none";
    backToTopButton.style.bottom = "0px";
    backToTopButton.style.right = "0px";
    backToTopButton.style.cursor = "pointer";
    backToTopButton.style.textAlign = "center";
    backToTopButton.style.border = "solid 2px currentColor";
    backToTopButton.innerHTML = '<svg class="back-to-top-button-svg" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" > <g fill="none" fill-rule="evenodd"> <path d="M0 0H32V32H0z" transform="translate(-1028 -172) translate(832 140) translate(32 32) translate(164) matrix(1 0 0 -1 0 32)" /> <path class="back-to-top-button-img" fill-rule="nonzero" d="M11.384 13.333h9.232c.638 0 .958.68.505 1.079l-4.613 4.07c-.28.246-.736.246-1.016 0l-4.613-4.07c-.453-.399-.133-1.079.505-1.079z" transform="translate(-1028 -172) translate(832 140) translate(32 32) translate(164) matrix(1 0 0 -1 0 32)" /> </g> </svg>'; backToTopButtonSvg = document.querySelector(".back-to-top-button-svg");
    backToTopButtonSvg.style.verticalAlign = "middle";
    backToTopButtonSvg.style.margin = "auto";
    backToTopButtonSvg.style.justifyContent = "center";
    backToTopButtonSvg.style.width = obj.svgWidth;
    backToTopButtonSvg.style.height = obj.svgHeight;
    backToTopButton.appendChild(backToTopButtonSvg);
    backToTopButtonImg = document.querySelector(".back-to-top-button-img");
    backToTopButtonImg.style.fill = obj.selectedIconColor;
    backToTopButtonSvg.appendChild(backToTopButtonImg);
    backToTopButtonImg.setAttribute("d", obj.buttonD);
    backToTopButtonImg.setAttribute("transform", obj.buttonT);
    if (!pageSimulator) {
        backToTopButton.style.display = "none"; window.onscroll = function () {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                backToTopButton.style.display = "block";
            } else { backToTopButton.style.display = "none"; }
        };
        backToTopButton.onclick = function () {
            document.body.scrollTop = 0; document.documentElement.scrollTop = 0;
        };
    }
};
document.addEventListener("DOMContentLoaded", function () { createButton(configObj, null); });


// Get the navbar toggle button element
const navbarToggle = document.querySelector('.navbar-toggler');

// Get the navbar menu element
const navbarMenu = document.querySelector('.navbar-collapse');

// Add a click event listener to the navbar toggle button
navbarToggle.addEventListener('click', function() {
  // Toggle the "show" class on the navbar menu
  navbarMenu.classList.toggle('show');
});

// -----------------------
// Master DOManipulator v2 ------------------------------------------------------------
const items = document.querySelectorAll('.item'),
  controls = document.querySelectorAll('.control'),
  headerItems = document.querySelectorAll('.item-header'),
  descriptionItems = document.querySelectorAll('.item-description'),
  activeDelay = .76,
  interval = 5000;

let current = 0;

const slider = {
  init: () => {
    controls.forEach(control => control.addEventListener('click', (e) => { slider.clickedControl(e) }));
    controls[current].classList.add('active');
    items[current].classList.add('active');
  },
  nextSlide: () => { // Increment current slide and add active class
    slider.reset();
    if (current === items.length - 1) current = -1; // Check if current slide is last in array
    current++;
    controls[current].classList.add('active');
    items[current].classList.add('active');
    slider.transitionDelay(headerItems);
    slider.transitionDelay(descriptionItems);
  },
  clickedControl: (e) => { // Add active class to clicked control and corresponding slide
    slider.reset();
    clearInterval(intervalF);

    const control = e.target,
      dataIndex = Number(control.dataset.index);

    control.classList.add('active');
    items.forEach((item, index) => { 
      if (index === dataIndex) { // Add active class to corresponding slide
        item.classList.add('active');
      }
    })
    current = dataIndex; // Update current slide
    slider.transitionDelay(headerItems);
    slider.transitionDelay(descriptionItems);
    intervalF = setInterval(slider.nextSlide, interval); // Fire that bad boi back up
  },
  reset: () => { // Remove active classes
    items.forEach(item => item.classList.remove('active'));
    controls.forEach(control => control.classList.remove('active'));
  },
  transitionDelay: (items) => { // Set incrementing css transition-delay for .item-header & .item-description, .vertical-part, b elements
    let seconds;
    
    items.forEach(item => {
      const children = item.childNodes; // .vertical-part(s)
      let count = 1,
        delay;
      
      item.classList.value === 'item-header' ? seconds = .015 : seconds = .007;

      children.forEach(child => { // iterate through .vertical-part(s) and style b element
        if (child.classList) {
          item.parentNode.classList.contains('active') ? delay = count * seconds + activeDelay : delay = count * seconds;
          child.firstElementChild.style.transitionDelay = `${delay}s`; // b element
          count++;
        }
      })
    })
  },
}

let intervalF = setInterval(slider.nextSlide, interval);
slider.init();


// -----------------
