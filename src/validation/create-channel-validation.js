import isEmpty from "./is-empty";

function createChannelValidation(data) {
  let errors = {};
  const channels = JSON.parse(localStorage.channels);

  data.channelName = !isEmpty(data.channelName) ? data.channelName : "";

  if (isEmpty(data.channelName)) {
    errors.channelName = "Channel Name field is required.";
  }

  if (
    !isEmpty(
      channels.filter(channel => channel.channelName === data.channelName)
    )
  ) {
    errors.channelName = "Same Channel Name already exists.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}

export default createChannelValidation;
