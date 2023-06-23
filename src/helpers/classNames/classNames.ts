type Mods = Record<string, boolean | string>;

export function classNames(
  classes: string,
  mods: Mods,
  additional: string[]
): string {
  return [
    classes,
    ...additional,
    ...Object.entries(mods)
      .filter(([key, value]) => {
        Boolean(value);
      })
      .map(([key]) => {
        return key;
      }),
  ].join(' ');
}
