// Add helpers here. This is usually code that is just JS and not React code. Example: write a function that
// calculates number of minutes when passed in seconds. Things of this nature that you don't want to copy/paste
// everywhere.

export const STATUS = {
  RESET: 'reset',
  COUNTDOWN: 'countdown',
  WORKING: 'working',
  RESTING: 'resting',
  PAUSED: 'paused',
  ENDED: 'ended',
  RUNNING: 'running',
  COMPLETED: 'completed',
  NOT_RUNNING: 'not running',
};

export const RUNNING_STATUS = [
  STATUS.COUNTDOWN,
  STATUS.WORKING,
  STATUS.RESTING,
];

// Three status of queued timers
export const QUEUE_STATUS = [
  STATUS.RUNNING,
  STATUS.COMPLETED,
  STATUS.NOT_RUNNING,
]
