export const starterMixes: Array<{
  id: string;
  name: string;
  description: string;
  sounds: Record<string, number>;
}> = [
  {
    id: 'focus',
    name: 'Deep focus',
    description: 'Brown noise with a little rain',
    sounds: { 'brown-noise': 0.5, 'light-rain': 0.35 },
  },
  {
    id: 'cafe',
    name: 'Rainy café',
    description: 'A café on a rainy afternoon',
    sounds: { cafe: 0.75, 'rain-on-window': 0.15 },
  },
  {
    id: 'evening',
    name: 'Slow evening',
    description: 'Waves and a crackling fire',
    sounds: { waves: 0.5, campfire: 0.35 },
  },
];

export function findStarterMix(
  sounds: Record<string, { isSelected: boolean; volume: number }>,
) {
  const selected = Object.entries(sounds).filter(
    ([, sound]) => sound.isSelected,
  );
  return starterMixes.find(mix => {
    const levels: Record<string, number> = mix.sounds;
    return (
      selected.length === Object.keys(levels).length &&
      selected.every(
        ([id, sound]) =>
          id in levels && Math.abs(sound.volume - levels[id]) < 0.001,
      )
    );
  });
}
