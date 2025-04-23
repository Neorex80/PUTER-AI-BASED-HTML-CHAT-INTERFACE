document.addEventListener('DOMContentLoaded', () => {
    const modelSelect = document.getElementById('model-select');
    const messagesDiv = document.getElementById('messages');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const newChatBtn = document.getElementById('new-chat-btn');

    const models = [
        'gpt-4o-mini', 'gpt-4o', 'o1', 'o1-mini', 'o1-pro', 'o3', 'o3-mini',
        'o4-mini', 'gpt-4.1', 'gpt-4.1-mini', 'gpt-4.1-nano', 'gpt-4.5-preview',
        'claude-3-7-sonnet', 'claude-3-5-sonnet', 'deepseek-chat', 'deepseek-reasoner',
        'gemini-2.0-flash', 'gemini-1.5-flash', 'meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo',
        'meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo', 'meta-llama/Meta-Llama-3.1-405B-Instruct-Turbo',
        'mistral-large-latest', 'pixtral-large-latest', 'codestral-latest',
        'google/gemma-2-27b-it', 'grok-beta'
    ];

    // Populate the model dropdown
    models.forEach(model => {
        const option = document.createElement('option');
        option.value = model;
        option.textContent = model;
        modelSelect.appendChild(option);
    });

    function appendMessage(text, sender) {
        const msg = document.createElement('div');
        msg.className = sender;
        // Markdown parsing
        msg.innerHTML = (sender === 'user' ? '<strong>You:</strong> ' : '<strong>Claude:</strong> ') + window.marked.parse(text);
        messagesDiv.appendChild(msg);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
        saveChatHistory();
    }

    async function sendMessage() {
        const text = userInput.value.trim();
        if (!text) return;
        appendMessage(text, 'user');
        userInput.value = '';
        sendBtn.disabled = true;
        try {
            const model = modelSelect.value;
            const response = await puter.ai.chat(text, { model: model });
            let reply = response?.message?.content?.[0]?.text || response;
            appendMessage(reply, 'bot');
        } catch (e) {
            appendMessage('Error: ' + e.message, 'bot');
        }
        sendBtn.disabled = false;
    }

    function saveChatHistory() {
        const messages = Array.from(messagesDiv.children).map(msg => msg.innerHTML);
        localStorage.setItem('chatHistory', messages.join('\n'));
    }

    function loadChatHistory() {
        const history = localStorage.getItem('chatHistory');
        if (history) {
            history.split('\n').forEach(line => {
                const sender = line.includes('<strong>You:</strong>') ? 'user' : 'bot';
                const text = line.replace(/<strong>You:<\/strong> /, '').replace(/<strong>Claude:<\/strong> /, '');
                appendMessage(text, sender);
            });
        }
    }

    function clearChatHistory() {
        messagesDiv.innerHTML = '';
        localStorage.removeItem('chatHistory');
    }

    sendBtn.onclick = sendMessage;
    userInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') sendMessage();
    });

    newChatBtn.onclick = clearChatHistory;

    loadChatHistory();
});
userInput.setAttribute('autocomplete','off');
userInput.setAttribute('autocorrect','off');
userInput.setAttribute('autocapitalize','off');
userInput.setAttribute('spellcheck','false');
window.onload = () => { userInput.focus(); };