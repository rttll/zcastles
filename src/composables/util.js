function delimiters(input) {
  return input.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

function currency(input) {
  return '$' + delimiters(input);
}

function decimal(input) {
  const m = 1000000;
  const k = 1000;
  if (input >= m) {
    let dec = Math.round((input / m) * 100) / 100;
    return dec + 'M';
  } else if (input >= k) {
    let dec = Math.round((input / k) * 100) / 100;
    return dec + 'K';
  } else {
    return input;
  }
}

export { delimiters, currency, decimal };
