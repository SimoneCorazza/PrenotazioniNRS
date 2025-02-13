import { DateTime } from 'luxon';
import axios from 'axios';
import Calendario from './Calendario';
import { getNomeUtente } from 'src/storage';

const instance = axios.create({
    baseURL: 'http://localhost:5195',
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
export const fetchCalendario = async (from: DateTime, to: DateTime): Promise<Calendario | Error> => {
    try {
        const r = await instance.get<Calendario>('/api/v1/Calendario', {
            params: {
                from: from.toISODate(),
                to: to.toISODate(),
            }
        });
        return r.data;
    } catch (error) {
        return Error('Errore');
    }
}

export const postAproIo = async (data: DateTime) : Promise<void> =>  {
    return await instance.post(`/api/v1/AttivitaOrdinaria/Aggiungimi/Apertura/${data.toFormat("yyyy-MM-dd")}`);
}

export const postChiudoIo = async (data: DateTime) : Promise<void> =>  {
    return await instance.post(`/api/v1/AttivitaOrdinaria/Aggiungimi/Chiusura/${data.toFormat("yyyy-MM-dd")}`);
}

export const postNonAproIo = async (data: DateTime) : Promise<void> =>  {
    return await instance.delete(`/api/v1/AttivitaOrdinaria/Rimuovimi/Apertura/${data.toFormat("yyyy-MM-dd")}`);
}

export const postNonChiudoIo = async (data: DateTime) : Promise<void> =>  {
    return await instance.delete(`/api/v1/AttivitaOrdinaria/Rimuovimi/Chiusura/${data.toFormat("yyyy-MM-dd")}`);
}