import { DateTime } from "luxon";

interface AperturaOrdinaria {
    giorno: DateTime;
    responsabiliApertura: string[];
    responsabiliChiusura: string[];
}

export default AperturaOrdinaria;