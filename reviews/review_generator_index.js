const reviews = document.getElementsByClassName("reviews")[0];
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

function fetchReviews() {
    fetch("https://fiverr-api.vercel.app/coding_owl/reviews?limit=10", { mode: "cors" })
        .then(response => response.json())
        .then(json => {
            json.forEach(review => {
                const username = review["username"];
                const country = review["reviewer_country"];
                const flag = review["reviewer_country_code"];
                const stars = review["value"];
                const time = review["created_at"];
                const reviewText = review["comment"];

                const html = makeReviewHtml(
                    username,
                    country,
                    flag,
                    stars,
                    time,
                    reviewText
                );

                reviews.innerHTML += html;
            })
        })
}

function makeReviewHtml(username, country, flag, stars, time, comment) {
    stars = "<img class='review-star-img' src='star.svg'>".repeat(stars);

    return `<div class="review">
            <a class="review-name" href="https://www.fiverr.com/${username}">${username}</a>
            <div class="review-origin">
                <img class="review-country-img"
                    src="https://flagsapi.com/${flag}/flat/32.png">

                <p class="review-country-text">${country}</p>
            </div>
            <div class="review-feedback">
                <div>${stars}</div>
                <p class="review-time">${formatTime(time)}</p>
            </div>
            <p class="review-text">${comment}</p>
        </div>`;
}

function formatTime(time) {
    const currentDate = new Date();
    const inputDate = new Date(time);

    const timeDifference = currentDate - inputDate;
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years > 0) {
        return `${years} ${years === 1 ? 'year' : 'years'} ago`;
    } else if (months > 0) {
        return `${months} ${months === 1 ? 'month' : 'months'} ago`;
    } else if (weeks > 0) {
        return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
    } else if (days > 0) {
        return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    } else if (hours > 0) {
        return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else if (minutes > 0) {
        return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    } else {
        return 'Just now';
    }
}

function copyEmailToClipboard() {
    navigator.clipboard.writeText(modalEmail.innerText);
    copyDone.classList.remove("copy-done-animation");
    void copyDone.offsetWidth;
    copyDone.classList.add("copy-done-animation");
}

fetchReviews();
