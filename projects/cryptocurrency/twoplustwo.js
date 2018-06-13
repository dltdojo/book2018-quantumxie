// https://github.com/bcoin-org/bcoin/wiki/Scripting
var bcoin = require('bcoin');
var assert = require('assert');
var opcodes = bcoin.script.opcodes;

var output = new bcoin.script();
output.pushOp(opcodes.OP_ADD);
output.pushInt(4);
output.pushOp(opcodes.OP_NUMEQUAL);
output.compile();

var input = new bcoin.script();
input.pushInt(2);
input.pushInt(2);
input.compile();

var stack = new bcoin.stack();
input.execute(stack);
console.log(stack);
output.execute(stack);
console.log(stack);

// Verify the script was successful in its execution:
console.log(stack);
assert(stack.length === 1);
assert(stack.popBool() === true);