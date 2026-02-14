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
'w': {w:554, d:'M 69.3 346 L -12.6 227 L -56.7 120 L -63 69.3 L -50.4 31.5 L -3.15 18.9 L 56.7 40.9 L 120 113 L 195 227 L 236 290 L 265 287 L 205 176 L 195 85.1 L 224 31.5 L 280 15.8 L 391 81.9 L 501 205 L 551 312 L 551 369 L 529 422 L 476 435'},
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
'S': {w:706, d:'M 693 580 L 721 621 L 721 668 L 665 709 L 520 690 L 350 636 L 268 558 L 265 485 L 362 438 L 517 391 L 617 337 L 658 277 L 652 224 L 617 170 L 523 97.6 L 372 34.6 L 167 -6.3 L 63 9.45 L 28.4 47.2 L 18.9 129 L 53.5 202 L 117 255 L 189 293 L 293 324'},
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
const ALLURE_KEEP = {
    'N': [0],   // drop stroke 1 (decorative cap overlaps main body)
};
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

// Allure P: merge stem (stroke 0) + bowl (stroke 1) into one continuous cursive stroke
// Reverse the stem (so pen goes baseline→top), skip bowl's initial leftward dip, bridge at top
if (FONT_ALLURE['P']) {
    const origP = parseSvgPath(EMS_ALLURE['P'].d);
    if (origP.length >= 2) {
        const stemUp = [...origP[0]].reverse(); // reverse stem: baseline → top
        const bowlTrimmed = origP[1].slice(3);  // skip leftward dip (first 3 pts)
        FONT_ALLURE['P'].strokes = [[...stemUp, ...bowlTrimmed]];
    }
}

