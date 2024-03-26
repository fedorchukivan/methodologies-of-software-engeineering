import analyzeFieldStates from "./analyze-renju-states";

analyzeFieldStates('./examples/tests/test-vertical.txt', './examples/results/test-vertical-result.txt');
analyzeFieldStates('./examples/tests/test-horizontal.txt', './examples/results/test-horizontal-result.txt');
analyzeFieldStates('./examples/tests/test-main-diagonal.txt', './examples/results/test-main-diagonal-result.txt');
analyzeFieldStates('./examples/tests/test-side-diagonal.txt', './examples/results/test-side-diagonal-result.txt');