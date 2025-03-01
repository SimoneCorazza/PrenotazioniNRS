import { DateTime } from 'luxon';
import axios from 'axios';
import Calendario from './Calendario';
import { getNomeUtente } from 'src/services/LocalStorage';

declare global {
    interface Window {
        env:any;
    }
}

const instance = axios.create({
    baseURL: window.env.REACT_APP_SERVER_URL,
});

instance.interceptors.request.use(
    config => {
        config.headers['X-Nome-Utente'] = getNomeUtente();
        return config;
      }
  );

/**
 * Ottiene il calendario nel range di date indicate
 * @param from Data di partenze
 * @param to Data finale
 * @returns Calendario risultate o errore
 */
export const fetchCalendario = async (from: DateTime, to: DateTime): Promise<Calendario> => {
    const r = await instance.get<Calendario>('/api/v1/Calendario', {
        params: {
            from: from.toISODate(),
            to: to.toISODate(),
        }
    });
    return r.data;
}

export const postAproIo = async (data: DateTime) : Promise<ApiResponse> =>  {
    const r = await instance.post<ApiResponse>(`/api/v1/AttivitaOrdinaria/Aggiungimi/Apertura/${data.toFormat("yyyy-MM-dd")}`);
    return r.data;
}

export const postChiudoIo = async (data: DateTime) : Promise<ApiResponse> =>  {
    const r =  await instance.post<ApiResponse>(`/api/v1/AttivitaOrdinaria/Aggiungimi/Chiusura/${data.toFormat("yyyy-MM-dd")}`);
    return r.data;
}

export const postNonAproIo = async (data: DateTime) : Promise<ApiResponse> =>  {
    const r =  await instance.delete<ApiResponse>(`/api/v1/AttivitaOrdinaria/Rimuovimi/Apertura/${data.toFormat("yyyy-MM-dd")}`);
    return r.data;
}

export const postNonChiudoIo = async (data: DateTime) : Promise<ApiResponse> =>  {
    const r =  await instance.delete<ApiResponse>(`/api/v1/AttivitaOrdinaria/Rimuovimi/Chiusura/${data.toFormat("yyyy-MM-dd")}`);
    return r.data;
}

export const postNonPuliscoIo = async (numeroSettimana: number, anno: number) : Promise<ApiResponse> =>  {
    const r =  await instance.delete<ApiResponse>(`/api/v1/PuliziaSede/Rimuovimi/${anno}/${numeroSettimana}`);
    return r.data;
}

export const postPuliscoIo = async (numeroSettimana: number, anno: number) : Promise<ApiResponse> =>  {
    const r =  await instance.post<ApiResponse>(`/api/v1/PuliziaSede/Aggiungimi/${anno}/${numeroSettimana}`);
    return r.data;
}