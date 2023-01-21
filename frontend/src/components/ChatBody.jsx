import React from 'react';

const ChatBody = ({ messages, lastMessageRef }) => {

  return (
        <div className='message-container'>
          {messages.map(message =>
            message.userName === localStorage.getItem('userName') ? (
              <div className="content-sender">
                <div className='inner-content-sender' ref={lastMessageRef}>
                  <p className='sender-text'>{message.text}</p>
                  <span className='sender-time'>{
                    new Date(message.createdAt).getHours() + ':' +
                    new Date(message.createdAt).getMinutes()
                  }</span>
                </div>
              </div>
            ) : (
                <div className='content-recipient' key={message.id}>
                  <div className='inner-content-recipient'>
                    <div className='recipient-name-text'>
                      <span className='recipient-name'>{message.userName}</span>
                      <p className='recipient-text'>{message.text}</p>
                    </div>
                    <span className='recipient-time'>{
                      new Date(message.createdAt).getHours() + ':' +
                      new Date(message.createdAt).getMinutes()
                    }</span>
                  </div>
                </div>
            )
          )}
      </div>   
  );
};

export default ChatBody;