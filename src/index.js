import connectToState from "./connectToState";
import CCF from "./CreditCardInput";
import LiteCCF from "./LiteCreditCardInput";
import CV from "./CardView";
import CCFB from "./CreditCardForm";

export const CreditCardInput = connectToState(CCF);
export const LiteCreditCardInput = connectToState(LiteCCF);
export const CreditCardForm = connectToState(CCFB);
export const CardView = CV;
