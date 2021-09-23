export function formatDate(text) {
  var year = text.slice(0, 4);
  var month = text.slice(5, 7);
  var day = text.slice(8, 10);
  return month + '/' + day + '/' + year;
}

export function formatDateYMD(text) {
  var year = text.slice(0, 4);
  var month = text.slice(5, 7);
  var day = text.slice(8, 10);
  return year + '-' + month + '-' + day;
}
