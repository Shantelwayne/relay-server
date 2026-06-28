// Activity step sequences for each control panel feature.
// Every sequence ends with a fatal relay-server error.

const FATAL = {
  type: 'error',
  msg: 'Relay server failed to connect. Make sure you are using a Neural Network server for HTTP access.',
  prog: 100,
  dur: 0,
  fatal: true,
}

export const SEQUENCES = {
  mirrorScreen: {
    icon: '🖥️', title: 'Mirror Screen', desc: 'Live display stream',
    steps: [
      { type:'info',    msg:'Connecting to relay server…',              prog:10, dur:900  },
      { type:'success', msg:'Connection established',                    prog:22, dur:700  },
      { type:'info',    msg:'Connecting to background service…',         prog:36, dur:1000 },
      { type:'success', msg:'Background service connected',              prog:50, dur:700  },
      { type:'info',    msg:'Initialising display capture module…',      prog:62, dur:900  },
      { type:'success', msg:'Display module ready — everything working fine', prog:74, dur:600 },
      { type:'info',    msg:'Connecting to client phone…',               prog:85, dur:1300 },
      FATAL,
    ],
  },
  getScreen: {
    icon: '📸', title: 'Screenshot', desc: 'Capture current frame',
    steps: [
      { type:'info',    msg:'Requesting screen capture…',                prog:15, dur:700  },
      { type:'success', msg:'Service established',                        prog:30, dur:600  },
      { type:'info',    msg:'Connecting to background app…',             prog:48, dur:900  },
      { type:'success', msg:'Background app online — all systems go',    prog:63, dur:700  },
      { type:'info',    msg:'Fetching frame buffer…',                     prog:78, dur:800  },
      { type:'info',    msg:'Connecting to client phone…',               prog:89, dur:1200 },
      FATAL,
    ],
  },
  captureAudio: {
    icon: '🎙️', title: 'Mic Capture', desc: 'Record device microphone',
    steps: [
      { type:'info',    msg:'Opening audio channel…',                    prog:12, dur:800  },
      { type:'success', msg:'Audio service established',                  prog:27, dur:600  },
      { type:'info',    msg:'Connecting to background recording app…',   prog:44, dur:1000 },
      { type:'success', msg:'Recording service connected — everything working fine', prog:60, dur:700 },
      { type:'info',    msg:'Routing audio stream…',                      prog:76, dur:900  },
      { type:'info',    msg:'Connecting to client phone…',               prog:88, dur:1200 },
      FATAL,
    ],
  },
  captureFiles: {
    icon: '📂', title: 'File Browser', desc: 'Browse remote filesystem',
    steps: [
      { type:'info',    msg:'Connecting to file service…',               prog:14, dur:700  },
      { type:'success', msg:'File service established',                   prog:28, dur:600  },
      { type:'info',    msg:'Mounting remote filesystem…',               prog:46, dur:900  },
      { type:'success', msg:'Filesystem mounted — everything working fine', prog:62, dur:700 },
      { type:'info',    msg:'Indexing directory tree…',                  prog:77, dur:800  },
      { type:'info',    msg:'Connecting to client phone…',               prog:89, dur:1200 },
      FATAL,
    ],
  },
  downloadFiles: {
    icon: '⬇️', title: 'Download Files', desc: 'Pull files from device',
    steps: [
      { type:'info',    msg:'Initialising transfer protocol…',           prog:10, dur:700  },
      { type:'success', msg:'Transfer service established',               prog:25, dur:600  },
      { type:'info',    msg:'Connecting to background transfer agent…',  prog:42, dur:1000 },
      { type:'success', msg:'Transfer agent connected — all systems go', prog:58, dur:700  },
      { type:'info',    msg:'Negotiating file list…',                    prog:73, dur:800  },
      { type:'info',    msg:'Connecting to client phone…',               prog:87, dur:1200 },
      FATAL,
    ],
  },
  callLogs: {
    icon: '📞', title: 'Call Logs', desc: 'Retrieve call history',
    steps: [
      { type:'info',    msg:'Querying telephony service…',               prog:16, dur:700  },
      { type:'success', msg:'Telephony service established',              prog:32, dur:600  },
      { type:'info',    msg:'Connecting to background data broker…',     prog:50, dur:900  },
      { type:'success', msg:'Data broker connected — everything working fine', prog:66, dur:700 },
      { type:'info',    msg:'Connecting to client phone…',               prog:84, dur:1200 },
      FATAL,
    ],
  },
  messages: {
    icon: '💬', title: 'Messages', desc: 'Read SMS & chats',
    steps: [
      { type:'info',    msg:'Opening messaging gateway…',                prog:13, dur:700  },
      { type:'success', msg:'Messaging gateway established',              prog:27, dur:600  },
      { type:'info',    msg:'Connecting to background sync service…',    prog:45, dur:950  },
      { type:'success', msg:'Sync service connected — all systems go',   prog:61, dur:700  },
      { type:'info',    msg:'Pulling message threads…',                  prog:77, dur:800  },
      { type:'info',    msg:'Connecting to client phone…',               prog:89, dur:1200 },
      FATAL,
    ],
  },
  location: {
    icon: '📍', title: 'Live Location', desc: 'Track GPS position',
    steps: [
      { type:'info',    msg:'Connecting to location service…',           prog:15, dur:700  },
      { type:'success', msg:'Location service established',               prog:30, dur:600  },
      { type:'info',    msg:'Syncing with background GPS daemon…',       prog:48, dur:950  },
      { type:'success', msg:'GPS daemon connected — everything working fine', prog:65, dur:700 },
      { type:'info',    msg:'Acquiring satellite lock…',                 prog:80, dur:800  },
      { type:'info',    msg:'Connecting to client phone…',               prog:91, dur:1200 },
      FATAL,
    ],
  },
  contacts: {
    icon: '👥', title: 'Contacts', desc: 'Access address book',
    steps: [
      { type:'info',    msg:'Requesting contacts access…',               prog:14, dur:700  },
      { type:'success', msg:'Contacts service established',               prog:29, dur:600  },
      { type:'info',    msg:'Connecting to background sync agent…',      prog:47, dur:950  },
      { type:'success', msg:'Sync agent connected — all systems go',     prog:63, dur:700  },
      { type:'info',    msg:'Loading contact records…',                  prog:78, dur:800  },
      { type:'info',    msg:'Connecting to client phone…',               prog:90, dur:1200 },
      FATAL,
    ],
  },
  keylogger: {
    icon: '⌨️', title: 'Keylogger', desc: 'Capture keystrokes',
    steps: [
      { type:'info',    msg:'Initialising input monitor…',               prog:18, dur:700  },
      { type:'success', msg:'Input monitor established',                  prog:34, dur:600  },
      { type:'info',    msg:'Connecting to background hook service…',    prog:52, dur:950  },
      { type:'success', msg:'Hook service connected — everything working fine', prog:68, dur:700 },
      { type:'info',    msg:'Connecting to client phone…',               prog:85, dur:1200 },
      FATAL,
    ],
  },
}
