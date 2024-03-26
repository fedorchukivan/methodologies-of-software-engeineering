type CheckingResult = number[] | false;

const resultIndex = {
  color: 0,
  row: 1,
  column: 2
}

export default function checkForWinner(fieldState: number[][]) {
  return checkForVerticalLineOf5(fieldState) ||
         checkForHorizontalLineOf5(fieldState) ||
         checkForMainDiagonalLineOf5(fieldState) ||
         checkForSideDiagonalLineOf5(fieldState) ||
         [0];
}

function checkForVerticalLineOf5(fieldState: number[][]): CheckingResult {
  let res: CheckingResult = false;

  fieldState[0].some((_, column_n) => {
    res = checkForLineOf5(fieldState.map(row => row[column_n]));

    if (res !== false) {
      res[resultIndex.row] += 1;
      res[resultIndex.column] = column_n+1;
    }

    return res !== false;
  });

  return res;
}

function checkForHorizontalLineOf5(fieldState: number[][]): CheckingResult {
  let res: CheckingResult = false;
  
  fieldState.some((row, row_n) => {
    res = checkForLineOf5(row);

    if (res !== false) {
      res.splice(resultIndex.row, 0, row_n+1);
      res[resultIndex.column] += 1;
    }

    return res !== false;
  });

  return res;
}

function checkForMainDiagonalLineOf5(fieldState: number[][]): CheckingResult {
  let res: CheckingResult = false;

  fieldState.some((_, row_n) => {
    if (row_n < 4) {
      return false;
    }

    const diagonal: number[] = [];
    fieldState[0].every((_, column_n) => {
      if ((row_n - column_n) < 0) {
        return false;
      }
      diagonal.push(fieldState[row_n - column_n][column_n]);
      return true;
    });

    res = checkForLineOf5(diagonal);

    if (res !== false) {
      res.splice(resultIndex.row, 0, 0);
      res[resultIndex.row] = (row_n - res[resultIndex.column]) + 1;
      res[resultIndex.column] += 1;
    }

    return res !== false;
  });

  if (res !== false) {
    return res;
  }
  
  fieldState[0].some((_, column_n) => {
    if (column_n + 4 >= fieldState[0].length) {
      return true;
    }

    const diagonal: number[] = [];
    fieldState.every((_, row_index) => {
      const row_n = fieldState.length-1 - row_index;
      if ((column_n + row_index) >= fieldState[0].length) {
        return false;
      }
      diagonal.push(fieldState[row_n][column_n + row_index]);
      return true;
    });

    res = checkForLineOf5(diagonal);

    if (res !== false) {
      res[resultIndex.column] = column_n + res[resultIndex.row] + 1;
      res[resultIndex.row] = fieldState.length - res[resultIndex.row];
    }

    return res !== false;
  });
  
  return res;
}

function checkForSideDiagonalLineOf5(fieldState: number[][]): CheckingResult {
  let res: CheckingResult = false;

  fieldState.some((_, row_n) => {
    if (row_n + 4 >= fieldState.length) {
      return true;
    }

    const diagonal: number[] = [];
    fieldState[0].every((_, column_n) => {
      if ((row_n + column_n) >= fieldState.length) {
        return false;
      }
      diagonal.push(fieldState[row_n + column_n][column_n]);
      return true;
    });

    res = checkForLineOf5(diagonal);

    if (res !== false) {
      res.splice(resultIndex.row, 0, 0);
      res[resultIndex.column] += 1;
      res[resultIndex.row] = row_n + res[resultIndex.column];
    }

    return res !== false;
  });

  if (res !== false) {
    return res;
  }
  
  fieldState[0].some((_, column_n) => {
    if (column_n + 4 >= fieldState[0].length) {
      return true;
    }

    const diagonal: number[] = [];
    fieldState.every((_, row_n) => {
      if ((row_n + column_n) >= fieldState[0].length) {
        return false;
      }
      diagonal.push(fieldState[row_n][column_n + row_n]);
      return true;
    });

    res = checkForLineOf5(diagonal);

    if (res !== false) {
      res[resultIndex.row] += 1;
      res[resultIndex.column] = column_n + res[resultIndex.row];
    }

    return res !== false;
  });
  
  return res;
}

function checkForLineOf5(colors: number[]): CheckingResult {
  let res: CheckingResult = false;
  const counter = {
    color: 0,
    times: 0,
    start: 0
  }

  colors.some((color, index) => {
    if (color === counter.color) {
      counter.times++;
    } else if (counter.color !== 0 && counter.times === 5) {
      res = [counter.color, counter.start];
    } else {
      counter.color = color;
      counter.times = 1;
      counter.start = index;
    }

    if (
        index === colors.length-1 &&
        counter.color !== 0 &&
        counter.times === 5
       ) {
      res = [counter.color, counter.start];
    }

    return res !== false;
  });

  return res;
}
