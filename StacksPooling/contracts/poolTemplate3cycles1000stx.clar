
;; poolTemplate3cycles1000stx
;; Contract that receives stacks and then stake them for Btc rewards


;; constants
(define-constant NOT_VALID_REGISTRATION (err u1))
(define-constant NOT_REGISTERED_YET (err u2))
(define-constant CC_TX_SENDER_DONT_MATCH (err u3))
(define-constant NOT_VALID_AMOUNT (err u4))
(define-constant CONTRACT_IS_LOCKED (err u5))
(define-constant FAILED_WITHDREW (err u6))
(define-constant CONTRACT_NOT_LOCKED (err u8))
(define-constant NOT_VALID_SENDER (err u10))
(define-constant PROVIDE_VALID_TUPLE (err u7))
(define-constant NEED_TO_DEPOSIT_FIRST (err u12))
(define-constant MAX_PARTICIPANTS_REACHED (err u13))
(define-constant STX_TRANSFER_FAILED (err u14))


(define-constant deployer tx-sender)
(define-constant number-of-cycles u3)

(define-constant id-of-participants (list u0 u1 u2 u3 u4 u5 u6 u7 u8 u9 u10 u11 u12 u13 u14 u15 u16 u17 u18 u19 u20 u21 u22 u23 u24 u25 u26 u27 u28 u29 u30 u31 u32 u33 u34 u35 u36 u37 u38 u39 u40 u41 u42 u43 u44 u45 u46 u47 u48 u49 u50 u51
  u52 u53 u54 u55 u56 u57 u58 u59 u60 u61 u62 u63 u64 u65 u66 u67 u68 u69 u70 u71 u72 u73 u74 u75 u76 u77 u78 u79 u80 u81 u82 u83 u84 u85 u86 u87 u88 u89 u90 u91 u92 u93 u94 u95 u96 u97 u98 u99 u100
  u101 u102 u103 u104 u105 u106 u107 u108 u109 u110 u111 u112 u113 u114 u115 u116 u117 u118 u119 u120 u121 u122 u123 u124 u125 u126 u127 u128 u129 u130 u131 u132 u133 u134 u135 u136 u137 u138 u139 u140 u141 u142 u143 u144 u145 u146 u147 u148 u149
))

;; data maps and vars
(define-map stx-to-btc { stx-address: principal } { btc-address: (tuple (hashbytes (buff 20)) (version (buff 1)))})
(define-map participant-to-id principal uint)
(define-map id-to-participant uint {address: principal, value: uint})
(define-data-var participants uint u0)
(define-data-var is-locked bool false)
;; private functions

;;Based on CityCoin's implementation , converts a 32 byte buffer to a uint and then mod's the result with the number of participations
(define-private (get-vrf-for-participants (total-participations uint))
  (contract-call? .vrf-to-uint get-rnd total-participations)
)

;;List filtering and contructing with valid participants
(define-private (is-greater-than-zero (id uint))
  (match (map-get? id-to-participant id)
    temp-tuple (> (get value temp-tuple) u0)
    false
  )
)

(define-private (is-equal-to-zero (id uint))
  (match (map-get? id-to-participant id)
    temp-tuple (is-eq  (get value temp-tuple) u0)
    false
  )
)

;;Gets the rand by vrf and the List from above and pick the participant at the position in the list that corresponds to the rand
(define-private (get-winner) 
  (begin 
    (let
      ( 
        (participant-list (filter is-greater-than-zero id-of-participants))
        (initial-list (map check-entries participant-list))
        (final-list  (fold concat-list initial-list (list )))
        (vrf (get-vrf-for-participants (len final-list)))
      )
      (ok (get address (unwrap-panic (map-get? id-to-participant (unwrap-panic (element-at final-list (unwrap-panic vrf )))))))
    )
  )
)

;;Takes two lists as input and concacts them to one 
(define-private (concat-list (dummy (list 20 uint)) (final (list 150 uint)))
  (unwrap-panic (as-max-len? (concat final dummy) u150))
)

