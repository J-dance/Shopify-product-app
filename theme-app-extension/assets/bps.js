let renderedSectionElements  = document.getElementsByClassName("nav-item");
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

function setTimeline(nonActiveLinks, nonActiveBullets, activeLinks, activeBullets) {
  // set non active links
  nonActiveLinks.forEach((sectionLinks) => {
    sectionLinks.forEach((link) => link.style.borderRight = "2px dashed #AFA9A9");
  });
  nonActiveBullets.forEach((bullet) => bullet.style.background = "#AFA9A9");
  // set active links
  activeLinks.forEach((sectionLinks) => {
    sectionLinks.forEach((link) => link.style.borderRight = "2px solid black");
  });
  activeBullets.forEach((bullet) => bullet.style.background = "black");
}

function setActiveSection (section) {
  // remove invisible class for active nav section
  document.getElementById(`${section}-section`)
    .classList.remove("invisible");
  
  // add active state to button
  document.getElementById(section)
    .classList.add("active");

  // set all dots and dashes to black for relevant section
  const designBullet = document.getElementById('designBullet');
  const materialsLinks = document.querySelectorAll('.materialsLink');
  const materialsBullet = document.getElementById('materialsBullet');
  const manufacturingLinks = document.querySelectorAll('.manufacturingLink');
  const manufacturingBullet = document.getElementById('manufacturingBullet');
  const logisticsLinks = document.querySelectorAll('.logisticsLink');
  const logisticsBullet = document.getElementById('logisticsBullet');
  const careAndUseLinks = document.querySelectorAll('.careAndUseLink');
  const careAndUseBullet = document.getElementById('careAndUseBullet');
  const endOfLifeLinks = document.querySelectorAll('.endOfLifeLink');
  const endOfLifeBullet = document.getElementById('endOfLifeBullet');
  let nonActiveLinks = [];
  let nonActiveBullets = [];
  let activeBullets = [];
  let activeLinks = [];

  switch(section) {
    case 'design':
      nonActiveLinks = [materialsLinks, manufacturingLinks, logisticsLinks, careAndUseLinks, endOfLifeLinks];
      nonActiveBullets = [materialsBullet, manufacturingBullet, logisticsBullet, careAndUseBullet, endOfLifeBullet];
      activeBullets = [designBullet];
      setTimeline(nonActiveLinks, nonActiveBullets, activeLinks, activeBullets);
      break
    case 'materials':
      nonActiveLinks = [manufacturingLinks, logisticsLinks, careAndUseLinks, endOfLifeLinks];
      nonActiveBullets = [manufacturingBullet, logisticsBullet, careAndUseBullet, endOfLifeBullet];
      activeBullets = [designBullet, materialsBullet];
      activeLinks = [materialsLinks];
      setTimeline(nonActiveLinks, nonActiveBullets, activeLinks, activeBullets);
      break
    case 'manufacturing':
      nonActiveLinks = [logisticsLinks, careAndUseLinks, endOfLifeLinks];
      nonActiveBullets = [logisticsBullet, careAndUseBullet, endOfLifeBullet];
      activeBullets = [designBullet, materialsBullet, manufacturingBullet];
      activeLinks = [materialsLinks, manufacturingLinks];
      setTimeline(nonActiveLinks, nonActiveBullets, activeLinks, activeBullets);
      break
    case 'logistics':
      nonActiveLinks = [careAndUseLinks, endOfLifeLinks];
      nonActiveBullets = [careAndUseBullet, endOfLifeBullet];
      activeBullets = [designBullet, materialsBullet, manufacturingBullet, logisticsBullet];
      activeLinks = [materialsLinks, manufacturingLinks, logisticsLinks];
      setTimeline(nonActiveLinks, nonActiveBullets, activeLinks, activeBullets);
      break
    case 'care-and-use':
      nonActiveLinks = [endOfLifeLinks];
      nonActiveBullets = [endOfLifeBullet];
      activeBullets = [designBullet, materialsBullet, manufacturingBullet, logisticsBullet, careAndUseBullet];
      activeLinks = [materialsLinks, manufacturingLinks, logisticsLinks, careAndUseLinks];
      setTimeline(nonActiveLinks, nonActiveBullets, activeLinks, activeBullets);
      break
    case 'end-of-life':
      activeBullets = [designBullet, materialsBullet, manufacturingBullet, logisticsBullet, careAndUseBullet, endOfLifeBullet];
      activeLinks = [materialsLinks, manufacturingLinks, logisticsLinks, careAndUseLinks, endOfLifeLinks];
      setTimeline(nonActiveLinks, nonActiveBullets, activeLinks, activeBullets);
      break
    default:
      break
  }
}

function setSection (event) {
  const section = this.value;
  // set all sections invisible first
  setAllSectionsInvisible();
  // then set active section
  setActiveSection(section);
}

function setBlockLayout () {
  const outerElement = document.getElementById("content-container");
  const mainElements = document.querySelectorAll(".main-section");
  const liElements = document.querySelectorAll(".listItem");
  const timeLineElement = document.querySelectorAll(".bulletContainer");
  const ulElement = document.getElementById("listContainer");
  const footerElement = document.querySelector("footer");
  const wideIcons = document.querySelectorAll(".wideIconLayout");
  const thinIcons = document.querySelectorAll(".thinIconLayout");
  const buttonTextArray = document.querySelectorAll(".buttonContentWideLayout");
  const width = outerElement.offsetWidth;

  if (width >= 430 ) {
    // wide area
    outerElement.classList.remove("thin-layout");
    outerElement.classList.add("wide-layout");
    timeLineElement.forEach((ele) => ele.style.display = "grid");
    // set width of main-section to 70%
    mainElements.forEach((element) => {
      element.style.width = "70%";
      element.style.padding = "10px 0px 0px 0px";
    });
    // set ul -> display block
    ulElement.style.display = "block";
    // set li -> display: inline
    liElements.forEach((element) => {
      element.style.display = "flex";
      element.style.alignItems = 'center';
      element.style.padding = "0px 3.5px";
      element.style.margin = "0px 2px";
    });
    wideIcons.forEach((iconEle) => iconEle.style.display = "block");
    thinIcons.forEach((icon) => icon.style.display = "none");
    buttonTextArray.forEach((button) => button.style.display = "block");
  } else {
    // thin area
    outerElement.classList.remove("wide-layout");
    outerElement.classList.add("thin-layout");
    timeLineElement.forEach((ele) => ele.style.display = "none");
    // set width of main-section to 100%
    mainElements.forEach((element) => {
      element.style.width = "100%";
      element.style.minHeight = "330px";
      element.style.padding = "10px 20px 0px 20px";
    });
    footerElement.style.margin = "10px 20px 0px 20px";
    // set ul -> display flex
    ulElement.style.display = "inline-flex";
    // set li -> display: inline
    liElements.forEach((element) => {
      element.style.display = "inline";
    });
    wideIcons.forEach((iconEle) => iconEle.style.display = "none");
    thinIcons.forEach((icon) => icon.style.display = "block");
    buttonTextArray.forEach((button) => button.style.display = "none");
  }
}

// run function on start
function initializeBlock () {
  setBlockLayout();
  setActiveSection(renderedSectionElements[0].id)
  // add functions to nav-items
  renderedSections.forEach((section) => {
    const element = document.getElementById(section);
    element.addEventListener("click", setSection);
  });
}

window.addEventListener('resize', function(event){
  setBlockLayout();
});

initializeBlock();
