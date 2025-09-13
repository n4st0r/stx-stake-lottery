
;; poolTemplate6
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
(define-constant number-of-cycles u1)

(define-constant id-of-participants (list u0 u1 u2 u3 u4 u5 u6 u7 u8 u9 u10 u11 u12 u13 u14 u15 u16 u17 u18 u19 u20 u21 u22 u23 u24 u25 u26 u27 u28 u29 u30 u31 u32 u33 u34 u35 u36 u37 u38 u39 u40 u41 u42 u43 u44 u45 u46 u47 u48 u49 u50 u51
  u52 u53 u54 u55 u56 u57 u58 u59 u60 u61 u62 u63 u64 u65 u66 u67 u68 u69 u70 u71 u72 u73 u74 u75 u76 u77 u78 u79 u80 u81 u82 u83 u84 u85 u86 u87 u88 u89 u90 u91 u92 u93 u94 u95 u96 u97 u98 u99 u100
  u101 u102 u103 u104 u105 u106 u107 u108 u109 u110 u111 u112 u113 u114 u115 u116 u117 u118 u119 u120 u121 u122 u123 u124 u125 u126 u127 u128 u129 u130 u131 u132 u133 u134 u135 u136 u137 u138 u139 u140 u141 u142 u143 u144 u145 u146 u147 u148 u149 u150
  u151 u152 u153 u154 u155 u156 u157 u158 u159 u160 u161 u162 u163 u164 u165 u166 u167 u168 u169 u170 u171 u172 u173 u174 u175 u176 u177 u178 u179 u180 u181 u182 u183 u184 u185 u186 u187 u188 u189 u190 u191 u192 u193 u194 u195 u196 u197 u198 u199 u200
  u201 u202 u203 u204 u205 u206 u207 u208 u209 u210 u211 u212 u213 u214 u215 u216 u217 u218 u219 u220 u221 u222 u223 u224 u225 u226 u227 u228 u229 u230 u231 u232 u233 u234 u235 u236 u237 u238 u239 u240 u241 u242 u243 u244 u245 u246 u247 u248 u249 u250
  u251 u252 u253 u254 u255 u256 u257 u258 u259 u260 u261 u262 u263 u264 u265 u266 u267 u268 u269 u270 u271 u272 u273 u274 u275 u276 u277 u278 u279 u280 u281 u282 u283 u284 u285 u286 u287 u288 u289 u290 u291 u292 u293 u294 u295 u296 u297 u298 u299 u300
  u301 u302 u303 u304 u305 u306 u307 u308 u309 u310 u311 u312 u313 u314 u315 u316 u317 u318 u319 u320 u321 u322 u323 u324 u325 u326 u327 u328 u329 u330 u331 u332 u333 u334 u335 u336 u337 u338 u339 u340 u341 u342 u343 u344 u345 u346 u347 u348 u349 u350
  u351 u352 u353 u354 u355 u356 u357 u358 u359 u360 u361 u362 u363 u364 u365 u366 u367 u368 u369 u370 u371 u372 u373 u374 u375 u376 u377 u378 u379 u380 u381 u382 u383 u384 u385 u386 u387 u388 u389 u390 u391 u392 u393 u394 u395 u396 u397 u398 u399 u400
  u401 u402 u403 u404 u405 u406 u407 u408 u409 u410 u411 u412 u413 u414 u415 u416 u417 u418 u419 u420 u421 u422 u423 u424 u425 u426 u427 u428 u429 u430 u431 u432 u433 u434 u435 u436 u437 u438 u439 u440 u441 u442 u443 u444 u445 u446 u447 u448 u449 u450 
  u451 u452 u453 u454 u455 u456 u457 u458 u459 u460 u461 u462 u463 u464 u465 u466 u467 u468 u469 u470 u471 u472 u473 u474 u475 u476 u477 u478 u479 u480 u481 u482 u483 u484 u485 u486 u487 u488 u489 u490 u491 u492 u493 u494 u495 u496 u497 u498 u499 u500
  u501 u502 u503 u504 u505 u506 u507 u508 u509 u510 u511 u512 u513 u514 u515 u516 u517 u518 u519 u520 u521 u522 u523 u524 u525 u526 u527 u528 u529 u530 u531 u532 u533 u534 u535 u536 u537 u538 u539 u540 u541 u542 u543 u544 u545 u546 u547 u548 u549 u550
  u551 u552 u553 u554 u555 u556 u557 u558 u559 u560 u561 u562 u563 u564 u565 u566 u567 u568 u569 u570 u571 u572 u573 u574 u575 u576 u577 u578 u579 u580 u581 u582 u583 u584 u585 u586 u587 u588 u589 u590 u591 u592 u593 u594 u595 u596 u597 u598 u599 u600 
  u601 u602 u603 u604 u605 u606 u607 u608 u609 u610 u611 u612 u613 u614 u615 u616 u617 u618 u619 u620 u621 u622 u623 u624 u625 u626 u627 u628 u629 u630 u631 u632 u633 u634 u635 u636 u637 u638 u639 u640 u641 u642 u643 u644 u645 u646 u647 u648 u649 u650 
  u651 u652 u653 u654 u655 u656 u657 u658 u659 u660 u661 u662 u663 u664 u665 u666 u667 u668 u669 u670 u671 u672 u673 u674 u675 u676 u677 u678 u679 u680 u681 u682 u683 u684 u685 u686 u687 u688 u689 u690 u691 u692 u693 u694 u695 u696 u697 u698 u699 u700 
  u701 u702 u703 u704 u705 u706 u707 u708 u709 u710 u711 u712 u713 u714 u715 u716 u717 u718 u719 u720 u721 u722 u723 u724 u725 u726 u727 u728 u729 u730 u731 u732 u733 u734 u735 u736 u737 u738 u739 u740 u741 u742 u743 u744 u745 u746 u747 u748 u749 u750 
  u751 u752 u753 u754 u755 u756 u757 u758 u759 u760 u761 u762 u763 u764 u765 u766 u767 u768 u769 u770 u771 u772 u773 u774 u775 u776 u777 u778 u779 u780 u781 u782 u783 u784 u785 u786 u787 u788 u789 u790 u791 u792 u793 u794 u795 u796 u797 u798 u799 u800 
  u801 u802 u803 u804 u805 u806 u807 u808 u809 u810 u811 u812 u813 u814 u815 u816 u817 u818 u819 u820 u821 u822 u823 u824 u825 u826 u827 u828 u829 u830 u831 u832 u833 u834 u835 u836 u837 u838 u839 u840 u841 u842 u843 u844 u845 u846 u847 u848 u849 u850 
  u851 u852 u853 u854 u855 u856 u857 u858 u859 u860 u861 u862 u863 u864 u865 u866 u867 u868 u869 u870 u871 u872 u873 u874 u875 u876 u877 u878 u879 u880 u881 u882 u883 u884 u885 u886 u887 u888 u889 u890 u891 u892 u893 u894 u895 u896 u897 u898 u899 u900 
  u901 u902 u903 u904 u905 u906 u907 u908 u909 u910 u911 u912 u913 u914 u915 u916 u917 u918 u919 u920 u921 u922 u923 u924 u925 u926 u927 u928 u929 u930 u931 u932 u933 u934 u935 u936 u937 u938 u939 u940 u941 u942 u943 u944 u945 u946 u947 u948 u949 u950 
  u951 u952 u953 u954 u955 u956 u957 u958 u959 u960 u961 u962 u963 u964 u965 u966 u967 u968 u969 u970 u971 u972 u973 u974 u975 u976 u977 u978 u979 u980 u981 u982 u983 u984 u985 u986 u987 u988 u989 u990 u991 u992 u993 u994 u995 u996 u997 u998 u999 u1000
  u1001 u1002 u1003 u1004 u1005 u1006 u1007 u1008 u1009 u1010 u1011 u1012 u1013 u1014 u1015 u1016 u1017 u1018 u1019 u1020 u1021 u1022 u1023 u1024 u1025 u1026 u1027 u1028 u1029 u1030 u1031 u1032 u1033 u1034 u1035 u1036 u1037 u1038 u1039 u1040 u1041 u1042 u1043 u1044 u1045 u1046 u1047 u1048 u1049 u1050
  u1051 u1052 u1053 u1054 u1055 u1056 u1057 u1058 u1059 u1060 u1061 u1062 u1063 u1064 u1065 u1066 u1067 u1068 u1069 u1070 u1071 u1072 u1073 u1074 u1075 u1076 u1077 u1078 u1079 u1080 u1081 u1082 u1083 u1084 u1085 u1086 u1087 u1088 u1089 u1090 u1091 u1092 u1093 u1094 u1095 u1096 u1097 u1098 u1099 u1100 
  u1101 u1102 u1103 u1104 u1105 u1106 u1107 u1108 u1109 u1110 u1111 u1112 u1113 u1114 u1115 u1116 u1117 u1118 u1119 u1120 u1121 u1122 u1123 u1124 u1125 u1126 u1127 u1128 u1129 u1130 u1131 u1132 u1133 u1134 u1135 u1136 u1137 u1138 u1139 u1140 u1141 u1142 u1143 u1144 u1145 u1146 u1147 u1148 u1149 u1150 
  u1151 u1152 u1153 u1154 u1155 u1156 u1157 u1158 u1159 u1160 u1161 u1162 u1163 u1164 u1165 u1166 u1167 u1168 u1169 u1170 u1171 u1172 u1173 u1174 u1175 u1176 u1177 u1178 u1179 u1180 u1181 u1182 u1183 u1184 u1185 u1186 u1187 u1188 u1189 u1190 u1191 u1192 u1193 u1194 u1195 u1196 u1197 u1198 u1199 u1200
  u1201 u1202 u1203 u1204 u1205 u1206 u1207 u1208 u1209 u1210 u1211 u1212 u1213 u1214 u1215 u1216 u1217 u1218 u1219 u1220 u1221 u1222 u1223 u1224 u1225 u1226 u1227 u1228 u1229 u1230 u1231 u1232 u1233 u1234 u1235 u1236 u1237 u1238 u1239 u1240 u1241 u1242 u1243 u1244 u1245 u1246 u1247 u1248 u1249 u1250 
  u1251 u1252 u1253 u1254 u1255 u1256 u1257 u1258 u1259 u1260 u1261 u1262 u1263 u1264 u1265 u1266 u1267 u1268 u1269 u1270 u1271 u1272 u1273 u1274 u1275 u1276 u1277 u1278 u1279 u1280 u1281 u1282 u1283 u1284 u1285 u1286 u1287 u1288 u1289 u1290 u1291 u1292 u1293 u1294 u1295 u1296 u1297 u1298 u1299 u1300
  u1301 u1302 u1303 u1304 u1305 u1306 u1307 u1308 u1309 u1310 u1311 u1312 u1313 u1314 u1315 u1316 u1317 u1318 u1319 u1320 u1321 u1322 u1323 u1324 u1325 u1326 u1327 u1328 u1329 u1330 u1331 u1332 u1333 u1334 u1335 u1336 u1337 u1338 u1339 u1340 u1341 u1342 u1343 u1344 u1345 u1346 u1347 u1348 u1349 u1350 
  u1351 u1352 u1353 u1354 u1355 u1356 u1357 u1358 u1359 u1360 u1361 u1362 u1363 u1364 u1365 u1366 u1367 u1368 u1369 u1370 u1371 u1372 u1373 u1374 u1375 u1376 u1377 u1378 u1379 u1380 u1381 u1382 u1383 u1384 u1385 u1386 u1387 u1388 u1389 u1390 u1391 u1392 u1393 u1394 u1395 u1396 u1397 u1398 u1399 u1400 
  u1401 u1402 u1403 u1404 u1405 u1406 u1407 u1408 u1409 u1410 u1411 u1412 u1413 u1414 u1415 u1416 u1417 u1418 u1419 u1420 u1421 u1422 u1423 u1424 u1425 u1426 u1427 u1428 u1429 u1430 u1431 u1432 u1433 u1434 u1435 u1436 u1437 u1438 u1439 u1440 u1441 u1442 u1443 u1444 u1445 u1446 u1447 u1448 u1449 u1450 
  u1451 u1452 u1453 u1454 u1455 u1456 u1457 u1458 u1459 u1460 u1461 u1462 u1463 u1464 u1465 u1466 u1467 u1468 u1469 u1470 u1471 u1472 u1473 u1474 u1475 u1476 u1477 u1478 u1479 u1480 u1481 u1482 u1483 u1484 u1485 u1486 u1487 u1488 u1489 u1490 u1491 u1492 u1493 u1494 u1495 u1496 u1497 u1498 u1499
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
    (if (< (var-get participants) u1500)
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