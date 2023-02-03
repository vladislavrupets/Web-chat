import React from 'react';

const ChatBody = (props) => {

  // function setDate(date) {
  //   let dateTemp = date.split(' ');
  //     return (dateTemp[1]);
  //   }

  return (
        <div className='message-container'>
          {props.messages?.map(message =>
            message.user._id === props.userId ? (
              <div className="content-sender" key={message.messageId || message._id}>
                <div className='inner-content-sender' ref={props.lastMessageRef}>
                  <p className='sender-text'>{message.messageText}</p>
                  <span className='sender-time'>{
                    message.sendDate
                  }</span>
                </div>
              </div>
            ) : (
                <div className='content-recipient' key={message.messageId || message._id}>
                  <div className='inner-content-recipient'>
                    <div className='recipient-name-text'>
                      <span className='recipient-name'>{message.user.login}</span>
                      <p className='recipient-text'>{message.messageText}</p>
                    </div>
                    <span className='recipient-time'>{
                      message.sendDate
                    }</span>
                  </div>
                </div>
            )
          )}
      </div>   
  );
};

export default ChatBody;