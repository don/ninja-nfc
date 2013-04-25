exports.menu = {
  "contents":[
    { "type": "paragraph", "text": "The NFC Driver does not have anything that can be configured yet."},
    { "type": "input_field_text", "field_name": "hello_text", "value": "", "label": "Some Text", "placeholder": "Hellooooo!", "required": true},
    { "type": "submit", "name": "Echo back to me", "rpc_method": "echo" },
  ]
};

exports.echo = {
  "contents":[
    { "type": "paragraph", "text": "You said"},
  ]
};