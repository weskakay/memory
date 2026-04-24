// Theme card icons served as PNG exports from public/assets/<theme>/.

/** Returns an <img> tag for a PNG icon in the public assets folder. */
function imgIcon(theme: string, name: string): string {
  return `<img src="${import.meta.env.BASE_URL}assets/${theme}/${name}.png" alt="" class="card__icon" draggable="false" />`;
}

/** Builds an icon map with keys `<prefix>-1` through `<prefix>-<count>` mapped to imgIcon(theme, key). */
function buildIconMap(theme: string, prefix: string, count: number): Record<string, string> {
  const map: Record<string, string> = {};
  for (let i = 1; i <= count; i++) {
    map[`${prefix}-${i}`] = imgIcon(theme, `${prefix}-${i}`);
  }
  return map;
}

export const CODING_ICONS:     Record<string, string> = buildIconMap('coding', 'c', 18);
export const GAMING_ICONS:     Record<string, string> = buildIconMap('gaming', 'game', 18);
export const DAPROJECTS_ICONS: Record<string, string> = buildIconMap('daprojects', 'da', 18);
export const FOODS_ICONS:      Record<string, string> = buildIconMap('foods', 'food', 18);
