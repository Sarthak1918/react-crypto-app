export default function addComma(num) {
    num = `${num}`.split(".");
    const dec = num[1];
    num = num[0].split("");
    let res = "";
    num.reverse().forEach((e, i) => {
        res = e + res;
        if (i % 3 === 2 && i !== num.length - 1) res = "," + res;
    });
    return dec ? [res, dec].join(".") : res;
}
