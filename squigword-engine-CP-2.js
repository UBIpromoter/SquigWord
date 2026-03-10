(function() {
'use strict';

// ============================================
// CONSTANTS
// ============================================

const BACKGROUNDS = [
    '#ffffff','#e1e1e1','#c8c8c8','#afafaf','#969696','#7d7d7d','#646464','#4b4b4b','#323232','#191919',
    '#000000',
    '#191919','#323232','#4b4b4b','#646464','#7d7d7d','#969696','#afafaf','#c8c8c8','#e1e1e1'
];
const TYPES = ['Auto', 'Normal', 'Bold', 'Slinky', 'Pipe', 'Fuzzy', 'Ribbed'];
const FONT_NAMES = ['Allure', 'Script'];

// ============================================
// EMS ALLURE FONT DATA
// ============================================

const EMS_ALLURE = {
' ': {w:378},
'a': {w:526, d:'M 495 183 L 457 132 L 406 78.8 L 331 31.5 L 271 18.9 L 243 63 L 255 142 L 296 274 L 277 243 L 176 145 L 69.3 56.7 L -18.9 18.9 L -63 66.1 L -56.7 154 L 34.6 261 L 148 331 L 230 356 L 312 356 L 324 343'},
'b': {w:416, d:'M -31.5 183 L 47.2 252 L 132 328 L 233 406 L 312 476 L 394 583 L 416 674 L 372 721 L 284 680 L 195 564 L 97.6 359 L 37.8 202 L 28.4 72.4 L 37.8 53.6 L 50.4 145 L 132 243 L 249 315 L 334 334 L 365 296 L 369 252 L 328 183 L 287 120 L 189 40.9 L 135 18.9 L -12.6 -9.45'},
'c': {w:346, d:'M 243 306 L 239 350 L 198 365 L 101 328 L -15.8 208 L -47.2 170 L -72.4 110 L -66.1 66.1 L -47.2 25.2 L 56.7 15.8 L 186 56.7 L 268 123 L 315 183'},
'd': {w:381, d:'M 328 312 L 302 356 L 258 369 L 151 334 L 47.2 265 L -37.8 176 L -63 107 L -56.7 50.4 L 12.6 15.8 L 78.8 63 L 176 148 L 277 252 L 387 334 L 532 457 L 668 592 L 693 668 L 690 709 L 639 721 L 561 684 L 510 633 L 441 523 L 387 425 L 293 217 L 246 66.1 L 233 -44.1 L 258 -97.6 L 302 -113 L 340 -101'},
'e': {w:346, d:'M 66.1 170 L 148 211 L 217 249 L 252 306 L 239 350 L 180 356 L 63 287 L 15.8 252 L -34.6 192 L -66.1 139 L -72.4 88.2 L -50.4 44.1 L 31.5 9.45 L 170 44.1 L 214 81.9 L 277 135 L 315 183'},
'f': {w:334, d:'M -110 -365 L -59.9 -321 L 9.45 -94.5 L 104 154 L 198 369 L 277 517 L 328 617 L 419 696 L 466 718 L 523 696 L 507 598 L 406 444 L 290 321 L 220 261 L 173 220 L 117 192 L 25.2 183 L 28.4 208 L 208 205 L 306 217'},
'g': {w:469, d:'M 306 350 L 195 353 L 69.3 287 L -15.8 205 L -56.7 164 L -78.8 110 L -59.9 56.7 L -18.9 18.9 L 91.4 69.3 L 176 158 L 265 252 L 287 274 L 318 274 L 164 -85 L 34.6 -331 L -22 -381 L -72.4 -410 L -117 -416 L -167 -381 L -148 -280 L -78.8 -220 L 22 -132 L 85 -88.2 L 258 22 L 369 110 L 438 183'},
'h': {w:561, d:'M -31.5 183 L 113 315 L 343 482 L 447 605 L 469 702 L 394 718 L 324 662 L 255 586 L 180 457 L 101 309 L 12.6 31.5 L 110 148 L 192 252 L 287 315 L 328 334 L 350 312 L 340 261 L 290 183 L 261 75.6 L 284 18.9 L 350 18.9 L 413 63 L 482 129 L 529 183'},
'i': {w:249, d:'M -31.5 183 L 37.8 236 L 59.9 328 L -37.8 85.1 L -18.9 22 L 53.5 6.3 L 132 69.3 L 183 129 L 217 183 M 123 476 L 94.5 438'},
'j': {w:258, d:'M -31.5 183 L 66.1 287 L 104 312 L 113 299 L -81.9 -145 L -173 -309 L -243 -391 L -306 -416 L -365 -406 L -387 -353 L -359 -287 L -252 -183 L -69.3 -59.9 L 56.7 31.5 L 151 107 L 227 183 M 205 482 L 167 444 L 186 428'},
'k': {w:356, d:'M -31.5 183 L 31.5 252 L 97.6 337 M 72.5 356 L 158 356 L 271 428 L 381 542 L 438 627 L 450 696 L 406 728 L 318 696 L 249 617 L 183 498 L 126 394 L 18.9 139 L -18.9 12.6 L 25.2 53.6 L 113 173 L 214 284 L 290 343 L 340 346 M 139 249 L 186 44.1 L 258 -85 L 362 -148 L 428 -148 L 457 -120 L 460 -101 L 457 -66.1'},
'l': {w:261, d:'M -25.2 176 L 91.4 265 L 239 428 L 346 589 L 394 662 L 381 709 L 312 718 L 243 674 L 148 532 L 41 340 L -28.4 198 L -50.4 85.1 L -22 25.2 L 44.1 18.9 L 120 53.6 L 195 132 L 230 183'},
'm': {w:687, d:'M -31.5 183 L 47.2 255 L 75.6 321 L -34.6 28.4 L 37.8 104 L 167 252 L 233 309 L 280 337 L 302 340 L 309 312 L 296 274 L 208 107 L 318 195 L 403 261 L 491 293 L 447 230 L 400 94.5 L 413 37.8 L 472 18.9 L 561 69.3 L 655 183'},
'n': {w:580, d:'M 148 328 L 41 25.2 L 183 186 L 271 280 L 334 318 L 381 337 L 394 312 L 331 195 L 290 101 L 293 47.2 L 328 15.8 L 387 25.2 L 450 69.3 L 513 132 L 548 183'},
'o': {w:391, d:'M 195 337 L 142 365 L 66.1 315 L -6.3 233 L -40.9 161 L -56.7 75.6 L 12.6 9.45 L 101 40.9 L 183 110 L 230 208 L 239 246 L 239 284 L 220 284 M 167 158 L 183 101 L 214 72.4 L 255 75.6 L 296 110 L 359 183'},
'p': {w:356, d:'M 25.2 359 L -72.4 56.7 L -176 -192 L -227 -350 L -255 -369 L -91.4 37.8 L -44.1 12.6 L 85 63 L 208 135 L 258 227 L 268 299 L 227 346 L 139 321 L 72.5 274 L 15.8 198 L -25.2 148 L -91.4 31.5'},
'q': {w:542, d:'M 324 334 L 224 359 L 88.2 293 L -34.6 180 L -59.9 120 L -53.6 69.3 L -31.5 28.4 L 34.6 25.2 L 120 75.6 L 186 154 L 315 284 L 422 416 L 372 406 L 255 91.4 L 139 -205 L 129 -350 L 161 -403 L 246 -403 L 280 -356 L 293 -249 L 280 -110 L 246 34.6 L 321 28.4 L 413 78.8 L 476 135 L 507 183'},
'r': {w:369, d:'M -31.5 183 L 34.6 287 L 154 463 L 47.2 391 L 47.2 365 L 59.9 356 L 258 353 L 145 214 L 81.9 101 L 97.6 22 L 186 28.4 L 296 132 L 337 183'},
's': {w:302, d:'M -31.5 183 L 9.45 217 L 34.6 261 L 66.1 328 L 117 394 L 249 447 L 293 454 L 343 444 L 350 413 L 343 381 L 328 365 M 53.5 274 L 72.5 233 L 161 183 L 198 135 L 195 88.2 L 151 34.6 L 78.8 -6.3 L 31.5 -28.4 L -25.2 -31.5 L -34.6 -18.9 L -34.6 15.8 L -15.8 34.6'},
't': {w:290, d:'M -31.5 183 L 18.9 224 L 53.5 261 L 110 337 L 183 457 L 217 510 L 183 517 L 9.45 151 L -6.3 66.1 L 18.9 22 L 97.6 28.4 L 192 110 L 258 183 M 53.5 346 L 258 356'},
'u': {w:495, d:'M 47.2 309 L -18.9 217 L -53.6 123 L -56.7 56.7 L -9.45 28.4 L 78.8 53.6 L 145 139 L 227 239 L 293 353 L 324 343 L 214 164 L 205 97.6 L 202 53.6 L 255 22 L 321 40.9 L 413 120 L 463 183'},
'v': {w:321, d:'M -31.5 183 L 56.7 274 L 72.5 312 L 69.3 337 L 34.6 356 L 0 356 M 41 334 L 28.4 170 L 0 85.1 L 0 9.45 L 126 186 L 224 299 L 318 381 L 403 432 L 447 419'},
'w': {w:554, d:'M 69.3 346 L -12.6 227 L -56.7 120 L -63 69.3 L -50.4 31.5 L -3.15 18.9 L 56.7 40.9 L 120 113 L 195 227 L 236 290 L 265 287 L 205 176 L 195 85.1 L 224 31.5 L 280 15.8 L 391 81.9 L 501 205 L 551 312 L 581 292'},
'x': {w:488, d:'M -31.5 183 L 59.9 306 L 126 321 L 142 277 L 158 202 L 180 117 L 202 40.9 L 271 12.6 L 340 40.9 L 397 101 L 457 183 M 400 346 L 362 343 L 227 236 L 110 135 L -3.15 6.3 L -81.9 -101 L -97.6 -132 L -117 -183'},
'y': {w:488, d:'M 88.2 312 L 3.15 233 L -31.5 186 L -47.2 132 L -53.6 85.1 L -37.8 47.2 L 12.6 31.5 L 69.3 47.2 L 176 151 L 280 277 L 334 334 L 369 331 L 274 139 L 183 -97.6 L 107 -230 L 28.4 -346 L -28.4 -397 L -135 -394 L -167 -346 L -123 -252 L -15.8 -167 L 123 -66.1 L 265 9.45 L 406 123 L 457 183'},
'z': {w:551, d:'M 34.6 202 L 85 277 L 145 331 L 214 340 L 302 315 L 384 296 L 447 318 L 457 340 L 432 356 L 397 334 L 340 280 L 126 85.1 L 59.9 22 L 3.15 9.45 L -12.6 37.8 L 18.9 66.1 L 66.1 66.1 L 117 40.9 L 220 -15.8 L 315 -18.9 L 384 28.4 L 469 117 L 520 183'},
'A': {w:1061.6, d:'M -9.45 40.9 L 9.45 -15.8 L 66.1 -56.7 L 154 -66.1 L 274 -25.2 L 406 78.8 L 529 205 L 662 359 L 737 463 L 813 558 L 882 636 L 939 699 L 958 706 L 876 570 L 797 346 L 753 189 L 750 97.6 L 775 18.9 L 819 3.15 L 910 53.6 L 986 126 L 1030.1 180 M 129 161 L 132 246 L 167 302 L 249 331 L 324 334 L 441 312 L 513 296 L 652 280 L 813 261 L 901 261 L 929 274 L 958 293'},
'B': {w:860, d:'M 94.5 328 L 22 369 L 3.15 419 L 25.2 510 L 117 583 L 328 680 L 548 712 L 696 709 L 781 677 L 819 627 L 816 561 L 788 520 L 737 479 L 598 435 L 529 425 L 469 416 L 428 410 L 542 324 L 633 246 L 668 158 L 652 72.4 L 605 12.6 L 532 -37.8 L 438 -44.1 L 375 -44.1 L 318 -25.2 L 290 31.5 L 277 81.9 L 208 31.5 L 161 0 L 148 25.2 L 186 148 L 324 406 L 372 510 L 419 561 L 479 573 L 517 570'},
'C': {w:690, d:'M 296 362 L 403 372 L 526 441 L 617 526 L 658 608 L 639 680 L 564 712 L 375 662 L 249 576 L 110 419 L 41 280 L 12.6 132 L 59.9 25.2 L 189 -31.5 L 346 -15.8 L 476 34.6 L 595 113 L 668 189'},
'D': {w:1033.2, d:'M 652 554 L 545 507 L 472 403 L 454 334 L 387 186 L 350 107 L 302 9.45 L 265 -44.1 L 236 -37.8 L 205 31.5 L 202 113 L 214 208 L 233 145 L 375 34.6 L 510 -9.45 L 728 25.2 L 863 113 L 976 220 L 1033.2 372 L 1020.6 532 L 951 627 L 828 680 L 608 706 L 413 671 L 261 614 L 154 548 L 94.5 460 L 85 384 L 126 321 L 189 293'},
'E': {w:850, d:'M 662 580 L 668 504 L 589 662 L 501 718 L 400 706 L 324 621 L 328 526 L 365 428 L 406 372 L 444 321 L 504 306 L 507 337 L 466 350 L 359 346 L 180 321 L 41 217 L -3.15 107 L 44.1 9.45 L 170 -50.4 L 318 -47.2 L 498 -22 L 643 37.8 L 756 113 L 803 180 L 810 205 L 806 252'},
'F': {w:624, d:'M 517 576 L 435 551 L 369 479 L 331 384 L 277 296 L 217 170 L 164 75.6 L 158 25.2 L 176 0 L 224 9.45 L 252 47.2 L 268 66.1 M 72.5 372 L 25.2 403 L -6.3 476 L 44.1 589 L 145 652 L 346 690 L 513 674 L 630 658 L 709 658 L 791 655 L 828 677 L 813 680 L 740 605 L 718 554 L 721 507 M 230 309 L 195 287 L 570 331'},
'G': {w:951, d:'M 825 639 L 781 696 L 731 718 L 621 718 L 454 677 L 328 608 L 208 517 L 135 419 L 88.2 337 L 66.1 246 L 78.8 161 L 126 94.5 L 214 44.1 L 324 31.5 L 472 72.4 L 580 142 L 699 233 L 753 284 L 775 312 L 835 353 L 854 372 L 822 362 L 769 271 L 677 -41 L 573 -208 L 466 -353 L 365 -406 L 271 -413 L 227 -375 L 227 -302 L 265 -220 L 365 -117 L 495 -31.5 L 608 28.4 L 731 69.3 L 762 75.6 L 847 91.4'},
'H': {w:939, d:'M 290 539 L 302 539 L 400 592 L 447 652 L 482 699 L 444 589 L 324 255 L 211 56.7 L 110 -72.5 L 6.3 -126 L -50.4 -126 L -123 -94.5 L -129 -72.5 M 939 680 L 854 643 L 810 567 L 759 447 L 712 337 L 665 211 L 633 107 L 643 40.9 L 671 9.45 L 728 6.3 L 794 56.7 L 869 132 L 907 183 M 41 198 L 31.5 293 L 81.9 353 L 236 372 L 315 359 L 441 343 L 614 306 L 759 290 L 832 306 L 850 321'},
'I': {w:548, d:'M 501 693 L 410 413 L 334 224 L 280 126 L 220 50.4 L 167 28.4 L 97.6 18.9 L 9.45 25.2 L -6.3 50.4 L 22 72.4 L 66.1 40.9 L 117 31.5 L 447 37.8 M 233 450 L 176 523 L 202 602 L 277 665 L 394 684 L 523 677 L 598 674 L 665 649'},
'J': {w:687, d:'M 643 715 L 614 687 L 567 586 L 501 400 L 428 202 L 328 40.9 L 258 -34.6 L 145 -94.5 L 53.5 -72.5 L 28.4 9.45 L 81.9 110 L 214 243 L 309 302 L 428 356 L 529 384 L 624 403 M 268 438 L 217 476 L 211 567 L 265 633 L 397 674 L 523 684 L 636 668 L 684 646'},
'K': {w:759, d:'M 132 532 L 255 592 L 334 699 L 208 359 L 154 208 L 110 132 L 41 31.5 L -25.2 -50.4 L -126 -120 L -211 -129 L -258 -113 L -293 -56.7 M 756 699 L 564 583 L 381 435 L 236 293 L 145 180 M 296 403 L 350 189 L 435 40.9 L 529 -9.45 L 595 3.15 L 624 50.4 L 611 72.4 L 595 97.6'},
'L': {w:617, d:'M 230 126 L 239 126 L 425 202 L 589 337 L 687 510 L 702 624 L 671 702 L 605 721 L 498 680 L 410 567 L 346 369 L 249 88.2 L 214 -6.3 L 176 -69.3 L 145 -107 L 126 -120 M 123 81.9 L 6.3 50.4 L 18.9 81.9 L 135 40.9 L 302 -75.6 L 435 -151 L 583 -211 L 750 -202 L 819 -151 L 838 -120 L 841 -56.7'},
'M': {w:1351.3, d:'M 224 536 L 302 570 L 343 605 L 378 646 L 406 693 L 428 699 L 365 529 L 287 315 L 205 148 L 129 18.9 L 63 -41 L 0 -59.9 L -37.8 -15.8 L -18.9 47.2 L 94.5 186 L 249 356 L 447 542 L 570 614 L 649 633 L 721 605 L 756 513 L 740 315 L 721 189 L 687 75.6 L 712 81.9 L 784 198 L 961 463 L 1036.3 570 L 1105.7 621 L 1156.1 614 L 1174.9 589 L 1187.6 539 L 1149.8 428 L 1111.9 350 L 1067.8 255 L 1045.8 180 L 1045.8 101 L 1083.6 22 L 1181.2 37.8 L 1285.2 129 L 1319.8 183'},
'N': {w:932, d:'M -230 -37.8 L -211 -91.4 L -154 -126 L -66.1 -107 L 37.8 -34.6 L 129 107 L 214 271 L 274 432 L 321 561 L 350 658 L 359 328 L 381 189 L 447 34.6 L 507 -18.9 L 573 -34.6 L 643 0 L 731 129 L 788 274 L 825 472 L 832 589 L 819 646 L 797 709 L 844 643 L 873 605 L 898 586 L 926 570 M 158 513 L 170 517 L 258 558 L 293 595 L 328 658'},
'O': {w:850, d:'M 37.8 328 L 37.8 334 L 88.2 491 L 186 598 L 334 680 L 444 715 L 551 712 L 652 696 L 737 627 L 778 526 L 791 454 L 775 324 L 728 198 L 636 78.8 L 542 0 L 447 -44.1 L 290 -53.5 L 180 0 L 117 129 L 129 296 L 183 400 L 268 501 L 353 545 L 419 576 L 460 576 L 504 570'},
'P': {w:639, d:'M 504 576 L 441 561 L 387 526 L 346 479 L 331 416 L 306 362 L 246 265 L 198 173 L 170 97.6 L 161 63 L 154 31.5 L 170 0 L 205 12.6 L 243 56.7 M 101 359 L 41 394 L 22 463 L 44.1 545 L 132 611 L 230 658 L 324 687 L 450 702 L 624 693 L 740 649 L 803 595 L 810 523 L 775 441 L 718 378 L 639 340 L 504 296 L 375 274 L 299 261 L 214 271'},
'Q': {w:800, d:'M 699 715 L 775 680 L 816 608 L 813 463 L 759 287 L 646 123 L 532 34.6 L 447 -3.15 L 337 -25.2 L 211 -3.15 L 113 53.6 L 53.5 167 L 50.4 353 L 117 513 L 214 614 L 296 668 L 384 715 L 479 740 L 573 724 L 646 677 L 684 595 L 687 469 L 668 356 L 598 239 L 513 151 L 438 104 L 384 85.1 L 274 47.2 L 230 63 L 236 85.1 L 296 78.8 L 397 31.5 L 498 -37.8 L 605 -107 L 734 -183 L 898 -214 L 1036.3 -189 L 1080.4 -132 L 1083.6 -104 L 1080.4 -37.8'},
'R': {w:639, d:'M 498 573 L 419 564 L 356 501 L 340 438 L 293 334 L 208 198 L 154 85.1 L 142 34.6 L 161 3.15 L 198 18.9 L 220 37.8 L 227 44.1 M 81.9 369 L 28.4 419 L 22 495 L 53.5 561 L 161 636 L 274 671 L 406 696 L 558 693 L 671 680 L 772 617 L 813 536 L 788 447 L 677 365 L 554 321 L 432 284 L 334 280 L 202 293 L 198 315 L 312 230 L 381 117 L 498 -22 L 627 -117 L 762 -176 L 882 -176 L 945 -139 L 970 -101 L 976 -66.1'},
'S': {w:706, d:'M 293 324 L 189 293 L 117 255 L 53.5 202 L 18.9 129 L 28.4 47.2 L 63 9.45 L 167 -6.3 L 372 34.6 L 523 97.6 L 617 170 L 652 224 L 658 277 L 617 337 L 517 391 L 362 438 L 265 485 L 268 558 L 350 636 L 520 690 L 665 709 L 721 668 L 721 621 L 693 580'},
'T': {w:554, d:'M 56.7 378 L 9.45 425 L -3.15 501 L 37.8 592 L 113 646 L 198 677 L 287 690 L 466 687 L 639 665 L 806 662 L 860 674 L 825 690 L 743 580 L 734 539 L 728 485 L 743 463 M 529 570 L 450 539 L 391 476 L 324 353 L 239 205 L 180 66.1 L 180 25.2 L 198 0 L 230 22 L 268 63'},
'U': {w:671, d:'M 9.45 476 L 18.9 482 L 104 520 L 167 570 L 233 630 L 249 662 L 280 662 L 208 558 L 104 331 L 53.5 220 L 34.6 117 L 56.7 31.5 L 129 9.45 L 224 40.9 L 343 123 L 504 277 L 621 419 L 702 548 L 743 646 L 737 709 L 696 731 L 646 712 L 595 684 L 548 602 L 513 498 L 479 359 L 444 186 L 422 47.2 L 425 -56.7 L 441 -139 L 463 -180 L 498 -195 L 529 -198 L 558 -183'},
'V': {w:737, d:'M 53.5 454 L 0 529 L 25.2 611 L 72.5 646 L 189 668 L 302 677 L 391 677 L 447 655 L 469 649 M 331 718 L 337 586 L 299 482 L 258 410 L 211 290 L 164 167 L 142 81.9 L 145 -9.45 L 186 -37.8 L 277 -37.8 L 400 31.5 L 532 154 L 677 343 L 784 507 L 844 598 L 895 662 L 939 696 L 983 724 L 1001.7 724'},
'W': {w:1206.4, d:'M 69.3 444 L 34.6 476 L 9.45 545 L 47.2 614 L 145 662 L 265 680 L 391 677 L 460 665 L 488 652 M 416 709 L 387 592 L 328 501 L 220 353 L 135 217 L 91.4 145 L 53.5 66.1 L 41 6.3 L 47.2 -37.8 L 63 -56.7 L 97.6 -66.1 L 148 -59.9 L 233 -28.4 L 328 28.4 L 394 85.1 L 495 167 L 586 268 L 684 394 L 712 469 L 721 529 L 712 586 L 677 570 L 665 507 L 668 416 L 662 299 L 687 176 L 731 91.4 L 788 40.9 L 876 3.15 L 939 12.6 L 986 31.5 L 1052.1 126 L 1096.2 224 L 1118.2 324 L 1127.7 387 L 1115.1 517 L 1083.6 598 L 1017.4 649 L 945 668 L 898 662 L 876 643'},
'X': {w:806, d:'M 66.1 457 L 15.8 491 L 3.15 554 L 25.2 621 L 104 665 L 195 687 L 268 696 L 378 684 L 441 674 L 469 665 L 485 662 M 419 699 L 397 561 L 410 410 L 432 284 L 488 148 L 558 53.6 L 621 15.8 L 702 50.4 L 775 113 L 816 158 M 778 696 L 696 583 L 570 419 L 469 287 L 350 173 L 243 63 L 135 -15.8 L 31.5 -88.2 L -101 -132 L -192 -120 L -246 -101 L -268 -59.9 L -271 -41'},
'Y': {w:627, d:'M 28.4 482 L 34.6 485 L 120 523 L 195 583 L 252 646 L 277 665 L 287 668 L 230 554 L 142 394 L 69.3 230 L 56.7 154 L 50.4 75.6 L 85 15.8 L 158 15.8 L 233 53.6 L 334 145 L 403 220 L 463 306 L 542 416 L 595 510 L 621 586 L 662 649 L 715 674 L 759 680 L 684 633 L 633 576 L 583 400 L 526 205 L 457 -6.3 L 406 -113 L 346 -211 L 296 -284 L 233 -346 L 148 -400 L 69.3 -413 L 31.5 -400 L 3.15 -350 L 6.3 -296 L 37.8 -233 L 107 -151 L 205 -59.9 L 331 9.45 L 416 40.9 L 570 91.4 L 598 91.4'},
'Z': {w:627, d:'M 145 554 L 135 611 L 180 662 L 255 693 L 381 699 L 501 690 L 595 674 L 674 649 L 734 633 L 788 649 L 822 668 L 835 702 L 803 709 L 759 684 L 721 646 L 595 539 L 457 400 L 362 290 L 302 224 L 227 148 L 164 104 L 107 63 L 56.7 37.8 L 18.9 28.4 L 0 53.6 L 15.8 72.4 L 63 53.6 L 145 22 L 243 -50.4 L 378 -135 L 513 -205 L 671 -205 L 747 -167 L 781 -97.6 L 775 -69.3 L 769 -41 M 239 340 L 236 321 L 621 340'},
// --- Digits ---
'0': {w:662, d:'M 466 583 L 432 608 L 343 611 L 293 589 L 189 520 L 132 463 L 85 387 L 47.2 265 L 41 164 L 81.9 63 L 151 15.8 L 230 -6.3 L 318 9.45 L 422 63 L 520 161 L 576 268 L 608 384 L 608 479 L 583 558 L 532 608 L 479 649 L 425 665 L 350 668'},
'1': {w:378, d:'M 170 450 L 261 523 L 315 589 L 356 646 L 384 646 L 287 428 L 192 211 L 154 101 L 145 37.8 M 6.3 9.45 L 69.3 31.5 L 132 31.5 L 205 37.8 L 284 34.6'},
'2': {w:702, d:'M 198 491 L 195 501 L 195 536 L 287 602 L 372 630 L 472 643 L 573 621 L 621 586 L 649 510 L 617 432 L 539 346 L 435 265 L 350 205 L 261 148 L 198 113 L 170 97.6 L 123 66.1 L 104 47.2 L 56.7 15.8 L 56.7 47.2 L 81.9 81.9 L 120 94.5 L 186 91.4 L 255 66.1 L 299 37.8 L 403 -3.15 L 513 -6.3 L 570 18.9 L 617 56.7 L 630 85.1'},
'3': {w:665, d:'M 239 498 L 255 567 L 321 617 L 406 639 L 479 643 L 558 624 L 605 564 L 608 498 L 589 460 L 545 422 L 510 394 L 438 378 L 362 365 L 312 346 L 299 356 L 293 384 L 369 378 L 482 356 L 536 337 L 567 290 L 576 208 L 554 145 L 495 78.8 L 428 31.5 L 353 0 L 220 -18.9 L 148 -9.45 L 104 18.9 L 75.6 72.4 L 85 110 L 101 132'},
'4': {w:558, d:'M 243 -6.3 L 268 94.5 L 321 249 L 419 463 L 504 636 L 372 526 L 239 422 L 104 340 L 37.8 284 L -3.15 224 L 50.4 252 L 88.2 268 L 183 268 L 261 265 L 334 249 L 410 249 L 491 280 L 529 306 L 554 337'},
'5': {w:643, d:'M 318 608 L 220 460 L 164 362 L 220 397 L 312 428 L 387 432 L 460 416 L 523 378 L 548 321 L 548 255 L 523 183 L 457 101 L 378 50.4 L 284 12.6 L 192 -3.15 L 117 -3.15 L 50.4 9.45 L 3.15 31.5 L -25.2 78.8 L -34.6 129 L -15.8 154 M 280 614 L 422 624 L 570 630 L 652 624'},
'6': {w:602, d:'M 551 507 L 554 576 L 523 624 L 450 636 L 337 614 L 214 520 L 145 432 L 88.2 312 L 59.9 186 L 69.3 97.6 L 120 31.5 L 195 6.3 L 274 6.3 L 334 34.6 L 406 91.4 L 454 154 L 479 252 L 463 324 L 406 365 L 337 372 L 271 359 L 227 321'},
'7': {w:501, d:'M 110 507 L 148 592 L 208 630 L 318 636 L 447 621 L 523 617 L 576 611 L 617 633 L 435 438 L 293 261 L 189 139 L 126 31.5 L 113 25.2'},
'8': {w:592, d:'M 384 662 L 268 611 L 195 536 L 202 460 L 227 406 L 293 375 L 359 375 L 435 350 L 482 280 L 479 195 L 444 145 L 343 75.6 L 255 25.2 L 173 15.8 L 94.5 22 L 37.8 53.6 L 25.2 132 L 69.3 214 L 170 290 L 422 428 L 501 469 L 554 513 L 573 589 L 548 643 L 491 668 L 384 662'},
'9': {w:605, d:'M 369 328 L 318 293 L 243 284 L 164 309 L 126 359 L 126 454 L 170 551 L 239 611 L 299 643 L 403 658 L 485 630 L 539 558 L 551 482 L 529 369 L 498 284 L 435 183 L 359 110 L 284 50.4 L 227 22 L 158 9.45 L 104 9.45 L 47.2 53.6 L 34.6 88.2 L 37.8 158'},
// --- Punctuation ---
'.': {w:224, d:'M 145 63 L 129 37.8'},
',': {w:211, d:'M 104 56.7 L 123 22 L 101 -9.45 L 28.4 -117'},
'?': {w:564, d:'M 139 561 L 151 602 L 173 624 L 246 665 L 309 696 L 413 693 L 469 652 L 498 561 L 466 476 L 422 413 L 362 365 L 315 337 L 246 280 L 214 236 L 202 205 M 129 56.7 L 107 31.5'},
'!': {w:359, d:'M 444 665 L 403 592 L 295 362 L 232 214 M 204 63 L 182 40.9'},
"'": {w:173, d:'M 97.6 551 L 78.8 400'},
'"': {w:302, d:'M 94.5 548 L 78.8 403 M 233 548 L 211 400'},
'@': {w:895, d:'M 602 517 L 510 551 L 381 501 L 284 428 L 220 356 L 186 293 L 183 236 L 208 202 L 249 186 L 309 202 L 362 252 L 450 340 L 554 463 L 576 463 L 529 369 L 507 299 L 501 214 L 529 183 L 598 189 L 680 255 L 750 359 L 788 447 L 797 554 L 759 649 L 658 712 L 539 724 L 406 709 L 265 646 L 132 542 L 53.5 438 L -3.15 284 L 6.3 170 L 41 97.6 L 132 18.9 L 258 -15.8 L 410 -12.6 L 570 28.4 L 580 34.6 L 715 123 L 788 202 L 816 258 L 822 312 L 816 378'},
'$': {w:592, d:'M 372 403 L 447 463 L 479 532 L 463 586 L 419 608 L 328 608 L 205 576 L 126 513 L 97.6 457 L 91.4 422 L 97.6 375 L 246 198 L 274 151 L 249 117 L 192 101 L 142 107 L 88.2 117 L 63 129 M 432 658 L 403 633 L 239 359 L 63 12.6'},
'&': {w:828, d:'M 602 658 L 573 646 L 542 595 L 526 561 L 526 520 L 548 621 L 510 662 L 457 690 L 359 680 L 280 652 L 249 567 L 274 488 L 321 410 L 387 340 L 274 328 L 164 315 L 66.1 239 L 25.2 145 L 56.7 59.9 L 120 3.15 L 224 -15.8 L 343 -3.15 L 450 25.2 L 539 72.4 L 598 142 L 636 214 L 646 280 L 639 321 L 621 375 L 728 491 L 728 463 L 696 428 L 570 350 L 472 309 L 384 265 L 340 192 L 343 154 L 372 110'},
'#': {w:926, d:'M 410 743 L 167 40.9 M 693 737 L 460 37.8 M 94.5 469 L 825 472 M 12.6 192 L 753 192'},
'%': {w:548, d:'M 189 649 L 120 621 L 66.1 558 L 66.1 479 L 104 444 L 164 450 L 211 495 L 243 545 L 246 602 L 233 633 L 205 646 L 271 624 L 413 630 L 476 662 L 410 573 L 211 280 L 56.7 18.9 M 306 202 L 261 132 L 255 59.9 L 296 22 L 340 22 L 400 66.1 L 432 113 L 441 202 L 410 233 L 353 236 L 306 202'},
'(': {w:447, d:'M 501 684 L 293 573 L 148 444 L 72.5 315 L 25.2 154 L 18.9 18.9 L 37.8 -97.6 L 66.1 -161'},
')': {w:617, d:'M 372 684 L 428 554 L 425 362 L 356 158 L 246 9.45 L 139 -75.6 L 41 -123 L -50.4 -158'},
'-': {w:444, d:'M 161 236 L 387 243'},
':': {w:246, d:'M 195 252 L 183 230 M 139 63 L 126 40.9'},
';': {w:224, d:'M 189 252 L 173 230 M 101 59.9 L 120 40.9 L 117 18.9 L 101 -9.45 L 31.5 -101'},
'/': {w:564, d:'M 482 655 L 252 356 L 126 183 L 25.2 22'},
'+': {w:731, d:'M 101 243 L 586 243 M 435 432 L 249 15.8'},
'=': {w:646, d:'M 189 318 L 573 328 M 145 139 L 189 154 L 548 151'},
'*': {w:762, d:'M 236 602 L 243 598 L 400 261 M 457 617 L 186 271 M 554 438 L 117 428'},
'~': {w:491, d:'M 161 463 L 195 498 L 246 498 L 321 472 L 384 447 L 406 469 L 422 482'},
'_': {w:709, d:'M -28.4 -34.6 L 674 -34.6'},
// --- Brackets & Braces ---
'[': {w:526, d:'M 570 652 L 444 652 L 318 469 L 180 236 L 94.5 75.6 L 69.3 12.6 L 202 12.6'},
']': {w:510, d:'M 428 655 L 554 649 L 479 476 L 362 277 L 280 148 L 186 12.6 L 53.5 18.9'},
'{': {w:488, d:'M 432 668 L 299 643 L 233 545 L 227 444 L 189 384 L 132 369 L 63 362 L 126 328 L 154 274 L 123 208 L 75.6 158 L 34.6 72.4 L 72.5 -3.15 L 113 -18.9 L 158 -28.4'},
'}': {w:558, d:'M 372 674 L 447 665 L 482 627 L 472 567 L 432 510 L 397 444 L 369 384 L 419 362 L 482 356 L 375 315 L 324 274 L 302 227 L 293 145 L 255 75.6 L 161 -18.9 L 120 -28.4 L 28.4 -31.5'},
'<': {w:450, d:'M 391 561 L 101 277 L 167 186 L 208 132 L 252 59.9'},
'>': {w:472, d:'M 252 554 L 328 438 L 391 375 L 293 280 L 173 164 L 85 78.8'},
'\\': {w:381, d:'M 44.1 652 L 148 447 L 214 277 L 258 161 L 309 28.4'},
'|': {w:296, d:'M 132 684 L 126 -28.4'},
'`': {w:406, d:'M 72.5 523 L 202 444'},
// --- Arrows (single-stroke: head top → tip → head bottom → tip → shaft end) ---
'\u2190': {w:550, d:'M 150 450 L 50 350 L 150 250 L 50 350 L 500 350'},
'\u2192': {w:550, d:'M 400 250 L 500 350 L 400 450 L 500 350 L 50 350'},
'\u2191': {w:400, d:'M 100 200 L 200 100 L 300 200 L 200 100 L 200 600'},
'\u2193': {w:400, d:'M 100 500 L 200 600 L 300 500 L 200 600 L 200 100'}
};

// ============================================
// HERSHEY SCRIPT FONT DATA
// ============================================

const HERSHEY_SCRIPT = {
    'a': 'L\\UUTSRRPRNSMTLVLXMZO[Q[SZTXVRUWUZV[W[YZZY\\V',
    'b': 'M[MVOSRNSLTITGSFQGPIOMNTNZO[P[RZTXUUURVVWWYW[V',
    'c': 'MXTTTSSRQROSNTMVMXNZP[S[VYXV',
    'd': 'L\\UUTSRRPRNSMTLVLXMZO[Q[SZTXZF RVRUWUZV[W[YZZY\\V',
    'e': 'NXOYQXRWSUSSRRQROSNUNXOZQ[S[UZVYXV',
    'f': 'OWOVSQUNVLWIWGVFTGSIQQNZKaJdJfKgMfNcOZP[R[TZUYWV',
    'g': 'L[UUTSRRPRNSMTLVLXMZO[Q[SZTY RVRTYPdOfMgLfLdMaP^S\\U[XY[V',
    'h': 'M\\MVOSRNSLTITGSFQGPIOMNSM[ RM[NXOVQSSRURVSVUUXUZV[W[YZZY\\V',
    'i': 'PWSMSNTNTMSM RPVRRPXPZQ[R[TZUYWV',
    'j': 'PWSMSNTNTMSM RPVRRLdKfIgHfHdIaL^O\\Q[TYWV',
    'k': 'M[MVOSRNSLTITGSFQGPIOMNSM[ RM[NXOVQSSRURVSVUTVQV RQVSWTZU[V[XZYY[V',
    'l': 'OWOVQSTNULVIVGUFSGRIQMPTPZQ[R[TZUYWV',
    'm': 'E^EVGSIRJSJTIXH[ RIXJVLSNRPRQSQTPXO[ RPXQVSSURWRXSXUWXWZX[Y[[Z\\Y^V',
    'n': 'J\\JVLSNROSOTNXM[ RNXOVQSSRURVSVUUXUZV[W[YZZY\\V',
    'o': 'LZRRPRNSMTLVLXMZO[Q[SZTYUWUUTSRRQSQURWTXWXYWZV',
    'p': 'KZKVMSNQMUGg RMUNSPRRRTSUUUWTYSZQ[ RMZO[R[UZWYZV',
    'q': 'L[UUTSRRPRNSMTLVLXMZO[Q[SZ RVRUUSZPaOdOfPgRfScS\\U[XY[V',
    'r': 'MZMVOSPQPSSSTTTVSYSZT[U[WZXYZV',
    's': 'NYNVPSQQQSSVTXTZR[ RNZP[T[VZWYYV',
    't': 'OXOVQSSO RVFPXPZQ[S[UZVYXV RPNWN',
    'u': 'L[LVNRLXLZM[O[QZSXUU RVRTXTZU[V[XZYY[V',
    'v': 'L[LVNRMWMZN[O[RZTXUUUR RURVVWWYW[V',
    'w': 'I^LRJTIWIYJ[L[NZPX RRRPXPZQ[S[UZWXXUXR RXRYVZW\\W^V',
    'x': 'JZJVLSNRPRQSQZR[U[XYZV RWSVRTRSSOZN[L[KZ',
    'y': 'L[LVNRLXLZM[O[QZSXUU RVRPdOfMgLfLdMaP^S\\U[XY[V',
    'z': 'LZLVNSPRRRTTTVSXQZN[P\\Q^QaPdOfMgLfLdMaP^S\\WYZV',
    ' ': 'JZ',
    'A': 'E\\XFVHTKQPOSLWIZG[E[DZDXEWFXEY RXFWJUTT[ RXFU[ RT[TYSVRTPRNQLQKRKTLWOZR[V[XZ',
    'B': 'F^UGTHSJQOOUNWLZJ[ RTHSKQSPVOXMZJ[H[GZGXHWIXHY ROLNNMOKOJNJLKJMHOGRFXFZG[I[KZMXNTORO RXFYGZIZKYMXN RTOWPXQYSYVXYWZU[S[RZRXSU RTOVPWQXSXVWYU[',
    'C': 'H]KHJJJLKNNOQOUNWMYKZIZGYFWFTGQJOMMQLULXMZP[R[UZWXXVXTWRURSSRU RWFUGRJPMNQMUMXNZP[',
    'D': 'F]UGTHSJQOOUNWLZJ[ RTHSKQSPVOXMZJ[H[GZGXHWJWLXNZP[S[UZWXYTZOZLYIWGUFPFMGKIJKJMKNMNNMOK',
    'E': 'I\\WIVJVLWMYMZKZIYGWFTFRGQHPJPLQNSO RTFRHQJQMSO RSOQONPLRKTKWLYMZO[R[UZWXXVXTWRURSSRU RQOOPMRLTLXMZ',
    'F': 'G\\WHVJTORUQWOZM[ RQLPNNOLOKMKKLINGQF[FXGWHVKTSSVRXPZM[K[IZHYHXIWJXIY RSFWGXG ROSPRRQVQXPZMXT',
    'G': 'G]JIIKIMJOLPOPROTNWKXHXGWFVFTGRIQKPNPQQSSTUTWSYQZO RWFUGSIRKQNQRST RZOYSWWUYSZO[L[JZIXIWJVKWJX RYSWVUXRZO[',
    'H': 'F^LLKKKILGOFRFOQMWLYKZI[G[FZFXGWHXGY RRFOONRLWKYI[ RJTKSMRVOXN[L]J^H^G]F\\FZGXJWLURTVTYV[W[YZ[X R\\FZHXLVRUVUYV[',
    'I': 'IYWHUKSPQUPWNZL[ RYLWNTOQOONNLNJOHQGUFYFWHVJTPRVQXOZL[J[IZIXJWKXJY',
    'J': 'IZYFWHUKSPPYN] RYMWOTPQPOONMNKOIQGUFYFWIVKSTQXPZN]M^K_J^J\\KZMXOWRVVU',
    'K': 'F^LLKKKIMGPFRFOQMWLYKZI[G[FZFXGWHXGY RRFOONRLWKYI[ RZGWKUMSNPO R]G\\H]I^H^G]F\\FZGWLVMTNPO RPOSPTRUYV[ RPORPSRTYV[W[YZ[X',
    'L': 'I[MILKLMMOOPRPUOWNZK[H[GZFYFWGVHTKPUOWMZK[ RVHTLRSQVPXNZK[I[HZHXIWKWMXPZR[U[WZYX',
    'M': 'D`RFNOKUIXGZE[C[BZBXCWDXCY RRFPMOQNVNZP[ RRFQJPOOVOZP[ R[FWORXP[ R[FYMXQWVWZY[Z[\\Z^X R[FZJYOXVXZY[',
    'N': 'G^RFQJOPMULWJZH[F[EZEXFWGXFY RRFRKSVT[ RRFSKTVT[ R`G_H`IaHaG`F^F\\GZJYLWQUWT[',
    'O': 'H]SFQGOIMLLNKRKVLYMZO[Q[TZVXXUYSZOZKYHXGWGUHSJQNPSPV RQGOJMNLRLVMYO[',
    'P': 'F]UGTHSJQOOUNWLZJ[ RTHSKQSPVOXMZJ[H[GZGXHWIXHY ROLNNMOKOJNJLKJMHOGRFVFYGZH[J[MZOYPVQTQRP RVFXGYHZJZMYOXPVQ',
    'Q': 'H]SFQGOIMLLNKRKVLYMZO[Q[TZVXXUYSZOZKYHXGWGUHSJQNPSPV RQGOJMNLRLVMYO[ RU[ZY',
    'R': 'F^UGTHSJQOOUNWLZJ[ RTHSKQSPVOXMZJ[H[GZGXHWIXHY ROLNNMOKOJNJLKJMHOGRFWFZG[I[KZMYNVORO RWFYGZIZKYMXNVO RROUPVRWYX[ RROTPURVYX[Y[[Z]X',
    'S': 'H\\H[JZLXOTQQSMTJTGSFRFQGPIPKQMSOVQXSYUYWXYWZT[P[MZKXJVJT',
    'T': 'I[YHXJVOTUSWQZO[ RSLRNPONOMMMKNIPGSF\\FZGYHXKVSUVTXRZO[M[KZJYJXKWLXKY RUFYGZG',
    'U': 'G]HJJGLFMFOHOKNNKVKYL[ RMFNHNKKSJVJYL[N[PZSWUTVR RZFVRUVUYW[X[ZZ\\X R[FWRVVVYW[',
    'V': 'G\\HJJGLFMFOHOKNOLVLYM[ RMFNHNKLRKVKYM[N[QZTWVTXPYMZIZGYFXFWGVIVLWNYP[Q]Q',
    'W': 'F]ILHLGKGIHGJFNFMHLLKUJ[ RLLLUK[ RVFTHRLOUMYK[ RVFUHTLSUR[ RTLTUS[ R`F^G\\IZLWUUYS[',
    'X': 'H\\PKOLMLLKLIMGOFQFSGTITLSPQUOXMZJ[H[GZGXHWIXHY RQFRGSISLRPPUNXLZJ[ R]G\\H]I^H^G]F[FYGWIULSPRURXSZT[U[WZYX',
    'Y': 'G]JJLGNFOFQGQIOOORPT ROFPGPINONRPTRTUSWQYNZL R\\FZLWTUX R]F[LYQWUUXSZP[L[JZIXIWJVKWJX',
    'Z': 'G\\ZHYJWOVRUTSWQYOZL[ RSLRNPONOMMMKNIPGSF]F[GZHYKXOVUTXQZL[H[GZGXHWJWLXOZQ[T[WZYX RVFZG[G'
};

// ============================================
// SVG PATH PARSER + HERSHEY DECODER
// ============================================

function parseSvgPath(d) {
    if (!d) return [];
    const strokes = [];
    let current = [];
    const tokens = d.trim().split(/\s+/);
    let i = 0;
    while (i < tokens.length) {
        const cmd = tokens[i];
        if (cmd === 'M') {
            if (current.length > 0) strokes.push(current);
            current = [[parseFloat(tokens[i+1]), parseFloat(tokens[i+2])]];
            i += 3;
        } else if (cmd === 'L') {
            current.push([parseFloat(tokens[i+1]), parseFloat(tokens[i+2])]);
            i += 3;
        } else if (cmd === 'C') {
            const prev = current[current.length - 1] || [0, 0];
            const x1 = parseFloat(tokens[i+1]), y1 = parseFloat(tokens[i+2]);
            const x2 = parseFloat(tokens[i+3]), y2 = parseFloat(tokens[i+4]);
            const x3 = parseFloat(tokens[i+5]), y3 = parseFloat(tokens[i+6]);
            for (let t = 1; t <= 8; t++) {
                const u = t / 8, v = 1 - u;
                current.push([
                    v*v*v*prev[0] + 3*v*v*u*x1 + 3*v*u*u*x2 + u*u*u*x3,
                    v*v*v*prev[1] + 3*v*v*u*y1 + 3*v*u*u*y2 + u*u*u*y3
                ]);
            }
            i += 7;
        } else { i++; }
    }
    if (current.length > 0) strokes.push(current);
    return strokes;
}

const HERSHEY_SCALE = 33;
function decodeHersheyFont(data) {
    const R = 82;
    const left = data.charCodeAt(0) - R;
    const right = data.charCodeAt(1) - R;
    const strokes = []; let stroke = []; let i = 2;
    while (i < data.length) {
        if (data[i] === ' ' && data[i + 1] === 'R') {
            if (stroke.length > 0) { strokes.push(stroke); stroke = []; }
            i += 2; continue;
        }
        const x = (data.charCodeAt(i) - R - left) * HERSHEY_SCALE;
        const y = -(data.charCodeAt(i + 1) - R) * HERSHEY_SCALE;
        stroke.push([x, y]); i += 2;
    }
    if (stroke.length > 0) strokes.push(stroke);
    return { width: (right - left) * HERSHEY_SCALE, strokes };
}

// ============================================
// FONT PARSING & LOOKUP
// ============================================

const FONT_ALLURE = {};
for (const [char, data] of Object.entries(EMS_ALLURE)) {
    FONT_ALLURE[char] = { width: data.w, strokes: parseSvgPath(data.d || '') };
}

// Allure capital cleanup — remove overlapping/decorative strokes
const ALLURE_KEEP = {};
for (const [ch, keep] of Object.entries(ALLURE_KEEP)) {
    if (FONT_ALLURE[ch]) {
        FONT_ALLURE[ch].strokes = keep.map(i => FONT_ALLURE[ch].strokes[i]).filter(Boolean);
    }
}

// Allure capital stroke merges — decorative cap (stroke 0) leads into main body (stroke 1)
function mergeCapIntoBody(strokeA, strokeB) {
    // Find point in stroke 0 nearest to stroke 1's start, cut there, append all of stroke 1
    const target = strokeB[0];
    let bestIdx = 0, bestDist = Infinity;
    for (let i = 0; i < strokeA.length; i++) {
        const dx = strokeA[i][0] - target[0], dy = strokeA[i][1] - target[1];
        const d = dx * dx + dy * dy;
        if (d < bestDist) { bestDist = d; bestIdx = i; }
    }
    return [...strokeA.slice(0, bestIdx + 1), ...strokeB];
}
const ALLURE_MERGE = {
    'V': [0, 1],   // cap + main body
    'W': [0, 1],   // cap + main body
};
for (const [ch, [idxA, idxB]] of Object.entries(ALLURE_MERGE)) {
    if (!FONT_ALLURE[ch]) continue;
    const origStrokes = parseSvgPath(EMS_ALLURE[ch].d);
    const merged = mergeCapIntoBody(origStrokes[idxA], origStrokes[idxB]);
    // Replace first two strokes with merged, keep any remaining
    FONT_ALLURE[ch].strokes = [merged, ...origStrokes.slice(2)];
}

// (P programmatic merge removed — replaced by hand-sculpted data below)

// Allure 'a': reverse stroke direction — original starts at right (x=495) and ends mid (x=324),
// but cursive 'a' should flow left-to-right (bowl sweep then exit right)
if (FONT_ALLURE['a']) {
    FONT_ALLURE['a'].strokes[0] = [...FONT_ALLURE['a'].strokes[0]].reverse();
}

// Allure 'i': fix the loop at the top and reposition the dot.
// Original peak at (59.9, 328) is 97 units right of downstroke start (-37.8, 85.1) — too far,
// creates a visible split with thick strokes. But pulling peak too far left kills the loop.
// Fix: moderate peak position + insert a loop control point so the turn is round, not flat.
if (FONT_ALLURE['i']) {
    const s = FONT_ALLURE['i'].strokes[0];
    s[1] = [25, 260];     // approach: heading right-upward (was 37.8, 236)
    s[2] = [25, 328];     // peak: slight right, visible loop (was 59.9, 328)
    s.splice(3, 0, [-20, 250]); // loop control: rounds out the turn leftward after peak
    // Dot: recenter over the body loop (original 123,476 → 94.5,438 is way too far right)
    const d = FONT_ALLURE['i'].strokes[1];
    d[0] = [40, 470];
    d[1] = [28, 445];
}

// Allure 's': merge two strokes into one continuous S, with standalone and connected variants.
// Original has stroke 0 (baseline→top) and stroke 1 (crossing→bottom) as separate paths.
// Standalone (first/only letter): starts top-right, no upstroke approach.
// Connected (mid-word): starts baseline-left with upstroke flowing from previous letter.
// Both share the same S body — just different beginnings.
// Both need exit tails: orig[1] ends at (-15.8, 34.6) on the LEFT side — must curve rightward.
if (FONT_ALLURE['s']) {
    const orig = parseSvgPath(EMS_ALLURE['s'].d);
    const exitTail = [[60, 80], [160, 140], [260, 183]]; // curve right to baseline
    // Standalone: reverse stroke 0 (trim baseline approach), bridge crossing, + stroke 1 + exit
    const topDown = [...orig[0]].reverse().slice(0, -3); // top-right → approaching crossing
    const standalone = [...topDown, [60, 300], ...orig[1], ...exitTail];
    // Connected: stroke 0 (baseline→peak→crossing-right), then BACKTRACK along the top
    // curve (slightly below the ascending path to create the visual crossing), then into
    // lower bowl. The pen retraces the top arc — it doesn't cut diagonally across.
    const connected = [
        ...orig[0],       // baseline → peak → crossing-right (328, 365)
        [250, 430],       // backtrack: tight to ascending path (249,447), only ~17 below
        [120, 375],       // continuing left, tight to (117,394), ~19 below
        [66, 305],        // approaching crossing, tight to (66.1,328), ~23 below
        ...orig[1],       // (53.5, 274) → lower bowl → (-15.8, 34.6)
        ...exitTail       // curve right to baseline
    ];
    FONT_ALLURE['s'].strokes = [standalone];
    FONT_ALLURE['s'].connectedStrokes = [connected];
}

// Allure 'o': standalone = closed circle, connected = open with entry/exit ramps.
// Original has stroke 0 (bowl CCW, nearly closed) and stroke 1 (disconnected exit ramp).
// Standalone: close the bowl completely — Philip approved this.
// Connected: open the bowl, add entry ramp from baseline-left and exit ramp to baseline-right.
if (FONT_ALLURE['o']) {
    const orig = parseSvgPath(EMS_ALLURE['o'].d);
    const bowl = orig[0]; // 13 pts: (195,337) → CCW → (220,284)
    // Standalone: closed circle
    FONT_ALLURE['o'].strokes = [[...bowl, [208, 310], bowl[0]]];
    // Connected: open bowl with entry/exit for word-path connections
    FONT_ALLURE['o'].connectedStrokes = [[
        [-50, 183], [50, 250], [130, 300],  // entry ramp from baseline
        ...bowl,                             // bowl (CCW, ends at 220,284)
        [260, 240], [320, 200], [370, 183]   // exit ramp to baseline
    ]];
}

// Allure 'S': hand-sculpted single stroke — top-right entry, S-curve sweep, bottom-left exit.
// 24 pts, drawn in v3 editor, scaled to cap height.
if (FONT_ALLURE['S']) {
    FONT_ALLURE['S'].strokes = [[
        [716.4, 584.5], [743.7, 634], [731.9, 693.1], [665.1, 738.6], [550.4, 750],
        [433.2, 727.2], [333.7, 682.8], [277.1, 603.2], [290.9, 507.9], [395.1, 472],
        [500, 438.4], [600.9, 394.2], [679.5, 319], [663.3, 211.7], [582.9, 135.9],
        [486.6, 80.8], [382.9, 41], [275.2, 13.9], [165.9, -5], [56, 2.3],
        [-10.2, 86], [7.9, 190.2], [76.8, 266.7], [163.7, 324]
    ]];
}

// Allure 'd': compress ascender horizontally — original extends to X=693 (82% past advance width 381).
// The wild rightward extension creates extreme slant. Compress by 0.4×, anchored at bowl exit (X=277).
// Also raise the descender from Y=-113 to near baseline (like 'b' which only dips to -9.45).
if (FONT_ALLURE['d']) {
    const s = FONT_ALLURE['d'].strokes[0];
    const anchor = 277; // X of point 11 (bowl exit)
    for (let i = 12; i <= 23; i++) {
        s[i] = [Math.round(anchor + (s[i][0] - anchor) * 0.4), s[i][1]];
    }
    // Raise descender — original drops to Y=-113
    s[24] = [260, 15];    // was (233, -44.1)
    s[25] = [258, 0];     // was (258, -97.6)
    s[26] = [262, -10];   // was (302, -113)
    s[27] = [268, -5];    // was (340, -101)
    // Exit ramp: curve from near-baseline up to connection height
    s.push([300, 60], [340, 120], [370, 183]);
    // Connected: entry ramp from baseline-left into bowl start (328,312 is upper-right)
    FONT_ALLURE['d'].connectedStrokes = [[
        [-50, 183], [50, 230], [180, 275], ...s
    ]];
}

// Allure 'k': merge entry fragment (stroke 0) into main body (stroke 1), drop descender (stroke 2).
// Stroke 0 is a 3-point entry fragment. Stroke 2 is descender flourish (dropped).
// Trim body to s1[0..14]. Knee bump, then kick to VISUAL baseline (Y≈20, where stem bottoms
// out at s1[12]=(−18.9, 12.6)), then rise to connection height (Y=183) for next letter.
if (FONT_ALLURE['k']) {
    const s0 = FONT_ALLURE['k'].strokes[0]; // 3-pt entry fragment
    const s1 = FONT_ALLURE['k'].strokes[1]; // 18-pt main body
    const shared = [
        ...s0, ...s1.slice(0, 15),
        [180, 260],         // upstroke to knee
        [220, 270],         // knee peak
        [310, 20],          // steep kick to visual baseline (matches stem Y≈12)
        [380, 20],          // hold at visual baseline
    ];
    // Standalone: modest exit from visual baseline
    FONT_ALLURE['k'].strokes = [[...shared, [420, 80]]];
    // Connected: full rise to connection height for next letter
    FONT_ALLURE['k'].connectedStrokes = [[...shared, [430, 100], [460, 183]]];
    FONT_ALLURE['k'].width = 500;
}

// Allure 'p': restructure path — original draws bowl bottom-first (CCW on screen).
// Correct order: entry → descender DOWN → retrace UP stick → bowl CW on screen → exit.
// CW on screen = up left side → top → down right side → bottom → back to stick.
if (FONT_ALLURE['p']) {
    const s = FONT_ALLURE['p'].strokes[0];
    const body = [
        s[0],              // (25.2, 359) entry at upper body
        s[1],              // (-72.4, 56.7) descending
        s[2],              // (-176, -192) deep descender
        s[3],              // (-227, -350)
        s[4],              // (-255, -369) descender tip
        [-230, -345],      // return up stick (slight offset avoids Catmull-Rom cusp)
        [-180, -185],
        [-75, 55],
        s[15],             // (-25.2, 148) up into bowl — left side
        s[14],             // (15.8, 198)
        s[13],             // (72.5, 274) upper-left
        s[12],             // (139, 321) top-left
        s[11],             // (227, 346) top
        s[10],             // (268, 299) upper-right
        s[9],              // (258, 227) mid-right
        s[8],              // (208, 135) lower-right
        s[7],              // (85, 63) bottom-right
        s[6],              // (-44.1, 12.6) bottom of bowl
        s[15],             // (-25.2, 148) back to stick (completes circle)
        [50, 100],         // exit: curving right
        [150, 150],        // continuing right
        [280, 183],        // baseline-right exit
    ];
    FONT_ALLURE['p'].strokes = [body];
    // Connected: entry ramp from baseline-left into upper body start
    FONT_ALLURE['p'].connectedStrokes = [[
        [-50, 183], [-20, 250], [0, 310],  // ramp from baseline
        ...body
    ]];
}

// Allure 'b': exit tail — original ends at (-12.6, -9.45) on the LEFT side.
// Cursive b exits rightward to connect to the next letter. Add rightward baseline ramp.
if (FONT_ALLURE['b']) {
    const s = FONT_ALLURE['b'].strokes[0];
    s.push([80, 40], [220, 120], [380, 183]);
}

// Allure 'v': drop entry flourish (stroke 0) — decorative loop adds nothing.
// Keep body (stroke 1) only. Balance peaks: left=334, right was 432 — bring right down to match.
// Diagonal kick to baseline for connections.
if (FONT_ALLURE['v']) {
    const body = [...FONT_ALLURE['v'].strokes[1]]; // 9 pts: (41,334)→(447,419)
    body[6] = [318, 345];  // was (318, 381) — right ascending
    body[7] = [403, 350];  // was (403, 432) — right peak
    body[8] = [447, 340];  // was (447, 419) — right exit
    FONT_ALLURE['v'].strokes = [[...body, [470, 270], [490, 183]]];
    FONT_ALLURE['v'].width = 530;
}

// Allure 'w': widen advance to prevent overlap with following letters.
// Raw w extends to X=581 past its declared width of 554.
if (FONT_ALLURE['w']) {
    FONT_ALLURE['w'].width = 650;
}

// ============================================
// HAND-SCULPTED LOWERCASE — drawn in lowercase editor, replaces parsed SVG data
// ============================================

// Allure 'a': hand-sculpted single stroke — 19 pts
if (FONT_ALLURE['a']) {
    FONT_ALLURE['a'].strokes = [[
        [324, 343], [312, 356], [230, 356], [148, 331], [34.6, 261],
        [-53.8, 154.5], [-55.2, 65.8], [-0.4, 21.5], [87.1, 41.4], [190.9, 165.1],
        [283.4, 282.2], [291.6, 272.4], [263.8, 156.6], [260.3, 67.7], [284.5, 9.9],
        [341.6, 32.5], [406.1, 78.4], [456.6, 131.9], [495, 183]
    ]];
}

// Allure 'b': hand-sculpted single stroke — 24 pts
if (FONT_ALLURE['b']) {
    FONT_ALLURE['b'].strokes = [[
        [3.7, 166.8], [61.6, 257.1], [97.1, 356.2], [116.7, 483.6], [131.7, 627.1],
        [134.4, 731.3], [105.2, 692.7], [76.8, 601.2], [62.3, 483.6], [55.1, 374.3],
        [54.5, 267.2], [59.6, 160.2], [89.5, 62], [183.3, 22.9], [285.9, 38.3],
        [340.7, 119.3], [339.1, 203.1], [269.1, 252.2], [174.9, 253.6], [115, 191.2],
        [103.3, 109.6], [148.5, 40.4], [227.4, 12.9], [305.6, 26.8]
    ]];
}

// Allure 'c': hand-sculpted single stroke — 16 pts
if (FONT_ALLURE['c']) {
    FONT_ALLURE['c'].strokes = [[
        [199.2, 245], [222.9, 285.7], [230.6, 325.2], [198, 348.6], [133.2, 342.6],
        [64, 311.7], [3, 266.5], [-46, 209.1], [-67.5, 135.3], [-50.8, 63.2],
        [3.7, 18], [89.8, 14.7], [155.8, 43.7], [213.1, 78.5], [267.2, 124.6],
        [315, 183]
    ]];
}

// Allure 'd': hand-sculpted single stroke — 27 pts
if (FONT_ALLURE['d']) {
    FONT_ALLURE['d'].strokes = [[
        [297.3, 253.9], [259.5, 298.8], [180.3, 328.5], [78.9, 328.4], [-7.8, 283],
        [-42.4, 195.2], [-38, 114.1], [2.5, 48.5], [86.4, 10.5], [179, 27.7],
        [252.1, 90.5], [290.2, 201.3], [318.9, 302.9], [350.5, 401.6], [386.7, 526.3],
        [414.6, 652], [418.8, 749], [393.6, 788], [358.2, 774.3], [322.3, 653.5],
        [297, 483.6], [285.3, 277], [285.8, 135.2], [301.6, 60.4], [331.8, 24.2],
        [367, 9.7], [373.4, 20.5]
    ]];
}

// Allure 'e': hand-sculpted single stroke — 17 pts
if (FONT_ALLURE['e']) {
    FONT_ALLURE['e'].strokes = [[
        [66.1, 170], [148, 211], [217, 249], [252, 306], [237.4, 348.8],
        [173, 352], [70.6, 304.3], [7.9, 268.3], [-36.3, 205.2], [-69.4, 142.6],
        [-67.7, 90.8], [-42.1, 47.7], [33.2, 26.1], [135.7, 44], [209.9, 81.7],
        [273, 131.4], [316.7, 182.5]
    ]];
}

// Allure 'f': hand-sculpted — connected form is now solo too (24 pts)
if (FONT_ALLURE['f']) {
    FONT_ALLURE['f'].strokes = [[
        [-43.8, 181.3], [25.5, 205.8], [99.4, 237.2], [174.8, 277.1], [239.3, 382.4],
        [291.9, 509.5], [324.1, 640.1], [312.3, 742.3], [248.7, 755.8], [182.8, 693.1],
        [139.7, 565.1], [122.8, 376.3], [126.4, 142.1], [136.3, -62], [136.9, -233.2],
        [101.1, -252.4], [69.6, -225.2], [46, -122.1], [28.8, -11.7], [20.5, 83.9],
        [28.9, 162.1], [110, 181], [209.2, 184.3], [315.8, 186.9]
    ]];
}

// Allure 'g': hand-sculpted single stroke — 27 pts
if (FONT_ALLURE['g']) {
    FONT_ALLURE['g'].strokes = [[
        [305, 351.4], [200.4, 348], [100, 319], [14, 260.6], [-55.2, 182.3],
        [-79.4, 88.8], [-4.2, 17.3], [93.5, 45], [169.7, 116.3], [236, 197.3],
        [295.8, 271.5], [267.8, 170.7], [230.7, 72.8], [188, -22.8], [142.6, -117.2],
        [95.7, -210.7], [45.2, -300.8], [-23.5, -368.2], [-110.6, -397.1], [-122.6, -307.5],
        [-87.6, -218.6], [-13.2, -149.1], [74.1, -91.6], [164.6, -38.9], [255.4, 13.2],
        [346.4, 65.1], [432.9, 124.1]
    ]];
}

// Allure 'h': hand-sculpted single stroke — 24 pts
if (FONT_ALLURE['h']) {
    FONT_ALLURE['h'].strokes = [[
        [-47.8, 169], [118.1, 312.8], [329.1, 475.8], [443.9, 604], [469, 702],
        [394, 718], [324, 662], [254.6, 582.3], [178.3, 444.7], [96.3, 253.6],
        [13.9, 13.8], [101.9, 128.1], [188.2, 238.6], [274.4, 320.2], [318.1, 330.7],
        [344.3, 307.9], [340.2, 257.6], [306.3, 187.7], [280.3, 87.8], [291.7, 26],
        [350.1, 20.5], [413, 63], [482, 129], [529, 183]
    ]];
}

// Allure 'i': hand-sculpted — 2 strokes (body + dot)
if (FONT_ALLURE['i']) {
    FONT_ALLURE['i'].strokes = [
        [
            [-114.4, 62.4], [-38.6, 136.2], [13.3, 224.7], [21.4, 303.5], [7.4, 345.7],
            [-16.8, 253.6], [-29.2, 123.7], [-13.5, 28.8], [53.5, 6.3], [132, 69.3],
            [183, 129], [217, 183]
        ],
        [
            [42.1, 463.2], [23.4, 437]
        ]
    ];
}

// Allure 'j': hand-sculpted — 2 strokes (body + dot)
if (FONT_ALLURE['j']) {
    FONT_ALLURE['j'].strokes = [
        [
            [-113.9, 159.6], [-33.3, 205], [39.5, 250.2], [93.2, 292.7], [107.1, 287.6],
            [36.3, 119.5], [-81.9, -145], [-173, -309], [-243, -391], [-306, -416],
            [-365, -406], [-387, -353], [-356.3, -285.8], [-243.7, -182.7], [-75.9, -71.3],
            [58.8, 21.1], [152, 101.7], [233.8, 181.8]
        ],
        [
            [208.6, 486.6], [186.4, 462.6], [168.9, 440.4]
        ]
    ];
}

// Allure 'k': hand-sculpted single stroke — 26 pts
if (FONT_ALLURE['k']) {
    FONT_ALLURE['k'].strokes = [[
        [-122, 8.8], [46.8, 116.8], [182.2, 266.7], [258, 470.3], [314.8, 683.3],
        [323, 826], [290.9, 865.6], [232.8, 722.4], [170.9, 494.2], [108.6, 199.9],
        [84.4, 22.3], [86.2, 88.9], [108.3, 180.5], [154.6, 259.1], [229.8, 332.1],
        [328.1, 412.4], [439, 491.8], [528, 548.6], [452.9, 468.9], [352.9, 386.8],
        [265.2, 317.9], [249.6, 232.5], [301.5, 118.3], [383.1, 8.8], [483.9, 62.4],
        [578.3, 146.1]
    ]];
    FONT_ALLURE['k'].width = 500;
    delete FONT_ALLURE['k'].connectedStrokes;
}

// Allure 'm': hand-sculpted single stroke — 24 pts
if (FONT_ALLURE['m']) {
    FONT_ALLURE['m'].strokes = [[
        [-54.4, 181.9], [4.3, 242.9], [56, 297.2], [86.3, 314.2], [67.7, 230.1],
        [35.5, 118.6], [8.7, 17.4], [68.2, 104.5], [136.8, 213.1], [203.9, 308.3],
        [259, 334.6], [293.5, 334.6], [298.4, 295.5], [264.7, 203.7], [205.1, 69.2],
        [296.8, 166.9], [380.4, 261.3], [443, 304.8], [454.4, 252.2], [429.1, 140.6],
        [413.4, 55.8], [421, 21.1], [478, 75.8], [567, 174.6]
    ]];
}

// Allure 'n': hand-sculpted single stroke — 15 pts
if (FONT_ALLURE['n']) {
    FONT_ALLURE['n'].strokes = [[
        [148, 328], [65.4, 69.8], [178, 179.1], [273.1, 277.9], [332.2, 313.1],
        [377.7, 332], [391.4, 308.8], [331, 195], [290, 101], [293, 47.2],
        [328, 15.8], [387, 25.2], [450, 69.3], [513, 132], [548, 183]
    ]];
}

// Allure 'o': hand-sculpted single stroke — 17 pts (closed bowl)
if (FONT_ALLURE['o']) {
    FONT_ALLURE['o'].strokes = [[
        [160.6, 334.7], [101.9, 335.9], [44.1, 329.9], [-9.5, 307.3], [-43, 258.8],
        [-57.1, 200.8], [-58.9, 141.2], [-41.4, 84.4], [-3.6, 38.6], [50.8, 15],
        [109.6, 22.6], [162.4, 50.1], [202.4, 94.1], [221.9, 150.2], [221.9, 208.8],
        [207.8, 264.9], [187.8, 319.7]
    ]];
    // Clear stale programmatic connectedStrokes — hand-sculpted solo is canonical until connected is sculpted
    delete FONT_ALLURE['o'].connectedStrokes;
}

// Allure 'p': hand-sculpted single stroke — 26 pts
if (FONT_ALLURE['p']) {
    FONT_ALLURE['p'].strokes = [[
        [-244.2, -12.2], [-147.3, 79.3], [-71.8, 193.5], [-6.2, 305.6], [95.2, 334.7],
        [200.2, 314.7], [273.5, 244.3], [255, 136.7], [187.8, 51.2], [81.4, 29.4],
        [1.7, 103.6], [-1.1, 216.3], [22.2, 328.2], [37.5, 258.9], [28.6, 144.9],
        [14.3, 31.2], [-4.1, -88.6], [-29.6, -218.5], [-59.4, -346.4], [-93, -312.4],
        [-72, -203.7], [-30.1, -93], [48.9, -11.2], [150.8, 40.3], [260.4, 72.8],
        [372.3, 96.6]
    ]];
}

// Allure 'q': hand-sculpted single stroke — 26 pts
if (FONT_ALLURE['q']) {
    FONT_ALLURE['q'].strokes = [[
        [277.3, 355.2], [173.2, 364], [75.7, 340.8], [1.4, 277.5], [-30.4, 176.4],
        [-33, 75.8], [45.5, 22.6], [147.6, 33.1], [211.2, 114], [257, 208],
        [289.5, 300.9], [276.8, 223], [257.8, 123.1], [235.3, 22], [198.7, -80.2],
        [153, -190.2], [98.4, -313.6], [79.1, -415.2], [159.7, -411.7], [237.1, -300.7],
        [271.1, -186.2], [265.2, -78.6], [249.9, 25.2], [351.2, 46.2], [439.6, 99.5],
        [505.5, 180]
    ]];
}

// Allure 's': hand-sculpted single stroke — 24 pts
if (FONT_ALLURE['s']) {
    FONT_ALLURE['s'].strokes = [[
        [328, 365], [343, 381], [349.5, 412.9], [337.5, 441.2], [290.1, 448.6],
        [231.3, 440.3], [133.7, 396.1], [77.9, 346.2], [51.9, 306.6], [53.4, 274.1],
        [78.1, 232.7], [159.4, 183.1], [196.6, 135], [190, 87.2], [145.2, 36.8],
        [84.7, -2.1], [31.8, -23.1], [-8.7, -19.2], [-33.4, -5.2], [-32, 22.8],
        [-3.6, 52.1], [66.6, 91.5], [160.5, 140.5], [260, 183]
    ]];
    // Clear connectedStrokes — hand-sculpted version is the canonical shape
    delete FONT_ALLURE['s'].connectedStrokes;
    // Finishing variant: trim rightward exit ramp, replace with gentle trail.
    // Points 0-20 are the S body proper; 21-23 are the exit ramp to Y=183.
    FONT_ALLURE['s'].finishingStrokes = [[
        ...FONT_ALLURE['s'].strokes[0].slice(0, 21), // through the S body + bottom
        [50, 65],    // gentle rightward trail
        [95, 78]     // soft taper
    ]];
}

// Allure 't': hand-sculpted — 2 strokes (body + crossbar)
if (FONT_ALLURE['t']) {
    FONT_ALLURE['t'].strokes = [
        [
            [-76.1, 143.6], [-6.1, 189.1], [56.9, 249.4], [108.6, 352.2], [149.3, 461.7],
            [169.6, 549.8], [168.3, 596.4], [128.6, 523.7], [82, 416.3], [37.4, 274.2],
            [4.7, 105.2], [22.6, 26.7], [97.6, 28.4], [192, 110], [258, 183]
        ],
        [
            [-47.3, 345.5], [50.3, 356.2], [150.5, 368.8], [235.8, 380]
        ]
    ];
}

// Allure 'u': hand-sculpted single stroke — 17 pts
if (FONT_ALLURE['u']) {
    FONT_ALLURE['u'].strokes = [[
        [47.2, 309], [-17.9, 216.8], [-52.8, 121], [-54.9, 48.2], [-20.5, 5],
        [64.9, 57.5], [146.6, 141.7], [225.6, 243.9], [281.9, 321.3], [291.2, 302.3],
        [229.4, 184], [202, 96.2], [212.6, 38.8], [251.3, 1.6], [323.6, 40.6],
        [407.1, 114.7], [463, 183]
    ]];
}

// Allure 'v': hand-sculpted single stroke — 11 pts
if (FONT_ALLURE['v']) {
    FONT_ALLURE['v'].strokes = [[
        [34.1, 334.7], [22.3, 174.6], [22.7, 78.7], [44.1, 14.7], [139.7, 158.4],
        [229.4, 271.3], [317.4, 334.8], [397.3, 351.4], [441, 326.9], [469.2, 267.1],
        [490, 183]
    ]];
    FONT_ALLURE['v'].width = 530;
}

// Allure 'w': hand-sculpted single stroke — 21 pts
if (FONT_ALLURE['w']) {
    FONT_ALLURE['w'].strokes = [[
        [69.3, 346], [-12.6, 227], [-56.7, 120], [-63, 69.3], [-50.4, 31.5],
        [-3.1, 18.9], [56.7, 40.9], [120.8, 115.5], [194.3, 218.3], [248, 276],
        [281.2, 293.3], [234.9, 201.7], [217.3, 109.3], [236.5, 43.9], [279.4, 11.7],
        [352.4, 73.2], [414.3, 158.8], [467.1, 254.4], [520, 339], [556.5, 310.6],
        [579.1, 258.1]
    ]];
    FONT_ALLURE['w'].width = 650;
}

// Allure 'x': hand-sculpted — 2 strokes (forward diagonal + back cross)
if (FONT_ALLURE['x']) {
    FONT_ALLURE['x'].strokes = [
        [
            [-31.5, 183], [59.9, 306], [126, 321], [142, 277], [158, 202],
            [180, 117], [202, 40.9], [271, 12.6], [340, 40.9], [397, 101],
            [457, 183]
        ],
        [
            [398.9, 349.2], [360.2, 348.3], [229.2, 240.1], [110.4, 133.3], [-2, 7],
            [-81.9, -101], [-97.6, -132], [-117, -183]
        ]
    ];
}

// Allure 'y': hand-sculpted single stroke — 25 pts
if (FONT_ALLURE['y']) {
    FONT_ALLURE['y'].strokes = [[
        [63.9, 326.6], [-2.1, 247.4], [-33, 188.2], [-46.9, 132.3], [-52.7, 85.3],
        [-31.5, 44.6], [24.7, 20.9], [92, 30], [192, 140.6], [290.1, 265.6],
        [336.3, 318.6], [358, 311.3], [273.9, 137], [183.3, -94.3], [100.8, -231.7],
        [11.1, -345.6], [-64.4, -413.2], [-118.1, -384.8], [-135.7, -331], [-92.6, -245],
        [-6.9, -163.2], [123.4, -66.8], [265, 9.5], [406, 123], [457, 183]
    ]];
}

// Allure 'z': hand-sculpted single stroke — 23 pts
if (FONT_ALLURE['z']) {
    FONT_ALLURE['z'].strokes = [[
        [34.6, 202], [85, 277], [145, 331], [214, 340], [302, 315],
        [384, 296], [447, 318], [457, 340], [432, 356], [397, 334],
        [340, 280], [126, 85.1], [59.9, 22], [3.2, 9.5], [-12.6, 37.8],
        [19.5, 65], [69, 58.6], [132.1, 30.4], [204.8, 0.2], [283.8, -10.9],
        [359.4, 2.6], [435.1, 55.3], [512.4, 111.8]
    ]];
    FONT_ALLURE['z'].connectedStrokes = [[
        [-45.4, 183], [-5.4, 192.5], [24.6, 199.2], [34.6, 202], [85, 277],
        [145, 331], [214, 340], [302, 315], [384, 296], [447, 318],
        [457, 340], [432, 356], [397, 334], [340, 280], [126, 85.1],
        [59.9, 22], [3.2, 9.5], [-12.6, 37.8], [19.5, 65], [69, 58.6],
        [132.1, 30.4], [204.8, 0.2], [283.8, -10.9], [359.4, 2.6], [435.1, 55.3],
        [512.4, 111.8]
    ]];
}

// ============================================
// CONNECTION HEIGHT BANDS
// Each letter's entry/exit classified as HIGH, MID, or LOW
// based on Y of first/last point of primary solo stroke.
// HIGH: Y < 130, MID: 130-230, LOW: Y > 230
// Used by flushWord() for adaptive bridge generation.
// ============================================
const BAND_HIGH = 'HIGH', BAND_MID = 'MID', BAND_LOW = 'LOW';
function classifyBand(y) {
    if (y < 130) return BAND_HIGH;
    if (y <= 230) return BAND_MID;
    return BAND_LOW;
}
function bandDistance(a, b) {
    if (a === b) return 0;
    if ((a === BAND_HIGH && b === BAND_LOW) || (a === BAND_LOW && b === BAND_HIGH)) return 2;
    return 1;
}
for (const letter of 'abcdefghijklmnopqrstuvwxyz') {
    const glyph = FONT_ALLURE[letter];
    if (!glyph || !glyph.strokes || !glyph.strokes[0]) continue;
    const primary = glyph.strokes[0];
    glyph.entryY = primary[0][1];
    glyph.exitY = primary[primary.length - 1][1];
    glyph.entryBand = classifyBand(glyph.entryY);
    glyph.exitBand = classifyBand(glyph.exitY);
}

// ============================================
// CONNECTOR JOINT SYSTEM
// Replaces the snout/bridge approach with smooth cubic Bezier connectors.
// Each letter has entry/exit metadata (point + tangent angle).
// generateConnectorPoints() creates a smooth curve between any two letters.
// ============================================

// Stub boundaries: where core letter body ends, exit ramp begins.
const STUB_BOUNDS = {
    'a': { stubStart: 0, stubEnd: 14 },
    'b': { stubStart: 0, stubEnd: 20 },
    'c': { stubStart: 0, stubEnd: 12 },
    'd': { stubStart: 0, stubEnd: 26 },
    'e': { stubStart: 0, stubEnd: 13 },
    'f': { stubStart: 0, stubEnd: 20 },
    'g': { stubStart: 0, stubEnd: 22 },
    'h': { stubStart: 0, stubEnd: 19 },
    'i': { stubStart: 0, stubEnd: 8 },
    'j': { stubStart: 0, stubEnd: 14 },
    'k': { stubStart: 0, stubEnd: 23 },
    'l': { stubStart: 0, stubEnd: null },
    'm': { stubStart: 0, stubEnd: 21 },
    'n': { stubStart: 0, stubEnd: 11 },
    'o': { stubStart: 0, stubEnd: null },
    'p': { stubStart: 0, stubEnd: 22 },
    'q': { stubStart: 0, stubEnd: 22 },
    'r': { stubStart: 0, stubEnd: null },
    's': { stubStart: 0, stubEnd: 20 },
    't': { stubStart: 0, stubEnd: 11 },
    'u': { stubStart: 0, stubEnd: 15 },
    'v': { stubStart: 0, stubEnd: 9 },
    'w': { stubStart: 0, stubEnd: null },
    'x': { stubStart: 0, stubEnd: 9 },
    'y': { stubStart: 0, stubEnd: 23 },
    'z': { stubStart: 0, stubEnd: null },
};

const CONNECTOR_CATEGORY_B = new Set(['a', 's']);

function _computeStrokeTangent(points, fromEnd) {
    if (!points || points.length < 2) return 0;
    if (fromEnd) {
        const n = points.length;
        if (n >= 3) {
            const dx1 = points[n-1][0]-points[n-2][0], dy1 = points[n-1][1]-points[n-2][1];
            const dx2 = points[n-2][0]-points[n-3][0], dy2 = points[n-2][1]-points[n-3][1];
            return Math.atan2((dy1+dy2)/2, (dx1+dx2)/2);
        }
        return Math.atan2(points[n-1][1]-points[n-2][1], points[n-1][0]-points[n-2][0]);
    } else {
        if (points.length >= 3) {
            const dx1 = points[1][0]-points[0][0], dy1 = points[1][1]-points[0][1];
            const dx2 = points[2][0]-points[1][0], dy2 = points[2][1]-points[1][1];
            return Math.atan2((dy1+dy2)/2, (dx1+dx2)/2);
        }
        return Math.atan2(points[1][1]-points[0][1], points[1][0]-points[0][0]);
    }
}

function _fixExitAngle(rawAngle, exitY) {
    const deg = rawAngle * 180 / Math.PI;
    if (deg < -40 || deg > 40) {
        if (exitY < 50) return 0.35;
        else if (exitY > 200) return -0.2;
        else return 0.15;
    }
    return rawAngle;
}

// Attach connector metadata to each lowercase glyph
for (const letter of 'abcdefghijklmnopqrstuvwxyz') {
    const glyph = FONT_ALLURE[letter];
    if (!glyph || !glyph.strokes || !glyph.strokes[0]) continue;
    const primary = glyph.strokes[0];
    const bounds = STUB_BOUNDS[letter];
    const start = bounds ? (bounds.stubStart || 0) : 0;
    const end = bounds && bounds.stubEnd != null ? bounds.stubEnd + 1 : primary.length;
    const stub = primary.slice(start, end);
    const rawExit = _computeStrokeTangent(stub, true);
    const exitPt = stub[stub.length - 1];
    glyph.connectorMeta = {
        entryX: stub[0][0], entryY: stub[0][1],
        entryAngle: _computeStrokeTangent(stub, false),
        exitX: exitPt[0], exitY: exitPt[1],
        exitAngle: _fixExitAngle(rawExit, exitPt[1]),
        stubStart: start, stubEnd: end - 1,
        category: CONNECTOR_CATEGORY_B.has(letter) ? 'B' : 'A',
    };
}

// Generate a smooth connector between two letters (in glyph-local coordinates,
// after scaling/offset applied). Returns array of [x,y] points.
function generateConnectorPoints(exitX, exitY, exitAngle, entryX, entryY, entryAngle, nextCategory) {
    const dx = entryX - exitX, dy = entryY - exitY;
    const dist = Math.sqrt(dx*dx + dy*dy);
    if (dist < 5) return [];
    const hLen = dist * 0.55;
    const p0 = [exitX, exitY];
    const p1 = [exitX + Math.cos(exitAngle)*hLen, exitY + Math.sin(exitAngle)*hLen*0.8 + 0.15*dy];
    let aAngle = nextCategory === 'B'
        ? Math.atan2(-Math.abs(dy)*0.6, Math.abs(dx))
        : entryAngle;
    const p2 = [entryX - Math.cos(aAngle)*hLen, entryY - Math.sin(aAngle)*hLen*0.8 - 0.15*dy];
    const p3 = [entryX, entryY];
    const pts = [];
    for (let i = 0; i <= 8; i++) {
        const t = i/8, mt = 1-t;
        pts.push([
            mt*mt*mt*p0[0]+3*mt*mt*t*p1[0]+3*mt*t*t*p2[0]+t*t*t*p3[0],
            mt*mt*mt*p0[1]+3*mt*mt*t*p1[1]+3*mt*t*t*p2[1]+t*t*t*p3[1]
        ]);
    }
    return pts;
}

// ============================================
// AUTO-GENERATED CONNECTED STROKES (LEGACY — kept for backward compat)
// Snout generation preserved so existing rendering still works.
// flushWord() now uses generateConnectorPoints() for bridging.
// ============================================
for (const letter of 'abcdefghijklmnopqrstuvwxyz') {
    const glyph = FONT_ALLURE[letter];
    if (!glyph) continue;
    if (letter === 'z') continue;
    delete glyph.connectedStrokes;
    const connected = glyph.strokes.map((stroke, si) => {
        if (si > 0) return stroke;
        const entry = stroke[0];
        const minSnoutX = -glyph.width * 0.15;
        const snoutFarX = Math.max(entry[0] - 55, minSnoutX);
        const snoutNearX = Math.max(entry[0] - 18, minSnoutX + 8);
        const snoutY = entry[1];
        if (snoutFarX < entry[0] - 8) {
            return [[snoutFarX, snoutY], [snoutNearX, snoutY], ...stroke];
        }
        return [...stroke];
    });
    glyph.connectedStrokes = connected;
    if (glyph.finishingStrokes) {
        glyph.connectedFinishingStrokes = glyph.finishingStrokes.map((stroke, si) => {
            if (si > 0) return stroke;
            const entry = stroke[0];
            const minSnoutX = -glyph.width * 0.15;
            const snoutFarX = Math.max(entry[0] - 55, minSnoutX);
            const snoutNearX = Math.max(entry[0] - 18, minSnoutX + 8);
            const snoutY = entry[1];
            if (snoutFarX < entry[0] - 8) {
                return [[snoutFarX, snoutY], [snoutNearX, snoutY], ...stroke];
            }
            return [...stroke];
        });
    }
}

// Allure 'C': trim initial approach that sweeps through the middle (makes it look like 'e').
// Original points 0-1: (296,362)→(403,372) — horizontal sweep through body center.
// Removing them starts the C at the upper curve (526, 441) for a cleaner C shape.
if (FONT_ALLURE['C']) {
    FONT_ALLURE['C'].strokes[0] = FONT_ALLURE['C'].strokes[0].slice(2);
}

// Allure 'A': hand-sculpted single stroke.
// 26 pts, drawn in v3 editor, scaled to cap height.
if (FONT_ALLURE['A']) {
    FONT_ALLURE['A'].strokes = [[
        [174.7, 79.6], [239.7, 27.2], [316.5, 10.3], [403.2, 80], [496.4, 199.3],
        [601.9, 359.9], [728.1, 546.7], [856.7, 690.6], [953, 750], [915.5, 665.3],
        [873.1, 571.3], [802.6, 414.7], [761.3, 266.3], [772.7, 131], [803.9, 1.4],
        [723.4, 62.6], [614, 162.2], [488.2, 254.2], [367.3, 313.9], [335.1, 277.6],
        [360.2, 251.6], [450.2, 250.8], [587.6, 256.5], [712.2, 260.1], [807.1, 272.3],
        [879.8, 295.8]
    ]];
}

// Allure 'B': hand-sculpted single stroke.
// 30 pts, drawn in v3 editor, scaled to cap height.
if (FONT_ALLURE['B']) {
    FONT_ALLURE['B'].strokes = [[
        [73.4, 624.7], [64, 683.3], [102.4, 736.1], [189.2, 750], [234.7, 669.2],
        [224.3, 509.2], [132.1, 255.7], [3.8, 8], [69.9, 178.9], [133, 322.7],
        [199.3, 464.6], [266.9, 593.7], [366.9, 682.5], [496.4, 699.1], [594.7, 674.7],
        [626.2, 617.6], [627.2, 547.5], [577.2, 470.5], [507.7, 404.6], [421.1, 371.9],
        [354.6, 349], [413.6, 352.2], [525.2, 335.1], [609.3, 257.7], [623.7, 170.2],
        [601.8, 96], [497.5, 32.7], [320.8, 4.8], [153.9, 38.5], [108.2, 177.2]
    ]];
}

// Allure 'D': hand-sculpted single stroke — left entry, bowl sweep, stem descent.
// 27 pts, reshaped in v3 editor.
if (FONT_ALLURE['D']) {
    FONT_ALLURE['D'].strokes = [[
        [199, 347.9], [132.1, 354.3], [86.4, 391.4], [94.5, 460], [154, 548],
        [261, 614], [413, 671], [608, 706], [828, 680], [950.7, 627],
        [1018.4, 532.3], [1028, 373.5], [971, 222.5], [867.2, 108.3], [728.8, 25.5],
        [510.3, -9.4], [375, 34.6], [233, 145], [202, 113], [205, 31.5],
        [236, -37.8], [264.3, -43.8], [298.6, 19.4], [338.1, 157.5], [346.1, 301.1],
        [361.9, 472.9], [365, 499.4]
    ]];
}

// Allure 'E': hand-sculpted single stroke — upper loop, waist, lower bowl.
// 23 pts, reshaped in v3 editor.
if (FONT_ALLURE['E']) {
    FONT_ALLURE['E'].strokes = [[
        [462.3, 726.9], [543.8, 775.8], [530.8, 877.5], [433.8, 912.4], [295, 877.4],
        [166.4, 790.9], [73.1, 684.4], [64.6, 600.3], [111.5, 532.6], [222.7, 475.2],
        [307, 437], [205.5, 404.8], [90.7, 357.5], [26.6, 231.4], [9.6, 114.7],
        [58.1, 17.3], [179.4, -37.7], [336.2, -37.4], [476.8, 0.7], [584.1, 74.5],
        [594, 163.8], [561.1, 224.5], [505.5, 265.4]
    ]];
}

// Allure 'F': hand-sculpted single primary. Hood sweeps right, loops back through the top,
// then descends through the stem. Philip shaped this in the curve editor.
// Crossbar (stroke 1) stays as the only secondary.
if (FONT_ALLURE['F']) {
    const body = [
        [72.5, 372], [25.2, 403], [-6.3, 476], [44.1, 589], [145, 652],
        [340.2, 690.7], [487, 676.3], [587.1, 658.9], [700.4, 651.9], [791.7, 646.8],
        [854.3, 671.2], [793.3, 700.2], [534.2, 688.8], [435.4, 575.6], [369, 479],
        [331, 384], [277, 296], [217, 170], [164, 75.6], [158, 25.2],
        [176.5, -0.3], [225.5, 10.3], [252.9, 54.5], [266, 80.3]
    ];
    const crossbar = [[230, 309], [195, 287], [570, 331]];
    FONT_ALLURE['F'].strokes = [body, crossbar];
}

// Allure 'H': hand-sculpted single stroke.
// 29 pts, drawn in v3 editor, scaled to cap height.
if (FONT_ALLURE['H']) {
    FONT_ALLURE['H'].strokes = [[
        [209.6, 592.1], [195.8, 635.3], [220.5, 683.1], [265, 725.2], [334.7, 744.9],
        [401.7, 744.1], [411.6, 650.4], [364.9, 445.6], [301.1, 228.4], [228.6, 77.1],
        [154.6, 17.1], [172.1, 101], [222.9, 205.3], [311.6, 304.3], [407.3, 331.4],
        [498, 328.4], [594.1, 335.4], [711.1, 464.1], [778.2, 607.1], [784.4, 709.5],
        [754.9, 750], [698.9, 661.3], [653.8, 502.5], [617.2, 327.8], [600.7, 171.9],
        [613.2, 59.1], [658.8, 9.1], [737.2, 62.1], [814.5, 130.9]
    ]];
}

// Allure 'I': hand-sculpted single stroke.
// 26 pts, drawn in v3 editor, scaled to cap height.
if (FONT_ALLURE['I']) {
    FONT_ALLURE['I'].strokes = [[
        [228.9, 605.2], [168.3, 643.1], [183.8, 692.3], [270.2, 729.3], [394.8, 739.9],
        [536.4, 731.8], [670.5, 721.1], [739.7, 729.9], [752.1, 744.4], [721.7, 750],
        [554.6, 746.3], [444.4, 635.5], [405.1, 452.8], [397, 269.7], [393.1, 133.3],
        [376.4, 18.9], [276.1, 7.7], [174.5, 11.3], [89.1, 29.1], [85.9, 61.9],
        [132.6, 87.9], [229.2, 76.9], [363.2, 52.4], [491.1, 31], [597.6, 18.6],
        [700.9, 13.4]
    ]];
}

// Allure 'J': hand-sculpted single stroke.
// 23 pts, drawn in v3 editor, scaled to cap height.
if (FONT_ALLURE['J']) {
    FONT_ALLURE['J'].strokes = [[
        [296.2, 521.1], [236.2, 558.8], [206.3, 632.2], [228.2, 714.3], [387, 742.9],
        [586.2, 750], [777.6, 749.1], [877.4, 739.3], [851.7, 721.5], [700, 711.7],
        [546.2, 674.1], [477.1, 486.3], [452.3, 258.4], [426.1, 67.5], [361.5, -61.2],
        [241.2, -153], [107.6, -146], [9.3, -72.8], [-49.6, 25.8], [-37.8, 139.4],
        [25.7, 220.5], [149.9, 232.1], [175.8, 157.5]
    ]];
}

// Allure 'K': hand-sculpted single stroke.
// 32 pts, drawn in v3 editor, scaled to cap height.
if (FONT_ALLURE['K']) {
    FONT_ALLURE['K'].strokes = [[
        [-115.8, 689.6], [-67.5, 743.6], [-23.7, 746.9], [2.3, 704.8], [3.4, 629.4],
        [-2.5, 489.5], [-6.3, 325.4], [-15.4, 148.1], [-51, 26.9], [-100.7, -27],
        [-141.4, -20.6], [-157, -12], [-159.3, 29.8], [-124.1, 89.1], [-31.4, 146.1],
        [49.6, 205.4], [126.7, 268.2], [218.8, 357.3], [297.1, 448.5], [368.8, 544.4],
        [420.2, 656.6], [446.2, 750], [351.4, 647.3], [260.2, 523.5], [203.6, 416.3],
        [187.8, 327.9], [239.4, 183.8], [308.7, 75.6], [376.2, 18.9], [438.6, 5.5],
        [466.8, 33.4], [469.9, 68.4]
    ]];
}

// Allure 'L': hand-sculpted single stroke.
// 21 pts, drawn in v3 editor, scaled to cap height.
if (FONT_ALLURE['L']) {
    FONT_ALLURE['L'].strokes = [[
        [538.3, 568.8], [590.6, 623.5], [557.5, 693.2], [497.7, 750], [395.8, 743.8],
        [283.3, 693.4], [193, 587.3], [202.7, 386.1], [218.8, 177.8], [207.2, 17.8],
        [171.7, -61.3], [89.3, -127.8], [33, -81.8], [49.3, -15.1], [151.7, -9.4],
        [298.1, -76.5], [429.9, -135.4], [536.7, -146.5], [606.3, -125.7], [645, -85.2],
        [659.2, -29.7]
    ]];
}

// Allure 'M': hand-sculpted single stroke.
// 28 pts, drawn in v3 editor, scaled to cap height.
if (FONT_ALLURE['M']) {
    FONT_ALLURE['M'].strokes = [[
        [-51.7, 84], [-16.1, 52.4], [34.4, 55.4], [89.1, 108], [131.5, 228.5],
        [166.5, 371.3], [191.4, 525.4], [213, 659], [244.2, 749.1], [297.5, 657.5],
        [342.1, 528.2], [362.6, 387.9], [373.9, 272.8], [382.3, 191.4], [394.3, 156.7],
        [440.7, 277.8], [488.4, 422.5], [524.8, 564.4], [559.4, 681.4], [601.4, 750],
        [637.1, 658.9], [663.4, 536.2], [678.5, 381.4], [690.7, 220.6], [706.7, 68.9],
        [760.1, 49.9], [825.5, 125.8], [881.9, 221.5]
    ]];
}

// Allure 'N': hand-sculpted single stroke.
// 21 pts, drawn in v3 editor, scaled to cap height.
if (FONT_ALLURE['N']) {
    FONT_ALLURE['N'].strokes = [[
        [-245.7, 73], [-214, 31], [-159.1, 9.6], [-93.7, 33.5], [-45.9, 108],
        [-30.5, 181.6], [-7.9, 344.7], [17.6, 545.1], [43.3, 750], [98.9, 658.7],
        [144.2, 424.9], [180.2, 216.3], [208.2, 89.8], [240.5, 23], [294.2, 149.2],
        [341.3, 316], [377.7, 520.2], [415.2, 695.9], [471.9, 743], [512.9, 724.3],
        [535.6, 675.8]
    ]];
}

// Allure 'O': hand-sculpted single stroke — open bowl starting right, sweeping counter-clockwise.
// 24 pts, reshaped in v3 editor.
if (FONT_ALLURE['O']) {
    FONT_ALLURE['O'].strokes = [[
        [397.8, 604.5], [353.9, 568], [308.2, 594.1], [278.8, 654.9], [297, 719.3],
        [380.5, 763.6], [496.2, 779.4], [604.6, 758.8], [685.3, 700], [730.7, 617.9],
        [744.4, 525.2], [726.4, 410.3], [672.7, 289.9], [583.3, 177.6], [473.3, 89.4],
        [355.1, 42.9], [237.4, 56.2], [134.4, 120.5], [58.8, 226.8], [26.1, 359.4],
        [32, 485.1], [72.3, 585.2], [139.8, 662.8], [222.5, 729]
    ]];
}

// Allure 'P': hand-sculpted single stroke.
// 21 pts, drawn in v3 editor, scaled to cap height.
if (FONT_ALLURE['P']) {
    FONT_ALLURE['P'].strokes = [[
        [-35.4, 402.8], [-112.6, 486.3], [-97.3, 608.1], [38.6, 718.6], [277.8, 750],
        [455.2, 695.2], [511.4, 611.9], [483.5, 533.8], [397.7, 457.6], [234.3, 406.6],
        [144, 415.4], [89.1, 469], [87.9, 563.8], [108.3, 633.8], [118.8, 568.4],
        [117.4, 480.1], [115, 405.5], [110.3, 318.9], [104.9, 221.9], [103.4, 116.1],
        [101.2, 8.9]
    ]];
}

// Allure 'Q': hand-sculpted single stroke — counter-clockwise bowl with descending tail.
// 28 pts, redrawn from scratch in v3 editor draw mode. X coords normalized (-2740).
if (FONT_ALLURE['Q']) {
    FONT_ALLURE['Q'].strokes = [[
        [301.1, -172.8], [125.4, -105.6], [-3.5, 29.6], [-60, 215.9], [-62.6, 413.4],
        [-1, 593.3], [73.9, 698.7], [167, 768.1], [303.7, 803.2], [464.9, 807.2],
        [617.9, 751.2], [727.5, 638.4], [799.7, 484.3], [814.2, 323.4], [788.8, 186.8],
        [739.6, 65.3], [664.2, -41], [569.4, -128.2], [463.7, -169.5], [334.1, -178.3],
        [283, -139.5], [259.5, -80.4], [278, -22.5], [338.7, 21.9], [434.7, 19.8],
        [571.4, -50.9], [715.7, -152.4], [863.3, -223.2]
    ]];
}

// Allure 'R': hand-sculpted single stroke.
// 30 pts, drawn in v3 editor, scaled to cap height.
if (FONT_ALLURE['R']) {
    FONT_ALLURE['R'].strokes = [[
        [248.4, 675.6], [324.4, 713.9], [423.9, 742.3], [542.4, 750], [665.8, 745.9],
        [739.7, 722.1], [784.3, 686.6], [821, 618.9], [817.7, 553.5], [775, 495.8],
        [666.7, 427.7], [514.8, 402.9], [403.9, 422.6], [349.8, 481.2], [373.7, 558.6],
        [404.5, 598.7], [402.2, 521.8], [382.8, 400.9], [364.8, 246.5], [351, 119.6],
        [329.3, 26.9], [324.2, 126.8], [344.3, 268.2], [368.7, 367.6], [444.3, 269.5],
        [530.7, 143.7], [616.7, 47.4], [695.8, 26.9], [756.8, 56.7], [803.7, 96.9]
    ]];
}

// Allure 'G': hand-sculpted single stroke.
// 37 pts, drawn in v3 editor, scaled to cap height.
if (FONT_ALLURE['G']) {
    FONT_ALLURE['G'].strokes = [[
        [749.1, 502], [815.4, 576.3], [806.6, 676.1], [720.1, 750], [517.9, 714.4],
        [351.6, 614.8], [223.6, 508.6], [144.2, 408.8], [97.6, 328.2], [76, 239.6],
        [88.4, 156.8], [134.4, 92], [220.8, 43.8], [327, 23.1], [450.7, 29.5],
        [563.3, 53.2], [683.9, 106.2], [784, 158.4], [842.8, 217.6], [838.4, 259.3],
        [785, 238.4], [721.6, 162.5], [668.6, 29], [621.1, -137.5], [547.8, -322],
        [450.9, -472.6], [357.1, -509.5], [285.3, -506.3], [218.1, -497.3], [218.1, -426.2],
        [255.1, -346.4], [352.5, -246], [479.1, -162.8], [589.2, -104.4], [671.9, -79.7],
        [747.3, -58.1], [822, -43.1]
    ]];
}

// Allure 'T': hand-sculpted single stroke.
// 20 pts, drawn in v3 editor, scaled to cap height.
if (FONT_ALLURE['T']) {
    FONT_ALLURE['T'].strokes = [[
        [27.3, 578.5], [19.1, 637.4], [43.5, 695.8], [223.8, 721.6], [446.4, 729.1],
        [672.7, 721.6], [821.2, 727], [846, 750], [724, 748.1], [570.2, 734.7],
        [445.4, 686.1], [387, 602.4], [390.6, 463], [406.5, 268.5], [375, 92],
        [266.3, 32.6], [165.7, 25.4], [92.9, 46.9], [70.7, 91.8], [70.5, 132.9]
    ]];
}

// Allure 'U': hand-sculpted single stroke — left hump, valley, right hump descent.
// 33 pts, drawn in v3 editor, scaled to cap height.
if (FONT_ALLURE['U']) {
    FONT_ALLURE['U'].strokes = [[
        [5.9, 564.6], [44.8, 674.9], [109.2, 724.2], [179.3, 736.5], [220.7, 670.6],
        [181.3, 525.8], [95.8, 350], [28.6, 155.6], [33.8, -31], [93.3, -145.7],
        [195.3, -183.1], [301.5, -152.7], [386.3, -64.9], [459.4, 39.9], [525.4, 160.8],
        [596.7, 339.3], [641.5, 507.9], [663.6, 636.8], [667.8, 706.6], [657.2, 741.6],
        [633.5, 750], [605.1, 728.4], [581.8, 655.6], [562.7, 542.8], [545.9, 405.4],
        [536.7, 252.4], [531, 110.3], [533.5, -1.5], [548.1, -83.8], [576.5, -141.7],
        [616.2, -169.4], [659.4, -157.7], [696.1, -130.5]
    ]];
}

// Allure 'V': hand-sculpted single stroke.
// 23 pts, drawn in v3 editor, scaled to cap height.
if (FONT_ALLURE['V']) {
    FONT_ALLURE['V'].strokes = [[
        [33.7, 678.9], [105.6, 717.4], [189.4, 743.1], [228.2, 721.7], [236.3, 643],
        [202.6, 510.9], [156.8, 375.1], [122, 232.5], [141.1, 99.5], [201.4, 8.2],
        [289.6, 79.8], [372.7, 197.5], [437.9, 317.5], [496.7, 435.3], [552.9, 571],
        [584.1, 680.5], [589.5, 750], [558.1, 733.8], [523.3, 689.4], [514.1, 639],
        [587.9, 636.5], [693.7, 660.5], [809.1, 701.1]
    ]];
}

// Allure 'W': hand-sculpted single stroke — double valley with right exit.
// 41 pts, drawn in v3 editor, scaled to cap height.
if (FONT_ALLURE['W']) {
    FONT_ALLURE['W'].strokes = [[
        [51.6, 459.2], [15.7, 492.3], [-10.3, 563.6], [32.9, 633.8], [133.8, 686.6],
        [253.6, 722.6], [378.9, 745.6], [360.7, 631.2], [303.5, 512.8], [210.3, 377.4],
        [135.8, 264.5], [93.8, 161.1], [107.5, 80.6], [167.3, 6.5], [252.2, 31.1],
        [350.6, 77.4], [437.7, 133.6], [514, 196.5], [592.4, 285.1], [680.7, 402.9],
        [714.5, 485.3], [720, 556.9], [705.2, 622], [665.4, 603.5], [645.7, 526.4],
        [642.2, 421.8], [655.9, 302.4], [688.7, 184.1], [736.3, 96.8], [785.3, 41.7],
        [841.5, 10.4], [910.9, 29.3], [1012.1, 135.9], [1098.8, 278.2], [1162.1, 434.6],
        [1185.4, 549.6], [1173.4, 635], [1144.9, 710.6], [1100.3, 750], [1052.7, 735.8],
        [1003.2, 700.4]
    ]];
}

// Allure 'Y': hand-sculpted single stroke.
// 42 pts, drawn in v3 editor, scaled to cap height.
if (FONT_ALLURE['Y']) {
    FONT_ALLURE['Y'].strokes = [[
        [80, 520.2], [-9.8, 494.3], [-23, 578], [5.9, 677.9], [118.4, 724.6],
        [242.6, 732], [255.5, 640.1], [215.8, 525.4], [152, 419.1], [88.7, 260.2],
        [81.5, 120.8], [116, 50.3], [173.6, 38.3], [252.8, 86.2], [337.7, 154.8],
        [424.8, 234.5], [534.3, 324.5], [672.1, 417.6], [808.6, 525.9], [843.7, 661.1],
        [824.3, 750], [740.2, 703.8], [665, 583.7], [613.8, 443.4], [570.5, 298.5],
        [527.8, 128.8], [485.7, -47.2], [433.6, -158.7], [373.5, -239.3], [320.4, -304.6],
        [260.3, -364.8], [178.5, -416.8], [102.7, -429.3], [66.3, -416.8], [39.9, -368.7],
        [38.7, -323.3], [58.6, -280], [103.8, -232.5], [197.4, -171.3], [326.1, -107.2],
        [488.3, -45.9], [636.4, -5.8]
    ]];
}

// Allure 'Z': hand-sculpted — primary diagonal with crossbar secondary.
// 36 + 3 pts, drawn in v3 editor, scaled to cap height.
if (FONT_ALLURE['Z']) {
    FONT_ALLURE['Z'].strokes = [
        [
            [157, 574.1], [129.2, 637.8], [133.1, 699.2], [196.5, 739.2], [348.3, 724.9],
            [491.3, 701.3], [595.2, 679.3], [677.1, 648.3], [750, 620.3], [822.4, 609.7],
            [877.5, 656], [904, 708.5], [846.6, 745.3], [764.1, 750], [674.8, 689.1],
            [575.5, 556], [461.2, 412.5], [363, 294.5], [301.1, 226.2], [225.9, 150.4],
            [165, 104.6], [99.8, 60.2], [19.4, 21.9], [-66.8, 29.4], [-115.2, 68],
            [-83.4, 111.9], [13.1, 89.8], [130.5, 30], [242.3, -51], [377.8, -136.3],
            [514.1, -207], [673.7, -207], [750.4, -168.6], [784.7, -98.5], [778.7, -70],
            [772.6, -41.4]
        ],
        [[237.5, 343.3], [234.5, 324.1], [623.2, 343.3]]
    ];
}

// Allure 'X': hand-sculpted — forward diagonal primary, back cross secondary.
// 11 + 6 pts, drawn in v3 editor, scaled to cap height.
if (FONT_ALLURE['X']) {
    FONT_ALLURE['X'].strokes = [
        [
            [-4, 693.1], [42, 738.4], [99.3, 750], [172, 677.8], [238, 485],
            [285.2, 284.6], [331, 134.9], [379.9, 33.4], [434.9, 29.8], [483, 52.9],
            [523.6, 90.2]
        ],
        [
            [612.1, 739.2], [528.2, 683.5], [337.1, 481.1], [100.8, 225.9], [-65.1, 63.9],
            [-159.8, 3.4]
        ]
    ];
}

// Exit tails: reserved for future use if we re-enable capital connections.
// Currently capitals are disconnected (rendered standalone), so these don't fire.
const EXIT_TAILS = {};

const FONT_SCRIPT = {};
for (const [char, data] of Object.entries(HERSHEY_SCRIPT)) {
    FONT_SCRIPT[char] = decodeHersheyFont(data);
}
// Simplify Script capitals — Hershey uses multiple overlapping strokes for pen plotters
// which create ugly duplicate rainbow ropes in squiggle rendering. Keep only essential strokes.
const SCRIPT_KEEP = {
    'A': [0, 1, 3],
    'B': [1, 2, 4],
    'C': [0],
    'D': [1],
    'E': [0, 2],
    'F': [1, 3],
    'G': [0, 2],
    'H': [0, 2],
    'I': [1],
    'J': [1],
    'K': [0, 3, 5],
    // L: all strokes (2) — no filtering needed
    'M': [0, 2, 3, 4],
    'N': [0, 1, 3],
    'O': [0],
    'P': [1, 2],
    'Q': [0, 2],
    'R': [1, 2, 5],
    // S: single stroke — no filtering needed
    'T': [1],
    'U': [0, 1, 2],
    'V': [1],
    'W': [0, 2, 3, 5],
    'X': [0, 2],
    'Y': [0, 1, 3],
    'Z': [1],
};
for (const [ch, keep] of Object.entries(SCRIPT_KEEP)) {
    if (FONT_SCRIPT[ch]) {
        FONT_SCRIPT[ch].strokes = keep.map(i => FONT_SCRIPT[ch].strokes[i]).filter(Boolean);
    }
}

// Merge overlapping strokes — some capitals have two strokes that share a middle section.
// Instead of rendering both (double rainbow rope) or dropping one (losing detail),
// splice them into one continuous stroke: A's unique start → overlap transition → B's unique end.
function mergeOverlappingStrokes(strokeA, strokeB, threshold) {
    // Find the first point in A that's close to any point in B (entering overlap zone)
    let bestAi = -1, bestBi = -1, bestDist = Infinity;
    for (let ai = Math.floor(strokeA.length * 0.2); ai < strokeA.length; ai++) {
        for (let bi = 0; bi < Math.ceil(strokeB.length * 0.8); bi++) {
            const dx = strokeA[ai][0] - strokeB[bi][0];
            const dy = strokeA[ai][1] - strokeB[bi][1];
            const d = dx * dx + dy * dy;
            if (d < bestDist) { bestDist = d; bestAi = ai; bestBi = bi; }
        }
    }
    if (bestDist > threshold * threshold) {
        // No close overlap found — just concatenate
        return [...strokeA, ...strokeB];
    }
    // Cut A at the overlap point, pick up B from there
    return [...strokeA.slice(0, bestAi), ...strokeB.slice(bestBi)];
}

// Letters needing stroke merges: [strokeIndex0, strokeIndex1] from ORIGINAL (pre-KEEP) strokes
const SCRIPT_MERGE = {
    'L': [0, 1],   // strokes overlap in the middle descender
    'U': [0, 1],   // strokes overlap at the top
    'V': [0, 1],   // strokes overlap at the top
    'Y': [0, 1],   // strokes overlap at the top
};
for (const [ch, [idxA, idxB]] of Object.entries(SCRIPT_MERGE)) {
    if (!FONT_SCRIPT[ch]) continue;
    const decoded = decodeHersheyFont(HERSHEY_SCRIPT[ch]);
    const origA = decoded.strokes[idxA];
    const origB = decoded.strokes[idxB];
    if (!origA || !origB) continue;
    // Compute threshold from letter bounding box (8% of bbox diagonal)
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    for (const s of [origA, origB]) for (const [x, y] of s) {
        minX = Math.min(minX, x); maxX = Math.max(maxX, x);
        minY = Math.min(minY, y); maxY = Math.max(maxY, y);
    }
    const diag = Math.sqrt((maxX - minX) ** 2 + (maxY - minY) ** 2);
    const merged = mergeOverlappingStrokes(origA, origB, diag * 0.08);
    // Replace the kept strokes: remove originals, insert merged
    // For L: both strokes were kept (all strokes). Replace with single merged.
    // For U: strokes [0,1,2] kept. Replace 0+1 with merged, keep 2.
    // For V: only stroke [1] was kept. Replace with merged (covers 0+1).
    if (ch === 'L') {
        FONT_SCRIPT[ch].strokes = [merged];
    } else if (ch === 'U') {
        FONT_SCRIPT[ch].strokes = [merged, decoded.strokes[2]];
    } else if (ch === 'V') {
        FONT_SCRIPT[ch].strokes = [merged];
    } else if (ch === 'Y') {
        FONT_SCRIPT[ch].strokes = [merged, decoded.strokes[3]];
    }
}

// Share punctuation across all fonts — both use Y-up but different baseline positions.
// Allure: baseline≈9, x-height≈356. Script: baseline≈-297, x-height≈0.
// Affine transform: map Allure baseline→Script baseline, Allure x-height→Script x-height.
// Compute Script Y-range from letters only BEFORE adding punct so scaling isn't distorted.
const SCRIPT_LETTER_YRANGE = computeFontYRange(FONT_SCRIPT);
{
    // Measure 'e' in each font: bottom = baseline, top = x-height
    let aBase = Infinity, aTop = -Infinity;
    for (const s of FONT_ALLURE['e'].strokes) for (const [,y] of s) { aBase = Math.min(aBase, y); aTop = Math.max(aTop, y); }
    let sBase = Infinity, sTop = -Infinity;
    for (const s of FONT_SCRIPT['e'].strokes) for (const [,y] of s) { sBase = Math.min(sBase, y); sTop = Math.max(sTop, y); }
    // Scale: Script x-height span / Allure x-height span (both positive, no flip)
    const yScale = (sTop - sBase) / (aTop - aBase);
    const wScale = yScale;

    for (const [ch, glyph] of Object.entries(FONT_ALLURE)) {
        if (ch >= 'A' && ch <= 'Z') continue;
        if (ch >= 'a' && ch <= 'z') continue;
        if (ch === ' ') continue;
        if (FONT_SCRIPT[ch]) continue;
        // Affine: newY = scriptBase + (y - allureBase) * yScale
        const newStrokes = glyph.strokes.map(stroke =>
            stroke.map(([x, y]) => [x * wScale, sBase + (y - aBase) * yScale])
        );
        FONT_SCRIPT[ch] = { width: glyph.width * wScale, strokes: newStrokes };
    }
}

function computeFontYRange(font) {
    let minY = Infinity, maxY = -Infinity;
    for (const glyph of Object.values(font)) {
        for (const stroke of glyph.strokes) {
            for (const [, y] of stroke) { if (y < minY) minY = y; if (y > maxY) maxY = y; }
        }
    }
    return maxY - minY || 900;
}

// ============================================
// WIDTH RECALCULATION
// Auto-compute widths from actual stroke extents.
// width = maxX + 8% margin. Only override if >15% different from declared.
// Skip letters with manual width overrides (k, v, w).
// ============================================
const MANUAL_WIDTH_LETTERS = new Set(['k', 'v', 'w']);
for (const [char, glyph] of Object.entries(FONT_ALLURE)) {
    if (!glyph || !glyph.strokes || MANUAL_WIDTH_LETTERS.has(char)) continue;
    let maxX = -Infinity;
    for (const stroke of glyph.strokes) {
        for (const [x] of stroke) { if (x > maxX) maxX = x; }
    }
    if (glyph.connectedStrokes) {
        for (const stroke of glyph.connectedStrokes) {
            for (const [x] of stroke) { if (x > maxX) maxX = x; }
        }
    }
    if (maxX === -Infinity) continue;
    const computed = Math.round(maxX * 1.08);
    const declared = glyph.width;
    // Only override if mismatch is >15%
    if (Math.abs(computed - declared) / declared > 0.15) {
        glyph.width = computed;
    }
}

const FONTS = {
    Allure: { glyphs: FONT_ALLURE, yRange: computeFontYRange(FONT_ALLURE), xHeight: computeXHeightRange(FONT_ALLURE) },
    Script: { glyphs: FONT_SCRIPT, yRange: SCRIPT_LETTER_YRANGE, xHeight: computeXHeightRange(FONT_SCRIPT) }
};

// ============================================
// FONT LOOKUP (parameterized — no global state)
// ============================================

function getFontGlyphs(fontStyle) { return FONTS[fontStyle].glyphs; }
function getFontYRange(fontStyle) { return FONTS[fontStyle].yRange; }

// ============================================
// STROKE CLASSIFICATION
// ============================================

function isDot(stroke) {
    if (stroke.length > 3) return false;
    let len = 0;
    for (let i = 0; i < stroke.length - 1; i++) {
        const dx = stroke[i+1][0] - stroke[i][0], dy = stroke[i+1][1] - stroke[i][1];
        len += Math.sqrt(dx*dx + dy*dy);
    }
    return len < 120;
}

function isCrossbar(stroke) {
    if (stroke.length < 2 || stroke.length > 3) return false;
    const dx = Math.abs(stroke[stroke.length-1][0] - stroke[0][0]);
    const dy = Math.abs(stroke[stroke.length-1][1] - stroke[0][1]);
    return dx > dy * 3 && dx > 100;
}

// Explicit secondary strokes per font: drawn after the word (like i dot, t crossbar)
// When a font+char has an explicit entry, ONLY explicit set is used (geometric detection skipped).
// When no entry exists, falls back to isDot/isCrossbar geometric detection.
const SECONDARY_STROKES = {
    Script: {
        'i': new Set([0]),   // dot (5pts, isDot needs ≤3)
        'j': new Set([0]),   // dot (5pts)
        't': new Set([0]),   // crossbar
        'x': new Set([1]),   // cross
    },
    Allure: {
        'x': new Set([1]),   // cross
        // Capital secondary strokes — keep only the body/stem as primary for clean connections
        'A': new Set([1]),      // crossbar secondary; main body sweep (stroke 0) is primary
        'F': new Set([1]),      // crossbar secondary; merged hood+stem is primary
        // H: no entry — crossbar merged into left leg (stroke 0), right leg is stroke 1. No secondaries.
        'K': new Set([1]),      // lower right leg secondary; merged leg+diagonal is primary [0]
        // R: no entry — merged into single stroke (stem up → bowl → leg), no secondaries
        'T': new Set([0]),      // top flourish secondary; downstroke is primary
        'X': new Set([1]),      // back-cross secondary; merged curl+diagonal is primary
    },
    EMSPepita: {
        'e': new Set([]),    // stroke 1 is exit tail, NOT a dot
        'f': new Set([1]),   // crossbar
        'i': new Set([1]),   // dot
        'j': new Set([1]),   // dot
        'k': new Set([]),    // stroke 1 is lower leg, NOT secondary
        'n': new Set([]),    // stroke 1 is exit tail, NOT secondary
        't': new Set([1]),   // crossbar
    },
};

function findYExtrema(pathPoints) {
    if (pathPoints.length < 2) return new Set([0, pathPoints.length - 1]);
    let minYIdx = 0, maxYIdx = 0;
    for (let i = 1; i < pathPoints.length; i++) {
        if (pathPoints[i][1] < pathPoints[minYIdx][1]) minYIdx = i;
        if (pathPoints[i][1] > pathPoints[maxYIdx][1]) maxYIdx = i;
    }
    return new Set([minYIdx, maxYIdx]);
}

// ============================================
// UTILITIES
// ============================================

function map(value, inMin, inMax, outMin, outMax) {
    return outMin + (outMax - outMin) * ((value - inMin) / (inMax - inMin));
}

function generateHash(seed) {
    const pairs = [];
    let s = (Math.abs(seed) ^ 0xDEADBEEF) >>> 0;
    for (let i = 0; i < 32; i++) {
        s ^= s << 13;
        s ^= s >>> 17;
        s ^= s << 5;
        s = s >>> 0;
        pairs.push(s % 256);
    }
    return pairs;
}

function extractTraits(decPairs) {
    const styleVal = decPairs[31];
    let type = styleVal >= 251 ? 'Pipe' :
               styleVal >= 239 ? 'Bold' :
               styleVal >= 219 ? 'Ribbed' :
               styleVal >= 192 ? 'Fuzzy' :
               styleVal >= 162 ? 'Slinky' : 'Normal';

    const hyperRainbow = decPairs[28] <= 2;
    const startColor = decPairs[29];
    const reverse = decPairs[30] < 128;
    const spread = hyperRainbow ? 0.5 : Math.round(5 + (decPairs[28] / 255) * 45);

    return { type, hyperRainbow, startColor, reverse, spread };
}

function createRng(seed) {
    let s = seed;
    return function rnd() {
        s ^= s << 13; s ^= s >> 17; s ^= s << 5;
        return (((s < 0) ? ~s + 1 : s) % 1000) / 1000;
    };
}

function hsbToRgb(h, s, b) {
    const hue = ((h % 255) + 255) % 255 / 255;
    const sat = s / 255;
    const bri = b / 255;
    let r, g, bl;
    const i = Math.floor(hue * 6);
    const f = hue * 6 - i;
    const p = bri * (1 - sat);
    const q = bri * (1 - f * sat);
    const t = bri * (1 - (1 - f) * sat);
    switch (i % 6) {
        case 0: r = bri; g = t; bl = p; break;
        case 1: r = q; g = bri; bl = p; break;
        case 2: r = p; g = bri; bl = t; break;
        case 3: r = p; g = q; bl = bri; break;
        case 4: r = t; g = p; bl = bri; break;
        case 5: r = bri; g = p; bl = q; break;
    }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(bl * 255)];
}

function curvePoint(p0, p1, p2, p3, t) {
    const t2 = t * t;
    const t3 = t2 * t;
    return 0.5 * ((2 * p1) + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 + (-p0 + 3 * p1 - 3 * p2 + p3) * t3);
}

// ============================================
// TRAIT RESOLUTION HELPER
// ============================================

function resolveTraits(seed, forceType, forceHyper) {
    const decPairs = generateHash(seed);
    let traits = extractTraits(decPairs);
    if (forceType !== 'Auto') traits = { ...traits, type: forceType };
    const isHyper = forceHyper === true || (forceHyper === null && traits.hyperRainbow);
    if (isHyper) traits = { ...traits, spread: 0.5, hyperRainbow: true };
    else if (forceHyper === false) traits = { ...traits, hyperRainbow: false };
    return traits;
}

// ============================================
// SNOWFRO HEIGHT MEASUREMENT
// ============================================

function getSnowfroHeight(canvasHeight, type) {
    const waveHeight = canvasHeight / 3.5 * 2 * 0.75;
    const circleRadius = {
        Normal: canvasHeight / 13 / 2,
        Bold: canvasHeight / 5 / 2,
        Slinky: canvasHeight / 13 / 2,
        Pipe: canvasHeight / 7 / 2,
        Fuzzy: canvasHeight / 16 / 2,
        Ribbed: canvasHeight / 12 / 2
    }[type] || canvasHeight / 13 / 2;
    return waveHeight + circleRadius * 2;
}

function measureSnowfroHeight(canvasHeight, type, seed) {
    const decPairs = generateHash(seed);
    const segments = Math.floor(map(decPairs[26], 0, 255, 12, 20));
    const ht = map(decPairs[27], 0, 255, 3, 4);
    const offsetY = canvasHeight / 2;
    let minY = Infinity, maxY = -Infinity;
    const steps = 50;
    for (let j = 0; j < segments - 2; j++) {
        for (let i = 0; i <= steps; i++) {
            const t = i / steps;
            const y = curvePoint(
                map(decPairs[j], 0, 255, -canvasHeight / ht, canvasHeight / ht),
                map(decPairs[j + 1], 0, 255, -canvasHeight / ht, canvasHeight / ht),
                map(decPairs[j + 2], 0, 255, -canvasHeight / ht, canvasHeight / ht),
                map(decPairs[j + 3], 0, 255, -canvasHeight / ht, canvasHeight / ht),
                t
            ) + offsetY;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
        }
    }
    const circleRadius = {
        Normal: canvasHeight / 13 / 2,
        Bold: canvasHeight / 5 / 2,
        Slinky: canvasHeight / 13 / 2,
        Pipe: canvasHeight / 7 / 2,
        Fuzzy: canvasHeight / 16 / 2,
        Ribbed: canvasHeight / 12 / 2
    }[type] || canvasHeight / 13 / 2;
    return (maxY - minY) + circleRadius * 2;
}

function computeXHeightRange(glyphs) {
    const xChars = 'acemnorsuvwxz';
    let minY = Infinity, maxY = -Infinity;
    for (const ch of xChars) {
        const g = glyphs[ch];
        if (!g) continue;
        for (const stroke of g.strokes) {
            for (const [, y] of stroke) { if (y < minY) minY = y; if (y > maxY) maxY = y; }
        }
    }
    return maxY - minY || computeFontYRange(glyphs);
}

function getFontXHeight(fontStyle) {
    return FONTS[fontStyle].xHeight;
}

// ============================================
// DERIVE WORD SHAPE FROM SQUIGGLE
// ============================================

function deriveShape(seed, fontStyle) {
    const decPairs = generateHash(seed);
    const segments = Math.floor(map(decPairs[26], 0, 255, 12, 20));
    const isScript = fontStyle === 'Script';

    // Rise ← wave amplitude (ht factor)
    // decPairs[27] controls ht: 0→ht=3 (tall waves), 255→ht=4 (flat waves)
    const loopHeight = isScript
        ? map(decPairs[27], 0, 255, 1.1, 1.0)
        : map(decPairs[27], 0, 255, 1.1, 0.9);

    // Rotation ← wave trend (slope of control points left to right)
    const n = Math.min(segments, 20);
    const startAvg = (decPairs[0] + decPairs[1] + decPairs[2]) / 3;
    const endAvg = (decPairs[n - 3] + decPairs[n - 2] + decPairs[n - 1]) / 3;
    const trend = endAvg - startAvg; // -255 to 255
    const rotation = map(trend, -255, 255, -0.06, 0.10);

    // Slant ← wave asymmetry (first half avg vs second half avg)
    const mid = Math.floor(n / 2);
    let firstHalf = 0, secondHalf = 0;
    for (let i = 0; i < mid; i++) firstHalf += decPairs[i];
    for (let i = mid; i < n; i++) secondHalf += decPairs[i];
    firstHalf /= mid;
    secondHalf /= (n - mid);
    const asymmetry = secondHalf - firstHalf; // -255 to 255
    const slant = map(asymmetry, -255, 255, -0.10, 0.10);

    // Swell ← segment density
    // More segments (20) = denser squiggle = slightly wider loops
    // Fewer segments (12) = sparser = tighter loops
    const loopWidth = isScript
        ? 1.0
        : map(segments, 12, 20, 0.88, 1.1);

    // Hand personality — derived from decPairs, defines the "writer" for this seed.
    // Uses Snowfro's hash values that aren't consumed by type/color selection.
    const hand = deriveHandPersonality(decPairs);

    return { rotation, slant, loopWidth, loopHeight, hand };
}

// ============================================
// HAND PERSONALITY — each seed is a different writer
// ============================================

// Per-seed personality from Snowfro's hash. Defines the envelope for letter variance.
// Uses decPairs indices that overlap with wave Y values — these ARE the wave,
// so the "hand" that writes the word IS the wave that shaped it.
function deriveHandPersonality(decPairs) {
    return {
        // How much this hand varies stroke to stroke (0.3=precise, 1.0=loose)
        varianceIntensity: map((decPairs[3] ^ decPairs[24]) & 0xFF, 0, 255, 0.3, 1.0),
        // Y-dominant vs X-dominant variance (real handwriting breathes more vertically)
        yBias: map((decPairs[5] ^ decPairs[15]) & 0xFF, 0, 255, 0.6, 0.85),
        // Coherence: do all points in a letter shift together (swaying) or independently (trembling)?
        coherence: map((decPairs[7] ^ decPairs[19]) & 0xFF, 0, 255, 0.3, 0.8),
        // Scale tendency — this hand writes slightly bigger or smaller
        scaleTendency: map((decPairs[9] ^ decPairs[21]) & 0xFF, 0, 255, 0.98, 1.02),
    };
}

// Per-letter deterministic RNG using Snowfro's xorshift pattern.
// Each letter instance gets a unique but reproducible sequence.
function letterVarianceRng(seed, letterIndex, charCode) {
    // Combine seed, position, and character into a unique starting state
    // using Knuth multiplicative hashing to avoid correlation
    let s = (seed >>> 0) ^ 0xDEADBEEF;           // Snowfro's magic constant
    s = (s ^ (letterIndex * 2654435761)) >>> 0;    // position hash
    s = (s ^ (charCode * 2246822519)) >>> 0;       // character hash
    // Snowfro's xorshift — same three operations as generateHash
    s ^= s << 13; s ^= s >>> 17; s ^= s << 5; s = s >>> 0;
    return function() {
        s ^= s << 13; s ^= s >>> 17; s ^= s << 5; s = s >>> 0;
        return (s % 10000) / 10000;
    };
}

// ============================================
// RENDERING PIPELINE
// ============================================

function transformStroke(stroke, params) {
    const { glyphCenterX, glyphCenterY, loopWidth, loopHeight,
            xOffset, scale, baselineY, slant, letterCenterX, letterCenterY,
            scaleVar, cosR, sinR, yWobble, variance } = params;
    const strokeLen = stroke.length;
    return stroke.map(([fx, fy], ptIdx) => {
        const t = strokeLen <= 2 ? 0 : ptIdx / (strokeLen - 1);
        const blend = Math.sin(t * Math.PI);
        const lw = 1 + (loopWidth - 1) * blend;
        const lh = 1 + (loopHeight - 1) * blend;
        let sx = glyphCenterX + (fx - glyphCenterX) * lw;
        let sy = glyphCenterY + (fy - glyphCenterY) * lh;

        // Per-control-point variance — the hand's breath
        // Applied in font-coordinate space so it scales naturally with the letter.
        // Long strokes: sin^2 envelope protects endpoints for clean connections.
        // Short strokes (crossbars, dots): flat envelope — they don't connect to
        // anything, so endpoint protection isn't needed. Without this, 2-point
        // strokes like the t crossbar render as perfectly straight lines.
        if (variance) {
            const varT = strokeLen <= 1 ? 0 : ptIdx / (strokeLen - 1);
            // Short strokes: flat envelope (hand-drawn look, not mechanical)
            // Long strokes: sin² falloff near endpoints for clean connections
            const env = strokeLen <= 3 ? 0.7 : Math.sin(varT * Math.PI);
            const env2 = env * env;
            const h = variance.hand;
            const intensity = h.varianceIntensity;
            // Pull deterministic per-point random values from the letter's RNG
            const r1 = variance.lRng();
            const r2 = variance.lRng();
            // Blend coherent (whole letter shifts) with independent (per-point wander)
            const yDisp = h.coherence * variance.letterYDir * variance.letterYMag
                        + (1 - h.coherence) * (r1 * 2 - 1);
            const xDisp = h.coherence * variance.letterXDir * variance.letterXMag
                        + (1 - h.coherence) * (r2 * 2 - 1);
            // Max displacement in font units (x-height body is ~350 units)
            sy += yDisp * 8 * intensity * h.yBias * env2;
            sx += xDisp * 5 * intensity * (1.5 - h.yBias) * env2;
        }

        let cx = xOffset + sx * scale;
        let cy = baselineY - sy * scale;
        cx += (baselineY - cy) * slant;
        let dx = (cx - letterCenterX) * scaleVar;
        let dy = (cy - letterCenterY) * scaleVar;
        const rx = dx * cosR - dy * sinR;
        const ry = dx * sinR + dy * cosR;
        cx = letterCenterX + rx;
        cy = letterCenterY + ry + yWobble;
        return [cx, cy];
    });
}

function layoutText(text, canvasWidth, canvasHeight, type, config) {
    // For line-breaking, treat underscores as spaces — find the split point on
    // a space-normalized copy, then split the ORIGINAL text at that character position
    // so each line keeps its internal underscores (word-path stays connected).
    const normalized = text.trim().replace(/_/g, ' ');
    const words = normalized.split(/\s+/);
    const totalChars = words.join('').length;
    if (words.length >= 2 && totalChars > 10) {
        // Find best split word index
        let bestSplit = 1, bestDiff = Infinity;
        const totalLen = normalized.length;
        let runLen = 0;
        for (let i = 0; i < words.length - 1; i++) {
            runLen += words[i].length + 1;
            const diff = Math.abs(runLen - totalLen / 2);
            if (diff < bestDiff) { bestDiff = diff; bestSplit = i + 1; }
        }
        // Find the character position of the split in the original text
        // Walk through original text counting word boundaries (spaces or underscores)
        const trimmed = text.trim();
        let wordIdx = 0, splitPos = 0;
        let i = 0;
        while (i < trimmed.length && wordIdx < bestSplit) {
            if (trimmed[i] === ' ' || trimmed[i] === '_') {
                wordIdx++;
                // Skip consecutive separators
                while (i < trimmed.length && (trimmed[i] === ' ' || trimmed[i] === '_')) i++;
            } else {
                i++;
            }
        }
        splitPos = i;
        // Back up past any separator to trim the break point
        let endLine1 = splitPos - 1;
        while (endLine1 > 0 && (trimmed[endLine1] === ' ' || trimmed[endLine1] === '_')) endLine1--;
        const line1 = trimmed.slice(0, endLine1 + 1);
        const line2 = trimmed.slice(splitPos);

        // Build both lines at full canvas height to compute natural scales
        const r1 = layoutLine(line1, canvasWidth, canvasHeight, type, config);
        const r2 = layoutLine(line2, canvasWidth, canvasHeight, type, config);

        // Use the smaller scale so both lines match
        const s1 = r1.scale, s2 = r2.scale;
        const uniformScale = Math.min(s1, s2);

        // Rebuild whichever line needs rescaling (or both for consistency)
        const r1f = (s1 === uniformScale) ? r1 : layoutLine(line1, canvasWidth, canvasHeight, type, config, uniformScale);
        const r2f = (s2 === uniformScale) ? r2 : layoutLine(line2, canvasWidth, canvasHeight, type, config, uniformScale);

        // Measure actual Y bounds of each line's paths
        let min1Y = Infinity, max1Y = -Infinity;
        for (const p of r1f.paths) for (const pt of p) { min1Y = Math.min(min1Y, pt[1]); max1Y = Math.max(max1Y, pt[1]); }
        let min2Y = Infinity, max2Y = -Infinity;
        for (const p of r2f.paths) for (const pt of p) { min2Y = Math.min(min2Y, pt[1]); max2Y = Math.max(max2Y, pt[1]); }

        const h1 = max1Y - min1Y, h2 = max2Y - min2Y;
        const lineGap = Math.max(h1, h2) * 0.15;
        const totalH = h1 + lineGap + h2;
        const topY = (canvasHeight - totalH) / 2;

        // Shift line 1 so its top sits at topY
        const shift1 = topY - min1Y;
        for (const p of r1f.paths) for (const pt of p) pt[1] += shift1;

        // Shift line 2 so it sits below line 1 with the gap
        const shift2 = (topY + h1 + lineGap) - min2Y;
        for (const p of r2f.paths) for (const pt of p) pt[1] += shift2;

        const allPaths = [...r1f.paths, ...r2f.paths];
        const letterHeight = Math.max(r1f.letterHeight, r2f.letterHeight);

        // If line 1 had no real spaces (all underscores), the "first word" for color
        // spread continues into line 2. This keeps the rainbow range spanning
        // the entire underscore-connected phrase across both lines.
        let fwpc = r1f.firstWordPrimaryCount;
        if (fwpc === r1f.paths.length) {
            // Line 1's first word covered all its paths — extend into line 2
            fwpc += r2f.firstWordPrimaryCount;
        }
        return { paths: allPaths, letterHeight, firstWordPrimaryCount: fwpc };
    }
    return layoutLine(text, canvasWidth, canvasHeight, type, config);
}

function layoutLine(text, canvasWidth, canvasHeight, type, config, forceScale) {
    const FONT = getFontGlyphs(config.fontStyle);
    const FONT_Y_RANGE = getFontYRange(config.fontStyle);
    const allPaths = [];
    let currentWordPrimary = [];   // [{path, li}] — primary strokes tagged with letter index
    let currentWordSecondary = []; // secondary strokes for the current word

    const isBoldType = type === 'Bold' || type === 'Pipe';
    let totalFontWidth = 0;
    for (const char of text) {
        // Underscore = phantom space: use space width for layout
        const effectiveChar = char === '_' ? ' ' : char;
        const glyph = FONT[effectiveChar];
        if (!glyph) continue;
        const isUpper = char >= 'A' && char <= 'Z';
        const boldSpacing = isBoldType ? (isUpper ? 0.20 : 0.35) : 0;
        totalFontWidth += glyph.width * (1 + boldSpacing);
    }
    if (totalFontWidth <= 0) return { paths: [], letterHeight: 0, firstWordPrimaryCount: 0 };

    const charCount = [...text].filter(c => c !== ' ' && c !== '_').length;
    const widthTarget = charCount <= 1 ? 0.50 : charCount <= 2 ? 0.65 : charCount <= 3 ? 0.75 : 0.88;
    const maxWidth = canvasWidth * widthTarget;

    // Size based on x-height (body characters) so letter bodies match squiggle height.
    // Ascenders/descenders extend into padding above/below.
    const xHeightRange = getFontXHeight(config.fontStyle);
    const effectiveXHeight = xHeightRange * config.loopHeight;

    // Also compute full Y range of first word for safety clamp
    const firstWord = text.split(/[\s_]/)[0];
    let wordMinFY = Infinity, wordMaxFY = -Infinity;
    for (const char of firstWord) {
        const glyph = FONT[char];
        if (!glyph) continue;
        for (const stroke of glyph.strokes) {
            for (const [, fy] of stroke) {
                if (fy < wordMinFY) wordMinFY = fy;
                if (fy > wordMaxFY) wordMaxFY = fy;
            }
        }
    }
    const wordYRange = (wordMaxFY - wordMinFY) || FONT_Y_RANGE;

    // Target: x-height proportional to actual squiggle height for this seed
    const actualSquigH = measureSnowfroHeight(canvasHeight, type, config.seed);
    const xHeightTarget = actualSquigH * 0.65;
    const maxHeightScale = xHeightTarget / effectiveXHeight;

    // Soft safety — post-fit in renderToParticles handles actual overflow
    const fullEffectiveRange = wordYRange * config.loopHeight;
    const maxSafeScale = (canvasHeight * 0.90) / fullEffectiveRange;

    const scale = forceScale || Math.min(maxWidth / totalFontWidth, maxHeightScale, maxSafeScale);

    const baselineY = canvasHeight * 0.55;
    let xOffset = (canvasWidth - totalFontWidth * scale) / 2;

    const decPairs = generateHash(config.seed);

    let minY = Infinity, maxY = -Infinity;
    let letterIdx = 0;
    const isThinMode = type === 'Slinky' || type === 'Pipe';
    let firstWordDone = false;
    let firstWordPrimaryCount = 0;

    // Word-path concatenation: join all primary strokes per word into one continuous path.
    // 3 collinear bridge points between letters prevent Catmull-Rom overshoot.
    // This creates one rainbow rope per word instead of separate strokes per letter.
    // Disabled via config.wordPath === false for comparison/debugging.
    const useWordPath = config.wordPath !== false;
    function flushWord() {
        if (!useWordPath) {
            // Legacy mode: push each letter's primary as a separate path
            for (const entry of currentWordPrimary) allPaths.push(entry.path);
        } else if (currentWordPrimary.length === 1) {
            allPaths.push(currentWordPrimary[0].path);
        } else if (currentWordPrimary.length > 1) {
            const wordPath = [...currentWordPrimary[0].path];
            for (let i = 1; i < currentWordPrimary.length; i++) {
                // Same-letter stroke break: when two consecutive primaries belong to the
                // same letter (e.g. 's' with 2 primary strokes), break the path instead
                // of bridging — prevents visible backward crossover within a letter.
                if (currentWordPrimary[i].li === currentWordPrimary[i - 1].li) {
                    allPaths.push(wordPath.splice(0));
                    wordPath.push(...currentWordPrimary[i].path);
                    continue;
                }
                const prev = wordPath[wordPath.length - 1];
                const nextPath = currentWordPrimary[i].path;
                const next = nextPath[0];
                const dx = next[0] - prev[0], dy = next[1] - prev[1];
                const dist = Math.sqrt(dx * dx + dy * dy);
                // Connector joint bridging: uses cubic Bezier with tangent-aware handles.
                // Falls back to legacy band bridging if connector metadata unavailable.
                const prevCM = currentWordPrimary[i - 1].connectorMeta;
                const nextCM = currentWordPrimary[i].connectorMeta;
                if (dist < 5) {
                    // Overlapping: direct merge, skip redundant first point
                    wordPath.push(...nextPath.slice(1));
                } else if (prevCM && nextCM) {
                    // New connector joint system: smooth Bezier between exit and entry
                    const connPts = generateConnectorPoints(
                        prev[0], prev[1], prevCM.exitAngle,
                        next[0], next[1], nextCM.entryAngle,
                        nextCM.category
                    );
                    if (connPts.length > 0) {
                        // Replace last point of wordPath with connector start,
                        // then add connector body, then continue with next letter
                        wordPath[wordPath.length - 1] = connPts[0];
                        wordPath.push(...connPts.slice(1), ...nextPath.slice(1));
                    } else {
                        wordPath.push(...nextPath.slice(1));
                    }
                } else {
                    // Legacy fallback: band-aware bridging
                    const prevBand = currentWordPrimary[i - 1].exitBand || BAND_MID;
                    const nextBand = currentWordPrimary[i].entryBand || BAND_MID;
                    const bDist = bandDistance(prevBand, nextBand);
                    if (bDist <= 1) {
                        const flexRatio = bDist === 0 ? 0.35 : 0.45;
                        const flexCap = bDist === 0 ? 40 : 60;
                        const flexPx = Math.min(dist * flexRatio, flexCap);
                        const flexT = flexPx / dist;
                        wordPath[wordPath.length - 1] = [
                            prev[0] + dx * flexT,
                            prev[1] + dy * flexT
                        ];
                        wordPath.push(
                            [next[0] - dx * flexT, next[1] - dy * flexT],
                            ...nextPath.slice(1)
                        );
                    } else {
                        wordPath[wordPath.length - 1] = [
                            prev[0] + dx * 0.08,
                            prev[1] + dy * 0.06
                        ];
                        wordPath.push(
                            [prev[0] + dx * 0.3, prev[1] + dy * 0.2],
                            [(prev[0] + next[0]) / 2, (prev[1] + next[1]) / 2],
                            [next[0] - dx * 0.3, next[1] - dy * 0.2],
                            ...nextPath.slice(1)
                        );
                    }
                }
            }
            allPaths.push(wordPath);
        }
        currentWordPrimary = [];
        // Flush secondary strokes (sorted L→R)
        currentWordSecondary.sort((a, b) => {
            const minXa = Math.min(...a.map(p => p[0]));
            const minXb = Math.min(...b.map(p => p[0]));
            return minXa - minXb;
        });
        allPaths.push(...currentWordSecondary);
        currentWordSecondary = [];
    }

    // Punctuation breaks word-path — rendered standalone, not connected to letters
    const PUNCT = new Set('.,?!\'"@$&#%()-:;/+=*~0123456789[]{}<>\\|`\u2190\u2191\u2192\u2193');

    for (const char of text) {
        // Phantom space: underscore creates a visual gap (like a space) but does NOT
        // mark a word boundary — the color counter flows continuously across all paths.
        // Must check before glyph lookup — some fonts lack a '_' glyph.
        if (char === '_') {
            flushWord();
            const spaceGlyph = FONT[' '];
            if (spaceGlyph) xOffset += spaceGlyph.width * scale;
            continue;
        }
        const glyph = FONT[char];
        if (!glyph) continue;
        if (char === ' ') {
            // Flush word: concatenate primaries into one path, then push secondaries
            flushWord();
            xOffset += glyph.width * scale;
            if (!firstWordDone) {
                firstWordDone = true;
                firstWordPrimaryCount = allPaths.length;
            }
            continue;
        }
        if (PUNCT.has(char)) {
            // Flush any connected letters before this punct
            flushWord();
        }

        // Capitals: some connect naturally to the following letter, others render standalone
        const isCapital = char >= 'A' && char <= 'Z';
        const CONNECTABLE_CAPS = new Set('ACEGHIJMXYZ');
        const isConnectableCap = isCapital && CONNECTABLE_CAPS.has(char);
        if (isCapital) {
            flushWord(); // Always end any prior word before a capital
        }

        // Per-letter variation — seed-driven, each letter drawn by the same hand but not identical.
        // Uses Snowfro's hash (decPairs) for coarse variation, letterVarianceRng for fine grain.
        const li = letterIdx;
        const hand = config.hand;
        const lRng = letterVarianceRng(config.seed, li, char.charCodeAt(0));

        // Coarse per-letter variation (Snowfro's decPairs pattern)
        const yWobble = map(decPairs[li % 10], 0, 255, -14, 14) * scale;
        const baseRot = config.rotation || 0.03;
        const jitter = map(decPairs[10 + (li % 10)], 0, 255, -0.02, 0.02);
        const rotation = baseRot + jitter;
        const scaleVar = map(decPairs[20 + (li % 10)], 0, 255, 0.95, 1.05)
                       * (hand ? hand.scaleTendency : 1);
        const lwJitter = map(decPairs[(li * 3 + 5) % 32], 0, 255, -0.04, 0.04);
        const lhJitter = map(decPairs[(li * 3 + 7) % 32], 0, 255, -0.04, 0.04);

        // Fine per-letter variance — coherent direction for this letter instance
        const variance = hand ? {
            hand,
            lRng,
            letterYDir: lRng() > 0.5 ? 1 : -1,
            letterXDir: lRng() > 0.5 ? 1 : -1,
            letterYMag: lRng(),
            letterXMag: lRng(),
        } : null;

        const letterCenterX = xOffset + (glyph.width / 2) * scale;
        const letterCenterY = baselineY - (FONT_Y_RANGE * 0.15) * scale;
        const cosR = Math.cos(rotation), sinR = Math.sin(rotation);

        // Select strokes based on position in word:
        // Mid-word: connected (snout + base + connecting tail)
        // Last in word: connected finishing (snout + base + finishing tail), fallback to connected
        // First in word: strokes (base + connecting tail), or finishing if solo
        const isConnected = currentWordPrimary.length > 0 || currentWordSecondary.length > 0;
        // Peek ahead for finishing detection (before hasFollower is computed)
        const _nextCh = li < text.length - 1 ? text[li + 1] : null;
        const _hasNext = _nextCh && _nextCh !== ' ' && !PUNCT.has(_nextCh);
        const wantFinishing = isConnected ? !_hasNext : !_hasNext; // last or solo
        let activeStrokes;
        if (wantFinishing && isConnected && glyph.connectedFinishingStrokes) {
            activeStrokes = glyph.connectedFinishingStrokes;
        } else if (wantFinishing && !isConnected && glyph.finishingStrokes) {
            activeStrokes = glyph.finishingStrokes;
        } else if (isConnected && glyph.connectedStrokes) {
            activeStrokes = glyph.connectedStrokes;
        } else {
            activeStrokes = glyph.strokes;
        }

        const glyphCenterX = glyph.width / 2;
        let glyphMinY = Infinity, glyphMaxY = -Infinity;
        for (const stroke of activeStrokes) {
            for (const [, fy] of stroke) { glyphMinY = Math.min(glyphMinY, fy); glyphMaxY = Math.max(glyphMaxY, fy); }
        }
        const glyphCenterY = (glyphMinY + glyphMaxY) / 2;

        // Position detection for stroke assembly
        const nextChar = li < text.length - 1 ? text[li + 1] : null;
        const hasFollower = nextChar && nextChar !== ' ' && !PUNCT.has(nextChar);
        const isFirstInWord = !isConnected;
        const isLastInWord = isConnected && !hasFollower;
        const isSoloWord = !isConnected && !hasFollower;
        const fontTails = EXIT_TAILS[config.fontStyle];

        for (let si = 0; si < activeStrokes.length; si++) {
            // Append exit tail to primary stroke when followed by another letter
            const tailEntry = fontTails && fontTails[char];
            let stroke = activeStrokes[si];
            if (tailEntry && si === tailEntry[0] && hasFollower) {
                stroke = [...stroke, ...tailEntry[1]];
            }
            const fontSec = SECONDARY_STROKES[config.fontStyle];
            const hasExplicitEntry = fontSec && char in fontSec;
            const explicitSec = hasExplicitEntry && fontSec[char].has(si);
            const isSecondary = isThinMode
                ? (hasExplicitEntry ? explicitSec : isDot(stroke))
                : (hasExplicitEntry ? explicitSec : (isDot(stroke) || isCrossbar(stroke)));
            // Reset lRng for each stroke so variance is deterministic per stroke
            const strokeVariance = variance ? {
                ...variance,
                lRng: letterVarianceRng(config.seed, li * 100 + si, char.charCodeAt(0))
            } : null;
            if (strokeVariance) {
                strokeVariance.letterYDir = variance.letterYDir;
                strokeVariance.letterXDir = variance.letterXDir;
                strokeVariance.letterYMag = variance.letterYMag;
                strokeVariance.letterXMag = variance.letterXMag;
            }
            const transformedPath = transformStroke(stroke, {
                glyphCenterX, glyphCenterY,
                loopWidth: config.loopWidth + lwJitter,
                loopHeight: config.loopHeight + lhJitter,
                xOffset, scale, baselineY, slant: config.slant,
                letterCenterX, letterCenterY, scaleVar, cosR, sinR, yWobble,
                variance: strokeVariance
            });
            if (!isSecondary) {
                for (const [, cy] of transformedPath) { minY = Math.min(minY, cy); maxY = Math.max(maxY, cy); }
            }
            const defer = config.deferSecondary !== false;
            if (isSecondary && defer) {
                // All secondaries deferred to after word path — renders body first, then crossbars/dots/flourishes
                currentWordSecondary.push(transformedPath);
            } else {
                // Collect primaries for word-path concatenation (tagged with letter index + band/connector info)
                currentWordPrimary.push({
                    path: transformedPath, li, ch: char,
                    entryBand: glyph.entryBand || BAND_MID,
                    exitBand: glyph.exitBand || BAND_MID,
                    connectorMeta: glyph.connectorMeta || null
                });
            }
        }
        const isUpper = char >= 'A' && char <= 'Z';
        const boldExtra = isBoldType ? glyph.width * (isUpper ? 0.20 : 0.35) : 0;
        xOffset += (glyph.width + boldExtra) * scale;
        letterIdx++;
        if (PUNCT.has(char) || (isCapital && !isConnectableCap)) {
            // Flush punct/non-connectable capitals so they don't concatenate with the next letter
            flushWord();
        }
    }

    // Flush last word
    flushWord();
    if (!firstWordDone) firstWordPrimaryCount = allPaths.length;

    // Floor: pen thickness at least what a body-height (x-height) word produces.
    // Without this, body-only letters like 'c' get a tiny pen.
    const rawLetterHeight = (maxY - minY) || canvasHeight * 0.4;
    const xHeightAtScale = getFontXHeight(config.fontStyle) * config.loopHeight * scale;
    const letterHeight = Math.max(rawLetterHeight, xHeightAtScale);
    if (minY !== Infinity) {
        const yShift = canvasHeight / 2 - (minY + maxY) / 2;
        for (const path of allPaths) for (const pt of path) pt[1] += yShift;
    }
    return { paths: allPaths, letterHeight, firstWordPrimaryCount, scale };
}

function findPeakFills(allPaths, budget) {
    const fillLookup = new Map();
    let gMinY = Infinity, gMaxY = -Infinity;
    for (const pts of allPaths) for (const pt of pts) { gMinY = Math.min(gMinY, pt[1]); gMaxY = Math.max(gMaxY, pt[1]); }
    const gCenterY = (gMinY + gMaxY) / 2;
    const candidates = [];
    for (let p = 0; p < allPaths.length; p++) {
        const pts = allPaths[p]; if (pts.length < 2) continue;
        const extrema = findYExtrema(pts);
        for (const idx of extrema) candidates.push({ pathIdx: p, controlIdx: idx, dist: Math.abs(pts[idx][1] - gCenterY) });
    }
    const tops = candidates.filter(c => allPaths[c.pathIdx][c.controlIdx][1] < gCenterY);
    const bottoms = candidates.filter(c => allPaths[c.pathIdx][c.controlIdx][1] >= gCenterY);
    tops.sort((a, b) => b.dist - a.dist); bottoms.sort((a, b) => b.dist - a.dist);
    const kept = []; let ti = 0, bi = 0;
    while (kept.length < budget && (ti < tops.length || bi < bottoms.length)) {
        if (ti < tops.length) kept.push(tops[ti++]);
        if (kept.length < budget && bi < bottoms.length) kept.push(bottoms[bi++]);
    }
    for (const c of kept) {
        if (!fillLookup.has(c.pathIdx)) fillLookup.set(c.pathIdx, new Set());
        fillLookup.get(c.pathIdx).add(c.controlIdx);
    }
    return fillLookup;
}

function fitToCanvas(particles, width, height, type, seed) {
    if (particles.length === 0) return;
    let bMinX = Infinity, bMaxX = -Infinity, bMinY = Infinity, bMaxY = -Infinity;
    for (const ops of particles) {
        for (const op of ops) {
            const r = op.radius || 0;
            if (op.x - r < bMinX) bMinX = op.x - r;
            if (op.x + r > bMaxX) bMaxX = op.x + r;
            if (op.y - r < bMinY) bMinY = op.y - r;
            if (op.y + r > bMaxY) bMaxY = op.y + r;
        }
    }
    const renderedW = bMaxX - bMinX;
    const renderedH = bMaxY - bMinY;
    if (renderedW <= 0 || renderedH <= 0) return;

    const isBold = type === 'Bold';
    const margin = isBold ? 4 : Math.min(width, height) * 0.02;
    const availW = width - margin * 2;
    const availH = height - margin * 2;
    const canFitW = availW / renderedW;
    const canFitH = availH / renderedH;

    let fitScale;
    if (isBold) {
        const theoreticalMax = getSnowfroHeight(height, 'Bold');
        const actualH = measureSnowfroHeight(height, 'Bold', seed);
        const ratio = actualH / theoreticalMax;
        const normalized = Math.max(0, Math.min(1, (ratio - 0.70) / 0.80));
        const fillTarget = 0.88 + 0.10 * normalized;
        fitScale = Math.min(canFitW, canFitH) * fillTarget;
    } else {
        fitScale = Math.min(1, canFitW, canFitH);
    }

    if (Math.abs(fitScale - 1) > 0.001) {
        const cx = (bMinX + bMaxX) / 2;
        const cy = (bMinY + bMaxY) / 2;
        const targetCx = width / 2;
        const targetCy = height / 2;
        for (const ops of particles) {
            for (const op of ops) {
                op.x = targetCx + (op.x - cx) * fitScale;
                op.y = targetCy + (op.y - cy) * fitScale;
                op.radius *= fitScale;
                if (op.lineWidth) op.lineWidth *= fitScale;
            }
        }
    } else {
        const cy = (bMinY + bMaxY) / 2;
        const targetCy = height / 2;
        const yShift = targetCy - cy;
        if (Math.abs(yShift) > 1) {
            for (const ops of particles) {
                for (const op of ops) { op.y += yShift; }
            }
        }
    }
}

function renderToParticles(text, width, height, type, spread, config) {
    const particles = [];
    const decPairs = generateHash(config.seed);
    const startColor = decPairs[29];
    const colorOffset = config.colorOffset || 0;
    const effectiveStartColor = ((startColor + colorOffset) % 255 + 255) % 255;
    const reverse = decPairs[30] < 128;

    const isSlinky = type === 'Slinky' || type === 'Pipe';
    const isPipe = type === 'Pipe';
    const isBold = type === 'Bold';
    const isSegmented = type === 'Ribbed';
    const isFuzzy = type === 'Fuzzy';

    const { paths: allPaths, letterHeight, firstWordPrimaryCount } = layoutText(text, width, height, type, config);
    if (allPaths.length === 0) return { particles: particles, adjustedSpread: spread };

    const referenceHeight = letterHeight / 0.57;
    const ps = config.penScale || 1.0;
    const normalDiam = (referenceHeight / 13) * ps;
    const boldDiam = (referenceHeight / 7) * ps;
    const pipeDiam = (referenceHeight / 5.5) * ps;
    const slinkyDiam = (referenceHeight / 12) * ps;
    const ribbedDiam = (referenceHeight / 12) * ps;
    const sw = (referenceHeight / 1200) * ps;
    const slinkySw = Math.max(sw * 2, 1.0);

    const div = Math.floor(map(Math.round(decPairs[24]), 0, 230, 3, 20));
    const ribbedSteps = Math.round(80 * Math.max(1, div / 5));
    const steps = isPipe ? 8 : isSlinky ? 10 : isFuzzy ? 80 : isBold ? 50 : isSegmented ? ribbedSteps : 80;

    const rngBaseSeed = (Math.abs(config.seed) ^ 0xDEADBEEF) >>> 0;
    let rng = createRng(rngBaseSeed);

    // Adjust spread so word color range matches reference squiggle for short words
    const refSegments = Math.floor(map(decPairs[26], 0, 255, 12, 20));
    const refDiv = Math.floor(map(Math.round(decPairs[24]), 0, 230, 3, 20));
    const refRibbedSteps = Math.round(200 * Math.max(1, refDiv / 5));
    const refSteps = isSlinky ? 50 : isFuzzy ? 1000 : isSegmented ? refRibbedSteps : 200;
    const refParticles = (refSegments - 2) * (refSteps + 1);

    // Compute spread from first word only (includes its secondary strokes)
    const firstWordPaths = allPaths.slice(0, firstWordPrimaryCount);
    let wordParticles = 0;
    for (const pathPoints of firstWordPaths) {
        if (pathPoints.length < 2) continue;
        wordParticles += (pathPoints.length - 1) * steps + 1;
    }
    if (wordParticles === 0) {
        for (const pathPoints of allPaths) {
            if (pathPoints.length < 2) continue;
            wordParticles += (pathPoints.length - 1) * steps + 1;
        }
    }

    // Always match reference squiggle's color range (targetRatio = 1)
    const adjustedSpread = Math.max(1, Math.round(spread * (wordParticles / refParticles)));

    const fillLookup = findPeakFills(allPaths, 16);

    // Color advances continuously across words — spread is based on first word
    // so each word covers the same portion of the rainbow
    let color = 0, pathIdx = 0;
    for (const pathPoints of allPaths) {
        if (pathPoints.length < 2) { pathIdx++; continue; }
        const extremaSegs = fillLookup.get(pathIdx) || new Set();
        const padded = [pathPoints[0], ...pathPoints, pathPoints[pathPoints.length - 1]];
        const totalSegs = padded.length - 3;

        for (let seg = 0; seg < totalSegs; seg++) {
            const [p0, p1, p2, p3] = [padded[seg], padded[seg+1], padded[seg+2], padded[seg+3]];
            const lastSeg = seg === totalSegs - 1;
            for (let i = 0; i <= steps; i++) {
                if (i === steps && !lastSeg) continue;
                const t = i / steps;
                const x = curvePoint(p0[0], p1[0], p2[0], p3[0], t);
                const y = curvePoint(p0[1], p1[1], p2[1], p3[1], t);
                const atControlPoint = i === 0 || (lastSeg && i === steps);
                const controlIdx = (lastSeg && i === steps) ? pathPoints.length - 1 : seg;
                const shouldFill = atControlPoint && extremaSegs.has(controlIdx);
                const hue = reverse ? 255 - (((color / adjustedSpread) + effectiveStartColor) % 255) : (((color / adjustedSpread) + effectiveStartColor) % 255);
                const [r, g, b] = hsbToRgb(hue, 255, 255);
                const ops = [];

                if (isFuzzy) {
                    const fuzzR = (referenceHeight / 13) * ps;
                    const fuzzX = x + map(rng(), 0, 1, 0, fuzzR);
                    const fuzzY = y + map(rng(), 0, 1, 0, fuzzR);
                    const dist = Math.sqrt((x - fuzzX) ** 2 + (y - fuzzY) ** 2);
                    if (dist < fuzzR * 1.1) {
                        const fps = map(rng(), 0, 1, (referenceHeight / 100) * ps, (referenceHeight / 20) * ps);
                        ops.push({ x: fuzzX, y: fuzzY, radius: fps / 2, fill: `rgb(${r},${g},${b})`, alpha: 20/255 });
                    }
                } else if (isSlinky) {
                    if (isPipe) {
                        ops.push({ x, y, radius: pipeDiam / 2, fill: shouldFill ? 'black' : null, stroke: 'black', lineWidth: sw + (slinkySw - sw) * 0.3 });
                        ops.push({ x, y, radius: slinkyDiam / 2, fill: shouldFill ? `rgb(${r},${g},${b})` : null, stroke: `rgb(${r},${g},${b})`, lineWidth: slinkySw });
                    } else {
                        ops.push({ x, y, radius: slinkyDiam / 2, fill: shouldFill ? `rgb(${r},${g},${b})` : null, stroke: `rgb(${r},${g},${b})`, lineWidth: slinkySw });
                    }
                } else if (isSegmented) {
                    ops.push({ x, y, radius: normalDiam / 2, fill: `rgb(${r},${g},${b})` });
                    if (i % div === 0 || i === 0 || i === steps - 1) {
                        ops.push({ x, y, radius: ribbedDiam / 2, fill: `rgb(${decPairs[25]},${decPairs[25]},${decPairs[25]})` });
                    }
                } else {
                    const diam = isBold ? boldDiam : normalDiam;
                    ops.push({ x, y, radius: diam / 2, fill: `rgb(${r},${g},${b})` });
                }
                if (ops.length > 0) particles.push(ops);
                color++;
            }
        }
        rng = createRng(rngBaseSeed);
        pathIdx++;
    }
    fitToCanvas(particles, width, height, type, config.seed);

    return { particles, adjustedSpread };
}

function drawParticles(context, particles) {
    // Pass 1: strokes only (slinky/pipe outlines, drawn under fills)
    for (let i = 0; i < particles.length; i++) {
        for (const op of particles[i]) {
            if (op.fill) continue;
            context.beginPath(); context.arc(op.x, op.y, op.radius, 0, Math.PI * 2);
            if (op.stroke) { context.strokeStyle = op.stroke; context.lineWidth = op.lineWidth; context.stroke(); }
        }
    }
    // Pass 2: fills (all opaque types + fuzzy with globalAlpha)
    let currentAlpha = 1;
    for (let i = 0; i < particles.length; i++) {
        for (const op of particles[i]) {
            if (!op.fill) continue;
            const a = op.alpha || 1;
            if (a !== currentAlpha) { context.globalAlpha = a; currentAlpha = a; }
            context.beginPath(); context.arc(op.x, op.y, op.radius, 0, Math.PI * 2);
            context.fillStyle = op.fill; context.fill();
            if (op.stroke) { context.strokeStyle = op.stroke; context.lineWidth = op.lineWidth; context.stroke(); }
        }
    }
    if (currentAlpha !== 1) context.globalAlpha = 1;
}

// ============================================
// SNOWFRO REFERENCE RENDERER
// ============================================

// Faithful port of Snowfro's original wave renderer.
// Deliberately self-contained — do not share code with renderToParticles.
function renderSnowfro(ctx, width, height, config) {
    const decPairs = generateHash(config.seed);
    let traits = extractTraits(decPairs);
    if (config.forceType !== 'Auto') traits = { ...traits, type: config.forceType };
    const isHyper = config.forceHyper === true || (config.forceHyper === null && traits.hyperRainbow);
    if (isHyper) traits = { ...traits, spread: 0.5, hyperRainbow: true };

    const type = traits.type;
    const spread = traits.spread;
    const startColor = decPairs[29];
    const colorOffset = config.colorOffset || 0;
    const effectiveStartColor = ((startColor + colorOffset) % 255 + 255) % 255;
    const reverse = decPairs[30] < 128;
    const isSlinky = type === 'Slinky' || type === 'Pipe';
    const isPipe = type === 'Pipe';
    const isBold = type === 'Bold';
    const isSegmented = type === 'Ribbed';
    const isFuzzy = type === 'Fuzzy';

    const segments = Math.floor(map(decPairs[26], 0, 255, 12, 20));
    const ht = map(decPairs[27], 0, 255, 3, 4);
    const wt = 2, amp = 1;
    const sw = height / 1200;

    const div = Math.floor(map(Math.round(decPairs[24]), 0, 230, 3, 20));
    const ribbedSteps = Math.round(200 * Math.max(1, div / 5));
    const steps = isSlinky ? 50 : isFuzzy ? 1000 : isSegmented ? ribbedSteps : 200;

    ctx.fillStyle = BACKGROUNDS[config.bgIndex];
    ctx.fillRect(0, 0, width, height);
    ctx.lineWidth = sw;

    const rngBaseSeed = (Math.abs(config.seed) ^ 0xDEADBEEF) >>> 0;
    let rng = createRng(rngBaseSeed);
    const offsetX = (width / 2) - (width / wt / 2);
    const offsetY = height / 2;
    let color = 0;

    for (let j = 0; j < segments - 2; j++) {
        for (let i = 0; i <= steps; i++) {
            const t = i / steps;
            const x = curvePoint(
                width / segments / wt * j,
                width / segments / wt * (j + 1),
                width / segments / wt * (j + 2),
                width / segments / wt * (j + 3),
                t
            ) + offsetX;
            const y = curvePoint(
                map(decPairs[j], 0, 255, -height / ht, height / ht) * amp,
                map(decPairs[j + 1], 0, 255, -height / ht, height / ht) * amp,
                map(decPairs[j + 2], 0, 255, -height / ht, height / ht) * amp,
                map(decPairs[j + 3], 0, 255, -height / ht, height / ht) * amp,
                t
            ) + offsetY;

            const hue = reverse
                ? 255 - (((color / spread) + effectiveStartColor) % 255)
                : (((color / spread) + effectiveStartColor) % 255);
            const [r, g, b] = hsbToRgb(hue, 255, 255);

            if (isFuzzy) {
                const fuzzX = x + map(rng(), 0, 1, 0, height / 10);
                const fuzzY = y + map(rng(), 0, 1, 0, height / 10);
                const dist = Math.sqrt((x - fuzzX) ** 2 + (y - fuzzY) ** 2);
                if (dist < height / 11.5) {
                    const ps = map(rng(), 0, 1, height / 160, height / 16);
                    ctx.beginPath(); ctx.arc(fuzzX, fuzzY, ps / 2, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(${r},${g},${b},${20/255})`; ctx.fill();
                }
            } else {
                if (isSlinky && isPipe) {
                    ctx.beginPath(); ctx.arc(x, y, (height / 7) / 2, 0, Math.PI * 2);
                    if (i === 0 || i === steps - 1) { ctx.fillStyle = 'black'; ctx.fill(); }
                    ctx.strokeStyle = 'black'; ctx.lineWidth = sw; ctx.stroke();
                }
                if (isSlinky) {
                    ctx.beginPath(); ctx.arc(x, y, (height / 13) / 2, 0, Math.PI * 2);
                    if (i === 0 || i === steps - 1) { ctx.fillStyle = `rgb(${r},${g},${b})`; ctx.fill(); }
                    ctx.strokeStyle = `rgb(${r},${g},${b})`; ctx.lineWidth = sw; ctx.stroke();
                } else {
                    const diam = isBold ? height / 5 : height / 13;
                    ctx.beginPath(); ctx.arc(x, y, diam / 2, 0, Math.PI * 2);
                    ctx.fillStyle = `rgb(${r},${g},${b})`; ctx.fill();
                }
                if (isSegmented && !isSlinky && !isBold) {
                    if (i % div === 0 || i === 0 || i === steps - 1) {
                        ctx.beginPath(); ctx.arc(x, y, (height / 12) / 2, 0, Math.PI * 2);
                        ctx.fillStyle = `rgb(${decPairs[25]},${decPairs[25]},${decPairs[25]})`; ctx.fill();
                    }
                }
            }
            color++;
        }
        rng = createRng(rngBaseSeed);
    }
}

// ============================================
// RUNTIME FONT REGISTRATION
// ============================================

function registerFont(name, glyphs) {
    FONTS[name] = { glyphs, yRange: computeFontYRange(glyphs), xHeight: computeXHeightRange(glyphs) };
    if (!FONT_NAMES.includes(name)) FONT_NAMES.push(name);
}

// ============================================
// EXPORT
// ============================================

// Render particles from pre-laid-out paths (for noodles with custom layout)
function renderFromPaths(allPaths, width, height, type, spread, config, letterHeight, firstWordPrimaryCount) {
    const particles = [];
    const decPairs = generateHash(config.seed);
    const startColor = decPairs[29];
    const colorOffset = config.colorOffset || 0;
    const effectiveStartColor = ((startColor + colorOffset) % 255 + 255) % 255;
    const reverse = decPairs[30] < 128;

    const isSlinky = type === 'Slinky' || type === 'Pipe';
    const isPipe = type === 'Pipe';
    const isBold = type === 'Bold';
    const isSegmented = type === 'Ribbed';
    const isFuzzy = type === 'Fuzzy';

    if (allPaths.length === 0) return { particles, adjustedSpread: spread };

    const referenceHeight = letterHeight / 0.57;
    const ps = config.penScale || 1.0;
    const normalDiam = (referenceHeight / 13) * ps;
    const boldDiam = (referenceHeight / 7) * ps;
    const pipeDiam = (referenceHeight / 5.5) * ps;
    const slinkyDiam = (referenceHeight / 12) * ps;
    const ribbedDiam = (referenceHeight / 12) * ps;
    const sw = (referenceHeight / 1200) * ps;
    const slinkySw = Math.max(sw * 2, 1.0);

    const div = Math.floor(map(Math.round(decPairs[24]), 0, 230, 3, 20));
    const ribbedSteps = Math.round(80 * Math.max(1, div / 5));
    const steps = isPipe ? 8 : isSlinky ? 10 : isFuzzy ? 80 : isBold ? 50 : isSegmented ? ribbedSteps : 80;

    const rngBaseSeed = (Math.abs(config.seed) ^ 0xDEADBEEF) >>> 0;
    let rng = createRng(rngBaseSeed);

    const refSegments = Math.floor(map(decPairs[26], 0, 255, 12, 20));
    const refDiv = Math.floor(map(Math.round(decPairs[24]), 0, 230, 3, 20));
    const refRibbedSteps = Math.round(200 * Math.max(1, refDiv / 5));
    const refSteps = isSlinky ? 50 : isFuzzy ? 1000 : isSegmented ? refRibbedSteps : 200;
    const refParticles = (refSegments - 2) * (refSteps + 1);

    const firstWordPaths = allPaths.slice(0, firstWordPrimaryCount);
    let wordParticles = 0;
    for (const pathPoints of firstWordPaths) {
        if (pathPoints.length < 2) continue;
        wordParticles += (pathPoints.length - 1) * steps + 1;
    }
    if (wordParticles === 0) {
        for (const pathPoints of allPaths) {
            if (pathPoints.length < 2) continue;
            wordParticles += (pathPoints.length - 1) * steps + 1;
        }
    }

    const adjustedSpread = Math.max(1, Math.round(spread * (wordParticles / refParticles)));
    const fillLookup = findPeakFills(allPaths, 16);

    let color = 0, pathIdx = 0;
    for (const pathPoints of allPaths) {
        if (pathPoints.length < 2) { pathIdx++; continue; }
        const extremaSegs = fillLookup.get(pathIdx) || new Set();
        const padded = [pathPoints[0], ...pathPoints, pathPoints[pathPoints.length - 1]];
        const totalSegs = padded.length - 3;

        for (let seg = 0; seg < totalSegs; seg++) {
            const [p0, p1, p2, p3] = [padded[seg], padded[seg+1], padded[seg+2], padded[seg+3]];
            const lastSeg = seg === totalSegs - 1;
            for (let i = 0; i <= steps; i++) {
                if (i === steps && !lastSeg) continue;
                const t = i / steps;
                const x = curvePoint(p0[0], p1[0], p2[0], p3[0], t);
                const y = curvePoint(p0[1], p1[1], p2[1], p3[1], t);
                const atControlPoint = i === 0 || (lastSeg && i === steps);
                const controlIdx = (lastSeg && i === steps) ? pathPoints.length - 1 : seg;
                const shouldFill = atControlPoint && extremaSegs.has(controlIdx);
                const hue = reverse ? 255 - (((color / adjustedSpread) + effectiveStartColor) % 255) : (((color / adjustedSpread) + effectiveStartColor) % 255);
                const [r, g, b] = hsbToRgb(hue, 255, 255);
                const ops = [];

                if (isFuzzy) {
                    const fuzzR = (referenceHeight / 13) * ps;
                    const fuzzX = x + map(rng(), 0, 1, 0, fuzzR);
                    const fuzzY = y + map(rng(), 0, 1, 0, fuzzR);
                    const dist = Math.sqrt((x - fuzzX) ** 2 + (y - fuzzY) ** 2);
                    if (dist < fuzzR * 1.1) {
                        const fps = map(rng(), 0, 1, (referenceHeight / 100) * ps, (referenceHeight / 20) * ps);
                        ops.push({ x: fuzzX, y: fuzzY, radius: fps / 2, fill: `rgb(${r},${g},${b})`, alpha: 20/255 });
                    }
                } else if (isSlinky) {
                    if (isPipe) {
                        ops.push({ x, y, radius: pipeDiam / 2, fill: shouldFill ? 'black' : null, stroke: 'black', lineWidth: sw + (slinkySw - sw) * 0.3 });
                        ops.push({ x, y, radius: slinkyDiam / 2, fill: shouldFill ? `rgb(${r},${g},${b})` : null, stroke: `rgb(${r},${g},${b})`, lineWidth: slinkySw });
                    } else {
                        ops.push({ x, y, radius: slinkyDiam / 2, fill: shouldFill ? `rgb(${r},${g},${b})` : null, stroke: `rgb(${r},${g},${b})`, lineWidth: slinkySw });
                    }
                } else if (isSegmented) {
                    ops.push({ x, y, radius: normalDiam / 2, fill: `rgb(${r},${g},${b})` });
                    if (i % div === 0 || i === 0 || i === steps - 1) {
                        ops.push({ x, y, radius: ribbedDiam / 2, fill: `rgb(${decPairs[25]},${decPairs[25]},${decPairs[25]})` });
                    }
                } else {
                    const diam = isBold ? boldDiam : normalDiam;
                    ops.push({ x, y, radius: diam / 2, fill: `rgb(${r},${g},${b})` });
                }
                if (ops.length > 0) particles.push(ops);
                color++;
            }
        }
        rng = createRng(rngBaseSeed);
        pathIdx++;
    }
    fitToCanvas(particles, width, height, type, config.seed);
    return { particles, adjustedSpread };
}

window.SquigWord = {
    BACKGROUNDS, TYPES, FONT_NAMES,
    resolveTraits, deriveShape,
    renderToParticles, renderFromPaths, drawParticles, renderSnowfro,
    hsbToRgb, registerFont,
    // Internals exposed for noodles with custom layout
    getFontGlyphs, getFontYRange, getFontXHeight,
    measureSnowfroHeight, generateHash,
    // Connector joint system
    generateConnectorPoints, STUB_BOUNDS, CONNECTOR_CATEGORY_B
};

})();
