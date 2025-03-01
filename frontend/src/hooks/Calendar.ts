import { DateTime } from 'luxon';
import { create } from 'zustand';
import { fetchCalendario } from '../api'
import Calendario from 'src/api/Calendario';

interface CalendarioState {
  /** Data di inizio del periodo attuale */
  from: DateTime | null;
  /** Data di fine del periodo */
  to: DateTime | null;
  /** Dati del calendario */
  calendario: Calendario | null;
  /**
   * Ottiene il numero di settimane
   * @param from Data di inizio da cui reperire i dati
   * @param to Data di fine per cui reperire i dati
   */
  fetch: (from: DateTime, to: DateTime) => Promise<void>;

  /**
   * Esegue il fetch per lo stesso periodo attualmente selezionato
   */
  refetch: () => Promise<void>;
};


const useCalendarioStore = create<CalendarioState>((set, get) => ({
  from: null,
  to: null,
  calendario: null,
  fetch: async (from: DateTime, to: DateTime) => {
    const calendario = await fetchCalendario(from, to);
    set({ from, to, calendario });
  },
  refetch: async () => {
    const old = get();
    if (old.from === null || old.to === null) {
      throw new Error("È richiesto di fetchare almeno una volta i dati per poter chiamare questa funzione");
    } else {
      await old.fetch(old.from, old.to);
    }

  },
}));

export default useCalendarioStore;