# __Vrf-to-uint contract__

## __Introduction__
Contract is based on the implementation of citycoins-vrf-v1.

## __Public Functions__

### get-rnd
__input__: uint

__output__: (response uint uint)

__signature__: (get-rnd total-tickets)​

__description__: :​

Takes as input the total tickets sold from the poolTemplate contract, then it retreives the vrf of the last minted block and converts it to a uint. Finally it calculates the mod of the produced uint with the number of sold tickets. The winner is the ticket at the index of the returned uint in the participants list. 


## __Private Functions__

### lower-16-le (vrfSeed (buff 32)))

__input__: buff(32)

__output__: uint

__signature__: (lower-16-le vrfSeed)​

__description__: :​

It takes as input the vrf bytestring, for each Byte in the lower 16 bracket it calls the __lower-16-le-inner__ private function with inputs:

__byte__ = the corresponding byte buffer
  
__pos__ = 31 - (index of the byte in the initial vrf bytestring)

Finally it adds all the returned values and produces the final uint

### lower-16-le-inner
__input__: (optional (buff 1)) uint

__output__: uint

__signature__: (lower-16-le-inner byte pos)

__description__: 

It exports the index of the given byte buffer in a bytestring consisted of all the possible outcomes from 0x00 to 0xff. Then it multiplies the result with 2^(8*pos) producing the final uint