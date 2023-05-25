const LevelsArray = [
    [1, 2, 3, 4, 5, 6, 0, 0, 9, 0, 13], 
    [0, 0, 8, 10, 14, 16, 18, 21, 29, 31, 41, 44, 51, 58, 72],
    [7, 11, 15, 19, 26, 34, 43, 54, 68, 93, 99, 117, 126, 164, 173, 195, 217, 248, 259, 294, 306, 333, 354, 372, 413, 428, 447, 488, 499, 528, 556, 575, 598, 622, 654, 685, 694],
    [12, 17, 22, 36, 45, 65],
    [0, 0, 0, 0, 49, 62, 84, 111, 119, 146, 181, 212, 232, 279, 303, 348, 359, 393, 441, 456, 498, 545, 565, 584, 636, 667, 689],								
    [0, 23, 39, 56, 77, 104, 129, 168, 201, 246, 284, 311, 356, 409, 444, 476, 505, 573, 605, 653, 687],
    [0, 24, 38, 52, 74, 108, 124, 169, 197, 229, 286, 314, 352, 391, 445, 486, 502, 563, 596, 644, 688],														
    [0, 32, 57, 91, 113, 162, 187, 244, 299, 331, 374, 426, 474, 526, 576, 619, 682],																				
    [25, 48, 73, 114, 165, 209, 257, 312, 364, 424, 495, 549, 594, 665],																							
    [27, 47, 75],
    [28, 46, 76, 115, 166, 205, 253, 308, 367, 438, 493, 548, 603, 678, 699],																						
    [33, 61, 109, 157, 211, 275, 326, 386, 452, 522, 579, 661],																									
    [35, 64, 103, 139, 204, 264, 342, 403, 459, 538, 589, 672],
    [37, 66, 105, 142, 206, 266, 344, 405, 462, 541, 586, 674],																								
    [0, 59, 102, 144, 203, 268, 346, 407, 464, 543, 588, 676],																								
    [0, 63,	106, 159, 207, 277, 328, 388, 454, 524, 582, 663],																									
    [42, 82, 127, 193, 251, 324, 414, 484, 553, 634, 696],																									
    [53, 107, 171, 227, 315, 384, 472, 569, 651],																											
    [55, 101, 167, 242, 309, 401, 482, 561, 642],																											
    [67, 118, 196, 289, 363, 465, 552, 646],																												
    [69, 121, 198, 292, 365, 449, 554, 648],																													
    [71, 122, 199, 297, 366, 457, 555, 639],																												
    [78, 145, 231, 329, 439, 527, 623],																														
    [79, 137, 239, 322, 422, 536, 632],																													
    [81, 147, 233, 332, 442, 529, 625],																													
    [83, 133, 235, 317, 417, 532, 627],																													
    [85, 135, 237, 319, 419, 534, 629],																													
    [86, 153, 223, 337, 434, 517, 615],																													
    [87, 163, 247, 347, 427, 546, 608],																													
    [88, 155, 225, 339, 436, 519, 617],																													
    [89, 148, 218, 349, 429, 513, 611],																														
    [92, 151, 221, 335, 432, 515, 613],																													
    [94, 175, 281, 368, 489, 578, 691],																													
    [95, 176, 282, 369, 491, 583, 692],																													
    [96, 177, 283, 371, 492, 581, 693],																														
    [97, 178, 287, 375, 496, 587, 697],																														
    [98, 179, 285, 373, 494, 585, 695],																														
    [112, 202, 307, 437, 547, 669],																														
    [116, 208, 313, 425, 551, 658],																														
    [123, 226, 351, 477, 597],																															
    [125, 228, 353, 479, 592],																															
    [128, 243, 355, 467, 606],																																
    [131, 245, 357, 469, 601],																															
    [132, 261, 387, 514, 668],																															
    [134, 263, 389, 516, 671],																														
    [136, 265, 392, 518, 673],																															
    [138, 267, 394, 521, 675],																																
    [141, 269, 396, 523, 677],																																
    [143, 262, 398, 525, 679],																															
    [149, 272, 406, 533, 657],																														
    [152, 274, 408, 535, 659],																																
    [154, 276, 411, 537, 662],																																
    [156, 278, 377, 539, 664],																															
    [158, 271, 379, 542, 666],																															
    [161, 273, 382, 544, 656],																														
    [172, 302, 443, 574, 698],																																
    [174, 304, 446, 557],																																
    [182, 318, 466, 612],																																
    [183, 343, 485, 635],																																	
    [184, 321, 468, 614],																																
    [185, 345, 487, 637],																																	
    [186, 323, 471, 616],																																	
    [188, 325, 473, 618],																																
    [189, 336, 478, 628],																																
    [191, 327, 475, 621],																																	
    [192, 338, 481, 631],																																
    [194, 341, 483, 633],																																
    [213, 358, 501, 681],
    [215, 361, 503, 683],																															
    [216, 362, 504, 684],
    [217, 376, 557],																																
    [219, 378, 559],
    [222, 381, 562],
    [224, 385, 564],																																
    [234, 395, 566],																																	
    [236, 397, 568],																																	
    [238, 399, 571],																																	
    [241, 402, 573],																																		
    [0, 383, 558],																																	
    [0, 404, 567],																																	
    [249, 431, 591],																																	
    [252, 433, 593],																																		
    [254, 435, 595],																																	
    [255, 423, 604],																																	
    [256, 418, 599],																																	
    [258, 421, 602],																																	
    [288, 448, 638],																																		
    [291, 451, 641],																																		
    [293, 453, 643],																																		
    [295, 455, 645],																																		
    [296, 458, 647],																																		
    [298, 461, 649],																																		
    [301, 463, 652],																																		
    [305, 497, 686],																																		
    [316, 512],																																			
    [334, 531],																																			
    [412, 609],																																		
    [415, 626],																																	
    [0, 607],																																			
    [0, 624],
    [416, 655]
]

