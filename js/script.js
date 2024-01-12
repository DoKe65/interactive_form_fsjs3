/**
 * Global Variables
 */
const form = document.querySelector("form");
const userName = form.querySelector("#name");
const titleSelect = form.querySelector("#title"); 
const otherTitle = form.querySelector("#other-job-role");
const designSelect = form.querySelector("#design");
const colorSelect = form.querySelector("#color");
const activities = form.querySelector("#activities");

/**
 * Statut of the form on load:
 * - Set focus on name field 
 * - Hide input field for "other job roles" 
 * - Disable the color select element
 */
userName.focus();
otherTitle.style.display = "none";
colorSelect.setAttribute("disabled", "true");

/**
 * Control the display of the other job roles text field 
 * depending on the user selection of the job role
 */
titleSelect.addEventListener("change", e => {
  const selectedOption = e.target.value;
  selectedOption !== "other" ? otherTitle.style.display = "none" : otherTitle.style.display = "";
});

/**
 * Enable the color select element with options according to the selection of the design
 */
designSelect.addEventListener("change", e => {
  const selectedDesign = e.target.value;
  const colors = colorSelect.querySelectorAll("option[data-theme]");
  colorSelect.disabled = false;
  colors.forEach(color => {
    const currentColor = color.getAttribute("data-theme");
    if (selectedDesign === currentColor) {
      color.hidden = false;
      color.disabled = false;
    } else {
      color.hidden = true;
      color.disabled = true;
    }
  });
});

/**
 * Add price for chosen activities and disable conflicting activities
 */

activities.addEventListener("change", e => {
  const currCb = e.target;
  const currAct = currCb.name;
  const currTime = currCb.getAttribute("data-day-and-time");
  const currPrice = parseInt(currCb.getAttribute("data-cost"));
  const allCbs = activities.querySelectorAll("input[type='checkbox']");
  const totalCost = activities.querySelector("#activities-cost");
  let currTotal = parseInt(totalCost.textContent.replace(/Total: \$(\d*)/, "$1"));
 
  allCbs.forEach(cb => {  
    if (cb.name !== currAct) {
      const cbTime = cb.getAttribute("data-day-and-time");
      if(cbTime === currTime && currCb.checked) {    
        cb.parentElement.classList.add("disabled");
        cb.disabled = true;
      } else if (cbTime === currTime && !currCb.checked) {
        cb.parentElement.classList.remove("disabled");
        cb.disabled = false;
      }
    } else {
      currCb.checked ? currTotal+= currPrice : currTotal-= currPrice;
    }
  });
  totalCost.textContent = `Total: $${currTotal}`;
});