export const convertOneDtoTwoDArr = <T>(arr: T[], innerArrMaxSize: number): T[][] => {
    let twoDArr: T[][] = [];
    while (arr.length) twoDArr.push(arr.splice(0, innerArrMaxSize));
    return twoDArr;
}