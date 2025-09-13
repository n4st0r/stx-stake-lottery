
import { Clarinet, Tx, Chain, Account, types } from 'https://deno.land/x/clarinet@v1.2.0/index.ts';
import { assertEquals, assert } from 'https://deno.land/std@0.90.0/testing/asserts.ts';

Clarinet.test({
    name: "E2E_test",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        let addresses = [
            accounts.get('deployer')!,
            accounts.get('wallet_1')!,
            accounts.get('wallet_2')!,
            accounts.get('wallet_3')!,
            accounts.get('wallet_4')!,
            accounts.get('wallet_5')!,
            accounts.get('wallet_6')!,
            accounts.get('wallet_7')!,
            accounts.get('wallet_8')!,
            accounts.get('faucet')!
        ]

        const amount = types.uint(20000)
        const amount2 = types.uint(10000)

        const hashes = [
            types.tuple({hashbytes: "0x6d78de7b0625dfbfc16c3a8a5735f6dc3dc3f2ce", version: "0x00"}),
            types.tuple({hashbytes: "0x7321b74e2b6a7e949e6c4ad313035b1665095017", version: "0x00"}),
            types.tuple({hashbytes: "0x99e2ec69ac5b6e67b4e26edd0e2c1c1a6b9bbd23", version: "0x00"}),
            types.tuple({hashbytes: "0xa5180cc1ff6050df53f0ab766d76b630e14feb0c", version: "0x00"}),
            types.tuple({hashbytes: "0x05572d04565d56f67e84ad7e20deedd8e7bba2fd", version: "0x00"}),
            types.tuple({hashbytes: "0xb0e8c72590d8ec330b75a9089d220dcd6f4d4a6e", version: "0x00"}),
            types.tuple({hashbytes: "0xd540a8a654c4c0f54f910212ff3b119cb2257bb8", version: "0x00"}),
            types.tuple({hashbytes: "0xecf08f87f8318a104a46ff8dbee72e761988d8eb", version: "0x00"}),
            types.tuple({hashbytes: "0xeabc65f3e890fb8bf20d153e95119c72d85765a9", version: "0x00"}),
            types.tuple({hashbytes: "0x2b19bade75a48768a5ffc142a86490303a95f413", version: "0x00"}),
        ]

        let block = chain.mineBlock([
            Tx.contractCall('poolTemplate1cycle1000stx', 'deposit-stacks', [amount, types.some(hashes[0])], addresses[0].address),
            Tx.contractCall('poolTemplate1cycle1000stx', 'deposit-stacks', [amount, types.some(hashes[1])], addresses[1].address),
            Tx.contractCall('poolTemplate1cycle1000stx', 'deposit-stacks', [amount, types.some(hashes[2])], addresses[2].address),
            Tx.contractCall('poolTemplate1cycle1000stx', 'deposit-stacks', [amount, types.some(hashes[3])], addresses[3].address),
            Tx.contractCall('poolTemplate1cycle1000stx', 'deposit-stacks', [amount, types.some(hashes[4])], addresses[4].address),
            Tx.contractCall('poolTemplate1cycle1000stx', 'deposit-stacks', [amount, types.some(hashes[5])], addresses[5].address),
            Tx.contractCall('poolTemplate1cycle1000stx', 'deposit-stacks', [amount, types.some(hashes[6])], addresses[6].address),
            Tx.contractCall('poolTemplate1cycle1000stx', 'deposit-stacks', [amount2, types.some(hashes[7])], addresses[7].address),
            Tx.contractCall('poolTemplate1cycle1000stx', 'deposit-stacks', [amount, types.some(hashes[8])], addresses[8].address),
            Tx.contractCall('poolTemplate1cycle1000stx', 'deposit-stacks', [amount, types.some(hashes[9])], addresses[9].address)
        ]);

        let read_only_block = chain.mineBlock([
            Tx.contractCall('poolTemplate1cycle1000stx', 'senders-deposited-stx', [], addresses[0].address),
            Tx.contractCall('poolTemplate1cycle1000stx', 'senders-deposited-stx', [], addresses[1].address),
            Tx.contractCall('poolTemplate1cycle1000stx', 'senders-deposited-stx', [], addresses[2].address),
            Tx.contractCall('poolTemplate1cycle1000stx', 'senders-deposited-stx', [], addresses[3].address),
            Tx.contractCall('poolTemplate1cycle1000stx', 'senders-deposited-stx', [], addresses[4].address),
            Tx.contractCall('poolTemplate1cycle1000stx', 'senders-deposited-stx', [], addresses[5].address),
            Tx.contractCall('poolTemplate1cycle1000stx', 'senders-deposited-stx', [], addresses[6].address),
            Tx.contractCall('poolTemplate1cycle1000stx', 'senders-deposited-stx', [], addresses[7].address),
            Tx.contractCall('poolTemplate1cycle1000stx', 'senders-deposited-stx', [], addresses[8].address),
            Tx.contractCall('poolTemplate1cycle1000stx', 'senders-deposited-stx', [], addresses[9].address)        
        ])

        chain.mineEmptyBlockUntil(150)

        let second_block = chain.mineBlock([
            Tx.contractCall('poolTemplate1cycle1000stx', 'stake-stx',[types.uint(153)], addresses[0].address),
            Tx.contractCall('poolTemplate1cycle1000stx', 'toggle-lock', [types.bool(false)], addresses[0].address),
        ])

        let third_block = chain.mineBlock([
            Tx.contractCall('poolTemplate1cycle1000stx', 'withdraw-stacks', [], addresses[0].address),
            Tx.contractCall('poolTemplate1cycle1000stx', 'withdraw-stacks', [], addresses[1].address),
            Tx.contractCall('poolTemplate1cycle1000stx', 'withdraw-stacks', [], addresses[2].address),
            Tx.contractCall('poolTemplate1cycle1000stx', 'withdraw-stacks', [], addresses[3].address),
            Tx.contractCall('poolTemplate1cycle1000stx', 'withdraw-stacks', [], addresses[4].address),
            Tx.contractCall('poolTemplate1cycle1000stx', 'withdraw-stacks', [], addresses[5].address),
            Tx.contractCall('poolTemplate1cycle1000stx', 'withdraw-stacks', [], addresses[6].address),
            Tx.contractCall('poolTemplate1cycle1000stx', 'withdraw-stacks', [], addresses[7].address)
        ])

        let second_read_only_block= chain.mineBlock([
            Tx.contractCall('poolTemplate1cycle1000stx', 'senders-deposited-stx', [], addresses[0].address),
            Tx.contractCall('poolTemplate1cycle1000stx', 'senders-deposited-stx', [], addresses[1].address),
            Tx.contractCall('poolTemplate1cycle1000stx', 'senders-deposited-stx', [], addresses[2].address),
            Tx.contractCall('poolTemplate1cycle1000stx', 'senders-deposited-stx', [], addresses[3].address),
            Tx.contractCall('poolTemplate1cycle1000stx', 'senders-deposited-stx', [], addresses[4].address),
            Tx.contractCall('poolTemplate1cycle1000stx', 'senders-deposited-stx', [], addresses[5].address),
            Tx.contractCall('poolTemplate1cycle1000stx', 'senders-deposited-stx', [], addresses[6].address),
            Tx.contractCall('poolTemplate1cycle1000stx', 'senders-deposited-stx', [], addresses[7].address),
            Tx.contractCall('poolTemplate1cycle1000stx', 'senders-deposited-stx', [], addresses[8].address),
            Tx.contractCall('poolTemplate1cycle1000stx', 'senders-deposited-stx', [], addresses[9].address)        
        ])

        for(let i = 0; i<7; i++){
            assert(block.receipts[i].result.expectOk())
            assert(third_block.receipts[i].result.expectOk())
            assertEquals(read_only_block.receipts[i].result, types.uint(20000))
            assertEquals(second_read_only_block.receipts[i].result, types.uint(0))
        }
        assert(block.receipts[7].result.expectOk())
        assert(third_block.receipts[7].result.expectOk())
        assertEquals(read_only_block.receipts[7].result, types.uint(10000))
        assertEquals(second_read_only_block.receipts[7].result, types.uint(0))

        for(let i = 8; i<10; i++){
            assertEquals(block.receipts[i].result.expectErr(), types.uint(5))
        }
        assert(second_block.receipts[0].result.expectOk())
        assert(second_block.receipts[1].result.expectOk().expectBool(true))
    }
})

