let number = 2n;
let primes = [2n, 3n, 5n];
let prime_amount = 73;
let compendiumGenerator = false;
let subtiles = false;
let hiddenNumber = false;

document.getElementById("generatorInput").value = number;
document.getElementById("generatorInput").addEventListener("change", function(){
    try {
        number = BigInt(this.value);
        if (number < 0n) number *= -1n;
    }
    catch {
    }
    display();
})
document.getElementById("button_scheme").addEventListener("click", function(){
    compendiumGenerator = !compendiumGenerator;
    if (compendiumGenerator) {
        prime_amount = 168;
    }
    else {
        prime_amount = 73;
    }
    display();
})
document.getElementById("button_subtiles").addEventListener("click", function(){
    subtiles = !subtiles;
    display();
})
document.getElementById("button_hideNumber").addEventListener("click", function(){
    hiddenNumber = !hiddenNumber;
    display();
})
document.getElementById("primeAmountInput").addEventListener("change", function(){
    try {
        let amount = BigInt(this.value);
        if (amount > 0n) prime_amount = Number(amount);
        if (amount == 0n) prime_amount = Infinity;
    }
    catch {
    }
    display();
})

display();

function display() {
    document.getElementById("generatorInput").value = number;
    displayButtons();
    displayGeneratorTile(number, compendiumGenerator, prime_amount, subtiles, hiddenNumber);
}

