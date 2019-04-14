const getters = {
  theme: state => state.app.theme,
  color: state => state.app.color,
  token: state => state.user.token,
  userId: state => state.user.userId,
  userName: state => state.user.userName,
  addRouters: state => state.permission.addRouters
};
export default getters;
