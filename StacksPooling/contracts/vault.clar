
;; vault
;; Deployer funds the vault with stx , in order to pull the required amount to hit the minimum threshhold

;;constant
(define-constant deployer tx-sender)
(define-constant NOT_VALID_SENDER (err u15))
(define-constant NOT_ENOUGH_FUNDS (err u16))
(define-constant NOT_VALID_CALLER (err u17))


(define-data-var allowed (list 2 principal) (list 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.poolTemplate1cycle1000stx 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.poolTemplate1cycle1000stxS ))
(define-map contract-to-deposited-amount principal uint)

(define-public (fundVault (amount uint)) 
    (begin
        (asserts! (is-eq tx-sender deployer) NOT_VALID_SENDER)
        (stx-transfer? (* amount (pow u10 u6)) tx-sender (as-contract tx-sender))
    )
)


(define-public (withdrawAmount (amount uint))
    (let (
        (receipient tx-sender)
    )
        (asserts! (is-eq tx-sender deployer) NOT_VALID_SENDER)
        (asserts! (<= amount (stx-get-balance (as-contract tx-sender))) NOT_ENOUGH_FUNDS)
        (as-contract (stx-transfer? amount (as-contract tx-sender) receipient))
    )
)


(define-public (provideToPool (amount uint))
    (let
        (
            (caller contract-caller)
        )
        (asserts! (is-eq deployer tx-sender) NOT_VALID_SENDER)
        (asserts! (is-some (index-of (var-get allowed) caller)) NOT_VALID_CALLER)
        (asserts! (<= amount (stx-get-balance (as-contract tx-sender))) NOT_ENOUGH_FUNDS)
        (match (map-get? contract-to-deposited-amount tx-sender)
            value (map-set contract-to-deposited-amount caller (+ value amount))
            (map-set contract-to-deposited-amount caller amount)
        )
        (as-contract (stx-transfer? amount (as-contract tx-sender) caller))
    )
)

(define-public (withdrawFromPool) 
    (let
        (
            (caller contract-caller)
        )
        (asserts! (is-eq deployer tx-sender) NOT_VALID_SENDER)
        (asserts! (is-some (index-of (var-get allowed) caller)) NOT_VALID_CALLER)
        (match (map-get? contract-to-deposited-amount caller)
            value (ok (map-set contract-to-deposited-amount caller u0))
            (err u1)
        )      
    )
)

(define-read-only (get-balance-in-first-pool) 
    (map-get? contract-to-deposited-amount 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.poolTemplate1cycle1000stx)
)

(define-read-only (get-balance-in-second-pool) 
    (map-get? contract-to-deposited-amount 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.poolTemplate1cycle1000stxS)
)