Clarinet.test({
    name: "Can't Register Unsupported Address",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        let addresses = [
            accounts.get('deployer')!,
        ]

        let block = chain.mineBlock([
            Tx.contractCall('poolTemplate1cycle1000stx', 'deposit-stacks', [types.uint(1000), types.some(types.tuple({hashbytes: "0x6d78de7b0625dfbfc16c3a8a5735f6dc3dc3f2ce", version: "0x05"}))], addresses[0].address),
    
        ]);
        let err = block.receipts[0].result.expectErr()
        assertEquals(err, types.uint(1))
    }
})

Clarinet.test({
    name: "Can't Deposit If Not Registered",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        let addresses = [
            accounts.get('deployer')!,
        ]

        let block = chain.mineBlock([
            Tx.contractCall('poolTemplate1cycle1000stx', 'deposit-stacks', [types.uint(20000), types.none()], addresses[0].address),
    
        ]);
        let err = block.receipts[0].result.expectErr()
        assertEquals(err, types.uint(7))
    }
})

Clarinet.test({
    name: "Can't Deposit More Than The Limit",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        let addresses = [
            accounts.get('deployer')!,
        ]
        let hash = types.tuple({hashbytes: "0x6d78de7b0625dfbfc16c3a8a5735f6dc3dc3f2ce", version: "0x00"})


        let block = chain.mineBlock([
            Tx.contractCall('poolTemplate1cycle1000stx', 'deposit-stacks', [types.uint(20000), types.some(hash)], addresses[0].address),
            Tx.contractCall('poolTemplate1cycle1000stx', 'deposit-stacks', [types.uint(1000), types.none()], addresses[0].address),
        ]);
        let err = block.receipts[1].result.expectErr()
        assert(block.receipts[0].result.expectOk())
        assertEquals(err, types.uint(4))
    }
})

Clarinet.test({
    name: "Deposit Amount Needs To Be Multiple of 1000",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        let addresses = [
            accounts.get('deployer')!,
        ]
        let hash = types.some(types.tuple({hashbytes: "0x6d78de7b0625dfbfc16c3a8a5735f6dc3dc3f2ce", version: "0x00"}))
        let block = chain.mineBlock([
            Tx.contractCall('poolTemplate1cycle1000stx', 'deposit-stacks', [types.uint(1200), hash], addresses[0].address),
        ]);
        let err = block.receipts[0].result.expectErr()
        assertEquals(err, types.uint(4))
    }
})

Clarinet.test({
    name: "Can't Deposit Amount If Contract Locked",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        let addresses = [
            accounts.get('deployer')!,
        ]
        let hash = types.some(types.tuple({hashbytes: "0x6d78de7b0625dfbfc16c3a8a5735f6dc3dc3f2ce", version: "0x00"}))

        let block = chain.mineBlock([
            Tx.contractCall('poolTemplate1cycle1000stx', 'toggle-lock', [types.bool(true)], addresses[0].address),
            Tx.contractCall('poolTemplate1cycle1000stx', 'deposit-stacks', [types.uint(1000), hash], addresses[0].address),
        ]);
        let err = block.receipts[1].result.expectErr()
        assertEquals(err, types.uint(5))
    }
})

Clarinet.test({
    name: "Can't Withdraw Amount If Contract Locked",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        let addresses = [
            accounts.get('deployer')!,
        ]
        let hash = types.some(types.tuple({hashbytes: "0x6d78de7b0625dfbfc16c3a8a5735f6dc3dc3f2ce", version: "0x00"}))

        let block = chain.mineBlock([
            Tx.contractCall('poolTemplate1cycle1000stx', 'deposit-stacks', [types.uint(1000), hash], addresses[0].address),
            Tx.contractCall('poolTemplate1cycle1000stx', 'toggle-lock', [types.bool(true)], addresses[0].address),
            Tx.contractCall('poolTemplate1cycle1000stx', 'withdraw-stacks', [], addresses[0].address),
        ]);
        let err = block.receipts[2].result.expectErr()
        assertEquals(err, types.uint(6))
    }
})

Clarinet.test({
    name: "Can't Stake Stacks If Threshhold not met and vault empty",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        let addresses = [
            accounts.get('deployer')!,
        ]
        let hash = types.some(types.tuple({hashbytes: "0x6d78de7b0625dfbfc16c3a8a5735f6dc3dc3f2ce", version: "0x00"}))
        chain.mineEmptyBlockUntil(150)
        let block = chain.mineBlock([
            Tx.contractCall('poolTemplate1cycle1000stx', 'deposit-stacks', [types.uint(1000), hash], addresses[0].address),
            Tx.contractCall('poolTemplate1cycle1000stx', 'toggle-lock', [types.bool(true)], addresses[0].address),
            Tx.contractCall('poolTemplate1cycle1000stx', 'stake-stx',[types.uint(153)], addresses[0].address)
        ]);
        assert(block.receipts[0].result.expectOk())      
        assert(block.receipts[1].result.expectOk().expectBool(true))

        let err = block.receipts[2].result.expectErr()
        assertEquals(err, types.uint(16))
    }
})

