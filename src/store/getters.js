const getters = {
  theme: state => state.app.theme,
  color: state => state.app.color,
  token: state => state.user.token,
  userId: state => state.user.userId,
  userName: state => state.user.userName,
  taskTable: state => state.change.taskTable,
  pageResult: state => state.change.taskTablePageResult,
  addRouters: state => state.permission.addRouters,
  processing: state => state.change.processing,
  taskValue: state => state.change.taskValue
};
export default getters;