const template_num = LevelsArray.length;
const highest_fold = LevelsArray[2].length + 2;
const highest_level = 700;
let prev_searched = [-1, -1, -1];

for (let i = 0; i < highest_fold - 2; i++) {
    let entry = document.createElement("td");
    let fold = document.createTextNode((i + 3) + "-fold");
    entry.appendChild(fold);
    document.getElementById("levels").firstElementChild.firstElementChild.appendChild(entry);
}

for (let temp = 1; temp <= template_num; temp++) {
    for (let index = 0; index <= highest_fold - 2; index++) {
        let lnum = LevelsArray[temp - 1][index];
        if (lnum) {
            let entry = document.createElement("td");
            let ltext = document.createTextNode(lnum);
            if ((lnum >= 501) & (lnum <= 504)) ltext.nodeValue = lnum + "\n===\n" + (lnum + 5);
            if ((lnum == 505)) ltext.nodeValue = "505\n===\n511";
            entry.appendChild(ltext);
            document.getElementById("levels").firstElementChild.children[temp].appendChild(entry);
        }
        else {
            let entry = document.createElement("td");
            document.getElementById("levels").firstElementChild.children[temp].appendChild(entry);
            if ((lnum == undefined) && (temp == 1 || temp == 2 || temp == 4)) entry.style.display = "none";
        }
    }
}

let boss_cycles = 0;

for (let l = 110; l <= highest_level; l += 90) {
    boss_cycles++;
    let repeat_text = boss_cycles + "th";
    if ((boss_cycles % 10 == 1) && (boss_cycles % 100 != 11)) {repeat_text = boss_cycles + "st"};
    if ((boss_cycles % 10 == 2) && (boss_cycles % 100 != 12)) {repeat_text = boss_cycles + "nd"};
    if ((boss_cycles % 10 == 3) && (boss_cycles % 100 != 13)) {repeat_text = boss_cycles + "rd"};
    repeat_text += " repeat";
    let entry = document.createElement("td");
    let repeat = document.createTextNode(repeat_text);
    entry.appendChild(repeat);
    document.getElementById("bosses").firstElementChild.firstElementChild.appendChild(entry);
}

for (let temp = 1; temp <= 9; temp++) {
    for (let repeat = 0; repeat <= boss_cycles; repeat++) {
        let lnum = 10 + temp * 10 + repeat * 90;
        if (lnum <= highest_level) {
            let entry = document.createElement("td");
            let ltext = document.createTextNode(lnum);
            entry.appendChild(ltext);
            document.getElementById("bosses").firstElementChild.children[temp].appendChild(entry);
        }
        else {
            let entry = document.createElement("td");
            document.getElementById("bosses").firstElementChild.children[temp].appendChild(entry);
        }
    }
}

function levelIndex(l) {
    l = parseInt(l);
    if ((!Number.isInteger(l)) || (l < 1) || (l > highest_level)) return [-1, -1, -1];
    else if ((l > 10) && (l % 10 == 0)) {
        return [1, Math.round(((l / 10) - 2) % 9), Math.floor((l - 20) / 90)]; //The round shouldn't be needed but it's there just in case
    }
    else {
        if ((l >= 506) & (l <= 509)) l -= 5;
        if ((l == 511)) l = 505;
        for (let temp = 0; temp < LevelsArray.length; temp++) {
            let index = LevelsArray[temp].indexOf(l);
            if (index != -1) return [0, temp, index];
        }
    }
    return [-1, -2, -2]; //If the entry somehow isn't found
}

function levelSearch(l) {
    if (prev_searched[0] == 0) {
        for (let row = 0; row < template_num; row++) {
            document.getElementById("levels").firstElementChild.children[row + 1].children[prev_searched[2] + 1].style.backgroundColor = "#ffffff";
        }
        for (let column = 0; column < highest_fold - 2; column++) {
            document.getElementById("levels").firstElementChild.children[prev_searched[1] + 1].children[column + 1].style.backgroundColor = "#ffffff";
        }
    }
    if (prev_searched[0] == 1) {
        for (let row = 0; row < 9; row++) {
            document.getElementById("bosses").firstElementChild.children[row + 1].children[prev_searched[2] + 1].style.backgroundColor = "#ffffff";
        }
        for (let column = 0; column <= boss_cycles; column++) {
            document.getElementById("bosses").firstElementChild.children[prev_searched[1] + 1].children[column + 1].style.backgroundColor = "#ffffff";
        }
    }
    let location = levelIndex(l);
    if (location[0] == 0) {
        for (let row = 0; row < template_num; row++) {
            document.getElementById("levels").firstElementChild.children[row + 1].children[location[2] + 1].style.backgroundColor = "#9f9";
        }
        for (let column = 0; column < highest_fold - 2; column++) {
            document.getElementById("levels").firstElementChild.children[location[1] + 1].children[column + 1].style.backgroundColor = "#9f9";
        }
        document.getElementById("levels").firstElementChild.children[location[1] + 1].children[location[2] + 1].style.backgroundColor = "#0f0";
    }
    if (location[0] == 1) {
        for (let row = 0; row < 9; row++) {
            document.getElementById("bosses").firstElementChild.children[row + 1].children[location[2] + 1].style.backgroundColor = "#9f9";
        }
        for (let column = 0; column <= boss_cycles; column++) {
            document.getElementById("bosses").firstElementChild.children[location[1] + 1].children[column + 1].style.backgroundColor = "#9f9";
        }
        document.getElementById("bosses").firstElementChild.children[location[1] + 1].children[location[2] + 1].style.backgroundColor = "#0f0";
    }
    prev_searched = location;
}