Clarinet.test({
    name: "Test error codes when staking",
    async fn(chain: Chain, accounts: Map<string, Account>) {

        let addresses = [
            accounts.get('deployer')!,
            accounts.get('wallet_1')!,
            accounts.get('wallet_2')!,
            accounts.get('wallet_3')!,
            accounts.get('wallet_4')!,
            accounts.get('wallet_5')!,
            accounts.get('wallet_6')!,
            accounts.get('wallet_7')!,
            accounts.get('wallet_8')!,
            accounts.get('faucet')!
        ]

        const amount = types.uint(20000)
        const amount2 = types.uint(10000)


        const hashes = [
            types.tuple({hashbytes: "0x6d78de7b0625dfbfc16c3a8a5735f6dc3dc3f2ce", version: "0x00"}),
            types.tuple({hashbytes: "0x7321b74e2b6a7e949e6c4ad313035b1665095017", version: "0x00"}),
            types.tuple({hashbytes: "0x99e2ec69ac5b6e67b4e26edd0e2c1c1a6b9bbd23", version: "0x00"}),
            types.tuple({hashbytes: "0xa5180cc1ff6050df53f0ab766d76b630e14feb0c", version: "0x00"}),
            types.tuple({hashbytes: "0x05572d04565d56f67e84ad7e20deedd8e7bba2fd", version: "0x00"}),
            types.tuple({hashbytes: "0xb0e8c72590d8ec330b75a9089d220dcd6f4d4a6e", version: "0x00"}),
            types.tuple({hashbytes: "0xd540a8a654c4c0f54f910212ff3b119cb2257bb8", version: "0x00"}),
            types.tuple({hashbytes: "0xecf08f87f8318a104a46ff8dbee72e761988d8eb", version: "0x00"}),
            types.tuple({hashbytes: "0xeabc65f3e890fb8bf20d153e95119c72d85765a9", version: "0x00"}),
            types.tuple({hashbytes: "0x2b19bade75a48768a5ffc142a86490303a95f413", version: "0x00"}),
        ]

        let block = chain.mineBlock([
            Tx.contractCall('poolTemplate1cycle1000stx', 'deposit-stacks', [amount, types.some(hashes[0])], addresses[0].address),
            Tx.contractCall('poolTemplate1cycle1000stx', 'deposit-stacks', [amount, types.some(hashes[1])], addresses[1].address),
            Tx.contractCall('poolTemplate1cycle1000stx', 'deposit-stacks', [amount, types.some(hashes[2])], addresses[2].address),
            Tx.contractCall('poolTemplate1cycle1000stx', 'deposit-stacks', [amount, types.some(hashes[3])], addresses[3].address),
            Tx.contractCall('poolTemplate1cycle1000stx', 'deposit-stacks', [amount, types.some(hashes[4])], addresses[4].address),
            Tx.contractCall('poolTemplate1cycle1000stx', 'deposit-stacks', [amount, types.some(hashes[5])], addresses[5].address),
            Tx.contractCall('poolTemplate1cycle1000stx', 'deposit-stacks', [amount, types.some(hashes[6])], addresses[6].address),
            Tx.contractCall('poolTemplate1cycle1000stx', 'deposit-stacks', [amount2, types.some(hashes[7])], addresses[7].address),
            Tx.contractCall('poolTemplate1cycle1000stx', 'deposit-stacks', [amount, types.some(hashes[8])], addresses[8].address),
            Tx.contractCall('poolTemplate1cycle1000stx', 'deposit-stacks', [amount, types.some(hashes[9])], addresses[9].address)
        ]);

        let second_block = chain.mineBlock([
            Tx.contractCall('poolTemplate1cycle1000stx', 'stake-stx', [types.uint(2)], addresses[1].address)

        ])

        for(let i = 0; i<8; i++){
            assert(block.receipts[i].result.expectOk())
        }
        assertEquals(block.receipts[8].result.expectErr(), types.uint(5))      
        assertEquals(block.receipts[9].result.expectErr(), types.uint(5))      
        assertEquals(second_block.receipts[0].result.expectErr(), types.uint(10))      
    }
})

Clarinet.test({
    name: "Cant Change Credentials If Locked",
    async fn(chain: Chain, accounts: Map<string, Account>) {

        let addresses = [
            accounts.get('deployer')!,
        ]

        const amount = types.uint(20000)
        let hash = types.some(types.tuple({hashbytes: "0x6d78de7b0625dfbfc16c3a8a5735f6dc3dc3f2ce", version: "0x00"}))
        let second_hash = types.tuple({hashbytes: "0x7321b74e2b6a7e949e6c4ad313035b1665095017", version: "0x00"})

        let block = chain.mineBlock([
            Tx.contractCall('poolTemplate1cycle1000stx', 'deposit-stacks', [amount, hash], addresses[0].address),
            Tx.contractCall('poolTemplate1cycle1000stx', 'toggle-lock', [types.bool(true)], addresses[0].address),
            Tx.contractCall('poolTemplate1cycle1000stx', 'change-btc-credentials', [second_hash], addresses[0].address),
        ]);

        assert(block.receipts[0].result.expectOk())      
        assert(block.receipts[1].result.expectOk())
        assertEquals(block.receipts[2].result.expectErr(), types.uint(5))      
    }
})

