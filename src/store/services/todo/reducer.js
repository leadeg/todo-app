import types from './action-types';
import { filterTypeMap, templateModeMap } from '../../../helper/constants';

const initialState = {
  allTodos: [],
  shownTodos: [],
  filter: filterTypeMap.ALL,
  formMode: templateModeMap.LIST,
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_ALL_TODOS:
      return {
        ...state,
        loading: true,
      };
    case types.SUCCESS_ALL_TODOS:
      return {
        ...state,
        allTodos: action.todos,
        loading: false,
      };
    case types.SUCCESS_TOGGLE_TODO: {
      const foundId = state.allTodos.findIndex((todo) => todo.id === action.id);
      if (foundId > -1) {
        const copyTodos = [...state.allTodos];
        const changingTodo = copyTodos[foundId];
        copyTodos[foundId] = { ...changingTodo, done: !changingTodo.done };
        return {
          ...state,
          allTodos: copyTodos,
        };
      } else {
        return state;
      }
    }
    case types.SUCCESS_ADD_TODO:
      return {
        ...state,
        allTodos: [...state.allTodos, action.todo],
        formMode: templateModeMap.LIST,
      };
    case types.SUCCESS_DELETE_TODO:
      return {
        ...state,
        allTodos: state.allTodos.filter((todo) => todo.id !== action.id),
      };
    case types.SUCCESS_UPDATE_TODO: {
      const newTodos = state.allTodos.map((todo) =>
        todo.id === action.todo.id ? action.todo : todo,
      );
      return {
        ...state,
        allTodos: newTodos,
        formMode: templateModeMap.LIST,
      };
    }
    case types.SET_FILTER:
      return {
        ...state,
        filter: action.filter,
      };
    case types.SET_FORM_MODE:
      return {
        ...state,
        formMode: action.formMode,
      };
    default:
      return state;
  }
};