;; Checks the deposit of each participant and returns a list with the number of entries for this participant
(define-private (check-entries (id uint)) 
  (begin 
    (match (map-get? id-to-participant id)
      temp-tuple (if (is-eq (/ (get value temp-tuple) u1000) u0)
        (list )
        (if (is-eq (/ (get value temp-tuple) u1000) u1)
          (list id)
          (if (is-eq (/ (get value temp-tuple) u1000) u2)
            (list id id)
            (if (is-eq (/ (get value temp-tuple) u1000) u3)
              (list id id id)
              (if (is-eq (/ (get value temp-tuple) u1000) u4)
                (list id id id id)
                (if (is-eq (/ (get value temp-tuple) u1000) u5)
                  (list id id id id id)
                  (if (is-eq (/ (get value temp-tuple) u1000) u6)
                    (list id id id id id id)
                    (if (is-eq (/ (get value temp-tuple) u1000) u7)
                      (list id id id id id id id)
                      (if (is-eq (/ (get value temp-tuple) u1000) u8)
                        (list id id id id id id id id)
                        (if (is-eq (/ (get value temp-tuple) u1000) u9)
                          (list id id id id id id id id id)
                          (if (is-eq (/ (get value temp-tuple) u1000) u10)
                            (list id id id id id id id id id id)
                            (if (is-eq (/ (get value temp-tuple) u1000) u11)
                              (list id id id id id id id id id id id)
                              (if (is-eq (/ (get value temp-tuple) u1000) u12)
                                (list id id id id id id id id id id id id)
                                (if (is-eq (/ (get value temp-tuple) u1000) u13)
                                  (list id id id id id id id id id id id id id)
                                  (if (is-eq (/ (get value temp-tuple) u1000) u14)
                                    (list id id id id id id id id id id id id id id)
                                    (if (is-eq (/ (get value temp-tuple) u1000) u15)
                                      (list id id id id id id id id id id id id id id id)
                                      (if (is-eq (/ (get value temp-tuple) u1000) u16)
                                        (list id id id id id id id id id id id id id id id id)
                                        (if (is-eq (/ (get value temp-tuple) u1000) u17)
                                          (list id id id id id id id id id id id id id id id id id)
                                          (if (is-eq (/ (get value temp-tuple) u1000) u18)
                                            (list id id id id id id id id id id id id id id id id id id)
                                            (if (is-eq (/ (get value temp-tuple) u1000) u19)
                                              (list id id id id id id id id id id id id id id id id id id id)
                                              (list id id id id id id id id id id id id id id id id id id id id)
                                            )
                                          )
                                        )
                                      )
                                    )
                                  )
                                )
                              )
                            )
                          )
                        )
                      )
                    )
                  )
                )
              )
            )
          )
        )
      )
      (list u9999)
    )
  )
)

;; public functions

;;User's should register their btc addresses before taking an action 
(define-private (register-new-user (address (tuple (hashbytes (buff 20)) (version (buff 1)))))
  (begin
    (asserts! (or (is-eq 0x00 (get version address)) (is-eq 0x01 (get version address)) (is-eq 0x02 (get version address)) (is-eq 0x03 (get version address))) NOT_VALID_REGISTRATION)
    (asserts! (is-eq tx-sender contract-caller) CC_TX_SENDER_DONT_MATCH)
    (if (< (var-get participants) u150)
      (begin
        (map-set participant-to-id tx-sender (var-get participants))
        (map-set id-to-participant (var-get participants) {address: tx-sender, value: u0})
        (var-set participants (+ (var-get participants) u1))
        (ok (map-set stx-to-btc {stx-address: tx-sender} {btc-address: address}))
      )
      (let
        (
          (open-id-list (filter is-equal-to-zero id-of-participants))
        ) 
        (if (> (len open-id-list) u0)
          (begin
            (map-set participant-to-id tx-sender (unwrap-panic (element-at open-id-list u0)))
            (map-set id-to-participant (unwrap-panic (map-get? participant-to-id tx-sender)) {address: tx-sender, value: u0})
            (ok (map-set stx-to-btc {stx-address: tx-sender} {btc-address: address}))
          )
          MAX_PARTICIPANTS_REACHED
        )
      ) 
    )
  )
)

