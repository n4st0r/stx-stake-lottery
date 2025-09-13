# __Vault contract__

## __Introduction__
Vault contract is used by Pooltemplate contracts in order to reach the minimum stacking amount, all actions are automated so no action is needed.


The roles in this smart contract are described below:
- __deployer__ (__creator__ of the contract) - locks/unlocks the contract, initiates staking, is responsible for the deployment
- __poolTemplate__ allowed poolContracts that can interact with the Vault contract


## __Public Functions__

### fundVault
__input__: uint

__output__: (response bool uint)

__signature__: (fundVault amount)​

__description__: :​

Can only be called by the deployer, deployer adds stx funds in the vault for the pools to borrow.

### withdrawAmount
__input__: uint

__output__: (response bool uint)

__signature__: (withdrawAmount amount)​

__description__: :​

Deployer can withdraw a certain amount of available stx in the Vault contract. Can only be called by the deployer.

### provideToPool
__input__: uint

__output__: (response bool uint)

__signature__: (provideToPool amount)​

__description__: :​

Can only be called by the allowed poolTemplates contracts through the stake function and only if the iniator of the transaction is the deployer. It provides the requested amount of ustx to the poolTemplate contract and updates the vaults state accordingly.

### withdrawFromPool

__input__: 

__output__: (response bool uint)

__signature__: (withdrawFromPool)​

__description__: :​

Can only be called by the allowed poolTemplates contracts through the __return-to-pool__ function and only if the iniator of the transaction is the deployer. It returns the borrowed amount to the vault contract and updates state accordingly



## __Error codes__

### NOT_VALID_SENDER
__type__: uint

__value__: u15
### NOT_ENOUGH_FUNDS
__type__: uint

__value__: u16
### NOT_VALID_CALLER
__type__: uint

__value__: u17



## __Usefull contract variables and mapping__

### allowed
__type__: list 3 principal

__value__:  (list 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.poolTemplate 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.poolTemplate2cycles 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.poolTemplate3cycles)


__description__: 

List of the allowed poolTemplates that can interact with the vault contract

### contract-to-deposited-amount
__type__: map

__value__:  principal uint

__description__: 

Maps that keeps track of the lended ustx to every alloed poolTemplate contract
