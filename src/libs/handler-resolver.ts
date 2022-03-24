export const handlerPath = (context: string):any => {
  return `${context.split(process.cwd())[1].substring(1).replace(/\\/g, '/')}`
};