Clarinet.test({
    name: "Credentials Changes correctly",
    async fn(chain: Chain, accounts: Map<string, Account>) {

        let addresses = [
            accounts.get('deployer')!,
        ]

        const amount = types.uint(10000)
        let hash = types.some(types.tuple({hashbytes: "0x6d78de7b0625dfbfc16c3a8a5735f6dc3dc3f2ce", version: "0x00"}))
        let second_hash = types.tuple({hashbytes: "0x7321b74e2b6a7e949e6c4ad313035b1665095017", version: "0x00"})

        let block = chain.mineBlock([
            Tx.contractCall('poolTemplate1cycle1000stx', 'senders-btc-credentials', [], addresses[0].address),
            Tx.contractCall('poolTemplate1cycle1000stx', 'deposit-stacks', [amount, hash], addresses[0].address),
            Tx.contractCall('poolTemplate1cycle1000stx', 'senders-btc-credentials', [], addresses[0].address),
            Tx.contractCall('poolTemplate1cycle1000stx', 'change-btc-credentials', [second_hash], addresses[0].address),
            Tx.contractCall('poolTemplate1cycle1000stx', 'senders-btc-credentials', [], addresses[0].address),
            Tx.contractCall('poolTemplate1cycle1000stx', 'deposit-stacks', [amount, hash], addresses[0].address),
            Tx.contractCall('poolTemplate1cycle1000stx', 'senders-btc-credentials', [], addresses[0].address),
        ]);
        assertEquals(block.receipts[0].result.expectTuple()['hashbytes'], "0x00000000000000000000")
        assertEquals(block.receipts[0].result.expectTuple()['version'], "0x00")
        assert(block.receipts[1].result.expectOk())      
        assertEquals(block.receipts[2].result.expectTuple()['hashbytes'], "0x6d78de7b0625dfbfc16c3a8a5735f6dc3dc3f2ce")
        assertEquals(block.receipts[2].result.expectTuple()['version'], "0x00")
        assert(block.receipts[3].result.expectOk())
        assertEquals(block.receipts[4].result.expectTuple()['version'], "0x00")
        assertEquals(block.receipts[4].result.expectTuple()['hashbytes'], "0x7321b74e2b6a7e949e6c4ad313035b1665095017")
        assert(block.receipts[5].result.expectOk())
        //Assert credentials dont change if initiated in deposit function
        assertEquals(block.receipts[6].result.expectTuple()['version'], "0x00")
        assertEquals(block.receipts[6].result.expectTuple()['hashbytes'], "0x7321b74e2b6a7e949e6c4ad313035b1665095017")
    }
})

Clarinet.test({
    name: "Cant Change Credentials If Not initiated",
    async fn(chain: Chain, accounts: Map<string, Account>) {

        let addresses = [
            accounts.get('deployer')!,
        ]

        const amount = types.uint(20000)
        let hash = types.tuple({hashbytes: "0x7321b74e2b6a7e949e6c4ad313035b1665095017", version: "0x00"})

        let block = chain.mineBlock([
            Tx.contractCall('poolTemplate1cycle1000stx', 'change-btc-credentials', [hash], addresses[0].address),
        ]);

        assertEquals(block.receipts[0].result.expectErr(), types.uint(12))      
    }
})

// Clarinet.test({
//     name: "Multiple Templates Stack",
//     async fn(chain: Chain, accounts: Map<string, Account>) {
//         let addresses = [
//             accounts.get('deployer')!,
//             accounts.get('wallet_1')!,
//             accounts.get('wallet_2')!,
//             accounts.get('wallet_3')!,
//             accounts.get('wallet_4')!,
//             accounts.get('wallet_5')!,
//             accounts.get('wallet_6')!,
//             accounts.get('wallet_7')!,
//             accounts.get('wallet_8')!,
//             accounts.get('faucet')!
//         ]

//         const amount = types.uint(20000)
//         const amount2 = types.uint(10000)

//         const hashes = [
//             types.tuple({hashbytes: "0x6d78de7b0625dfbfc16c3a8a5735f6dc3dc3f2ce", version: "0x00"}),
//             types.tuple({hashbytes: "0x7321b74e2b6a7e949e6c4ad313035b1665095017", version: "0x00"}),
//             types.tuple({hashbytes: "0x99e2ec69ac5b6e67b4e26edd0e2c1c1a6b9bbd23", version: "0x00"}),
//             types.tuple({hashbytes: "0xa5180cc1ff6050df53f0ab766d76b630e14feb0c", version: "0x00"}),
//             types.tuple({hashbytes: "0x05572d04565d56f67e84ad7e20deedd8e7bba2fd", version: "0x00"}),
//             types.tuple({hashbytes: "0xb0e8c72590d8ec330b75a9089d220dcd6f4d4a6e", version: "0x00"}),
//             types.tuple({hashbytes: "0xd540a8a654c4c0f54f910212ff3b119cb2257bb8", version: "0x00"}),
//             types.tuple({hashbytes: "0xecf08f87f8318a104a46ff8dbee72e761988d8eb", version: "0x00"}),
//             types.tuple({hashbytes: "0xeabc65f3e890fb8bf20d153e95119c72d85765a9", version: "0x00"}),
//             types.tuple({hashbytes: "0x2b19bade75a48768a5ffc142a86490303a95f413", version: "0x00"}),
//         ]

//         let block = chain.mineBlock([
//             Tx.contractCall('poolTemplate1cycle1000stx', 'deposit-stacks', [amount, types.some(hashes[0])], addresses[0].address),
//             Tx.contractCall('poolTemplate1cycle1000stx', 'deposit-stacks', [amount, types.some(hashes[1])], addresses[1].address),
//             Tx.contractCall('poolTemplate1cycle1000stx', 'deposit-stacks', [amount, types.some(hashes[2])], addresses[2].address),
//             Tx.contractCall('poolTemplate1cycle1000stx', 'deposit-stacks', [amount, types.some(hashes[3])], addresses[3].address),
//             Tx.contractCall('poolTemplate1cycle1000stx', 'deposit-stacks', [amount, types.some(hashes[4])], addresses[4].address),
//             Tx.contractCall('poolTemplate1cycle1000stx', 'deposit-stacks', [amount, types.some(hashes[5])], addresses[5].address),
//             Tx.contractCall('poolTemplate1cycle1000stx', 'deposit-stacks', [amount, types.some(hashes[6])], addresses[6].address),
//             Tx.contractCall('poolTemplate1cycle1000stx', 'deposit-stacks', [amount2, types.some(hashes[7])], addresses[7].address),
//             Tx.contractCall('poolTemplate2cycles1000stx', 'deposit-stacks', [amount, types.some(hashes[0])], addresses[0].address),
//             Tx.contractCall('poolTemplate2cycles1000stx', 'deposit-stacks', [amount, types.some(hashes[1])], addresses[1].address),
//             Tx.contractCall('poolTemplate2cycles1000stx', 'deposit-stacks', [amount, types.some(hashes[2])], addresses[2].address),
//             Tx.contractCall('poolTemplate2cycles1000stx', 'deposit-stacks', [amount, types.some(hashes[3])], addresses[3].address),
//             Tx.contractCall('poolTemplate2cycles1000stx', 'deposit-stacks', [amount, types.some(hashes[4])], addresses[4].address),
//             Tx.contractCall('poolTemplate2cycles1000stx', 'deposit-stacks', [amount, types.some(hashes[5])], addresses[5].address),
//             Tx.contractCall('poolTemplate2cycles1000stx', 'deposit-stacks', [amount, types.some(hashes[6])], addresses[6].address),
//             Tx.contractCall('poolTemplate2cycles1000stx', 'deposit-stacks', [amount2, types.some(hashes[7])], addresses[7].address),
//             Tx.contractCall('poolTemplate3cycles1000stx', 'deposit-stacks', [amount, types.some(hashes[0])], addresses[0].address),
//             Tx.contractCall('poolTemplate3cycles1000stx', 'deposit-stacks', [amount, types.some(hashes[1])], addresses[1].address),
//             Tx.contractCall('poolTemplate3cycles1000stx', 'deposit-stacks', [amount, types.some(hashes[2])], addresses[2].address),
//             Tx.contractCall('poolTemplate3cycles1000stx', 'deposit-stacks', [amount, types.some(hashes[3])], addresses[3].address),
//             Tx.contractCall('poolTemplate3cycles1000stx', 'deposit-stacks', [amount, types.some(hashes[4])], addresses[4].address),
//             Tx.contractCall('poolTemplate3cycles1000stx', 'deposit-stacks', [amount, types.some(hashes[5])], addresses[5].address),
//             Tx.contractCall('poolTemplate3cycles1000stx', 'deposit-stacks', [amount, types.some(hashes[6])], addresses[6].address),
//             Tx.contractCall('poolTemplate3cycles1000stx', 'deposit-stacks', [amount2, types.some(hashes[7])], addresses[7].address),
//         ]);
//         let init_min = chain.callReadOnlyFn('ST000000000000000000002AMW42H.pox', 'get-pox-info', [], addresses[0].address)

