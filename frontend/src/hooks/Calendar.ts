import { DateTime } from 'luxon';
import { create } from 'zustand';
import { fetchCalendario } from '../api'
import Calendario from 'src/api/Calendario';
import FetchState from './FetchState';

interface CalendarioState {
  /** Data di inizio del periodo attuale */
  from: DateTime | null;
  /** Data di fine del periodo */
  to: DateTime | null;
  /** Dati del calendario */
  calendario: Calendario | null;
  /** Indica lo stato del reperimento. Default FetchState.Loading */
  stato: FetchState;
  /**
   * Ottiene il numero di settimane
   * @param from Data di inizio da cui reperire i dati
   * @param to Data di fine per cui reperire i dati
   * @returns Esito dell'operazione: true se è andato tutto bene, false se c'è stato un erropre nel reperimento
   */
  fetch: (from: DateTime, to: DateTime) => Promise<boolean>;
  /**
   * Esegue il fetch per lo stesso periodo attualmente selezionato
   * @returns Esito dell'operazione: true se è andato tutto bene, false se c'è stato un erropre nel reperimento
   */
  refetch: () => Promise<boolean>;
};




const useCalendarioStore = create<CalendarioState>((set, get) => ({
  from: null,
  to: null,
  calendario: null,
  stato: FetchState.Loading,
  fetch: async (from: DateTime, to: DateTime) => {
    let calendario;
    try {
      calendario = await fetchCalendario(from, to);
      set({ from, to, calendario, stato: FetchState.DataAvailable });
      return true;
    } catch {
      set({ from: null, to: null, calendario: null, stato: FetchState.Error });
      return false;
    }
  },
  refetch: async () => {
    const old = get();
    if (old.from === null || old.to === null) {
      throw new Error("È richiesto di fetchare almeno una volta i dati per poter chiamare questa funzione");
    } else {
      return await old.fetch(old.from, old.to);
    }
  },
}));

export default useCalendarioStore;