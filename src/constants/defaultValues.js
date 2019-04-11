export const defaultUsersArr = [
  {
    id: "u1",
    userName: "Pavlov",
    fullName: "Guy Pavlov",
    contacts: [
      {
        userid: "u2"
      },
      {
        userid: "u3"
      },
      {
        userid: "u4"
      }
    ]
  },
  {
    id: "u2",
    userName: "Kovalchuk",
    fullName: "Yuri Kovalchuk",
    contacts: [
      {
        userid: "u3"
      },
      {
        userid: "u4"
      }
    ]
  },
  {
    id: "u3",
    userName: "Nikolay",
    fullName: "Nikolay Kovalchuk",
    contacts: [
      {
        userid: "u4"
      }
    ]
  },
  {
    id: "u4",
    userName: "Alexey",
    fullName: "Alexey Konev",
    contacts: []
  },
  {
    id: "u5",
    userName: "Yanukovich",
    fullName: "Nikolay Yanukovich",
    contacts: [
      {
        userid: "u1"
      },
      {
        userid: "u3"
      },
      {
        userid: "u4"
      }
    ]
  }
];

export const defaultChannelsArr = [
  {
    id: "c1",
    channelName: "Frontend",
    members: [
      {
        userid: "u1"
      },
      {
        userid: "u2"
      },
      {
        userid: "u3"
      }
    ]
  },
  {
    id: "c2",
    channelName: "Backend",
    members: [
      {
        userid: "u4"
      },
      {
        userid: "u5"
      },
      {
        userid: "u1"
      }
    ]
  }
];

export const defaultChatHistoryArr = [
  {
    id: "ch1",
    from: "u1",
    to: "c1",
    timestamp: "1554932463815",
    message: "Hi, congratulations."
  },
  {
    id: "ch2",
    from: "u1",
    to: "u2",
    timestamp: "1554932782449",
    content: "Hi"
  }
];