//         let read_only_block = chain.mineBlock([
//             Tx.contractCall('poolTemplate1cycle1000stx', 'senders-deposited-stx', [], addresses[0].address),
//             Tx.contractCall('poolTemplate1cycle1000stx', 'senders-deposited-stx', [], addresses[1].address),
//             Tx.contractCall('poolTemplate1cycle1000stx', 'senders-deposited-stx', [], addresses[2].address),
//             Tx.contractCall('poolTemplate1cycle1000stx', 'senders-deposited-stx', [], addresses[3].address),
//             Tx.contractCall('poolTemplate1cycle1000stx', 'senders-deposited-stx', [], addresses[4].address),
//             Tx.contractCall('poolTemplate1cycle1000stx', 'senders-deposited-stx', [], addresses[5].address),
//             Tx.contractCall('poolTemplate1cycle1000stx', 'senders-deposited-stx', [], addresses[6].address),
//             Tx.contractCall('poolTemplate1cycle1000stx', 'senders-deposited-stx', [], addresses[7].address),
//             Tx.contractCall('poolTemplate2cycles1000stx', 'senders-deposited-stx', [], addresses[0].address),
//             Tx.contractCall('poolTemplate2cycles1000stx', 'senders-deposited-stx', [], addresses[1].address),
//             Tx.contractCall('poolTemplate2cycles1000stx', 'senders-deposited-stx', [], addresses[2].address),
//             Tx.contractCall('poolTemplate2cycles1000stx', 'senders-deposited-stx', [], addresses[3].address),
//             Tx.contractCall('poolTemplate2cycles1000stx', 'senders-deposited-stx', [], addresses[4].address),
//             Tx.contractCall('poolTemplate2cycles1000stx', 'senders-deposited-stx', [], addresses[5].address),
//             Tx.contractCall('poolTemplate2cycles1000stx', 'senders-deposited-stx', [], addresses[6].address),
//             Tx.contractCall('poolTemplate2cycles1000stx', 'senders-deposited-stx', [], addresses[7].address),
//             Tx.contractCall('poolTemplate3cycles1000stx', 'senders-deposited-stx', [], addresses[0].address),
//             Tx.contractCall('poolTemplate3cycles1000stx', 'senders-deposited-stx', [], addresses[1].address),
//             Tx.contractCall('poolTemplate3cycles1000stx', 'senders-deposited-stx', [], addresses[2].address),
//             Tx.contractCall('poolTemplate3cycles1000stx', 'senders-deposited-stx', [], addresses[3].address),
//             Tx.contractCall('poolTemplate3cycles1000stx', 'senders-deposited-stx', [], addresses[4].address),
//             Tx.contractCall('poolTemplate3cycles1000stx', 'senders-deposited-stx', [], addresses[5].address),
//             Tx.contractCall('poolTemplate3cycles1000stx', 'senders-deposited-stx', [], addresses[6].address),
//             Tx.contractCall('poolTemplate3cycles1000stx', 'senders-deposited-stx', [], addresses[7].address),             
//         ])

//         chain.mineEmptyBlockUntil(150)


//         let second_block = chain.mineBlock([
//             Tx.contractCall('poolTemplate1cycle1000stx', 'toggle-lock', [types.bool(true)], addresses[0].address),
//             Tx.contractCall('poolTemplate1cycle1000stx', 'stake-stx',[types.uint(153)], addresses[0].address),
//         ])
//         let second_min = chain.callReadOnlyFn('ST000000000000000000002AMW42H.pox', 'get-pox-info', [], addresses[0].address)


//         let third_block = chain.mineBlock([
//             Tx.contractCall('poolTemplate2cycles1000stx', 'toggle-lock', [types.bool(true)], addresses[0].address),
//             Tx.contractCall('poolTemplate2cycles1000stx', 'stake-stx',[], addresses[0].address),
//         ])
//         let third_min = chain.callReadOnlyFn('ST000000000000000000002AMW42H.pox', 'get-pox-info', [], addresses[0].address)


//         let forth_block = chain.mineBlock([
//             Tx.contractCall('poolTemplate3cycles1000stx', 'toggle-lock', [types.bool(true)], addresses[0].address),
//             Tx.contractCall('poolTemplate3cycles1000stx', 'stake-stx',[], addresses[0].address),
//         ])
//         let forth_min = chain.callReadOnlyFn('ST000000000000000000002AMW42H.pox', 'get-pox-info', [], addresses[0].address)


