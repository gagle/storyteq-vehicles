const nxPreset = require('@nx/jest/preset').default;

module.exports = { ...nxPreset };

process.env.TZ = 'UTC';
