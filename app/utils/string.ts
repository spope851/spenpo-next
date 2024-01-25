const formatDomain = (input: string): string =>
  input
    ?.replace(/['".,\/#!$%\^&\*;:{}=\@?+_`~()]/g, '')
    .replaceAll(' ', '')
    .toLocaleLowerCase()

export { formatDomain }
