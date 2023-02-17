export function beatifyString(str: string){
  if(str === 'None') return 'other';
  const fixedUnderscore = str.split('_').join(' ');
  return fixedUnderscore;
}