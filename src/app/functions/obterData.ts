export class ObterData {

    public static getYear(): number {
        const date = new Date();
        const ano = date.getFullYear();
        return ano;
    }
}