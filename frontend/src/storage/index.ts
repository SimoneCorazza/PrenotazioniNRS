const chiave = "nome_utente";

export const setNomeUtente = (nomeUtente: string) => localStorage.setItem(chiave, nomeUtente);

export const getNomeUtente = () => localStorage.getItem(chiave);