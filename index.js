const copyButton = document.getElementById("copy-button");
const modalEmail = document.getElementById("modal-email");
const copyDone = document.getElementById("copy-done");
const contactButton = document.getElementById("contact-button");
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modal-content");

copyButton.addEventListener("click", copyEmailToClipboard);
contactButton.addEventListener("click", () => modal.style.display = "flex");
modal.addEventListener("click", () => modal.style.display = "none");
modalContent.addEventListener("click", (event) => event.stopPropagation());

function copyEmailToClipboard() {
    navigator.clipboard.writeText(modalEmail.innerText);
    copyDone.classList.remove("copy-done-animation");
    void copyDone.offsetWidth;
    copyDone.classList.add("copy-done-animation");
}
