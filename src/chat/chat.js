const messagesContainer = document.getElementById("messages");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");

sendButton.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
});

function appendMessage(content, isUser = false) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message");
    messageDiv.classList.add(isUser ? "user-message" : "bot-message");
    messageDiv.innerHTML = content;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight; // Прокрутка вниз
}

async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    // Добавляем сообщение пользователя
    appendMessage(message, true);
    userInput.value = "";

    // Отправляем запрос на сервер
    try {
        const response = await fetch("https://chat-bot-v1-lyart.vercel.app/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message }),
        });
        const data = await response.json();
        appendMessage(data.reply);
    } catch (error) {
        console.error("Ошибка:", error);
        appendMessage("Произошла ошибка. Попробуйте позже.");
    }
}

// Scrolling

// const scrollContainer = document.getElementById("chat-container");

// scrollContainer.addEventListener("scroll", () => {
//     const messages = scrollContainer.querySelectorAll(".message");

//     const scrollTop = scrollContainer.scrollTop;
//     const scrollHeight = scrollContainer.scrollHeight;
//     const clientHeight = scrollContainer.clientHeight;

//     messages.forEach((message, index) => {
//         const messageTop = message.offsetTop;
//         const messageHeight = message.offsetHeight;

//         // Calculate visibility based on scroll position
//         const distance = scrollTop - (messageTop - clientHeight);
//         const opacity = 1 - Math.min(Math.abs(distance / clientHeight), 1);
//         message.style.opacity = opacity;
//     });
// });
