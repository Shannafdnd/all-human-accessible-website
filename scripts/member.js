const URLParams = new URLSearchParams(window.location.search);

fetch("../../assets/placeholder.json").then((res) => {res.json().then((members) => {
    const now = new Date();

    const member = members[URLParams.get("lid") ?? 0];
    console.log(member);
    document.getElementById("name").innerText = `${member.firstName} ${member.lastName}`;
    const notification_template = document.getElementById("notification-template");
    const tbody = document.getElementById("notifications");
    member.currentlyBorrowed.forEach(book => {
        const [day, month, year] = book.turnInDate.split("-");
        const daysLeft = Math.ceil((new Date(year, month - 1, day).getTime() - now.getTime()) / 8.64e7);
        if (daysLeft < 7) {
            console.log(daysLeft);
            notification = notification_template.content.cloneNode(true);
            notification.querySelector(".notification-book").innerText = book.name;
            notification.querySelector(".notification-book").addEventListener("mousemove", (e) => {
                const book_img = document.getElementById("book-img");
                book_img.src = `../../assets/books/${book.image}`;
                book_img.style.left = `${e.clientX+2}px`;
                book_img.style.top= `${e.clientY+2}px`;
                book_img.hidden = false;
            })
            notification.querySelector(".notification-book").addEventListener("mouseleave", () => {
                document.getElementById("book-img").hidden = true;
            })
            notification.querySelector(".notification-date").innerText = book.turnInDate;
            
            if (daysLeft < 0) {
                notification.firstElementChild.classList.add("late");
                notification.querySelector(".notification-days").innerText = -daysLeft;
                notification.querySelector(".notification-type").innerText = "Te laat";
                notification.querySelector(".notification-extend").innerText = "";
                const fine = -daysLeft * 0.5;
                notification.querySelector(".notification-fine").innerText = `€${fine.toFixed(2)}`;
            } else {
                notification.querySelector(".notification-days").innerText = daysLeft;
                notification.querySelector(".notification-type").innerText = "Binnenkort inleveren";
                notification.querySelector(".notification-fine").innerText = "";
            }
            tbody.appendChild(notification);
        }
    });
})});