function displayGeneratorTile(value, compendium = false, primeAmount = 73, subtilesIncluded = false, hiddenTileText = false, tile = document.getElementById("generatorTile")) {
    tile.style.setProperty("display", "flex"); //Flex display is so the number of the tile can be centered on the tile
    let tileWidthString = getComputedStyle(tile).getPropertyValue("width");
    let tileWidthNumber = Number(tileWidthString.slice(0, tileWidthString.length - 2));
    while (tile.children.length > 1) tile.removeChild(tile.lastElementChild);
    if (tile.firstElementChild) {
        if (hiddenTileText) tile.firstElementChild.innerHTML = "";
        else {
            tile.firstElementChild.innerHTML = String(value);
            let fontmin = 2;
            let fontmax = tile.firstElementChild.textContent.length * 0.7;
            sizeExpression = 1 / Math.max(fontmin, fontmax);
            tile.style.setProperty("font-size", "calc(240px * " + sizeExpression + ")");
        }
    }
    while (Array.isArray(value) && primes.length < value[0].length) primesUpdate(primes[primes.length - 1] * 2n);
    let all_factors = [];
    if (Array.isArray(value)) {
        all_factors = value;
    }
    else {
        try {
            value = BigInt(value);
        }
        catch {
            value = 0n;
        }
        tile.style.setProperty("color", "#fff");
        if (value == 0n) {
            if (compendium) tile.style.setProperty("color", "#888");
            while (primes.length < 73) primesUpdate(primes[primes.length - 1] * 2n);
            all_factors = [([7n, 4n, 3n]).concat(Array(70).fill(2n))];
        }
        else all_factors = primeFactorize(value, prime_amount);
    }
    let factors = structuredClone(all_factors[0]);
    while (factors[factors.length - 1] === 0) factors.pop();
    while (factors.length < 3) factors.push(0n);
    tile.style.setProperty("background-image", "none");
    tile.style.setProperty("background-color", threeFactorColor(factors.slice(0, 3), ""));
    for (let f = 3; f < factors.length; f++) {
        if (factors[f] > 0) {
            let pImage = document.createElement("div");
            pImage.classList.add("primeImage");
            tile.appendChild(pImage);
            if (compendium) {
                if (f == 3) pImage.style.setProperty("background-image", "conic-gradient(#0000 0deg 10deg, #fff 35deg 55deg, #0000 80deg 100deg, #000 125deg 145deg, #0000 170deg 190deg, #fff 215deg 235deg, #0000 260deg 280deg, #000 305deg 325deg, #0000 350deg");
                else if (f == 4) {
                    pImage.style.setProperty("background-image", "radial-gradient(#fff 0%, #0000 19.666% 30.333%, #000 38.888% 44.444%, #0000 53% 63.666%, #fff 72.222% 77.777%, #0000 86.333%, #000 100%)");
                } 
                else if (f == 5) { // 13 in the original DIVE uses the same generation rules as the rest of the primes above 11, but my version looks good for the rest of the primes but not 13, so I'm setting 13 manually to retain its iconic look
                    pImage.style.setProperty("background-image", "repeating-linear-gradient(#0000 0%, #fff 15%, #0000 30%, #000 45%, #0000 60%)");
                    pImage.style.setProperty("mask-image", "repeating-linear-gradient(90deg, #000 0% 14%, #0000 14% 42%");
                }
                else {
                    let prime = primes[f];
                    let basenum = (prime + 1n)/2n;
                    let basefactors = (primeFactorize(basenum, 4))[0];
                    while (basefactors.length < 4) basefactors.push(0n);
                    let basecolor = threeFactorColor(basefactors.slice(0, 3), "stripeGrey");
                    let residuenum = basenum / primeDefactorize(basefactors);
                    let residueList = DIVEresidueFactor(residuenum, 4, prime_amount);
                    let layerDepth = arrayDepth(residueList) / 2;
                    let layerNum = 1;
                    let width = 110 / Math.sqrt(Number(prime));
                    let direction = 45 + 291.246118 * (f - 3);
                    if (residuenum == 1n) {
                        if (basefactors[3] == 0) { // No sevens
                            pImage.style.setProperty("background-image", "linear-gradient(" + (direction + 90) + "deg, #000, " + basecolor + ", #000)");
                        }
                        else { // Sevens
                            let sevensWidth = 40 / Number(basefactors[3]);
                            let bottomcolor = "#000";
                            pImage.style.setProperty("background-image", "repeating-linear-gradient(" + (direction + 90) + "deg, " + bottomcolor + " 0% " + (sevensWidth / 12) + "%, " + basecolor + " " + (sevensWidth / 4) + "%, #fff " + (5 * sevensWidth / 12) + "% " + (7 * sevensWidth/ 12) + "%, " + basecolor + " " + (sevensWidth * 3/4) + "%, " + bottomcolor + " " + (11 * sevensWidth / 12) + "% " + sevensWidth + "%)");
                        }
                    }
                    else {
                        let longBar = ((residueList.length > 2) || (residueList[1][2].length > 1) || (residueList[1][2][0][3] > 0));
                        let outercolor = threeFactorColor(basefactors.slice(0, 3), "stripeGrey", false, 0.5);
                        let innermax = residueList.slice(1).reduce(
                            function(total, value) {
                                return max(total, value[1] ** value[0]);
                            }, 0n
                        );
                        let length = 100 / Math.sqrt(Number(innermax)) / (residueList.length - 1);
                        let innercolors = [];
                        for (let i = 1; i < residueList.length; i++) {
                            innercolors.push([residueList[i][1], residueList[i][2][0], residueList[i][0]]);
                        }
                        let result = "repeating-linear-gradient(" + (direction + 90) + "deg";
                        let innerBars = [];
                        let length_to_add = 0;
                        let length_thus_far = 0;
                        let iteration_length = 0;
                        for (let b = 0; b < innercolors.length * 2; b++) {
                            let inner_color = innercolors[b % innercolors.length];
                            if (longBar) length_to_add = length / 2;
                            else length_to_add = length * 2/3;
                            if (basefactors[3] == 0n) {
                                result += (", " + outercolor + " " + length_thus_far + "% " + (length_thus_far + length_to_add) + "%, ");
                            }
                            else {
                                result += ", ";
                                for (let s = 0; s < Number(basefactors[3]) * 2; s++) {
                                    if ((b + s) % 2 == 0) result += outercolor;
                                    else result += "#fff";
                                    result += " " + (length_thus_far + length_to_add*s/(Number(basefactors[3]) * 2 - 1)) + "%, "
                                }
                            }
                            length_thus_far += length_to_add;
                            if (longBar) length_to_add = length / 2;
                            else length_to_add = length/3;
                            length_to_add *= Math.sqrt(Number(inner_color[0]) ** Number(inner_color[2]) / Number(innermax));
                            result += DIVERenderInnerBar(inner_color[1], length_thus_far, length_to_add, layerNum, layerDepth);
                            if (b < innercolors.length) innerBars.push([[b + 1], length_thus_far, length_to_add]);
                            length_thus_far += length_to_add;
                            if (b == innercolors.length - 1) iteration_length = length_thus_far;
                        }
                        result += ")";
                        pImage.style.setProperty("background-image", result);
                        while (innerBars.length > 0) {
                            layerNum++;
                            let layerLength = innerBars.length;
                            let layerBars = [];
                            for (let b = 0; b < layerLength; b++) {
                                let target = nestedElement(residueList, innerBars[0][0])[2];
                                if (target.length > 1) {
                                    let deepmax = target.slice(1).reduce(
                                        function(total, value) {
                                            return max(total, value[1] ** value[0]);
                                        }, 0n
                                    );
                                    let segments = [];
                                    length_thus_far = 0;
                                    length_to_add = 0;
                                    for (let t = 1; t < target.length; t++) {
                                        length_to_add = 1;
                                        segments.push(["#0000", length_thus_far, length_thus_far + length_to_add]);
                                        length_thus_far += length_to_add;
                                        length_to_add = Math.sqrt(Number(target[t][1]) ** Number(target[t][0]) / Number(deepmax));
                                        segments.push([target[t][2][0], length_thus_far, length_thus_far + length_to_add]);
                                        length_thus_far += length_to_add;
                                    }
                                    length_to_add = 1;
                                    segments.push(["#0000", length_thus_far, length_thus_far + length_to_add]);
                                    length_thus_far += length_to_add;
                                    for (let s = 1; s < segments.length; s += 2) {
                                        layerBars.push([DIVERenderInnerBar(segments[s][0], innerBars[0][1] + innerBars[0][2] * segments[s][1]/length_thus_far, innerBars[0][2] * (segments[s][2] - segments[s][1])/length_thus_far, layerNum, layerDepth), innerBars[0][1] + innerBars[0][2] * segments[s][1]/length_thus_far, innerBars[0][1] + innerBars[0][2] * segments[s][2]/length_thus_far]);
                                        innerBars.push([innerBars[0][0].concat(2, (s + 1)/2), innerBars[0][1] + innerBars[0][2] * segments[s][1]/length_thus_far, innerBars[0][2] * (segments[s][2] - segments[s][1])/length_thus_far]);
                                    }
                                }
                                innerBars.shift();
                            }
                            if (layerBars.length > 0) {
                                let layerImage = document.createElement("div");
                                layerImage.classList.add("primeImage");
                                pImage.appendChild(layerImage);
                                let layerBackground = "repeating-linear-gradient(" + (direction + 90) + "deg";
                                let previousend = 0;
                                for (let b = 0; b < layerBars.length; b++) {
                                    layerBackground += ", #0000 " + previousend + "% " + layerBars[b][1] + "%, " + layerBars[b][0];
                                    previousend = layerBars[b][2];
                                }
                                layerBackground += ", #0000 " + previousend + "% " + iteration_length + "%)";
                                layerImage.style.setProperty("background-image", layerBackground);
                                layerImage.style.setProperty("mask-image", "repeating-linear-gradient(" + direction + "deg, #000 0% " + (width * 1/6) + "%, #0000 " + (width * 1/6) + "% " + (width * 5/6) + "%, #000 " + (width * 5/6) + "% " + width + "%)");
                            }
                        }
                    }
                    pImage.style.setProperty("mask-image", "repeating-linear-gradient(" + direction + "deg, #000 0% " + (width * 1/6) + "%, #0000 " + (width * 1/6) + "% " + (width * 5/6) + "%, #000 " + (width * 5/6) + "% " + width + "%)");
                }
                pImage.style.setProperty("opacity", 0.5 * Number(factors[f]));
            }
            else {
                pImage.style.setProperty("background-image", "url('DIVE Color Scheme Images/Original Stripes.png')");
                pImage.style.setProperty("background-size", (tileWidthNumber * 2) + "px auto");
                let vert = (-tileWidthNumber * (f - 3)) + "px";
                let horiz = ((factors[f] > 1) ? tileWidthNumber : 0) + "px";
                pImage.style.setProperty("background-position", horiz + " " + vert);
            }
        }
    }
    if (all_factors.length > 1 && subtilesIncluded) {
        let subtile = document.createElement("div");
        subtile.classList.add("subtile");
        tile.appendChild(subtile);
        let subtile_size = 0.5;
        let borderWidth = "calc(" + getComputedStyle(tile).getPropertyValue("width") + " / 40)";
        let bcol = RGBtoArray(getComputedStyle(tile).getPropertyValue("background-color"));
        if (bcol[0] == 0 && bcol[1] == 0 && bcol[2] == 0) subtile.style.setProperty("border-color", "#444");
        else {
            bcol[0] *= 0.5; bcol[1] *= 0.5; bcol[2] *= 0.5;
            bcol = ArraytoRGB(bcol);
            subtile.style.setProperty("border-color", bcol);
        }
        console.log(bcol);
        subtile.style.setProperty("width", subtile_size * 100 + "%");
        subtile.style.setProperty("height", subtile_size * 100 + "%");
        subtile.style.setProperty("left", 50 - subtile_size * 50 + "%");
        subtile.style.setProperty("top", 50 - subtile_size * 50 + "%");
        subtile.style.setProperty("border-width", "calc(" + borderWidth + " * " + subtile_size + ")");
        displayGeneratorTile(all_factors.slice(1), compendium, primeAmount, true, true, subtile);
    }
}

