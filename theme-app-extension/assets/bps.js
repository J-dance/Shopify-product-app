// get all nav items 
let renderedSectionElements  = document.getElementsByClassName("nav-item");
// for each nav Item, get the id of element e.g. 'care-and-use'
let renderedSections = [...renderedSectionElements].map((section) => section.id);
// --------------------------

function setAllSectionsInvisible () {
  // set main sections to invisible
  const mainSectionsElements = document.querySelectorAll(".main-section");
  mainSectionsElements.forEach((element) => {
    element.classList.add("invisible");
  });

  // set all nav items to not active
  const navItemElements = document.querySelectorAll(".nav-item");
  navItemElements.forEach((element) => {
    element.classList.remove("active");
  });
};

function setActiveSection (section) {
  // remove invisible class for active nav section
  document.getElementById(`${section}-section`)
    .classList.remove("invisible");
  
  // add active state to button
  document.getElementById(section)
    .classList.add("active");
}

function setSection (event) {
  const section = event.target.value;
  // set all sections invisible first
  setAllSectionsInvisible();
  // then set active section
  setActiveSection(section);
}

function setBlockLayout () {
  const outerElement = document.getElementById("story-container");
  const mainElements = document.querySelectorAll(".main-section");
  const liElements = document.querySelectorAll(".listItem");
  const ulElement = document.querySelector("ul");
  const width = outerElement.offsetWidth;
  console.log(width);

  if (width >= 420 ) {
    // wide area
    console.log('apply nav as col');
    outerElement.classList.add("wide-layout");
    // set width of main-section to 70%
    mainElements.forEach((element) => {
      element.style.width = "70%";
      element.style.padding = "10px 0px 0px 0px";
    });
  } else {
    // thin area
    console.log('apply nav as row');
    outerElement.classList.add("thin-layout");
    // set width of main-section to 100%
    mainElements.forEach((element) => {
      element.style.width = "100%";
      // element.style.height = "70%"; fix height?
      element.style.padding = "10px 20px 0px 20px";
    });
    // set ul -> display flex
    ulElement.style.display = "flex"
    // set li -> display: inline
    liElements.forEach((element) => {
      element.style.display = "inline"
    })
  }
}

// run function on start
function initializeBlock () {
  setBlockLayout();
  setAllSectionsInvisible();
  setActiveSection(renderedSectionElements[0].id)

  // add functions to nav-items
  renderedSections.forEach((section) => {
    const element = document.getElementById(section);
    element.addEventListener("click", setSection);
  });
}

initializeBlock();
