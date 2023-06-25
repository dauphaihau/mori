import { useEffect, useState } from 'react';
import { Transition } from '@headlessui/react';

import { Text, Box, Col, Row, NextImage, Button, Icons } from 'core/components';
import { useChannel } from 'lib/ably';
import { useOnOutsideClick } from 'core/hooks';

export default function ChatBox() {
  let inputBox = null;
  let messageEnd = null;

  const [messageText, setMessageText] = useState<string>('');
  const [receivedMessages, setReceivedMessages] = useState([]);
  const messageTextIsEmpty = messageText.trim().length === 0;

  const [channel, ably] = useChannel('coffin', (message) => {
    const history = receivedMessages.slice(-199);
    setReceivedMessages([...history, message]);
  });

  const sendChatMessage = (messageText) => {
    // channel.publish({name: 'customer1', data: messageText});
    // @ts-ignore
    channel.publish({ name: 'customer11', data: messageText });
    setMessageText('');
    inputBox.focus();
  }

  const handleFormSubmission = (event) => {
    event.preventDefault();
    sendChatMessage(messageText);
  }

  const handleKeyPress = (event) => {
    if (event.charCode !== 13 || messageTextIsEmpty) {
      return;
    }
    sendChatMessage(messageText);
    event.preventDefault();
  }

  const messages = receivedMessages.map((message, index) => {
    // @ts-ignore
    const author = message.connectionId === ably.connection.id ? 'me' : 'other';

    if (author === 'me') {
      return (
        <Box
          classes='chat-box__customer'
          key={index}
          data-author={author}
        >{message.data}</Box>
      )
    }
    return (
      <Row
        key={index}
        align='end'
        classes='chat-box__bot'
      >
        <NextImage
          width={24}
          height={24}
          // className='bot__img'
          imgClassName='rounded-full '
          src='/images/bot.png'
          alt='bot'
        />
        <Box classes='chat-box__botMessage other'>
          {message.data}
        </Box>
      </Row>
    )
    // return <span key={index} data-author={author}>{message.data}</span>;
  });

  useEffect(() => {
    messageEnd?.scrollIntoView({ behaviour: 'smooth' });
  });

  const [openChatBox, setOpenChatBox] = useState(false)
  const innerRef = useOnOutsideClick(() => {
    setOpenChatBox(!openChatBox)
  });

  const Header = () => (
    <Row
      justify='between'
      align='center'
      classes='chat-box__header'
    >
      <Row>
        <Box classes='chat-box__bot'>
          <NextImage
            width={40}
            height={40}
            className='chat-box__avatarBot'
            src='/images/bot.png'
            alt='profile'
          />
          <span className='chat-box__statusIcon'>
            <span className='dynamic-dot'/>
            <span className='static-dot'/>
          </span>

          {/*<Text i classes='fa-solid animate-ping fa-circle bot__statusIcon '/>*/}
          {/*<span className='absolute inline-flex rounded-full h-2 w-2 bg-green-500 bottom-[2px] right-0 text-green-500'></span>*/}
        </Box>


        <Box>
          <Text h4 weight='bold' classes='leading-3 pt-2'>Bot</Text>
          <Text classes='text-[0.8rem] text-primary-gray '>Online</Text>
        </Box>
      </Row>
      <Text
        i
        classes='fa-solid fa-x btn-icon text-base pl-[0.6rem]'
        onClick={() => setOpenChatBox(false)}
      />
    </Row>
  )

  const Body = () => {
    return (
      <Col classes='chat-box__body'>
        {/*<Text classes='text-sx text-[#8a8d91] mx-auto my-3'>Mon 10, 2022, 1:10 PM</Text>*/}
        {/*<Box*/}
        {/*  classes='w-max ml-auto break-all mt-2 mb-1 px-[12px] py-[8px] rounded-br-md bg-[#606060] rounded-2xl text-white text-left '>*/}
        {/*  seriously?*/}
        {/*</Box>*/}
        {/*<Box*/}
        {/*  classes='w-max ml-auto break-all mb-1 px-[12px] py-[8px] rounded-tr-md bg-[#606060] rounded-2xl text-white text-left '>*/}
        {/*  ....*/}
        {/*</Box>*/}
        <Row align='center' classes='chat-box__bot'>
          <NextImage
            width={26}
            height={26}
            className='block rounded-full '
            imgClassName='rounded-full '
            src='/images/bot.png'
            alt='profile'
          />
          <Box classes='chat-box__botMessage other'>
            How may I help you today?
          </Box>
        </Row>
        {messages}
        <Box ref={(element) => messageEnd = element}></Box>
      </Col>
    )
  }

  return (
    <>
      <Box classes='chat-box'>
        {
          !openChatBox &&
          <Box classes='chat-box__disabled' onClick={() => setOpenChatBox(true)}>
            {/*<Icons.chat className='h-12 w-10 text-white text-xl'/>*/}
            <NextImage
              height={37}
              width={38}
              src="/images/fb-messenger-icon.png" alt=""
            />

          </Box>
        }

        <Transition
          appear
          show={openChatBox}
          enter='ease-out duration-100'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <Box ref={innerRef} classes='chat-box__enabled'>
            <Header/>
            <Body/>

            {/* Footer ( if split footer to comp -> occur bug input */}
            <Row align='center' classes='chat-box__footer' gap={4}>
              <Text i classes='fa-solid fa-image text-primary-gray text-xl'/>
              {/*<Icons.photo className='text-primary-gray h-6 w-6'/>*/}
              {/*<Button light classes='p-0 focus:outline-none w-8 mr-1 cursor-not-allowed'>*/}
              {/*  /!*<Text i classes='fa-solid fa-image text-primary-gray text-xl'/>*!/*/}
              {/*  <Icons.photo className='text-primary-gray h-10 w-8'/>*/}
              {/*</Button>*/}
              <Text i classes='fa-solid fa-paperclip fa-image text-primary-gray text-xl'/>
              {/*<Icons.paperClip className='text-primary-gray h-6 w-6'/>*/}
              {/*<Button light classes='p-0 focus:outline-none w-8 mr-1 cursor-not-allowed'>*/}
              {/*  /!*<Text i classes='fa-solid fa-paperclip fa-image text-primary-gray text-xl'/>*!/*/}
              {/*  <Icons.paperClip className='text-primary-gray h-10 w-8'/>*/}
              {/*</Button>*/}

              {/*Form submit*/}
              <Box
                form
                onSubmit={handleFormSubmission}
                classes='chat-box__form border-gray'
              >
                {/*px-2'>*/}
                <Box classes='w-full'>
                  {/*<input onChange={event => han}/>*/}
                  <input
                    ref={(element) => {
                      inputBox = element;
                    }}
                    value={messageText}
                    onChange={e => setMessageText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    type='text'
                    id='message'
                    className='chat-box__input'
                    placeholder='Type your message....'
                  />
                </Box>
                <Row>
                  <button
                    type='submit'
                    className='chat-box__submitBtn'
                  >
                    <Text i classes='fa-solid fa-paper-plane text-primary-gray text-xl'/>
                    {/*<Text i classes='fa-solid fa-face-smile text-primary-gray text-xl'/>*/}
                  </button>
                </Row>
              </Box>
            </Row>
          </Box>
        </Transition>
      </Box>
    </>
  );
}
