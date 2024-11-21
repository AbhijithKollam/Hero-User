import { useState } from 'react';
import './style.css';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';

const API_KEY = process.env.REACT_APP_API_KEY;
const systemMessage = {
  "role": "system", "content": "Explain things like you're talking to a software professional with 2 years of experience."
};

function Bot() {
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm your superhero! Ask me anything!",
      sentTime: "just now",
      sender: "ChatGPT"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // State to toggle chat window

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: "user"
    };

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);

    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message };
    });

    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        systemMessage,
        ...apiMessages
      ]
    };

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(apiRequestBody)
    }).then((data) => {
      if (data.status === 429 || data.status === 401) {
        // Delay the response for 2 seconds
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              choices: [{
                message: {
                  content: [
                    "I'm busy now...", "Can we talk later ?", "You can register a complaint in this page", "I'll check it and resolve soon...", "Be happy"
                  ]
                }
              }]
            });
          }, 1000); // 2-second delay
        });
      }
      return data.json();
    }).then((data) => {
      console.log(data, "data 2");

      if (data.choices[0].message.content.length > 0) {
        // Collect all the new messages first
        const newMessages = data.choices[0].message.content.map((item) => ({
          message: item,
          sender: "ChatGPT"
        }));

        // Use a counter to track when the last message is added
        let messageCounter = 0;

        // For each message, set a 2-second delay before updating the state
        newMessages.forEach((newMessage, index) => {
          setTimeout(() => {
            setMessages((prevMessages) => [...prevMessages, newMessage]);

            // Check if this is the last message and then turn off the typing indicator
            messageCounter++;
            if (messageCounter === newMessages.length) {
              setIsTyping(false); // Stop typing indicator after the last message
            }
          }, 3000 * (index + 1)); // Multiply index by 2000 for sequential delays
        });
      }
      else {
        setMessages([...chatMessages, {
          message: data.choices[0].message.content,
          sender: "ChatGPT"
        }]);
        setIsTyping(false);
      }

    });
  }

  const toggleChatWindow = () => {
    setIsOpen(prevState => !prevState); // Toggle visibility
  };

  return (
    <div>
      <div className="App">
        {/* Show only the icon initially */}
        {!isOpen && (
          <div onClick={toggleChatWindow}>
            <img className="chat-icon" src="https://storage.googleapis.com/a1aa/image/n8dsI02SzEYiOZC5rgdFiFdeYbMWrp7cisLxmApc1Ptowh5JA.jpg" alt="Chat Icon" style={{ width: '100px', cursor: 'pointer' }} />
          </div>
        )}

        {/* Chat window modal */}
        {isOpen && (
          <div className="chat-modal">
            <div style={{ position: "relative", height: "100%", width: "400px" }}>
              <MainContainer>
                <ChatContainer>
                  <MessageList
                    scrollBehavior="smooth"
                    typingIndicator={isTyping ? <TypingIndicator content="Hero is typing" /> : null}
                  >
                    {messages.map((message, i) => {
                      // Determine alignment based on sender
                      const isUserMessage = message.sender === 'user';
                      return (
                        <Message
                          key={i}
                          model={message}
                          className={isUserMessage ? 'message-right' : 'message-left'} // Add appropriate class based on sender
                        />
                      );
                    })}
                  </MessageList>
                  <MessageInput placeholder="Type message here" onSend={handleSend} />
                </ChatContainer>
              </MainContainer>
            </div>

            {/* Close button to hide the chat window */}
            <button className="close-btn" onClick={toggleChatWindow}><i class="fa-solid fa-xmark"></i></button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Bot;
