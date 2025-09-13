
;; poolTemplate4
;; Contract that receives stacks and then stake them for Btc rewards


;; constants
(define-constant NOT_VALID_REGISTRATION (err u1))
(define-constant NOT_REGISTERED_YET (err u2))
(define-constant CC_TX_SENDER_DONT_MATCH (err u3))
(define-constant NOT_VALID_AMOUNT (err u4))
(define-constant CONTRACT_IS_LOCKED (err u5))
(define-constant FAILED_WITHDREW (err u6))
(define-constant BALANCE_BELOW_LIMIT (err u11))
(define-constant CONTRACT_NOT_LOCKED (err u8))
(define-constant INVALID_PREREQ (err u9))
(define-constant NOT_VALID_SENDER (err u10))
(define-constant PROVIDE_VALID_TUPLE (err u7))
(define-constant NEED_TO_DEPOSIT_FIRST (err u12))
(define-constant MAX_PARTICIPANTS_REACHED (err u13))



(define-constant deployer tx-sender)
(define-constant number-of-cycles u1)

(define-constant id-of-participants (list u0 u1 u2 u3 u4 u5 u6 u7))

;; data maps and vars
(define-map stx-to-btc { stx-address: principal } { btc-address: (tuple (hashbytes (buff 20)) (version (buff 1)))})
(define-map participant-to-id principal uint)
(define-map id-to-participant uint {address: principal, value: uint})
(define-data-var participants uint u0)
(define-data-var is-locked bool false)
(define-data-var stx-to-stake uint u0)
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
      (print (get address (unwrap! (map-get? id-to-participant (unwrap! (element-at final-list (unwrap! vrf (err u000))) (err u000))) (err u000))))
      (ok (get address (unwrap! (map-get? id-to-participant (unwrap! (element-at final-list (unwrap! vrf (err u000))) (err u000))) (err u000))))
    )
  )
)

;;Takes two lists as input and concacts them to one 
(define-private (concat-list (dummy (list 20 uint)) (final (list 30000 uint)))
  (unwrap-panic (as-max-len? (concat final dummy) u30000))
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
    (if (< (var-get participants) u8)
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
    (if (is-some (map-get? stx-to-btc { stx-address: tx-sender }))
      (begin 
        (asserts! (<= (+ (get value (unwrap-panic (map-get? id-to-participant (unwrap-panic (map-get? participant-to-id tx-sender))))) amount) u20000) NOT_VALID_AMOUNT)
        (map-set id-to-participant (unwrap-panic (map-get? participant-to-id tx-sender)) {address: tx-sender, value: (+ (get value (unwrap-panic (map-get? id-to-participant (unwrap-panic (map-get? participant-to-id tx-sender))))) amount)} )
        (stx-transfer? (* amount (pow u10 u6)) tx-sender (as-contract tx-sender))
      )
      (begin 
        (asserts! (is-ok (register-new-user (unwrap! address PROVIDE_VALID_TUPLE))) NOT_VALID_REGISTRATION)
        (map-set id-to-participant (unwrap-panic (map-get? participant-to-id tx-sender)) {address: tx-sender, value: (+ (get value (unwrap-panic (map-get? id-to-participant (unwrap-panic (map-get? participant-to-id tx-sender))))) amount)} )
        (stx-transfer? (* amount (pow u10 u6)) tx-sender (as-contract tx-sender))
      )
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
    (asserts! (is-eq tx-sender deployer) (err u000)) 
    (ok (var-set is-locked lock))
  )
)


;;Admin gets the minimum stx staking from the pox contract for this cycle
(define-public (get-prereq) 
  (begin 
    (asserts! (is-eq tx-sender deployer) (err u000))
    (ok (var-set stx-to-stake (contract-call? 'ST000000000000000000002AMW42H.pox get-stacking-minimum)))
  )
)

;;Addmin picks winner and stacks the stx in the pox contract 
(define-public (stake-stx) 
  (begin 
    (asserts! (> (var-get stx-to-stake) u0) INVALID_PREREQ)
    (asserts! (>= (stx-get-balance (as-contract tx-sender))  (var-get stx-to-stake)) BALANCE_BELOW_LIMIT)
    (asserts! (is-eq tx-sender deployer) NOT_VALID_SENDER)
    (asserts! (is-eq (var-get is-locked) true) CONTRACT_NOT_LOCKED)
    (let
      (
        (tr (unwrap-panic (contract-call? 'ST000000000000000000002AMW42H.pox get-pox-info)))
        (burn-height (+ (* (+ (get prepare-cycle-length tr) (get reward-cycle-length tr) (+ u1 (get reward-cycle-id tr)) (get first-burnchain-block-height tr)))))
      )
      (match (as-contract (contract-call? 'ST000000000000000000002AMW42H.pox stack-stx (stx-get-balance (as-contract tx-sender)) (get btc-address (unwrap! (map-get? stx-to-btc {stx-address: (unwrap! (get-winner) (err u98))}) (err u99))) burn-height number-of-cycles))
        worked (ok u100)
        error (err (to-uint error))
      )
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

(define-read-only (get-pox-info) 
  (contract-call? 'ST000000000000000000002AMW42H.pox get-pox-info)
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

(define-read-only (get-senders-id) 
    (map-get? participant-to-id tx-sender)
)