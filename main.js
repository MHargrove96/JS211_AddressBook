/*Use the API: https://randomuser.me/api/ to fetch a user now   ■

    Fetch a new user multiple times and store them in an array  ■

    Then list out all the users in your address book array by name and picture  ■

    Figure out how to fetch multiple users in one fetch request ■

    Fetch multiple users on window load ■

    Add a button to each user that when clicked displays the rest of their information like DOB, address and so forth ■
        // Add another button to hide the information ■

// ABSOLUTELY THE LAST THING YOU SHOULD DO:
//     Once you have the functionality working, feel free to style and structure your address 
//     book with CSS and HTML
    */

let contentContainer = document.getElementById("userContainer");
let ul = document.createElement("ul");
let modalBox = document.createElement("div");

contentContainer.appendChild(ul);

ul.style.listStyle = "none";
ul.style.display = "flex";
ul.style.flexWrap = "wrap";
ul.style.gap = "15px";
ul.style.justifyContent = "center";

const fetchMyAddressBook = () => {
  fetch("https://randomuser.me/api/?results=25")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Something went wrong.");
      }
      console.log(response);
      return response.json();
    })
    .then((data) => {
      console.log(data.results);
      let usersList = data.results;
      usersList.map((user) => {
        // console.log(user);
        let img = document.createElement("img");
        let li = document.createElement("li");
        let p = document.createElement("p");
        let moreInfo = document.createElement("button");

        li.classList.add("user_Container");

        img.src = user.picture.large;
        img.alt = `${user.name.first} ${user.name.last}`;
        p.innerHTML = `${user.name.title} ${user.name.first} ${user.name.last}`;
        moreInfo.innerText = "More Info";
        moreInfo.style.margin = "auto";
        moreInfo.style.display = "block";

        moreInfo.addEventListener("click", function () {
          console.log("clicked", user.name.first);
          document.body.appendChild(modalBox);
          modalBox.classList.add("modal-box");
          let modalWindow = document.createElement("div");
          let modalHeader = document.createElement("div");
          let modalBody = document.createElement("div");
          let closeBtn = document.createElement("span");
          closeBtn.innerHTML = "&times";
          let modalTitle = document.createElement("h2"); //inside header
          let modalUl = document.createElement("ul"); // inside body

          let personArr = [
            `cell: ${user.cell}`,
            `age: ${user.dob.age}`,
            `Gender: ${user.gender}`,
            `State: ${user.location.state}`,
          ];
          console.log(personArr);

          modalWindow.classList.add("modal-window");
          modalBox.appendChild(modalWindow);

          modalHeader.classList.add("modal-header");
          modalWindow.appendChild(modalHeader);

          modalBody.classList.add("modal-body");
          modalWindow.appendChild(modalBody);

          closeBtn.classList.add("close-btn");
          modalHeader.appendChild(closeBtn);

          modalTitle.innerText = `${user.name.title} ${user.name.first} ${user.name.last}`;
          modalHeader.appendChild(modalTitle);

          modalBody.appendChild(modalUl);

          personArr.map((value) => {
            let modalLi = document.createElement("li");
            modalLi.innerText = value;
            modalUl.appendChild(modalLi);
          });

          // for (const [key, value] of Object.entries(user)) {
          //   console.log(`${key}: ${value}`);
          // }    // Ask how to use this to get all items onto the dom

          closeBtn.addEventListener("click", function () {
            console.log("im in the close button function");
            modalBox.remove();
            modalWindow.remove();
          });
        });

        li.appendChild(p);
        li.appendChild(img);
        li.appendChild(moreInfo);
        ul.appendChild(li);

        return user;
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

document.getElementById("body").addEventListener("load", fetchMyAddressBook());

// console.log(fetchMyAddressBook);
