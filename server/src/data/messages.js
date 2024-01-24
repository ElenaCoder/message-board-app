const messages = {
    general: [
        { text: 'Hello, how is everyone?' },
        { text: "I'm doing well, thank you!" },
        { text: 'Any plans for the weekend?' },
        { text: "Let's catch up for coffee next week." },
    ],
    'tech talk': [
        { text: 'Any updates on the project?' },
        { text: "Not yet, we're still waiting for feedback." },
        { text: 'I think we should focus on feature A.' },
        { text: "Agreed, let's discuss it in the meeting." },
    ],
    'project collaboration': [
        { text: 'Welcome to the new members!' },
        { text: 'Thank you! Excited to be part of the team.' },
        { text: 'Has anyone worked with React before?' },
        { text: 'Yes, I have experience with React.' },
    ],
};

function getMessagesForChannel(channel) {
    return messages[channel];
}

function addMessageToChannel(channel, text) {
    messages[channel].push({ text });
}

module.exports = { getMessagesForChannel, addMessageToChannel };
