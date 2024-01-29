const copyButton = document.getElementById("copy-button");
const modalEmail = document.getElementById("modal-email");
const copyDone = document.getElementById("copy-done");
const contactButton = document.getElementById("contact-button");
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modal-content");
const navigationCheck = document.getElementById("navigation-check");
const navigation = document.getElementById("navigation");
const scrollDown = document.getElementById("scroll-down-button");
const capabilitiesHeading = document.getElementById("capabilities-heading");
const reviews = document.getElementById("reviews");

copyButton.addEventListener("click", copyEmailToClipboard);
contactButton.addEventListener("click", () => modal.style.display = "flex");
modal.addEventListener("click", () => modal.style.display = "none");
modalContent.addEventListener("click", (event) => event.stopPropagation());
navigationCheck.addEventListener("click", () => navigation.classList.toggle("navigation-open"));
scrollDown.addEventListener("click", () => capabilitiesHeading.scrollIntoView({
    "behavior": "smooth",
}));

function copyEmailToClipboard() {
    navigator.clipboard.writeText(modalEmail.innerText);
    copyDone.classList.remove("copy-done-animation");
    void copyDone.offsetWidth;
    copyDone.classList.add("copy-done-animation");
}

function insertReviews() {
    fetch("reviews/reviews.html")
        .then(response => response.text())
        .then(text => reviews.innerHTML = text);
}

insertReviews();