//         for(let i = 0; i<24; i++){
//             assert(block.receipts[i].result.expectOk())
//             if (i === 7 || i === 15 || i ===23){
//                 assertEquals(read_only_block.receipts[i].result, types.uint(10000))
//             }else{
//                 assertEquals(read_only_block.receipts[i].result, types.uint(20000))
//             }
//         }
//         assert(second_block.receipts[0].result.expectOk().expectBool(true))
//         assert(second_block.receipts[1].result.expectOk())
//         assert(third_block.receipts[0].result.expectOk().expectBool(true))
//         assert(third_block.receipts[1].result.expectOk())
//         assert(forth_block.receipts[0].result.expectOk().expectBool(true))
//         assert(forth_block.receipts[1].result.expectOk())
//     }
// })

Clarinet.test({
    name: "Protocol can stake even if principal individualy staked",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        let addresses = [
            accounts.get('deployer')!,
            accounts.get('wallet_1')!,
            accounts.get('wallet_2')!,
            accounts.get('wallet_3')!,
            accounts.get('wallet_4')!,
            accounts.get('wallet_5')!,
            accounts.get('wallet_6')!,
            accounts.get('wallet_7')!,
            accounts.get('wallet_8')!,
            accounts.get('faucet')!
        ]

        const amount = types.uint(20000)
        const amount2 = types.uint(10000)

        const hashes = [
            types.tuple({hashbytes: "0x6d78de7b0625dfbfc16c3a8a5735f6dc3dc3f2ce", version: "0x00"}),
            types.tuple({hashbytes: "0x6d78de7b0625dfbfc16c3a8a5735f6dc3dc3f2ce", version: "0x00"}),
            types.tuple({hashbytes: "0x6d78de7b0625dfbfc16c3a8a5735f6dc3dc3f2ce", version: "0x00"}),
            types.tuple({hashbytes: "0x6d78de7b0625dfbfc16c3a8a5735f6dc3dc3f2ce", version: "0x00"}),
            types.tuple({hashbytes: "0x6d78de7b0625dfbfc16c3a8a5735f6dc3dc3f2ce", version: "0x00"}),
            types.tuple({hashbytes: "0x6d78de7b0625dfbfc16c3a8a5735f6dc3dc3f2ce", version: "0x00"}),
            types.tuple({hashbytes: "0x6d78de7b0625dfbfc16c3a8a5735f6dc3dc3f2ce", version: "0x00"}),
            types.tuple({hashbytes: "0x6d78de7b0625dfbfc16c3a8a5735f6dc3dc3f2ce", version: "0x00"}),
            types.tuple({hashbytes: "0x6d78de7b0625dfbfc16c3a8a5735f6dc3dc3f2ce", version: "0x00"}),
            types.tuple({hashbytes: "0x6d78de7b0625dfbfc16c3a8a5735f6dc3dc3f2ce", version: "0x00"}),
        ]

        let block = chain.mineBlock([
            Tx.contractCall('poolTemplate1cycle1000stx', 'deposit-stacks', [amount, types.some(hashes[0])], addresses[0].address),
            Tx.contractCall('poolTemplate1cycle1000stx', 'deposit-stacks', [amount, types.some(hashes[1])], addresses[1].address),
            Tx.contractCall('poolTemplate1cycle1000stx', 'deposit-stacks', [amount, types.some(hashes[2])], addresses[2].address),
            Tx.contractCall('poolTemplate1cycle1000stx', 'deposit-stacks', [amount, types.some(hashes[3])], addresses[3].address),
            Tx.contractCall('poolTemplate1cycle1000stx', 'deposit-stacks', [amount, types.some(hashes[4])], addresses[4].address),
            Tx.contractCall('poolTemplate1cycle1000stx', 'deposit-stacks', [amount, types.some(hashes[5])], addresses[5].address),
            Tx.contractCall('poolTemplate1cycle1000stx', 'deposit-stacks', [amount, types.some(hashes[6])], addresses[6].address),
            Tx.contractCall('poolTemplate1cycle1000stx', 'deposit-stacks', [amount2, types.some(hashes[7])], addresses[7].address),
        ]);

        chain.mineEmptyBlockUntil(150)

        let min = 2291666666000

        let second_block = chain.mineBlock([
            Tx.contractCall('poolTemplate1cycle1000stx', 'toggle-lock', [types.bool(true)], addresses[0].address),
            Tx.contractCall('ST000000000000000000002AMW42H.pox', 'stack-stx', [types.uint(min), hashes[0], types.uint(153), types.uint(1)], addresses[0].address),
            Tx.contractCall('poolTemplate1cycle1000stx', 'stake-stx',[types.uint(153)], addresses[0].address),
        ])


      
        for(let i = 0; i<8; i++){
            assert(block.receipts[i].result.expectOk())
        }
       
        assert(second_block.receipts[0].result.expectOk().expectBool(true))
        assert(second_block.receipts[1].result.expectOk())
        assert(second_block.receipts[2].result.expectOk())
    }
})

// Clarinet.test({
//     name: "0 amount override feuture works correcclty",
//     async fn(chain: Chain, accounts: Map<string, Account>) {
//         let addresses = [
//             accounts.get('deployer')!,
//             accounts.get('wallet_1')!,
//             accounts.get('wallet_2')!,
//             accounts.get('wallet_3')!,
//             accounts.get('wallet_4')!,
//             accounts.get('wallet_5')!,
//             accounts.get('wallet_6')!,
//             accounts.get('wallet_7')!,
//             accounts.get('wallet_8')!,
//             accounts.get('faucet')!
//         ]

//         const amount = types.uint(20000)
        
//         const hashes = [
//             types.tuple({hashbytes: "0x6d78de7b0625dfbfc16c3a8a5735f6dc3dc3f2ce", version: "0x00"}),
//             types.tuple({hashbytes: "0x7321b74e2b6a7e949e6c4ad313035b1665095017", version: "0x00"}),
//             types.tuple({hashbytes: "0x99e2ec69ac5b6e67b4e26edd0e2c1c1a6b9bbd23", version: "0x00"}),
//             types.tuple({hashbytes: "0xa5180cc1ff6050df53f0ab766d76b630e14feb0c", version: "0x00"}),
//             types.tuple({hashbytes: "0x05572d04565d56f67e84ad7e20deedd8e7bba2fd", version: "0x00"}),
//             types.tuple({hashbytes: "0xb0e8c72590d8ec330b75a9089d220dcd6f4d4a6e", version: "0x00"}),
//             types.tuple({hashbytes: "0xd540a8a654c4c0f54f910212ff3b119cb2257bb8", version: "0x00"}),
//             types.tuple({hashbytes: "0xecf08f87f8318a104a46ff8dbee72e761988d8eb", version: "0x00"}),
//             types.tuple({hashbytes: "0xeabc65f3e890fb8bf20d153e95119c72d85765a9", version: "0x00"}),
//             types.tuple({hashbytes: "0x2b19bade75a48768a5ffc142a86490303a95f413", version: "0x00"}),
//         ]