function displayButtons() {
    if (compendiumGenerator) {
        document.getElementById("button_scheme").innerHTML = "Power Compendium DIVE scheme";
        document.getElementById("button_scheme").style.setProperty("background-color", "#446688");
        document.getElementById("button_scheme").style.setProperty("color", "#9ec3e7");
        document.getElementById("button_scheme").style.setProperty("border-color", "#7a9aba");
        document.getElementById("primeAmountLine").style.setProperty("display", "block");
        if (prime_amount == Infinity) document.getElementById("primeAmountInput").value = "";
        else document.getElementById("primeAmountInput").value = prime_amount;
    }
    else {
        document.getElementById("button_scheme").innerHTML = "Original DIVE scheme";
        document.getElementById("button_scheme").style.setProperty("background-color", "#faf8ef");
        document.getElementById("button_scheme").style.setProperty("color", "#776e65");
        document.getElementById("button_scheme").style.setProperty("border-color", "#bbada0");
        document.getElementById("primeAmountLine").style.setProperty("display", "none");
    }
    if (subtiles) {
        document.getElementById("button_subtiles").innerHTML = "Subtiles included";
        document.getElementById("button_subtiles").style.setProperty("background-color", "#e6d580");
        document.getElementById("button_subtiles").style.setProperty("color", "#ccaa00");
        document.getElementById("button_subtiles").style.setProperty("border-color", "#665500");
    }
    else {
        document.getElementById("button_subtiles").innerHTML = "No subtiles";
        document.getElementById("button_subtiles").style.setProperty("background-color", "#665500");
        document.getElementById("button_subtiles").style.setProperty("color", "#ccaa00");
        document.getElementById("button_subtiles").style.setProperty("border-color", "#e6d580");
    }
    if (hiddenNumber) {
        document.getElementById("button_hideNumber").innerHTML = "Number is hidden";
        document.getElementById("button_hideNumber").style.setProperty("background-color", "#280051");
        document.getElementById("button_hideNumber").style.setProperty("color", "#8800cc");
        document.getElementById("button_hideNumber").style.setProperty("border-color", "#e0a3ff");
    }
    else {
        document.getElementById("button_hideNumber").innerHTML = "Number is visible";
        document.getElementById("button_hideNumber").style.setProperty("background-color", "#e0a3ff");
        document.getElementById("button_hideNumber").style.setProperty("color", "#8800cc");
        document.getElementById("button_hideNumber").style.setProperty("border-color", "#280051");
    }
}

