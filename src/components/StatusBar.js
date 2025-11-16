import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import theme from '../theme';

/**
 * StatusBar - iOS-style status bar component
 * Displays time, cellular signal, network type, and battery level
 *
 * @param {string} time - Time to display (default: "9:41")
 * @param {boolean} showSignal - Show signal bars (default: true)
 * @param {string} networkType - Network type label (default: "5G")
 * @param {number} batteryLevel - Battery level 0-1 (default: 1)
 */
const StatusBar = ({
  time = '9:41',
  showSignal = true,
  networkType = '5G',
  batteryLevel = 1
}) => {
  return (
    <View style={styles.container}>
      {/* Time */}
      <Text style={styles.time}>{time}</Text>

      {/* Right side indicators */}
      <View style={styles.indicators}>
        {/* Signal bars */}
        {showSignal && (
          <View style={styles.signalBars}>
            <View style={[styles.bar, styles.bar1]} />
            <View style={[styles.bar, styles.bar2]} />
            <View style={[styles.bar, styles.bar3]} />
            <View style={[styles.bar, styles.bar4]} />
          </View>
        )}

        {/* Network type */}
        <Text style={styles.networkType}>{networkType}</Text>

        {/* Battery indicator */}
        <View style={styles.batteryContainer}>
          <View style={styles.batteryBody}>
            <View
              style={[
                styles.batteryFill,
                { width: `${batteryLevel * 100}%` }
              ]}
            />
          </View>
          <View style={styles.batteryTip} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.sm,
  },
  time: {
    fontSize: theme.typography.md,
    fontWeight: theme.typography.semibold,
    color: theme.colors.primary,
    letterSpacing: -0.3,
  },
  indicators: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  signalBars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 2,
    width: 16,
    height: 12,
  },
  bar: {
    width: 4,
    backgroundColor: theme.colors.primary,
    borderRadius: 1,
  },
  bar1: {
    height: 8,
    opacity: 0.4,
  },
  bar2: {
    height: 10,
    opacity: 0.6,
  },
  bar3: {
    height: 12,
    opacity: 0.8,
  },
  bar4: {
    height: 12,
    opacity: 1,
  },
  networkType: {
    fontSize: theme.typography.xs,
    color: theme.colors.primary,
    fontWeight: theme.typography.regular,
  },
  batteryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  batteryBody: {
    width: 24,
    height: 12,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: 2,
    padding: 2,
    justifyContent: 'center',
  },
  batteryFill: {
    height: '100%',
    backgroundColor: theme.colors.primary,
    borderRadius: 1,
  },
  batteryTip: {
    width: 2,
    height: 6,
    backgroundColor: theme.colors.primary,
    borderTopRightRadius: 1,
    borderBottomRightRadius: 1,
    marginLeft: 1,
  },
});

export default StatusBar;