//         let block = chain.mineBlock([
//             Tx.contractCall('poolTemplateForTestingOnly', 'deposit-stacks', [amount, types.some(hashes[0])], addresses[0].address),
//             Tx.contractCall('poolTemplateForTestingOnly', 'deposit-stacks', [amount, types.some(hashes[1])], addresses[1].address),
//             Tx.contractCall('poolTemplateForTestingOnly', 'deposit-stacks', [amount, types.some(hashes[2])], addresses[2].address),
//             Tx.contractCall('poolTemplateForTestingOnly', 'deposit-stacks', [amount, types.some(hashes[3])], addresses[3].address),
//             Tx.contractCall('poolTemplateForTestingOnly', 'deposit-stacks', [amount, types.some(hashes[4])], addresses[4].address),
//             Tx.contractCall('poolTemplateForTestingOnly', 'deposit-stacks', [amount, types.some(hashes[5])], addresses[5].address),
//             Tx.contractCall('poolTemplateForTestingOnly', 'deposit-stacks', [amount, types.some(hashes[6])], addresses[6].address),
//             Tx.contractCall('poolTemplateForTestingOnly', 'deposit-stacks', [amount, types.some(hashes[7])], addresses[7].address),
//             Tx.contractCall('poolTemplateForTestingOnly', 'deposit-stacks', [amount, types.some(hashes[8])], addresses[8].address),
//             Tx.contractCall('poolTemplateForTestingOnly', 'deposit-stacks', [amount, types.some(hashes[9])], addresses[9].address),
//         ]);

//         let second_block = chain.mineBlock([
//             Tx.contractCall('poolTemplateForTestingOnly', 'withdraw-stacks', [], addresses[1].address),
//             Tx.contractCall('poolTemplateForTestingOnly', 'withdraw-stacks', [], addresses[3].address),
//             Tx.contractCall('poolTemplateForTestingOnly', 'withdraw-stacks', [], addresses[7].address),
//         ])

//         let third_block = chain.mineBlock([
//             Tx.contractCall('poolTemplateForTestingOnly', 'deposit-stacks', [amount, types.some(hashes[8])], addresses[8].address),
//             Tx.contractCall('poolTemplateForTestingOnly', 'deposit-stacks', [amount, types.some(hashes[9])], addresses[9].address),
//         ])


//         for(let i = 0; i<8; i++){
//             assert(block.receipts[i].result.expectOk())
//         }

//         assertEquals(block.receipts[8].result.expectErr(), types.uint(1))
//         assertEquals(block.receipts[9].result.expectErr(), types.uint(1))

       
//         assert(second_block.receipts[0].result.expectOk())
//         assert(second_block.receipts[1].result.expectOk())
//         assert(second_block.receipts[1].result.expectOk())

//         assert(third_block.receipts[0].result.expectOk())
//         assert(third_block.receipts[1].result.expectOk())

//         assertEquals(chain.callReadOnlyFn('poolTemplateForTestingOnly', 'get-contract-balance', [], addresses[0].address)['result'], types.uint(140000000000))
        
//         let res = chain.callReadOnlyFn('poolTemplateForTestingOnly', 'senders-btc-credentials', [], addresses[8].address).result.expectTuple()
//         assertEquals(res['hashbytes'], "0xeabc65f3e890fb8bf20d153e95119c72d85765a9")
//         assertEquals(res['version'], "0x00")

//         res = chain.callReadOnlyFn('poolTemplateForTestingOnly', 'senders-btc-credentials', [], addresses[9].address).result.expectTuple()
//         assertEquals(res['hashbytes'], "0x2b19bade75a48768a5ffc142a86490303a95f413")
//         assertEquals(res['version'], "0x00")


//         assertEquals(chain.callReadOnlyFn('poolTemplateForTestingOnly', 'senders-deposited-stx', [], addresses[8].address)['result'], types.uint(20000))
//         assertEquals(chain.callReadOnlyFn('poolTemplateForTestingOnly', 'senders-deposited-stx', [], addresses[9].address)['result'], types.uint(20000))
//         assertEquals(chain.callReadOnlyFn('poolTemplateForTestingOnly', 'get-senders-id', [], addresses[8].address).result.expectSome(), types.uint(1))
//         assertEquals(chain.callReadOnlyFn('poolTemplateForTestingOnly', 'get-senders-id', [], addresses[9].address).result.expectSome(), types.uint(3))
//     }
// })

Clarinet.test({
    name: "Pool drains funds from vault if limit not met",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        let addresses = [
            accounts.get('deployer')!,
            accounts.get('wallet_1')!,
        ]

        const amount = types.uint(1000)
        const vault = types.uint(150000)

        const hashes = [
            types.tuple({hashbytes: "0x6d78de7b0625dfbfc16c3a8a5735f6dc3dc3f2ce", version: "0x00"}),
            types.tuple({hashbytes: "0x6d78de7b0625dfbfc16c3a8a5735f6dc3dc3f2ce", version: "0x00"}),
        ]

        let block = chain.mineBlock([
            Tx.contractCall('poolTemplate1cycle1000stx', 'deposit-stacks', [amount, types.some(hashes[1])], addresses[1].address),
            Tx.contractCall('vault', 'fundVault', [vault], addresses[0].address)
        ]);

        chain.mineEmptyBlockUntil(150)

        let second_block = chain.mineBlock([
            Tx.contractCall('poolTemplate1cycle1000stx', 'toggle-lock', [types.bool(true)], addresses[0].address),
            Tx.contractCall('poolTemplate1cycle1000stx', 'stake-stx',[types.uint(153)], addresses[0].address),
        ])



      
        assert(block.receipts[0].result.expectOk())
        assert(block.receipts[1].result.expectOk())

        assertEquals(chain.callReadOnlyFn('vault', 'get-balance-in-first-pool', [], addresses[0].address)['result'], types.some(types.uint(149000000000)))

        assert(second_block.receipts[0].result.expectOk().expectBool(true))
        assert(second_block.receipts[1].result.expectOk().expectUint(1000))
    }
})

