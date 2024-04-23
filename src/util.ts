export default{
    props:{
        white : '#FFFFFF',
        black : '#000000',
        rows : 50,
        columns : 50
    }
}

export function toggleActiveButton(buttonId: string, shouldActivate: boolean): void {
    const button = document.getElementById(buttonId);
    button?.classList.toggle('active', shouldActivate);
}