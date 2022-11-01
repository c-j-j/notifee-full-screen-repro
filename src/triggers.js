import {RepeatFrequency, TimeUnit, TriggerType} from '@notifee/react-native';

/* Timestamp Date */
const getTimestamp = () => {
  const timestampDate = new Date(Date.now());
  timestampDate.setSeconds(timestampDate.getSeconds() + 5);
  return timestampDate.getTime();
};

/* Interval */
const interval = 60;

export const triggers = {
  timestamp: () => ({
    timestamp: getTimestamp(),
    type: TriggerType.TIMESTAMP,
  }),
  timestampWithAlarmManager: () => ({
    timestamp: getTimestamp(),
    type: TriggerType.TIMESTAMP,
    alarmManager: {
      allowWhileIdle: true,
    },
  }),
  timestampWithAlarmManagerRepeating: () => ({
    timestamp: getTimestamp(),
    type: TriggerType.TIMESTAMP,
    repeatFrequency: RepeatFrequency.HOURLY,
    alarmManager: {
      allowWhileIdle: true,
    },
  }),
  interval: () => ({
    timeUnit: TimeUnit.SECONDS,
    type: TriggerType.INTERVAL,
    interval: interval,
  }),
};
