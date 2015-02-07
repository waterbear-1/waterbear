
require("hprose");
var client = new HproseHttpClient('http://127.0.0.1:8080/');
var proxy = client.useService();

client.invoke("hello", "world", function(result) {
    console.log(result);
});
