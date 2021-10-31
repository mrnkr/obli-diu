import md5 from 'md5';

const gravatar = (user) =>
  `https://www.gravatar.com/avatar/${md5(user?.email ?? '')}`;

export default gravatar;
