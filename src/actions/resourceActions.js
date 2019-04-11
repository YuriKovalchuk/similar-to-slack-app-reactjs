import { RESOURCE_LOADING, GET_RESOURCE } from "./types";

// Get resource
export const getResource = (user, roomId) => dispatch => {
  dispatch(setLoading());
  const users = JSON.parse(localStorage.users);
  const channels = JSON.parse(localStorage.channels);
  let chatHistory = JSON.parse(localStorage.chatHistory);
  const roomUser = users.filter(user => user.id === roomId);
  const roomChannel = channels.filter(channel => channel.id === roomId);
  //let room = roomUser.length ? roomUser[0] : roomChannel[0];
  const roomType = roomUser.length ? "private" : "channel";
  if (roomType === "channel") {
    chatHistory = chatHistory.filter(chat => chat.to === roomId);
    /* insert real name (userName) */
    chatHistory = chatHistory.map(chat => {
      const fromUser = users.filter(user => user.id === chat.from)[0];
      return {
        id: chat.id,
        from: chat.from,
        to: chat.to,
        timestamp: chat.timestamp,
        message: chat.message,
        fromName: fromUser.userName,
        toName: ""
      };
    });
  } else {
    chatHistory = chatHistory.filter(
      chat =>
        (chat.from === roomId && chat.to === user.id) ||
        (chat.to === roomId && chat.from === user.id)
    );
    /* insert real name (userName) */
    chatHistory = chatHistory.map(chat => {
      const fromUser = users.filter(user => user.id === chat.from)[0];
      return {
        id: chat.id,
        from: chat.from,
        to: chat.to,
        timestamp: chat.timestamp,
        message: chat.message,
        fromName: fromUser.userName,
        toName: user.Name
      };
    });
  }
  /* Sort by timestamp */
  chatHistory.sort(function(a, b) {
    return a.timestamp - b.timestamp;
  });
  console.log(chatHistory);
  let resource = {
    users: users,
    channels: channels,
    chatHistory: chatHistory
  };
  // Set resource
  dispatch(setResource(resource));
};

// Send message
export const sendMessage = message => dispatch => {
  let chatHistory = JSON.parse(localStorage.chatHistory);
  chatHistory.push(message);
  localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
};

// Add channel
export const addChannel = channelData => dispatch => {
  dispatch(setLoading());
  let channels = JSON.parse(localStorage.channels);
  channels.push(channelData);
  localStorage.setItem("channels", JSON.stringify(channels));
  let users = JSON.parse(localStorage.users);
  let chatHistory = JSON.parse(localStorage.chatHistory);
  let resource = {
    users: users,
    channels: channels,
    chatHistory: chatHistory
  };
  // Set resource
  dispatch(setResource(resource));
};

// Set loading
export const setLoading = () => {
  return {
    type: RESOURCE_LOADING,
    payload: null
  };
};

// Set resource
export const setResource = resource => {
  return {
    type: GET_RESOURCE,
    payload: resource
  };
};