function primesUpdate(max) {
    if (primes[primes.length - 1] >= max) return;
    try {
        max = BigInt(max);
        while (primes[primes.length - 1] ** 2n < max) primesUpdate(primes[primes.length - 1] ** 2n - 1n);
        let arr = Array(Number(max) + 1).fill(true);
        arr[0] = false; arr[1] = false;
        for (let p = 0; p < primes.length && primes[p] ** 2n <= max; p++) {
            for (let i = Number(primes[p]) * 2; i < arr.length; i += Number(primes[p])) {
                arr[i] = false;
            }
        }
        let newprimes = [];
        for (let a = 0; a < arr.length; a++) {
            if (arr[a]) newprimes.push(BigInt(a));
        }
        primes = newprimes;
    }
    catch {
        return;
    }
}

function primeFactorize(num, prime_amount = Infinity, reverse = false, return_form = 0, leftover_sub1 = true) {
    try {
        num = BigInt(num);
    }
    catch {
        num = 1n;
    }
    if (num == 0n) return [[]];
    let altPrimes;
    if (typeof prime_amount == "number") {
        altPrimes = primes.slice(0, prime_amount);
    }
    else altPrimes = prime_amount;
    let leftover = num;
    let factors = [[]];
    if (reverse) {
        if (typeof prime_amount == "number") {
            while (primes.length < prime_amount && primes[primes.length - 1] < num) primesUpdate(primes[primes.length - 1] * 2n);
            altPrimes = primes.slice(0, prime_amount);
        }
        for (let p = altPrimes.length - 1; p > -1; p--) {
            factors[0].unshift(0n);
            while (leftover % altPrimes[p] == 0n) {
                factors[0][0]++;
                leftover /= altPrimes[p];
            }
        } 
    }
    else for (let p = 0; p < altPrimes.length; p++) {
        factors[0].push(0n);
        while (leftover % altPrimes[p] == 0n) {
            factors[0][p]++;
            leftover /= altPrimes[p];
        }
        if (leftover == 1n) break;
        if (p == altPrimes.length - 1 && typeof prime_amount == "number") {
            if (prime_amount == Infinity && leftover <= altPrimes[altPrimes.length - 1] ** 2n && (return_form == 1 || return_form == 2)) break;
            primesUpdate(altPrimes[altPrimes.length - 1] * 2n);
            altPrimes = primes.slice(0, prime_amount);
        }
    }
    // Return form 0 means "list of exponents", so 84 becomes [[2n, 1n, 0n, 1n]].
    // Return form 1 means "pairs of the prime and its exponent", so 84 becomes [[[2n, 2n], [3n, 1n], [7n, 1n]]]
    // Return form 2 means "list each prime", so 84 becomes [[2n, 2n, 3n, 7n]]
    if (return_form == 1) {
        let reformed = [];
        for (let p = 0; p < factors[0].length; p++) {
            if (factors[0][p] > 0) reformed.push([altPrimes[p], factors[0][p]]);
        }
        if (prime_amount == Infinity && leftover > 1n) {
            reformed.push([leftover, 1n]);
            leftover = 1n;
        }
        factors[0] = reformed;
    }
    else if (return_form == 2) {
        let reformed = [];
        for (let p = 0; p < factors[0].length; p++) {
            for (let e = 0; e < factors[0][p]; e++) {
                reformed.push(altPrimes[p]);
            }
        }
        if (prime_amount == Infinity && leftover > 1n) {
            reformed.push(leftover);
            leftover = 1n;
        }
        factors[0] = reformed;
    }
    if (leftover > 1n) {
        if (leftover_sub1) {
            leftover -= 1n;
            factors = factors.concat(primeFactorize(leftover, altPrimes, reverse, return_form, true));
        }
        else factors.push(leftover);
    }
    return factors;
}

