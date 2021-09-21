// import React from 'react'

// Removes search terms from the "filters" section
export async function removeSearchTerm(
  filterState,
  keyWord,
  value,
  setRemoving,
  setInitialFilters,
  set_match_tag_value_with_column_key
) {
  let filteredKeyWords = filterState[keyWord][0]
    .split(',')
    .filter(word => word != value)
    .join(',');

  filterState[keyWord] = filteredKeyWords.length ? [filteredKeyWords] : null;

  setInitialFilters(filterState);
  await set_match_tag_value_with_column_key(
    filterState[keyWord]
      ? {
          value: filterState[keyWord][0],
          key: keyWord,
        }
      : {
          value: '',
          key: keyWord,
        }
  );

  setRemoving(true);
  if (filterState[keyWord]) {
    document.getElementById(`search_${keyWord}`).click();
  } else {
    document.getElementById(`reset_${keyWord}`).click();
  }
  return;
}

//*   Creates a "Tag" in "filters" section for each keyword searched
export function processFilters(filters) {
  let res = [];
  for (const i in filters) {
    if (filters[i]) {
      res.push({
        key: i,
        value: filters[i],
      });
    }
  }

  return res;
}

//* Matches Table data to the keywords that are in the "Filters" section
//* Returns "true" for an object if the keyword is in this particular ibject
//* Boolean value is required to be returned as per ANT's documentation
export function matchMultipleKeyWords(data, keywords) {
  let keywordsArr = keywords.split(',');
  let mutatedData = data.toString().toLowerCase();

  for (let keyword of keywordsArr) {
    if (mutatedData.includes(keyword.toLowerCase())) {
      return true;
    }
  }

  return false;
}
