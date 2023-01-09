import Ably from "ably/promises";
import { useEffect } from 'react'

const ably = new Ably.Realtime.Promise({ authUrl: '/api/chat/createTokenRequest' });

export function useChannel(channelName, callbackOnMessage) {
  const channel: Ably.Types.RealtimeChannelPromise = ably.channels.get(channelName);

  // channel.history(function (err, resultPage) {
  //   const messages = resultPage.items,
  //     messagesData = [];
  //   // console.log('messages-data', messagesData)
  //   // console.log('messages-data', messages)
  //
  //   if (err) {
  //     console.log('✗ History failed: ' + err.message, 'red');
  //   } else {
  //     console.log('✓ ' + messages.length + ' messages in history', 'green');
  //     for (let i = 0; i < messages.length; i++) {
  //       messagesData.push('"' + messages[i].data + '"');
  //     }
  //     if (messages.length) {
  //       console.log('✓ Message history: ' + messagesData.join(', '), 'green');
  //     }
  //   }
  // });

  const onMount = () => {
    channel.subscribe(msg => {
      callbackOnMessage(msg);
    });
  }

  const onUnmount = () => {
    channel.unsubscribe();
  }

  useEffect(() => {
    onMount();
    return () => {
      onUnmount();
    };
  });

  return [channel, ably];
}
