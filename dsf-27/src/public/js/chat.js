
// eslint-disable-next-line no-undef
const sockeClient = io();

const userNameDom = document.querySelector(".user");
const userName = userNameDom.textContent;

const messageClient = document.querySelector("#chat-form");
const inputmessage = document.querySelector("#message");
const userMessages = document.querySelector("#chat");

const siteConteiner = document.querySelector(".site-main");
const container = document.querySelector(".container");

const userList = ["dd", "gabrielaRossi"];

if (container.firstElementChild.classList.contains("chat-wrapper")) {

	siteConteiner.classList.add("site-main--modify");

}

// eslint-disable-next-line no-undef
Toastify({
	text: `Conectado al chat ${userName}`,
	duration: 5000,
	destination: "https://github.com/apvarun/toastify-js",
	newWindow: true,
	close: true,
	className: "toastify-client",
	gravity: "top",
	position: "center",
	stopOnFocus: true,
	onClick: function () { } // Callback after click
}).showToast();

if (!userList.includes(userName)) {
	userList.push(userName);
}

sockeClient.emit("newUser", userName);

sockeClient.on("userConnected", (user) => {
	// eslint-disable-next-line no-undef
	Toastify({
		text: `Soporte conectado ${user}`,
		duration: 5000,
		destination: "https://github.com/apvarun/toastify-js",
		newWindow: true,
		close: true,
		className: "toastify-support",
		gravity: "top",
		position: "center",
		stopOnFocus: true,

		onClick: function () { } // Callback after click
	}).showToast();
});

messageClient.onsubmit = (e) => {
	e.preventDefault();
	const infoMessage = {
		name: userName,
		message: inputmessage.value
	};

	sockeClient.emit("message", infoMessage);

};

sockeClient.on("chat", (messages) => {

	const chat = messages.map(e => {
		return `<li class="chat-message-wrapper ${e.name === userList[0] || e.name === userList[1] ? "chat-user-admin" : "chat-user-client"}"><h3 class="chat-user-name" id="name">${e.name}</h3><p class="chat-user-text"> ${e.message}</p></li>`;
	}
	).join(" ");
	userMessages.innerHTML = chat;

	userMessages.scrollTop = userMessages.scrollHeight;

});