function primeDefactorize(num, return_form = 0) {
    let result = 1n;
    let altPrimes = primes;
    if (arguments.length > 2) altPrimes = arguments[2];
    if (!(Array.isArray(num[0]))) num = [num];
    for (i = num.length - 1; i >= 0; i--) {
        if (Array.isArray(num[i])) {
            if (return_form == 1 || return_form == 2) {
                for (p = 0; p < num[i].length; p++) {
                    if (return_form == 1) result *= num[i][p][0] ** num[i][p][1];
                    else if (return_form == 2) result *= num[i][p];
                }
            }
            else {
                while (altPrimes.length < num[i].length) {
                    if (arguments.length <= 2) {
                        primesUpdate(primes[primes.length - 1] * 2n);
                        altPrimes = primes;
                    }
                    else throw new Error("Not enough primes provided");
                }
                for (p = 0; p < num[i].length; p++) {
                    result *= altPrimes[p] ** num[i][p];
                }
            }
            if (i > 0) result += 1n;
        }
        else result *= num[i];
    }
    return result;
}

function arrayDepth(array) { // A flat array has a depth of 1, an array containing arrays has a depth of 2, an array containing arrays that themselves contain arrays has a depth of 3, and so on.
    if (!(Array.isArray(array))) return 0;
    let result = 1;
    for (let i = 0; i < array.length; i++) {
        if (Array.isArray(array[i])) result = Math.max(result, arrayDepth(array[i]) + 1);
    }
    return result;
}

function nestedElement(array, indices) { // nestedElement(array, [1, 2, 0]) returns array[1][2][0]
    let result = array;
    for (let i = 0; i < indices.length; i++) {
        result = result[indices[i]];
        if (result == undefined) return undefined;
    }
    return result;
}

