const {{reducer_name}} = (state, action) => {
  switch (action.type) {
    case 'CREATE_{{reducer_name_caps}}':
      return {
        id: action.id,
        text: action.text
      };
    default:
      return state;
  }
};

const {{reducer_name}}s = (state = [], action) => {
  switch (action.type) {
    case 'CREATE_{{reducer_name_caps}}':
      return [
        ...state,
        {{reducer_name}}(null, action)
      ];
    case 'DELETE_{{reducer_name_caps}}':
      const i = state.indexOf(action.id);
      const pre = state.slice(0, i);
      const post = state.slice(i + 1);
      return [
        ...pre,
        ...post
      ];
    default:
      return state;
  }
};

export default {{reducer_name}}s;

