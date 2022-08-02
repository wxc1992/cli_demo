const userInit = {
  menuTitle: '安全总览'
};

// 定义修改规则
export const menuReducer = (state = {...userInit}, {type, payload}) => {
  switch (type) {
    case "ADDMENUTITLE":
      return {...state, ...payload};
    default:
      return state;
  }
};
