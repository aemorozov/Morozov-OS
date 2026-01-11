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
  const fullMessage =
    `You are personal web assistant on the website about Aleksei Morozov. Your task is get information about him for HR. It is his resume:
Frontend Developer (React, Next.js, Node.js, REST API)
Bucharest, Romania (open to relocate)
+40 (799) 29-30-14 | mr.aemorozov@gmail.com
aemorozov.com (we are on that website now) | https://www.linkedin.com/in/aemorozov/ | https://github.com/aemorozov
Languages: English, Russian
Skills
• Frontend: React, Next.js, JavaScript (ES6+), HTML5, CSS3, Performance optimization
• Backend: Node.js, REST API, API integration
• Platforms: CS-Cart, WordPress, GitHub, Figma
Brief
I am Frontend developer with 6+ years of commercial experience. Specialized in React, Next.js, API. Building high-load admin panels, e-commerce platforms, and custom web applications.
Professional Experience
Senior Frontend Developer
Akula OPT | June 2023 – November 2025 | https://akulaopt.ru / https://akulaplay.ru
• Senior Frontend development for e-commerce projects with 500 active users per day (CS-Cart-based).
• Reduced Largest Contentful Paint (LCP) from 3s to 1.1s, Lighthouse Performance 90+.
• Took ownership of frontend performance. Collaborated with backend developers and designers.
Fullstack Developer
Freelance | March 2021 – June 2023
• Delivered 20+ commercial projects for small and mid-sized businesses.
• Developed web applications, landing pages, admin panels, and internal tools.
• Sahak.am — SEO-optimized website, made from scratch, reached Top 1–3 Google positions for key queries.
• BZ tool — custom firmware decoding tool for BMW vehicles.
• Kalitniki.com — React-based commercial website with custom UI.
QA Specialist
Yandex | March 2020 – March 2021 | Part-time |  https://yandex.ru
• Gained strong understanding of software quality, testing processes, and bug tracking.
• Improved collaboration with developers through clear technical bug reports.
Electronics Diagnostics and Repair Specialist
Lenina19 | September 2015 – March 2022
•	Full cycle of diagnostics and repair for electronics, including laptops and peripheral equipment.

And here is a message from user: ` + message;

  try {
    const response = await fetch(
      "https://chat-gpt-6-official-bot.vercel.app/api/chat",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullMessage }),
      }
    );

    const data = await response.json();
    appendMessage(data.reply || "No reply from server", false);
  } catch (err) {
    console.error(err);
    appendMessage("Server error", false);
  }
}
