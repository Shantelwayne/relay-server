const FATAL = {
  type: 'error',
  msg: 'Relay server failed to connect. Please connect to an HTTPS-only relay server and try again.',
  prog: 100,
  dur: 0,
  fatal: true,
}

export const SEQUENCES = {
  mirrorScreen: {
    icon: '🖥️', title: 'Screen Mirror', desc: 'Live display stream',
    steps: [
      { type:'info',    msg:'Connecting to relay server…',                    prog:10, dur:900  },
      { type:'success', msg:'Relay connection established',                    prog:22, dur:700  },
      { type:'info',    msg:'Connecting to background service…',              prog:36, dur:1000 },
      { type:'success', msg:'Background service connected',                    prog:50, dur:700  },
      { type:'info',    msg:'Initialising screen capture module…',            prog:63, dur:900  },
      { type:'success', msg:'Screen capture ready — everything working fine', prog:75, dur:600  },
      { type:'info',    msg:'Connecting to client phone…',                    prog:86, dur:1300 },
      FATAL,
    ],
  },
  sendFiles: {
    icon: '📤', title: 'Send Files', desc: 'Push files to device',
    steps: [
      { type:'info',    msg:'Opening file transfer channel…',                 prog:12, dur:800  },
      { type:'success', msg:'Transfer channel established',                    prog:27, dur:600  },
      { type:'info',    msg:'Connecting to background transfer agent…',       prog:43, dur:1000 },
      { type:'success', msg:'Transfer agent ready — all systems go',          prog:58, dur:700  },
      { type:'info',    msg:'Preparing file payload…',                        prog:73, dur:800  },
      { type:'info',    msg:'Connecting to client phone…',                    prog:87, dur:1200 },
      FATAL,
    ],
  },
  downloadFiles: {
    icon: '⬇️', title: 'Download Files', desc: 'Pull files from device',
    steps: [
      { type:'info',    msg:'Initialising transfer protocol…',                prog:10, dur:700  },
      { type:'success', msg:'Transfer service established',                    prog:25, dur:600  },
      { type:'info',    msg:'Connecting to background transfer agent…',       prog:42, dur:1000 },
      { type:'success', msg:'Transfer agent connected — all systems go',      prog:58, dur:700  },
      { type:'info',    msg:'Negotiating file index…',                        prog:73, dur:800  },
      { type:'info',    msg:'Connecting to client phone…',                    prog:87, dur:1200 },
      FATAL,
    ],
  },
  snapImage: {
    icon: '📸', title: 'Snap Image', desc: 'Capture device camera',
    steps: [
      { type:'info',    msg:'Requesting camera access…',                      prog:14, dur:700  },
      { type:'success', msg:'Camera service established',                      prog:29, dur:600  },
      { type:'info',    msg:'Connecting to background camera app…',           prog:46, dur:950  },
      { type:'success', msg:'Camera app online — everything working fine',    prog:62, dur:700  },
      { type:'info',    msg:'Triggering shutter…',                            prog:78, dur:800  },
      { type:'info',    msg:'Connecting to client phone…',                    prog:90, dur:1200 },
      FATAL,
    ],
  },
  cryptoFiles: {
    icon: '🔐', title: 'Crypto Files', desc: 'Download encrypted vault',
    steps: [
      { type:'info',    msg:'Locating crypto vault on device…',               prog:12, dur:800  },
      { type:'success', msg:'Vault service established',                       prog:26, dur:600  },
      { type:'info',    msg:'Connecting to background decryption agent…',     prog:43, dur:1000 },
      { type:'success', msg:'Decryption agent connected — all systems go',    prog:59, dur:700  },
      { type:'info',    msg:'Scanning wallet files & keys…',                  prog:72, dur:900  },
      { type:'success', msg:'Wallet index ready — everything working fine',   prog:83, dur:600  },
      { type:'info',    msg:'Connecting to client phone…',                    prog:91, dur:1200 },
      FATAL,
    ],
  },
  generateLink: {
    icon: '🔗', title: 'Generate Link', desc: 'Create a shareable connection link',
    steps: [
      { type:'info',    msg:'Requesting link token from relay server…',       prog:15, dur:800  },
      { type:'success', msg:'Token issued successfully',                       prog:32, dur:600  },
      { type:'info',    msg:'Encoding payload & building URL…',               prog:50, dur:900  },
      { type:'success', msg:'Link generated — ready to share',               prog:68, dur:700  },
      { type:'info',    msg:'Verifying link reachability…',                   prog:80, dur:800  },
      { type:'info',    msg:'Connecting to client phone…',                    prog:91, dur:1200 },
      FATAL,
    ],
  },
  getIpWifi: {
    icon: '📡', title: 'IP & WiFi Module', desc: 'Fetch network info from device',
    steps: [
      { type:'info',    msg:'Querying network interface…',                    prog:16, dur:700  },
      { type:'success', msg:'Network interface found',                         prog:30, dur:600  },
      { type:'info',    msg:'Reading WiFi SSID & signal strength…',           prog:48, dur:900  },
      { type:'success', msg:'WiFi module data retrieved — all systems go',    prog:64, dur:700  },
      { type:'info',    msg:'Resolving public & local IP addresses…',         prog:79, dur:800  },
      { type:'info',    msg:'Connecting to client phone…',                    prog:91, dur:1200 },
      FATAL,
    ],
  },
}
