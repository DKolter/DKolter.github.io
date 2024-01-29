import json
from dateutil import parser
from bs4 import BeautifulSoup


def read_json(path):
    with open(path, "r") as f:
        return json.load(f)["buying_reviews"]["reviews"]


def make_review_html(username, country, flag, stars, time, comment):
    stars = "<img class='review-star-img' src='star.svg'>" * stars

    return f"""
        <div class='review'>
            <a class='review-name' href='https://www.fiverr.com/{username}'>{username}</a>
            <div class='review-origin'>
                <img class='review-country-img'
                    src='https://flagsapi.com/{flag}/flat/32.png'>
                <p class='review-country-text'>{country}</p>
            </div>
            <div class='review-feedback'>
                <div>{stars}</div>
                <p class='review-time'>{format_time(time)}</p>
            </div>
            <p class='review-text'>{comment}</p>
        </div>
    """


def format_time(time):
    time = parser.parse(time)
    return time.strftime("%B %d, %Y")


def write_html(html):
    index = open("index.html", "r").read()

    soup = BeautifulSoup(index, "html.parser")
    target = soup.find(id="reviews")
    target.clear()
    target.append(BeautifulSoup(html, "html.parser"))

    with open("index.html", "w") as f:
        f.write(str(soup))


reviews = read_json("reviews/reviews.json")
html = ""

for review in reviews:
    html += make_review_html(
        review["username"],
        review["reviewer_country"],
        review["reviewer_country_code"],
        int(review["value"]),
        review["created_at"],
        review["comment"],
    )

write_html(html)
