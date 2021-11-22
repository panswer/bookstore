console.log(`EthQuery - RPC Error - Error: [ethjs-query] 
while formatting outputs from RPC '{
    "value": {
        "code": -32603,
        "data": {
            "message": "VM Exception while processing transaction: revert",
            "code": -32000,
            "data": {
                "0xc515913a7fe6fd747cb9e817bc4ed7b0468e7ee80153b7c78d0ee3f3cd6d78bf": {
                    "error": "revert",
                    "program_counter": 68,
                    "return": "0x"
                },
                "stack": "RuntimeError: VM Exception while processing transaction: revert\n at Function.RuntimeError.fromResults (/home/rjmm/.nvm/versions/node/v14.17.1/lib/node_modules/truffle/build/webpack:/node_modules/ganache-core/lib/utils/runtimeerror.js:94:1)\n at BlockchainDouble.processBlock (/home/rjmm/.nvm/versions/node/v14.17.1/lib/node_modules/truffle/build/webpack:/node_modules/ganache-core/lib/blockchain_double.js:627:1)\n at processTicksAndRejections (internal/process/task_queues.js:95:5)",
                "name": "RuntimeError"
            }
        }
    }
}'`);
