async function sendMessage() {
    const input = document.getElementById('userInput').value;
    const responseDiv = document.getElementById('response');
    if (!input) {
        responseDiv.innerHTML = 'Please enter a message.';
        return;
    }
    responseDiv.innerHTML = 'Loading...';
    try {
        const response = await fetch(
            'https://openrouter.ai/api/v1/chat/completions',
            {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer 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',
                    'HTTP-Referer': 'https://www.sitename.com',
                    'X-Title': 'SiteName',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: 'deepseek/deepseek-r1:free',
                    messages: [{ role: 'user', content: input }],
            }),
            }
        );
        const data = await response.json();
        console.log(data);
        const markdownText =
            data.choices?.[0]?.message?.content || 'No response received.';
        responseDiv.innerHTML = marked.parse(markdownText);
    } catch (error) {
        responseDiv.innerHTML = 'Error: ' + error.message;
    }
}



