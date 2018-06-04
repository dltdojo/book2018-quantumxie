// https://github.com/bcoin-org/bcoin/wiki/Example:-Connecting-to-the-P2P-Network

var bcoin = require('bcoin').set('main');

// SPV chains only store the chain headers.
var chain = new bcoin.chain({
    db: 'leveldb',
    location: './spvchain',
    spv: true
  });
  
  var pool = new bcoin.pool({
    chain: chain,
    spv: true,
    maxPeers: 8
  });



  // Open the pool (implicitly opens mempool and chain).
(async function() {
    await pool.open();
  
    // Connect, start retrieving and relaying txs
    await pool.connect();
  
    // Start the blockchain sync.
    pool.startSync();
  
    // Watch the action
    chain.on('block', function(block) {
      console.log('Connected block to blockchain:');
      console.log(block);
      console.log('Current height:', chain.height);
    });
  })();