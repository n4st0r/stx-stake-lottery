import { useConnect } from "@stacks/connect-react";
import { StacksMocknet, StacksNetwork, StacksTestnet } from "@stacks/network";
import { c32address, c32ToB58, b58ToC32} from 'c32check';
// const createHash = require("sha256-uint8array").createHash;



import {
  AnchorMode,
  PostConditionMode,
  uintCV,
  tupleCV,
  someCV,
  bufferCV,
  trueCV,
  falseCV,
  contractPrincipalCV,
  standardPrincipalCV
} from "@stacks/transactions";
import { stringCV } from "@stacks/transactions/dist/clarity/types/stringCV";
import {callReadOnlyFunction} from "@stacks/transactions";
import { useState } from "react";
import { userSession } from "./ConnectWallet";


const ContractCallVote = () => {
  const [amount, setAmount] = useState(0)

  const { doContractCall , doSTXTransfer} = useConnect();

  const recipients = ['ST2ST2H80NP5C9SPR4ENJ1Z9CDM9PKAJVPYWPQZ50', 'ST2Y2SFNVZBT8SSZ00XXKH930MCN0RFREB2GQG7CJ', 'STPJ2HPED2TMR1HAFBFA5VQF986CRD4ZWHH36F6X', 'ST2GG57WCVCS6AAVSKRHSKP10HJTQZ0M4AVTM0NAQ', 'ST2MYTDA2X4GTTPG6G0VC6XFF3FMHNC2HGVC6SE3C']

  function fund_accounts() {
    recipients.map((recipient) => 
      doSTXTransfer({
        network: new StacksTestnet(),
        recipient: recipient,
        amount: 201000 *10**6,
        onFinish: (data) => {
          console.log("onFinish:", data);
          window
            .open(
              `https://explorer.stacks.co/txid/${data.txId}?chain=devnet`,
              "_blank"
            )
            .focus();
        },
        onCancel: () => {
          console.log("onCancel:", "Transaction was canceled");
        },
    })
    )
  }

  function deposit(amount) {
    let buffer = Buffer.from('5f903ddca524fc8e004b624a9de0fdb16c719076', 'hex')
    let ver = Buffer.from("00", 'hex')

    doContractCall({
      network: new StacksTestnet(),
      anchorMode: AnchorMode.Any,
      contractAddress: "ST1FS0FEWMMJFS3G09DH4N7F0ZPRPRWCGEVANT3DK",
      contractName: "poolTemplate1cycle1000stx",
      functionName: "deposit-stacks",
      functionArgs: [uintCV(amount), someCV(tupleCV({hashbytes: bufferCV(buffer), version: bufferCV(ver)}))],
      postConditionMode: PostConditionMode.Allow,
      postConditions: [],
      
      onFinish: (data) => {
        console.log("onFinish:", data);
        window
          .open(
            `https://explorer.stacks.co/txid/${data.txId}?chain=testnet`,
            "_blank"
          )
          .focus();
      },
      onCancel: () => {
        console.log("onCancel:", "Transaction was canceled");
      },
    });
  }

  function change_cred() {
    let buffer = Buffer.from('3a7ae1947a68ae653365367a9af0a5cb54a9d692', 'hex')
    let ver = Buffer.from("00", 'hex')

    doContractCall({
      network: new StacksTestnet(),
      anchorMode: AnchorMode.Any,
      contractAddress: "ST1FS0FEWMMJFS3G09DH4N7F0ZPRPRWCGEVANT3DK",
      contractName: "poolTemplate1cycle1000stx",
      functionName: "change-btc-credentials",
      functionArgs: [tupleCV({hashbytes: bufferCV(buffer), version: bufferCV(ver)})],
      postConditionMode: PostConditionMode.Allow,
      postConditions: [],
      
      onFinish: (data) => {
        console.log("onFinish:", data);
        window
          .open(
            `https://explorer.stacks.co/txid/${data.txId}?chain=devnet`,
            "_blank"
          )
          .focus();
      },
      onCancel: () => {
        console.log("onCancel:", "Transaction was canceled");
      },
    });
  }


  function fundVault() {

    doContractCall({
      network: new StacksTestnet(),
      anchorMode: AnchorMode.Any,
      contractAddress: "ST1FS0FEWMMJFS3G09DH4N7F0ZPRPRWCGEVANT3DK",
      contractName: "vault",
      functionName: "fundVault",
      functionArgs: [uintCV(amount)],
      postConditionMode: PostConditionMode.Allow,
      postConditions: [],
      
      onFinish: (data) => {
        console.log("onFinish:", data);
        window
          .open(
            `https://explorer.stacks.co/txid/${data.txId}?chain=devnet`,
            "_blank"
          )
          .focus();
      },
      onCancel: () => {
        console.log("onCancel:", "Transaction was canceled");
      },
    });
  }

  function withdrawfromvault(amount) {

    doContractCall({
      network: new StacksTestnet(),
      anchorMode: AnchorMode.Any,
      contractAddress: "ST1FS0FEWMMJFS3G09DH4N7F0ZPRPRWCGEVANT3DK",
      contractName: "vault",
      functionName: "withdrawAmount",
      functionArgs: [uintCV(amount)],
      postConditionMode: PostConditionMode.Allow,
      postConditions: [],
      
      onFinish: (data) => {
        console.log("onFinish:", data);
        window
          .open(
            `https://explorer.stacks.co/txid/${data.txId}?chain=devnet`,
            "_blank"
          )
          .focus();
      },
      onCancel: () => {
        console.log("onCancel:", "Transaction was canceled");
      },
    });
  }

  function withdraw() {

    doContractCall({
      network: new StacksTestnet(),
      anchorMode: AnchorMode.Any,
      contractAddress: "ST1FS0FEWMMJFS3G09DH4N7F0ZPRPRWCGEVANT3DK",
      contractName: "poolTemplate1cycle1000stx",
      functionName: "withdraw-stacks",
      functionArgs: [],
      postConditionMode: PostConditionMode.Allow,
      postConditions: [],
      
      onFinish: (data) => {
        console.log("onFinish:", data);
        window
          .open(
            `https://explorer.stacks.co/txid/${data.txId}?chain=devnet`,
            "_blank"
          )
          .focus();
      },
      onCancel: () => {
        console.log("onCancel:", "Transaction was canceled");
      },
    });
  }

  function stake(amount) {

    doContractCall({
      network: new StacksTestnet(),
      anchorMode: AnchorMode.Any,
      contractAddress: "ST1FS0FEWMMJFS3G09DH4N7F0ZPRPRWCGEVANT3DK",
      contractName: "poolTemplate1cycle1000stx",
      functionName: "stake-stx",
      functionArgs: [uintCV(amount)],
      postConditionMode: PostConditionMode.Allow,
      postConditions: [],
      
      onFinish: (data) => {
        console.log("onFinish:", data);
        window
          .open(
            `https://explorer.stacks.co/txid/${data.txId}?chain=devnet`,
            "_blank"
          )
          .focus();
      },
      onCancel: () => {
        console.log("onCancel:", "Transaction was canceled");
      },
    });
  }

  function lock_contract() {

    doContractCall({
      network: new StacksTestnet(),
      anchorMode: AnchorMode.Any,
      contractAddress: "ST1FS0FEWMMJFS3G09DH4N7F0ZPRPRWCGEVANT3DK",
      contractName: "poolTemplate1cycle1000stx",
      functionName: "toggle-lock",
      functionArgs: [trueCV()],
      postConditionMode: PostConditionMode.Allow,
      postConditions: [],
      
      onFinish: (data) => {
        console.log("onFinish:", data);
        window
          .open(
            `https://explorer.stacks.co/txid/${data.txId}?chain=devnet`,
            "_blank"
          )
          .focus();
      },
      onCancel: () => {
        console.log("onCancel:", "Transaction was canceled");
      },
    });
  }
  
  function unlock_contract() {

    doContractCall({
      network: new StacksTestnet(),
      anchorMode: AnchorMode.Any,
      contractAddress: "ST1FS0FEWMMJFS3G09DH4N7F0ZPRPRWCGEVANT3DK",
      contractName: "poolTemplate1cycle1000stx",
      functionName: "toggle-lock",
      functionArgs: [falseCV()],
      postConditionMode: PostConditionMode.Allow,
      postConditions: [],
      
      onFinish: (data) => {
        console.log("onFinish:", data);
        window
          .open(
            `https://explorer.stacks.co/txid/${data.txId}?chain=devnet`,
            "_blank"
          )
          .focus();
      },
      onCancel: () => {
        console.log("onCancel:", "Transaction was canceled");
      },
    });
  }

  function direct_stake() {

    let buffer = Buffer.from('99e2ec69ac5b6e67b4e26edd0e2c1c1a6b9bbd23', 'hex')
    let ver = Buffer.from("00", 'hex')
    // const btcChecked = address.fromBase58Check('muYdXKmX9bByAueDe6KFfHd5Ff1gdN9ErG');
    // const version = (btcChecked.version === 111) ? Buffer.from('00', 'hex') : Buffer.from('01', 'hex');
    doContractCall({
      network: new StacksTestnet(),
      anchorMode: AnchorMode.Any,
      contractAddress: "ST000000000000000000002AMW42H",
      contractName: "pox",
      functionName: "stack-stx",
      functionArgs: [uintCV(50000000000000), tupleCV({hashbytes: bufferCV(buffer), version: bufferCV(ver)}), uintCV(264), uintCV(2) ],
      postConditionMode: PostConditionMode.Allow,
      postConditions: [],
      
      onFinish: (data) => {
        console.log("onFinish:", data);
        window
          .open(
            `https://explorer.stacks.co/txid/${data.txId}?chain=devnet`,
            "_blank"
          )
          .focus();
      },
      onCancel: () => {
        console.log("onCancel:", "Transaction was canceled");
      },
    });
  }                

  async function get_pox_info() {

    let result = await callReadOnlyFunction({
      network: new StacksTestnet(),
      contractAddress: "ST000000000000000000002AMW42H",
      contractName: "pox",
      functionName: "get-pox-info",
      functionArgs: [],
      senderAddress: 'ST1FS0FEWMMJFS3G09DH4N7F0ZPRPRWCGEVANT3DK',
    });
    console.log(result)
  }

  async function get_stacker_info() {

    let result = await callReadOnlyFunction({
      network: new StacksTestnet(),
      contractAddress: "ST000000000000000000002AMW42H",
      contractName: "pox",
      functionName: "get-stacker-info",
      functionArgs: [contractPrincipalCV("ST1FS0FEWMMJFS3G09DH4N7F0ZPRPRWCGEVANT3DK", "poolTemplate1cycle1000stx")],
      senderAddress: 'ST1FS0FEWMMJFS3G09DH4N7F0ZPRPRWCGEVANT3DK',
    });
    console.log(result)
    result = await callReadOnlyFunction({
      network: new StacksTestnet(),
      contractAddress: "ST000000000000000000002AMW42H",
      contractName: "pox",
      functionName: "get-stacker-info",
      functionArgs: [standardPrincipalCV("ST1FS0FEWMMJFS3G09DH4N7F0ZPRPRWCGEVANT3DK")],
      senderAddress: 'ST1FS0FEWMMJFS3G09DH4N7F0ZPRPRWCGEVANT3DK',
    });
    console.log(result)
  }

  async function get_next_burn_height() {

    let result = await callReadOnlyFunction({
      network: new StacksTestnet(),
      contractAddress: "ST1FS0FEWMMJFS3G09DH4N7F0ZPRPRWCGEVANT3DK",
      contractName: "poolTemplate1cycle1000stx",
      functionName: "get-next-burn-height",
      functionArgs: [],
      senderAddress: 'ST1FS0FEWMMJFS3G09DH4N7F0ZPRPRWCGEVANT3DK',
    });
    console.log(result)
  }

  async function get_cycle_winner(amount) {

    let result = await callReadOnlyFunction({
      network: new StacksTestnet(),
      contractAddress: "ST1FS0FEWMMJFS3G09DH4N7F0ZPRPRWCGEVANT3DK",
      contractName: "poolTemplate1cycle1000stx",
      functionName: "get-cycle-winner",
      functionArgs: [uintCV(amount)],
      senderAddress: 'ST1FS0FEWMMJFS3G09DH4N7F0ZPRPRWCGEVANT3DK',
    });
    console.log(c32address(result.value.address.version, result.value.address.hash160))
  }

  async function get_cred(address) {

    // let result = await callReadOnlyFunction({
    //   network: new StacksTestnet(),
    //   contractAddress: "ST1FS0FEWMMJFS3G09DH4N7F0ZPRPRWCGEVANT3DK",
    //   contractName: "poolTemplate1cycle1000stx",
    //   functionName: "senders-btc-credentials",
    //   functionArgs: [],
    //   senderAddress: address,
    // });
    let buf = '73d32ac9e4330a071ee1b3a9ccf3997bdd4174d0'
    let ver = 196
    // console.log(result)
    console.log("BTC :" , c32ToB58(c32address(1, buf.toString("hex")), ver))
  }

  async function getid(amount) {

    let result = await callReadOnlyFunction({
      network: new StacksTestnet(),
      contractAddress: "ST1FS0FEWMMJFS3G09DH4N7F0ZPRPRWCGEVANT3DK",
      contractName: "poolTemplate1cycle1000stx",
      functionName: "id-to-part",
      functionArgs: [uintCV(amount)],
      senderAddress: 'ST1FS0FEWMMJFS3G09DH4N7F0ZPRPRWCGEVANT3DK',
    });
    console.log("STX :" , c32address(result.value.data.addr.address.version, result.value.data.addr.address.hash160))
  }

  async function is_locked() {

    let result = await callReadOnlyFunction({
      network: new StacksTestnet(),
      contractAddress: "ST1FS0FEWMMJFS3G09DH4N7F0ZPRPRWCGEVANT3DK",
      contractName: "poolTemplate1cycle1000stx",
      functionName: "check-locked",
      functionArgs: [],
      senderAddress: 'ST1FS0FEWMMJFS3G09DH4N7F0ZPRPRWCGEVANT3DK',
    });
    console.log(result)
  }
  


  
  if (!userSession.isUserSignedIn()) {
    return null;
  }


  return (
    <div>
      <p>Vote via Smart Contract</p>
      <div>
        <input placeholder={"Amount"} onChange={(e) => setAmount(e.target.value)} />
        <button className="Vote" onClick={() => deposit(amount)}>
          Deposit STX
        </button>
      </div>
      <div>
        <button className="Vote" onClick={() => fund_accounts()}>
        Fund accounts
        </button>
      </div>
      <div>
        <button className="Vote" onClick={() => fundVault(amount)}>
        fundVault
        </button>
      </div>
      <div>
        <button className="Vote" onClick={() =>withdraw()}>
       Withdraw Funds
        </button>
      </div>
      <div>
        <button className="Vote" onClick={() => lock_contract()}>
        Lock
        </button>
      </div>
      <div>
        <button className="Vote" onClick={() => unlock_contract()}>
        UnLock
        </button>
      </div>
      <div>
        <button className="Vote" onClick={() => stake(amount)}>
        Stake Funds
        </button>
      </div>
      <div>
        <button className="Vote" onClick={() => get_pox_info()}>
        Pox Info
        </button>
      </div>
      <div>
        <button className="Vote" onClick={() => direct_stake()}>
        Direct Stake
        </button>
      </div>
      <div>
        <button className="Vote" onClick={() => get_next_burn_height()}>
        Info
        </button>
      </div>
      <div>
        <button className="Vote" onClick={() => get_cycle_winner(amount)}>
        winner
        </button>
      </div>
      <div>
        <button className="Vote" onClick={() =>get_cred(amount)}>
        Get Btc Address
        </button>
      </div>
      <div>
        <button className="Vote" onClick={() =>getid(amount)}>
        Get Stx Address
        </button>
      </div>
      <div>
        <button className="Vote" onClick={() =>get_stacker_info()}>
        Get Stacker Info
        </button>
      </div>
      <div>
        <button className="Vote" onClick={() =>is_locked()}>
        Is locked
        </button>
      </div>
      <div>
        <button className="Vote" onClick={() =>change_cred()}>
        Cred ch
        </button>
      </div>
      <div>
        <button className="Vote" onClick={() =>withdrawfromvault(amount)}>
        Withdraw vault
        </button>
      </div>
    </div>
  );
};

export default ContractCallVote;
