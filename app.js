let boxes = document.querySelectorAll(".box"); // selects each box
let reset_btn = document.querySelector("#reset-btn");// selects the reset button
let popup_window = document.querySelector(".popup-window");
let popup_content = document.querySelector("#popup-content");
let turnX = true; // First turn is X

const win_pattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

//loggging X/O
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("button was clicked");
        if (turnX === true) {
            box.innerText = ("X");
            turnX = false;
            //turn of X
        }
        else {
            box.innerText = ("O");
            turnX = true;
            //turn of O
        };
        box.disabled = true;
        checkWinner();
    });
});

//reset button
reset_btn.addEventListener("click", () => {
    boxes.forEach((box) => {
        box.innerText = "";
        box.disabled = false;
        popup_window.style.display = "none";
    });
    turnX = true;
});

function disableButtons() {
    boxes.forEach((box) => {
        box.disabled = true;
    });
}

function close_popup() {
    popup_window.addEventListener("click", () => {
        popup_window.style.display = "none";
    });
}

function winner(player) {
    popup_window.style.display = "flex";
    popup_content.innerText = `Winner player ${player}`;
    disableButtons();
    close_popup();
}

//winner checking
function checkWinner() {
    for (let pattern of win_pattern) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;
        if (pos1 != "" && pos2 != "" && pos3 != "") {// if all 3 boxes are empty they are equal and this will return false winner
            if (pos1 === pos2 && pos2 === pos3 && pos1 === pos3) {
                winner(pos1);
            }
        }
    }
    noWinner();
}
function noWinner() {
    isFull = true;
    boxes.forEach((val) => {
        if (val.innerText == "") {
            isFull = false;
        }
    });
    if (isFull) {
        popup_window.style.display = "flex";
        popup_content.innerText = "No Winner!!!";
        disableButtons();
        close_popup();
    }
}