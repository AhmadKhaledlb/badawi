import Svg, { Circle, Path, Rect } from 'react-native-svg';

export type TabName = 'home' | 'explore' | 'progress' | 'profile';

type TabBarIconProps = {
  name: TabName;
  color: string;
  focused: boolean;
  size?: number;
};

// ── TAB BAR ICONS ────────────────────────────────────────────────────────
//
// Restrained, implementation-safe placeholders in the same simple-geometry
// spirit as the approved design's own tab icons (a rounded square, a ring, a
// bar-chart mark, a head-and-shoulders ring) — not a separate icon-design
// pass. One consistent shape per tab, filled when focused and outlined when
// not, rather than swapping shape/fill per screen the way the static mock
// (inconsistently) does.
export function TabBarIcon({ name, color, focused, size = 20 }: TabBarIconProps) {
  const strokeWidth = 1.8;

  switch (name) {
    case 'home':
      return (
        <Svg width={size} height={size} viewBox="0 0 20 20">
          <Rect
            x={3}
            y={3}
            width={14}
            height={14}
            rx={5}
            fill={focused ? color : 'none'}
            stroke={color}
            strokeWidth={strokeWidth}
          />
        </Svg>
      );
    case 'explore':
      return (
        <Svg width={size} height={size} viewBox="0 0 20 20">
          <Circle
            cx={10}
            cy={10}
            r={7}
            fill={focused ? color : 'none'}
            stroke={color}
            strokeWidth={strokeWidth}
          />
          {!focused && <Circle cx={10} cy={10} r={1.6} fill={color} />}
        </Svg>
      );
    case 'progress':
      return (
        <Svg width={size} height={size} viewBox="0 0 20 20">
          <Rect x={3} y={11} width={3.4} height={6} rx={1} fill={color} opacity={focused ? 1 : 0.55} />
          <Rect x={8.3} y={7} width={3.4} height={10} rx={1} fill={color} opacity={focused ? 1 : 0.55} />
          <Rect x={13.6} y={3} width={3.4} height={14} rx={1} fill={color} opacity={focused ? 1 : 0.55} />
        </Svg>
      );
    case 'profile':
      return (
        <Svg width={size} height={size} viewBox="0 0 20 20">
          <Circle
            cx={10}
            cy={10}
            r={7}
            fill={focused ? color : 'none'}
            stroke={color}
            strokeWidth={strokeWidth}
          />
          <Circle cx={10} cy={7.6} r={2.1} fill={focused ? 'none' : color} stroke={focused ? color : 'none'} />
          <Path
            d="M5.4 14.6C6.4 12.4 8 11.3 10 11.3C12 11.3 13.6 12.4 14.6 14.6"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            fill="none"
          />
        </Svg>
      );
  }
}
