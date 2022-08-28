export const testFn = (fn: Function) => `test: ${fn.name}() `;

export const testClass = <T extends { name: string }>(classTested: T) =>
  `test: ${classTested.name} `;

export const shouldReturnFor = (returnStr: string, forStr: string) =>
  `should return ${returnStr} for ${forStr}`;