function max(a, b) {//This exists so CalcArray can use max on strings
    if (b > a) return b;
    else return a;
}

function min(a, b) {
    if (b < a) return b;
    else return a;
}

function abs(a) {
    if (a >= 0) return a;
    else if (a < 0 && typeof a == "number") return a * -1;
    else if (a < 0 && typeof a == "bigint") return a * -1n;
    else throw new Error("Invalid argument.");
}

function threeFactorColor(factors, scheme) {
    let invert = false; let alpha = 1;
    if (arguments.length > 2) invert = arguments[2];
    if (arguments.length > 3) alpha = arguments[3];
    factors = factors.map(x => Number(x));
    while (factors.length < 3) factors.push(0);
    let r, g, b;
    r = ([0, 4, 8, 10, 12, 13, 14, 15])[Math.min(factors[0], 7)] * 17;
    g = ([0, 6, 10, 13, 15])[Math.min(factors[1], 4)] * 17;
    b = ([0, 8, 12, 15])[Math.min(factors[2], 3)] * 17;
    if (scheme.includes("stripe")) {
        g = ([0, 4, 8, 12, 15])[Math.min(factors[1], 4)] * 17;
        if (scheme.includes("stripeGrey") && r == g && g == b) {
            r += (255 - r)/2;
            g += (255 - g)/2;
            b += (255 - b)/2;
        }
        else if (!(r == g && g == b)) {
            let brighten = 255 / Math.max(r, g, b);
            r *= brighten; g *= brighten; b *= brighten;
        }
    }
    if (scheme.includes("light")) {
        r += (255 - r)/2;
        g += (255 - g)/2;
        b += (255 - b)/2;
    }
    if (scheme.includes("dark")) {
        r *= 0.5;
        g *= 0.5;
        b *= 0.5;
    }
    if (invert) {
        r = 255 - r;
        g = 255 - g;
        b = 255 - b;
    }
    if (alpha != 1) return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    else return "rgb(" + r + ", " + g + ", " + b + ")";
}

function RGBtoArray(rgb) {
    rgb = rgb.slice(4, rgb.length - 1);
    rgb = rgb.split(", ");
    return rgb;
}

function ArraytoRGB(rgb) {
    let result = "rgb(";
    for (let i = 0; i < rgb.length - 1; i++) {
        result += rgb[i]; result += ", ";
    }
    result += rgb[rgb.length - 1];
    result += ")";
    return result;
}

function DIVEresidueFactor(number, small_primes, total_primes) {
    // while (primes.length < total_primes && primes[primes.length - 1] < number) primesUpdate(primes[primes.length - 1] * 2n);
    let result = [];
    let small_factors = primeFactorize(number, small_primes)[0];
    while (small_factors.length < 4) small_factors.push(0n);
    let residue = number / primeDefactorize(small_factors);
    if (residue == 1n) return [small_factors];
    result.push(small_factors);
    let large_factors = primeFactorize(residue, total_primes)[0];
    for (let p = 0; p < large_factors.length; p++) {
        if (large_factors[p] > 0) result.push([large_factors[p], primes[p], DIVEresidueFactor((primes[p] + 1n)/2n, small_primes, total_primes)]);
    }
    return result;
}

function DIVERenderInnerBar(factors, start, length, layer, depth) {
    factors = factors.map(x => Number(x));
    let alpha = 0.5 + 0.5 * layer/depth;
    let result = [];
    if (factors[3] == 0) {
        result += (threeFactorColor(factors.slice(0, 3), "stripe", false, alpha) + " " + start + "% " + (start + length) + "%");
    }
    else {
        for (let s = 0; s < factors[3] * 4 + 1; s++) {
            let mid_color = threeFactorColor(factors.slice(0, 3), "stripeGrey", false, alpha);
            let black = threeFactorColor([0, 0, 0], "", false, alpha);
            let white = threeFactorColor([7, 4, 3], "", false, alpha);
            if (s % 4 == 0) result += black;
            if (s % 4 == 1 || s % 4 == 3) result += mid_color;
            if (s % 4 == 2) result += white;
            result += " " + (start + length*s/(factors[3] * 4)) + "%";
            if (s < factors[3] * 4) result += ", ";
        }
    }
    return result;
}