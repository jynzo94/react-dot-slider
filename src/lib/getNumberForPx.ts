function getNumForPx(str: string): number {
  const n = parseInt(str.substring(0, str.length - 2));

  if (isNaN(n)) {
    throw new Error();
  }
  return n;
}

export default getNumForPx;
