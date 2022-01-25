export class Company 
{
    name: String
    symbol: String

    constructor(n: String, s: String) 
    {
        this.name = n;
        this.symbol = s;
    }
}
export class Earnings{
    date: String
    value: String

    constructor(d: String, v: String) 
    {
        this.date = d;
        this.value = v;
    }
}