(define-public (change-btc-credentials (address (tuple (hashbytes (buff 20)) (version (buff 1)))))
  (begin
    (asserts! (or (is-eq 0x00 (get version address)) (is-eq 0x01 (get version address)) (is-eq 0x02 (get version address)) (is-eq 0x03 (get version address))) NOT_VALID_REGISTRATION)
    (asserts! (is-eq tx-sender contract-caller) CC_TX_SENDER_DONT_MATCH)
    (asserts! (is-eq (var-get is-locked) false) CONTRACT_IS_LOCKED)
    (asserts! (is-some (map-get? participant-to-id tx-sender)) NEED_TO_DEPOSIT_FIRST)

    (ok (map-set stx-to-btc {stx-address: tx-sender} {btc-address: address}))
  )
)

;;User deposit 1k stacks 
(define-public (deposit-stacks (amount uint) (address (optional (tuple (hashbytes (buff 20)) (version (buff 1))))) )
  (begin 
    (asserts! (is-eq (mod amount u1000) u0) NOT_VALID_AMOUNT)
    (asserts! (<= amount u20000) NOT_VALID_AMOUNT)
    (asserts! (is-eq (var-get is-locked) false) CONTRACT_IS_LOCKED)
    (asserts! (<= (+ (stx-get-balance (as-contract tx-sender)) (* amount (pow u10 u6))) u150000000000) NOT_VALID_AMOUNT)
    (if (is-some (map-get? stx-to-btc { stx-address: tx-sender }))
      (begin 
        (asserts! (<= (+ (get value (unwrap-panic (map-get? id-to-participant (unwrap-panic (map-get? participant-to-id tx-sender))))) amount) u20000) NOT_VALID_AMOUNT)
        (map-set id-to-participant (unwrap-panic (map-get? participant-to-id tx-sender)) {address: tx-sender, value: (+ (get value (unwrap-panic (map-get? id-to-participant (unwrap-panic (map-get? participant-to-id tx-sender))))) amount)} )
      )
      (begin 
        (asserts! (is-ok (register-new-user (unwrap! address PROVIDE_VALID_TUPLE))) NOT_VALID_REGISTRATION)
        (map-set id-to-participant (unwrap-panic (map-get? participant-to-id tx-sender)) {address: tx-sender, value: (+ (get value (unwrap-panic (map-get? id-to-participant (unwrap-panic (map-get? participant-to-id tx-sender))))) amount)} )
      )
    )
    (asserts! (is-ok (stx-transfer? (* amount (pow u10 u6)) tx-sender (as-contract tx-sender))) STX_TRANSFER_FAILED)
    (if (is-eq (stx-get-balance (as-contract tx-sender)) u150000000000)
      (ok (var-set is-locked true))
      (ok true)
    )
  )
)


;;User withdraw his stacks
(define-public (withdraw-stacks) 
  (begin
    (if (and (> (get value (unwrap-panic (map-get? id-to-participant (unwrap-panic (map-get? participant-to-id tx-sender) )))) u0) (not (var-get is-locked)))
      (let
        (
          (amount (get value (unwrap-panic (map-get? id-to-participant (unwrap-panic (map-get? participant-to-id tx-sender))) )))
          (receipient tx-sender)
        )
        (map-set id-to-participant (unwrap-panic (map-get? participant-to-id tx-sender)) {address: tx-sender, value: u0 } )
        (as-contract (stx-transfer?  (* amount (pow u10 u6)) (as-contract tx-sender) receipient))
      )
    FAILED_WITHDREW
    )
  )
)

