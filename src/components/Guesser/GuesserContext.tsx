import { type PropsWithChildren, createContext, useReducer, useMemo } from "react";
import { getRandomValue } from "../../lib/randomizer";

type State = {
  randomValue: string;
  state: 'idle' | 'success' | 'failure'
}

const initialState: State = {
  randomValue: getRandomValue(),
  state: 'idle'
}

type Actions =
| {type: 'guessValue', payload: string}
| {type: 'randomizeValue'}

type GuessContext = State & {
  guessValue: (val: string) => void;
  randomizeValue: () => void
}
export const GuesserContext = createContext<GuessContext>({
  randomValue: '',
  state: 'idle',
  guessValue: () => {
   
  },
  randomizeValue: () => {
   
  }
});



const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case 'randomizeValue':
      return {
        ...state,
        randomValue: getRandomValue(),
        state: 'idle'
      }
    case 'guessValue': 
      return {
        ...state,
        state: action.payload === state.randomValue ? 'success' : 'failure'
      }
    default:
      break;
  }
  return state;
}

export const GuesserContextProvider = ({
  children
}: PropsWithChildren) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => ({
    ...state,
    guessValue(val: string) {
      dispatch({type: 'guessValue', payload: val})
    },
    randomizeValue() {
      dispatch({type: 'randomizeValue'})
    }
  }), [state]);

  return <GuesserContext.Provider value={value}>
    {children}
  </GuesserContext.Provider>
}