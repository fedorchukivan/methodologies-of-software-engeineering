import fs from "fs";
import checkForWinner from "./check-winner-renju";

const fieldSize = 19;

function stringifyCheckingResult(checkingResults: number[]) {
  return (
    checkingResults.length !== 1 ?
    `${checkingResults[0]}\n${checkingResults[1]} ${checkingResults[2]}` :
    `${checkingResults[0]}`
  ); 
}

export default function analyzeFieldStates(sourcePath: string, outputPath: string) {
  fs.readFile(sourcePath, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }

    const lines = data.split('\n');
    const fields_n = Number.parseInt(lines[0]);
    const results: string[] = [];

    for (let i = 0; i < fields_n; i++) {
      const start = fieldSize * i + 1;
      const field = lines.slice(start, start + fieldSize);
      const checkingResult = checkForWinner(
        field.map(
          line => line.split('').map(
            symbol => Number.parseInt(symbol)
          )
        )
      );
      results.push(stringifyCheckingResult(checkingResult));
    }

    fs.writeFile(
      outputPath,
      results.join('\n'),
      (err) => {
        if (err) {
          throw err;
        }
      }
    );
  });
}
