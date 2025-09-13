# __PoolTemplate contract__

## __Introduction__
PoolTemplate allows users to deposit from 1000 up to 20000 stx in a stacking pool and get tickets in return for the block reward when elected. Users get 1 ticket for every 1000 stx they deposit. The winner is elected through the vrf of the block that initiated the staking call (more details in the corresponding part). After the Lock period users can either withdraw their stacks or let them in the contract and reparticipate after the upcoming cycle.
There are 3 templates each one corresponds to the max number of cycles the staking will take, meaning that the winner will grant himself more awards.


The roles in this smart contract are described below:
- __users__ - They deposit and withdraw stx
- __deployer__ (__creator__ of the contract) - locks/unlocks the contract, initiates staking, is responsible for the deployment

Any Stx account can become a _user_

## __Public Functions__

### deposit-stacks
__input__: uint, (optional (tuple (hashbytes (buff 20)) (version (buff 1))))

__output__: (response bool uint)

__signature__: (deposit-stacks amount pox-addr)​

__description__: :​

On user's first call he needs to provide an egible pox-addr in order to register and a valid amount of stx.
After the initial call he only needs to provite a valid amount of stx. 
If the limit of 150K stx is reached then the contract locks it self.

### withdraw-stacks
__input__: 

__output__: (response bool uint)

__signature__: (deposit-stacks)​

__description__: :​

If contract not locked user can withdraw all the stx he deposited.

### toggle-lock
__input__: bool

__output__: (response bool uint)

__signature__: (toggle-lock lock)​

__description__: :​

Can be called only by the __deployer__ , locks and unlocks the contract, its called before the staking action in order to pause deposits and withdraws and re unlocks the contract after the Reward phase to re-enable those actions.

### stake-stx

__input__: 

__output__: (response uint uint)

__signature__: (stake-stx)​

__description__: :​

Can be called only by the __deployer__ , requires that the contract is locked and that the minimum required balance has been met. It elects the winner of this reward cycle and initiate the staking. If the limit is not reached then the contract drains the missing funds from the vault contract and procceeds the staking. Vault funds dont participate in the election of the winner.


### return-to-pool

__input__: 

__output__: (response uint uint)

__signature__: (return-to-pool)​

__description__: :​

Can be called only by the __deployer__ , requires that the contract is not locked, returns the funds drained by the vault contract.



### change-btc-credentials
__input__: (tuple (hashbytes (buff 20)) (version (buff 1)))

__output__: (response bool uint)

__signature__: (change-btc-credentials pox-addr)

__description__: :

User can change his btc credentials if staking has not been initiated


## __Private Functions__

### register-new-user

__input__: (tuple (hashbytes (buff 20)) (version (buff 1)))

__output__: (response bool uint)

__signature__: (register-new-user pox-addr)​

__description__: :​

It's called internaly on user's initial deposit. First it checks if the max number of user registered is reached. If not then registers the user and procceeds to the action of deposit. If max number is met then it scans all registered users balances and register the new user in the place of the first with 0 amount found. If none found then exits with err. 

### get-winner

__input__: 

__output__: (response (tuple (hashbytes (buff 20)) (version (buff 1))) uint)

__signature__: (get-winner)​

__description__: :​

It's called internaly by the __stake-stx__ function. It filters the registered users and construct a list with the eligible ones (current deposit amount > 0), then construct a new list with the tickets each valid user has . Each ticket costs 1000 stx. Finally it calls the ___vrf-to-uint___ contract, and elects the winner for the upcoming reward phase.

## __Error codes__

### NOT_VALID_REGISTRATION 
__type__: uint

__value__: u1
### NOT_REGISTERED_YET
__type__: uint

__value__: u2
### CC_TX_SENDER_DONT_MATCH 
__type__: uint

__value__: u3
### NOT_VALID_AMOUNT
__type__: uint

__value__: u4
### CONTRACT_IS_LOCKED
__type__: uint

__value__: u5
### FAILED_WITHDREW 
__type__: uint

__value__: u6
### CONTRACT_NOT_LOCKED
__type__: uint

__value__: u8
### NOT_VALID_SENDER 
__type__: uint

__value__: u10
### PROVIDE_VALID_TUPLE 
__type__: uint

__value__: u7
### NEED_TO_DEPOSIT_FIRST 
__type__: uint

__value__: u12
### MAX_PARTICIPANTS_REACHED
__type__: uint

__value__: u13

## __Usefull contract variables and mapping__

### stx-to-btc
__type__: map

__value__:  { stx-address: principal } { btc-address: (tuple (hashbytes (buff 20)) (version (buff 1)))})

__description__: 

Maps the user's stx address to the corresponing btc address

### participant-to-id 
__type__: map

__value__:  principal uint

__description__: 

Maps the user's stx address to a unique uint identifier

### id-to-participant uint {address: principal, value: uint})
__type__: map

__value__:  uint {address: principal, value: uint})

__description__: 
Maps user's unique uint identifier to a tuple of user's address and deposited stx amount


### participants 
__type__: var

__value__:  uint 

__description__: 

Total registered participants (capped at a given limit)

### is-locked
__type__: var

__value__:  bool

__description__: 
Locks/Unlocks the contract













