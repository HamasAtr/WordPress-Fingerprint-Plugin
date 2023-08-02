
// Function to get the user's browser name
const getBrowserName = () => {
  let browserInfo = navigator.userAgent;
  let browser;
  if (browserInfo.includes('Opera') || browserInfo.includes('OPR')) {
    browser = 'Opera';
  } else if (browserInfo.includes('Edg')) {
    browser = 'Edge';
  } else if (browserInfo.includes('Chrome')) {
    browser = 'Chrome';
  } else if (browserInfo.includes('Safari')) {
    browser = 'Safari';
  } else if (browserInfo.includes('Firefox')) {
    browser = 'Firefox';
  } else {
    browser = 'Unknown';
  }
  return browser;
};

// Function to improve the readability of the user's device name
const getReadableDeviceName = (platform) => {
  const deviceNames = {
    Win32: 'Windows 32-bit',
    Win64: 'Windows 64-bit',
    MacIntel: 'Mac',
    Linux: 'Linux',
    iPhone: 'iPhone',
    iPad: 'iPad',
    Android: 'Android',
    Unknown: 'Unknown Device'
  };
  return deviceNames[platform] || platform || 'Unknown Device';
};

// Function to get user's country
const getUserCountry = () => {
  return fetch('https://ipinfo.io?token=YOUR_IPINFO_API_TOKEN')
    .then(response => response.json())
    .then(data => data.country)
    .catch(error => 'Unknown Country');
};

// Function to get user's timezone
const getUserTimezone = () => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};

// Gather canvas information
var canvas = document.createElement('canvas');
var context = canvas.getContext('2d');
var canvasData = canvas.toDataURL();

// Gather WebGL information
var webGLData = '';
try {
  var canvas = document.createElement('canvas');
  var gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  webGLData = gl.getParameter(gl.VERSION);
} catch (error) {
  webGLData = 'WebGL not supported';
}

// Get the user's country
getUserCountry()
  .then(country => {
    // Get the user's browser name
    var browserName = getBrowserName();

    // Get the user's device name and improve its readability
    var deviceName = getReadableDeviceName(navigator.platform);

    // Get the user's timezone
    var timezone = getUserTimezone();

    // Send the data to your PHP script for storing
    var data = {
      canvas: canvasData,
      webGL: webGLData,
      device: deviceName,
      browser: browserName,
      country: country,
      timezone: timezone // Include the user's timezone in the data object
    };
    console.log(data);

    // Send the data to your PHP script using AJAX
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'wp-content/plugins/custom_fingerprint_plugin/custom_fingerprint_plugin.php', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          console.log('Data sent successfully:', xhr.responseText);
        } else {
          console.error('Failed to send data:', xhr.status, xhr.statusText);
        }
      }
    };
    xhr.send(JSON.stringify(data));
  })
  .catch(error => console.error('Failed to get user country:', error));
