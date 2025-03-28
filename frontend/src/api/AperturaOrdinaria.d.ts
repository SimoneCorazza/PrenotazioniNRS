import StatoAttivitaOrdinaria from "./StatoAttivitaOrdinaria";

interface AperturaOrdinaria {
    stato: StatoAttivitaOrdinaria;
    giorno: string;
    responsabiliApertura: string[];
    responsabiliChiusura: string[];
}

export default AperturaOrdinaria;