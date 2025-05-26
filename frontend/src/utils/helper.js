export const cleanData = (payload) => {
  if (payload === null || payload === undefined || payload === '') {
    return undefined;
  }

  if (payload instanceof Date) {
    return payload;
  }

  if (Array.isArray(payload)) {
    const cleanedArray = payload
      .map(item => cleanData(item))
      .filter(
        item =>
          item !== undefined &&
          !(typeof item === 'object' && item !== null && Object.keys(item).length === 0)
      );

    return cleanedArray.length > 0 ? cleanedArray : undefined;
  }

  if (typeof payload === 'object') {
    const cleanedObj = {};

    for (const [key, value] of Object.entries(payload)) {
      const cleanedValue = cleanData(value);
      if (cleanedValue !== undefined) {
        cleanedObj[key] = cleanedValue;
      }
    }

    return Object.keys(cleanedObj).length > 0 ? cleanedObj : undefined;
  }

  return payload;
};
