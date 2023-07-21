// Variables
let siteName = document.getElementById("siteName");
let siteUrl = document.getElementById("siteUrl");
let submitBtn = document.getElementById("submit-btn");
let visitBtn = document.getElementById("visitBtn");
let deleteBtn = document.getElementById("deleteBtn");
let modalOne = document.getElementById("modalOne");
////////////////////////////////////////////////////////////////////
submitBtn.addEventListener("click", function () {
  addSite();
});

let sitesList;
if (localStorage.site != null) {
  sitesList = JSON.parse(localStorage.site);
} else {
  sitesList = [];
}
////////////////////////////////////////////////////////////////////

function addSite() {
  if (nameRegex() && urlRegex()) {
    if (isSiteInList(siteName.value, siteUrl.value)) {
      Swal.fire({
        title: "<i>Error</i>",
        html: "this site has been added before",
        confirmButtonText: "OK",
      });
      return;
    }
    let site = {
      siteName: capitalize(siteName.value),
      siteUrl: siteUrl.value,
    };
    sitesList.push(site);
    localStorage.setItem("site", JSON.stringify(sitesList));
    displaySite();
    clearInputs();
  } else {
    Swal.fire({
      title:
        "<h3>Site Name or Url is not valid, Please follow the rules below :</h3>",
      html: "<p>--Site name must contain at least 3 characters</p> <p>--Site URL must be a valid one</p>",
      confirmButtonText: "OK",
    });
  }
}
////////////////////////////////////////////////////////////////////
function isSiteInList(siteName, siteUrl) {
  for (let i = 0; i < sitesList.length; i++) {
    if (
      capitalize(sitesList[i].siteName) === capitalize(siteName) &&
      sitesList[i].siteUrl === siteUrl
    ) {
      return true;
    }
  }
  return false;
}
// validation
function nameRegex() {
  const regex = /^[A-Za-z0-9]{2,}$/;
  return regex.test(siteName.value);
}
function urlRegex() {
  const regex =
    /^(https?:\/\/)?([a-z0-9-]+\.)*[a-z0-9-]+(\.[a-z]{2,})(:\d{1,5})?(\/[^\s]*)?$/i;
  return regex.test(siteUrl.value);
}
////////////////////////////////////////////////////////////////////

function displaySite() {
  let trow = "";
  for (let i = 0; i < sitesList.length; i++) {
    trow += `
        <tr>
            <td>${i + 1}</td>
            <td>${sitesList[i].siteName}</td>
            <td>
            <a href="${sitesList[i].siteUrl}" target="_blank">
                <button class="btn" id="visitBtn">
                <i class="icon-visit me-2"></i>Visit
                </button></a
            >
            </td>
            <td>
            <button class="btn btn-danger" id="deleteBtn" onclick="deleteSite(${i})">
                <i class="icon-delete me-2"></i>delete
            </button>
            </td>
      </tr>
        `;
  }
  let tableBody = (document.querySelector("tbody").innerHTML = trow);
}
////////////////////////////////////////////////////////////////////

// Clear Inputs
function clearInputs() {
  siteName.value = "";
  siteUrl.value = "";
}
// delete Bookmark
function deleteSite(i) {
  sitesList.splice(i, 1);
  localStorage.setItem("site", JSON.stringify(sitesList));
  displaySite();
}
////////////////////////////////////////////////////////////////////
// capitalize Function
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
// Dispaly data At start
window.onload = displaySite();
