import { useReducer } from "react";
import "./index.css";

const initialState = {
  balance: 0,
  loan: 0,
  isActive: false,
};

const OPENING_BALANCE = 500;

function reducer(state, action) {
  if (!state.isActive && action.type !== "openAccount") return state;
  switch (action.type) {
    case "openAccount":
      return { ...state, isActive: true, balance: OPENING_BALANCE };
    case "deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
      };
    case "withdraw":
      return {
        ...state,
        balance:
          state.balance >= action.payload
            ? state.balance - action.payload
            : state.balance,
      };
    case "requestLoan":
      return {
        ...state,
        balance:
          state.loan === 0 ? state.balance + action.payload : state.balance,
        loan: state.loan === 0 ? state.loan + action.payload : state.loan,
      };
    case "payLoan":
      return {
        ...state,
        loan: state.balance >= state.loan ? 0 : state.loan,
        balance: state.balance - state.loan,
      };
    case "close":
      return { ...state, isActive: !(state.loan === 0 && state.balance === 0) };
    default:
      throw new Error("invalid arguments");
  }
}

export default function App() {
  const [{ balance, loan, isActive }, dispatch] = useReducer(
    reducer,
    initialState
  );
  return (
    <div className="App">
      <h1>useReducer Bank Account</h1>
      <p>Balance: {balance}</p>
      <p>Loan: {loan}</p>

      <p>
        <button
          onClick={() => {
            dispatch({ type: "openAccount" });
          }}
          disabled={isActive}
        >
          Open account
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "deposit", payload: 150 });
          }}
          disabled={!isActive}
        >
          Deposit 150
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "withdraw", payload: 50 });
          }}
          disabled={!isActive}
        >
          Withdraw 50
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "requestLoan", payload: 5000 });
          }}
          disabled={!isActive}
        >
          Request a loan of 5000
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "payLoan" });
          }}
          disabled={!isActive}
        >
          Pay loan
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "close" });
          }}
          disabled={!isActive}
        >
          Close account
        </button>
      </p>
    </div>
  );
}