;;Admin locks the contract
(define-public (toggle-lock (lock bool)) 
  (begin
    (asserts! (is-eq tx-sender deployer) NOT_VALID_SENDER) 
    (ok (var-set is-locked lock))
  )
)

;;Addmin picks winner and stacks the stx in the pox contract 
(define-public (stake-stx) 
  (begin 
    (asserts! (is-eq tx-sender deployer) NOT_VALID_SENDER)
    (asserts! (is-eq (var-get is-locked) true) CONTRACT_NOT_LOCKED)
    (let
      (
        (tr (unwrap-panic (contract-call? 'ST000000000000000000002AMW42H.pox get-pox-info)))
        (burn-height (+ (* (+ (get prepare-cycle-length tr) (get reward-cycle-length tr) (+ u1 (get reward-cycle-id tr)) (get first-burnchain-block-height tr)))))
        (minimum (get min-amount-ustx tr))
      )
      (if (>= (stx-get-balance (as-contract tx-sender)) u150000000000)
        (match (as-contract (contract-call? 'ST000000000000000000002AMW42H.pox stack-stx (stx-get-balance (as-contract tx-sender)) (get btc-address (unwrap-panic (map-get? stx-to-btc {stx-address: (unwrap-panic (get-winner))}))) burn-height number-of-cycles))
          worked (ok u100)
          error (err (to-uint error))
        )
        (let
          (
            (amount (- (* u150000 (pow u10 u6)) (stx-get-balance (as-contract tx-sender))))
          )
          (match (contract-call? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.vault provideToPool amount)
            worked (begin
              (map-set participant-to-id 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.vault u9999)
              (map-set id-to-participant u9999 {address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.vault, value: amount})
              (match (as-contract (contract-call? 'ST000000000000000000002AMW42H.pox stack-stx (stx-get-balance (as-contract tx-sender)) (get btc-address (unwrap-panic (map-get? stx-to-btc {stx-address: (unwrap-panic (get-winner) )}) )) burn-height number-of-cycles))
                pass (ok u1000)
                error (err (to-uint error))
              )
            )
            error (err error)
        )
       )
      )
    )
  )
)

(define-public (return-to-pool) 
  (begin 
    (asserts! (is-eq tx-sender deployer) NOT_VALID_SENDER)
    (asserts! (is-eq (var-get is-locked) false) CONTRACT_IS_LOCKED)
    (match (contract-call? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.vault withdrawFromPool)
      passed (as-contract (stx-transfer? (get value (unwrap-panic (map-get? id-to-participant u9999))) (as-contract tx-sender) 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.vault))
      failed (err failed)
    )
  )
)

(define-read-only (senders-deposited-stx) 
  (match (map-get? participant-to-id tx-sender) 
    id (match (map-get? id-to-participant  id)
      true-tuple (get value true-tuple)  
      u0
    )
    u0
  )
)

(define-read-only (senders-btc-credentials) 
  (match (map-get? stx-to-btc {stx-address: tx-sender})
    info (get btc-address info) 
    (merge (tuple (hashbytes 0x00000000000000000000)) (tuple (version 0x00)))
  )                            
)  

(define-read-only (get-next-burn-height) 
  (let
      (
        (tr (unwrap-panic (contract-call? 'ST000000000000000000002AMW42H.pox get-pox-info)))
        (burn-height (+ (* (+ (get prepare-cycle-length tr) (get reward-cycle-length tr) (+ u1 (get reward-cycle-id tr)) (get first-burnchain-block-height tr)))))
      )
      burn-height
  )
)

(define-read-only (get-users-total-entries) 
  (merge (tuple (amount (senders-deposited-stx))) (tuple (entries (len (check-entries (unwrap-panic (map-get? participant-to-id tx-sender)))))))
)

(define-read-only (get-contract-balance) 
  (stx-get-balance (as-contract tx-sender))
)