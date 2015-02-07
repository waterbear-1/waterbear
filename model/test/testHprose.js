

require("hprose");
function hello(name) {
    return "Hello " + name + " i am zuaa!";
}
var server = new HproseHttpServer();
server.addFunction(hello);
server.listen(8080);
