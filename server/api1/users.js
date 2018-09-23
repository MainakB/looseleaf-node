import User from '../models/User';

export const getUsers = ({ findCriteria, cbSuccess }) => {
  return User.find(findCriteria).sort({ lastLoggedIn: -1 }).exec(
    (err, users) => {
      const usersOut = [];

      users.forEach((user) => {
        const userInfo = {
          _id: user._id,
          createdAt: user.createdAt,
          lastLoggedIn: user.lastLoggedIn,
          username: user.username,
          displayName: user.displayName,
          email: user.email,
          picture: user.picture,
          bio: user.bio,
          website: user.website,
          interests: user.interests,
          communities: user.communities,
          projects: user.projects,
          followers: user.followers,
          following: user.following
        };
        usersOut.push(userInfo);
      });
      cbSuccess(usersOut);
    }
  );
};

// Determine if username exists
export const usernameExists = ({ username, cbSuccess, cbErr }) => {
  return User.findOne({ username }, (err, user) => {
    if (err) {
      return cbErr(err);
    }
    if (user) {
      console.log('user already exists....');
      return cbSuccess(true);
    }
    return cbSuccess(false);
  });
};
