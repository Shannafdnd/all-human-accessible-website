const current_member_id = 0;

fetch("../assets/placeholder.json").then((res) => {res.json().then((members) => {
    console.log(members);
    const current_member = members[current_member_id];
    document.getElementById("family-name").innerText = current_member.lastName;
    if (current_member.picture) {
        document.querySelector("#current-user-profile img").src = current_member.picture;
        document.querySelector("#current-user-profile img").alt = current_member.firstName;
    } else {
        document.querySelector("#current-user-profile img").src = "../assets/profile-user-svgrepo-com.svg"
        document.querySelector("#current-user-profile img").alt = "default profile picture";
    }

    const member_template = document.getElementById("member-template");
    const members_list = document.getElementById("members");
    members.forEach((member, i) => {
        if (i != current_member_id) {
            const clone = member_template.content.cloneNode(true);

            if (member.picture) {
                clone.querySelector(".member-profile-picture").src = member.picture;
                clone.querySelector(".member-profile-picture").alt = member.firstName;
            } else {
                clone.querySelector(".member-profile-picture").src = "../assets/profile-user-svgrepo-com.svg"
                clone.querySelector(".member-profile-picture").alt = "default profile picture";
            }

            clone.querySelector(".member-name").innerText = `${member.firstName} ${member.lastName}`
            clone.querySelector(".member-view").href = `./lid?lid=${i}`;

            members_list.appendChild(clone);
        }
    });

})});