// Allure 'a': reverse stroke direction — original starts at right (x=495) and ends mid (x=324),
// but cursive 'a' should flow left-to-right (bowl sweep then exit right)
if (FONT_ALLURE['a']) {
    FONT_ALLURE['a'].strokes[0] = [...FONT_ALLURE['a'].strokes[0]].reverse();
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
        'F': new Set([1, 2]),   // hood flourish + crossbar secondary; stem is primary
        'H': new Set([0, 2]),   // left leg + crossbar secondary; right leg is primary
        'I': new Set([1]),      // top flourish secondary; downstroke is primary
        'J': new Set([1]),      // top flourish secondary; main body is primary
        'K': new Set([0, 1]),   // left leg + diagonal secondary; right lower leg is primary
        'R': new Set([0]),      // stem secondary; bowl swoop is primary
        'T': new Set([0]),      // top flourish secondary; downstroke is primary
        'X': new Set([0, 2]),   // cap + back-cross secondary; forward diagonal is primary
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
        // sin^2 envelope protects endpoints for clean connections.
        if (variance && strokeLen > 2) {
            const env = Math.sin(t * Math.PI);
            const env2 = env * env; // sharper falloff near endpoints
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
    const words = text.trim().split(/\s+/);
    const totalChars = words.join('').length;
    if (words.length >= 2 && totalChars > 10) {
        // Split at word boundary nearest the middle
        let bestSplit = 1, bestDiff = Infinity;
        const totalLen = text.trim().length;
        let runLen = 0;
        for (let i = 0; i < words.length - 1; i++) {
            runLen += words[i].length + 1;
            const diff = Math.abs(runLen - totalLen / 2);
            if (diff < bestDiff) { bestDiff = diff; bestSplit = i + 1; }
        }
        const line1 = words.slice(0, bestSplit).join(' ');
        const line2 = words.slice(bestSplit).join(' ');

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
        return { paths: allPaths, letterHeight, firstWordPrimaryCount: r1f.firstWordPrimaryCount };
    }
    return layoutLine(text, canvasWidth, canvasHeight, type, config);
}

function layoutLine(text, canvasWidth, canvasHeight, type, config, forceScale) {
    const FONT = getFontGlyphs(config.fontStyle);
    const FONT_Y_RANGE = getFontYRange(config.fontStyle);
    const allPaths = [];
    let currentWordPrimary = [];   // primary strokes for current word — concatenated at word boundary
    let currentWordSecondary = []; // secondary strokes for the current word

    const isBoldType = type === 'Bold' || type === 'Pipe';
    let totalFontWidth = 0;
    for (const char of text) {
        const glyph = FONT[char];
        if (!glyph) continue;
        const isUpper = char >= 'A' && char <= 'Z';
        const boldSpacing = isBoldType ? (isUpper ? 0.08 : 0.2) : 0;
        totalFontWidth += glyph.width * (1 + boldSpacing);
    }
    if (totalFontWidth <= 0) return { paths: [], letterHeight: 0, firstWordPrimaryCount: 0 };

    const charCount = [...text].filter(c => c !== ' ').length;
    const widthTarget = charCount <= 1 ? 0.50 : charCount <= 2 ? 0.65 : charCount <= 3 ? 0.75 : 0.88;
    const maxWidth = canvasWidth * widthTarget;

    // Size based on x-height (body characters) so letter bodies match squiggle height.
    // Ascenders/descenders extend into padding above/below.
    const xHeightRange = getFontXHeight(config.fontStyle);
    const effectiveXHeight = xHeightRange * config.loopHeight;

    // Also compute full Y range of first word for safety clamp
    const firstWord = text.split(' ')[0];
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
            allPaths.push(...currentWordPrimary);
        } else if (currentWordPrimary.length === 1) {
            allPaths.push(currentWordPrimary[0]);
        } else if (currentWordPrimary.length > 1) {
            const wordPath = [...currentWordPrimary[0]];
            for (let i = 1; i < currentWordPrimary.length; i++) {
                const prev = wordPath[wordPath.length - 1];
                const next = currentWordPrimary[i][0];
                // 3 collinear bridge points evenly spaced from exit to entry
                for (let b = 1; b <= 3; b++) {
                    const t = b / 4;
                    wordPath.push([
                        prev[0] + (next[0] - prev[0]) * t,
                        prev[1] + (next[1] - prev[1]) * t
                    ]);
                }
                wordPath.push(...currentWordPrimary[i]);
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
    const PUNCT = new Set('.,?!\'"@$&#%()-:;/+=*~_0123456789[]{}<>\\|`\u2190\u2191\u2192\u2193');

    for (const char of text) {
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

        // Capitals render standalone — their structure looks better without bridges
        const isCapital = char >= 'A' && char <= 'Z';
        if (isCapital) {
            flushWord();
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

        const glyphCenterX = glyph.width / 2;
        let glyphMinY = Infinity, glyphMaxY = -Infinity;
        for (const stroke of glyph.strokes) {
            for (const [, fy] of stroke) { glyphMinY = Math.min(glyphMinY, fy); glyphMaxY = Math.max(glyphMaxY, fy); }
        }
        const glyphCenterY = (glyphMinY + glyphMaxY) / 2;

        // Check if this letter has a follower to connect to (for exit tails)
        const nextChar = li < text.length - 1 ? text[li + 1] : null;
        const hasFollower = nextChar && nextChar !== ' ' && !PUNCT.has(nextChar);
        const fontTails = EXIT_TAILS[config.fontStyle];

        for (let si = 0; si < glyph.strokes.length; si++) {
            // Append exit tail to primary stroke when followed by another letter
            const tailEntry = fontTails && fontTails[char];
            let stroke = glyph.strokes[si];
            if (tailEntry && si === tailEntry[0] && hasFollower) {
                stroke = [...stroke, ...tailEntry[1]];
            }
            const fontSec = SECONDARY_STROKES[config.fontStyle];
            const hasExplicitEntry = fontSec && char in fontSec;
            const explicitSec = hasExplicitEntry && fontSec[char].has(si);
            const isSecondary = isThinMode ? false : hasExplicitEntry ? explicitSec : (isDot(stroke) || isCrossbar(stroke));
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
                // Collect primaries for word-path concatenation
                currentWordPrimary.push(transformedPath);
            }
        }
        const isUpper = char >= 'A' && char <= 'Z';
        const boldExtra = isBoldType ? glyph.width * (isUpper ? 0.08 : 0.2) : 0;
        xOffset += (glyph.width + boldExtra) * scale;
        letterIdx++;
        if (PUNCT.has(char) || isCapital) {
            // Flush punct/capitals so they don't concatenate with the next letter
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
    const steps = isPipe ? 8 : isSlinky ? 10 : isFuzzy ? 200 : isBold ? 50 : isSegmented ? ribbedSteps : 80;

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
                        ops.push({ x: fuzzX, y: fuzzY, radius: fps / 2, fill: `rgba(${r},${g},${b},${20/255})` });
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
    for (let i = 0; i < particles.length; i++) {
        for (const op of particles[i]) {
            if (op.fill) continue;
            context.beginPath(); context.arc(op.x, op.y, op.radius, 0, Math.PI * 2);
            if (op.stroke) { context.strokeStyle = op.stroke; context.lineWidth = op.lineWidth; context.stroke(); }
        }
    }
    for (let i = 0; i < particles.length; i++) {
        for (const op of particles[i]) {
            if (!op.fill) continue;
            context.beginPath(); context.arc(op.x, op.y, op.radius, 0, Math.PI * 2);
            context.fillStyle = op.fill; context.fill();
            if (op.stroke) { context.strokeStyle = op.stroke; context.lineWidth = op.lineWidth; context.stroke(); }
        }
    }
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
    const steps = isPipe ? 8 : isSlinky ? 10 : isFuzzy ? 200 : isBold ? 50 : isSegmented ? ribbedSteps : 80;

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
                        ops.push({ x: fuzzX, y: fuzzY, radius: fps / 2, fill: `rgba(${r},${g},${b},${20/255})` });
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
    measureSnowfroHeight, generateHash
};

})();
