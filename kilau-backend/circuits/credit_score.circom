pragma circom 2.0.0;
include "../node_modules/circomlib/circuits/comparators.circom"; // Pastikan path include file ini

template CreditScoreVerification() {
    signal input userScore; 
    signal input minimumScore; 
    signal output isEligible;

    component greaterEq = GreaterEqThan(252);

    greaterEq.in[0] <== userScore;
    greaterEq.in[1] <== minimumScore;

    isEligible <== greaterEq.out;
    greaterEq.out === 1; 
}

component main {public [minimumScore]} = CreditScoreVerification();