import * as io from "socket.io-client";

const socket = io.connect("http://localhost:8080");

const message = document.getElementById("message") as HTMLInputElement;
const user = document.getElementById("user") as HTMLInputElement;
const btn = document.getElementById("send");
const output = document.getElementById("output") as HTMLElement;
const feedback = document.getElementById("feedback") as HTMLElement;

if (btn) {
  btn.addEventListener("click", function () {
    socket.emit("chat", {
      message: message.value,
      user: user.value,
    });
    message.value = "";
  });
}

if (message) {
  message.addEventListener("keypress", function () {
    socket.emit("typing", user.value);
  });
}

socket.on("chat", function (data: { user: string; message: string }) {
  feedback.innerHTML = "";
  output.innerHTML +=
    "<p><strong>" + data.user + ": </strong>" + data.message + "</p>";
});

socket.on("typing", function (data: string) {
  feedback.innerHTML = "<p><em>" + data + " is typing a message...</em></p>";
});
