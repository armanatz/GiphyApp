import { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import Reanimated, {
  useSharedValue,
  withRepeat,
  withTiming,
  useAnimatedStyle,
  interpolate,
} from 'react-native-reanimated';

import type { PropsWithChildren } from 'react';
import type { LayoutRectangle, StyleProp, ViewStyle } from 'react-native';

const styles = StyleSheet.create({
  item: { backgroundColor: '#fff' },
  itemSize: { width: 100, height: 100 },
  background: {
    flexGrow: 1,
    overflow: 'hidden',
    backgroundColor: '#ccc',
  },
});

export default function SkeletonPlaceholder({ children }: PropsWithChildren) {
  const [layout, setLayout] = useState<LayoutRectangle | null>(null);
  const shared = useSharedValue(0);

  useEffect(() => {
    shared.value = withRepeat(withTiming(1, { duration: 2000 }), Infinity);
  }, []);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(
          shared.value,
          [0, 1],
          [layout ? -layout.width : 0, layout ? layout.width : 0],
        ),
      },
    ],
  }));

  if (!layout?.width && !layout?.height) {
    return (
      <View onLayout={event => setLayout(event.nativeEvent.layout)}>
        {children}
      </View>
    );
  }

  return (
    <MaskedView
      style={{ height: layout.height, width: layout.width }}
      maskElement={<View>{children}</View>}
    >
      <View style={styles.background} />
      <Reanimated.View style={[animatedStyles, StyleSheet.absoluteFill]}>
        <MaskedView
          style={StyleSheet.absoluteFill}
          maskElement={
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={StyleSheet.absoluteFill}
              colors={['transparent', 'black', 'transparent']}
            />
          }
        >
          <View
            style={[StyleSheet.absoluteFill, { backgroundColor: '#fff' }]}
          />
        </MaskedView>
      </Reanimated.View>
    </MaskedView>
  );
}

SkeletonPlaceholder.Item = ({ style }: { style?: StyleProp<ViewStyle> }) => (
  <View style={[style ? style : styles.itemSize, styles.item]} />
);
