/** Stato del reperimento dei dati */
enum FetchState {
    /** I dati sono stati ricevuti correttamente */
    DataAvailable = 1,
    /** I dati si stanno caricando */
    Loading,
    /** C'è stato un errore nel reperimento */
    Error,
}

export default FetchState;