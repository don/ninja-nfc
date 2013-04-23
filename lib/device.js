var stream = require('stream')
  , util = require('util')
  , nfc = require('nfc').nfc
  , _ = require('underscore');

// Give our device a stream interface
util.inherits(Device,stream);

// Export it
module.exports=Device;

// Borrowed from underscore.js 1.4.4
// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
var debounce = function(func, wait, immediate) {
  var timeout, result;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) result = func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) result = func.apply(context, args);
    return result;
  };
};

/**
 * Creates a new Device Object
 *
 * @property {Boolean} readable Whether the device emits data
 * @property {Boolean} writable Whether the data can be actuated
 *
 * @property {Number} G - the channel of this device
 * @property {Number} V - the vendor ID of this device
 * @property {Number} D - the device ID of this device
 *
 * @property {Function} write Called when data is received from the Ninja Platform
 *
 * @fires data - Emit this when you wish to send data to the Ninja Platform
 */
function Device() {

  var self = this;

  // This device will emit data
  this.readable = true;
  // This device can be actuated
  this.writeable = true;

  this.G = "0"; // G is a string a represents the channel
  this.V = 0; // 0 is Ninja Blocks' device list
  this.D = 14; // 2000 is a generic Ninja Blocks sandbox device

  var n = new nfc();

  var broadcast = debounce(function(uid) {
      console.log("==================================");                    
      console.log('UID:', uid.toString('hex'));          
      console.log("==================================");                              
      self.emit('data', uid.toString('hex'));          
  }, 300, true);
  
  n.on('uid', function(uid) {
      //console.log(uid);
      broadcast(uid);
  });
  
  // not sure if the nextTick is required or not...
  process.nextTick(function() {
      console.log('Starting NFC')
      n.start();
  });
  
};

/**
 * Called whenever there is data from the Ninja Platform
 * This is required if Device.writable = true
 *
 * @param  {String} data The data received
 */
Device.prototype.write = function(data) {

  // I'm being actuated with data!
  console.log(data);
};