Clarinet.test({
    name: "Stake returns correct code if vault is empty and limit not met",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        let addresses = [
            accounts.get('deployer')!,
            accounts.get('wallet_1')!,
        ]

        const amount = types.uint(1000)

        const hashes = [
            types.tuple({hashbytes: "0x6d78de7b0625dfbfc16c3a8a5735f6dc3dc3f2ce", version: "0x00"}),
            types.tuple({hashbytes: "0x6d78de7b0625dfbfc16c3a8a5735f6dc3dc3f2ce", version: "0x00"}),
        ]

        let block = chain.mineBlock([
            Tx.contractCall('poolTemplate1cycle1000stx', 'deposit-stacks', [amount, types.some(hashes[1])], addresses[1].address),
        ]);

        chain.mineEmptyBlockUntil(150)

        let second_block = chain.mineBlock([
            Tx.contractCall('poolTemplate1cycle1000stx', 'toggle-lock', [types.bool(true)], addresses[0].address),
            Tx.contractCall('poolTemplate1cycle1000stx', 'stake-stx',[types.uint(153)], addresses[0].address),
        ])
      
        assert(block.receipts[0].result.expectOk())

        assert(second_block.receipts[0].result.expectOk().expectBool(true))
        assert(second_block.receipts[1].result.expectErr().expectUint(16))
    }
})

// Clarinet.test({
//     name: "Test that only deployer and approved protocols can interact with the vault",
//     async fn(chain: Chain, accounts: Map<string, Account>) {
//         let addresses = [
//             accounts.get('deployer')!,
//             accounts.get('wallet_1')!,
//         ]

//         const amount = types.uint(1000)
//         const amount2 = types.uint(150000)

//         const hashes = [
//             types.tuple({hashbytes: "0x6d78de7b0625dfbfc16c3a8a5735f6dc3dc3f2ce", version: "0x00"}),
//             types.tuple({hashbytes: "0x6d78de7b0625dfbfc16c3a8a5735f6dc3dc3f2ce", version: "0x00"}),
//         ]

//         let block = chain.mineBlock([
//             Tx.contractCall('unauthorizedPool', 'deposit-stacks', [amount, types.some(hashes[1])], addresses[1].address),
//             Tx.contractCall('vault', 'fundVault', [amount2], addresses[0].address),
//         ]);

//         chain.mineEmptyBlockUntil(150)

//         let second_block = chain.mineBlock([
//             Tx.contractCall('unauthorizedPool', 'toggle-lock', [types.bool(true)], addresses[0].address),
//             Tx.contractCall('unauthorizedPool', 'stake-stx',[], addresses[0].address),
//             Tx.contractCall('vault', 'fundVault', [amount], addresses[1].address),
//             Tx.contractCall('vault', 'withdrawAmount', [amount], addresses[1].address),
//         ])

//         assert(block.receipts[0].result.expectOk())
//         assert(block.receipts[1].result.expectOk())

//         assert(second_block.receipts[0].result.expectOk().expectBool(true))
//         assert(second_block.receipts[1].result.expectErr().expectUint(17))
//         assert(second_block.receipts[2].result.expectErr().expectUint(15))
//         assert(second_block.receipts[3].result.expectErr().expectUint(15))
//     }
// })

Clarinet.test({
    name: "Pool returns funds to vault after staking",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        let addresses = [
            accounts.get('deployer')!,
            accounts.get('wallet_1')!,
        ]

        const amount = types.uint(1000)
        const vault = types.uint(150000)

        const hashes = [
            types.tuple({hashbytes: "0x6d78de7b0625dfbfc16c3a8a5735f6dc3dc3f2ce", version: "0x00"}),
            types.tuple({hashbytes: "0x6d78de7b0625dfbfc16c3a8a5735f6dc3dc3f2ce", version: "0x00"}),
        ]

        let block = chain.mineBlock([
            Tx.contractCall('poolTemplate1cycle1000stx', 'deposit-stacks', [amount, types.some(hashes[1])], addresses[1].address),
            Tx.contractCall('vault', 'fundVault', [vault], addresses[0].address)
        ]);

        chain.mineEmptyBlockUntil(150)

        let second_block = chain.mineBlock([
            Tx.contractCall('poolTemplate1cycle1000stx', 'toggle-lock', [types.bool(true)], addresses[0].address),
            Tx.contractCall('poolTemplate1cycle1000stx', 'stake-stx',[types.uint(153)], addresses[0].address),
            Tx.contractCall('poolTemplate1cycle1000stx', 'toggle-lock', [types.bool(false)], addresses[0].address),
        ])

        assert(block.receipts[0].result.expectOk())
        assert(block.receipts[1].result.expectOk())

        assertEquals(chain.callReadOnlyFn('vault', 'get-balance-in-first-pool', [], addresses[0].address)['result'], types.some(types.uint(149000000000)))
        assertEquals(chain.callReadOnlyFn('poolTemplate1cycle1000stx', 'get-contract-balance', [], addresses[0].address)['result'], types.uint(150000000000))

        assert(second_block.receipts[0].result.expectOk().expectBool(true))
        assert(second_block.receipts[1].result.expectOk().expectUint(1000))
        assert(second_block.receipts[2].result.expectOk().expectBool(true))

        let third_block = chain.mineBlock([
            Tx.contractCall('poolTemplate1cycle1000stx', 'return-to-pool',[], addresses[0].address),
        ])

        assert(third_block.receipts[0].result.expectOk())
        assertEquals(chain.callReadOnlyFn('vault', 'get-balance-in-first-pool', [], addresses[0].address)['result'], types.some(types.uint(0)))
        assertEquals(chain.callReadOnlyFn('poolTemplate1cycle1000stx', 'get-contract-balance', [], addresses[0].address)['result'], types.uint(1000000000))   
    }
})

Clarinet.test({
    name: "Test credentials",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        let addresses = [
            accounts.get('deployer')!,
            accounts.get('wallet_1')!,
        ]

        const amount = types.uint(1000)

        const hashes = [
            types.tuple({hashbytes: "0x6d78de7b0625dfbfc16c3a8a5735f6dc3dc3f2ce", version: "0x00"}),
        ]

        let block = chain.mineBlock([
            Tx.contractCall('poolTemplate1cycle1000stx', 'deposit-stacks', [amount, types.some(hashes[0])], addresses[1].address),
        ]);
        chain.mineEmptyBlockUntil(150)


        assert(block.receipts[0].result.expectOk())

    
        assertEquals(chain.callReadOnlyFn('poolTemplate1cycle1000stx', 'senders-btc-credentials', [], addresses[1].address)['result'], "{hashbytes: 0x6d78de7b0625dfbfc16c3a8a5735f6dc3dc3f2ce, version: 0x00}")

    }
})






