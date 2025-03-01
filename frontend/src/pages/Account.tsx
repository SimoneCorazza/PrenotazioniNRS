import { Button, Input, InputRef, Typography } from 'antd';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { setNomeUtente as setNomeUtenteStorage } from 'src/services/LocalStorage';

interface AccountProps {
    nomeImpostato: () => void;
}

const Account: React.FC<AccountProps> = ({ nomeImpostato }) => {
    const [nomeUtente, setNomeUtente] = useState('');
    const inputUsername = useRef<InputRef>(null);

    const onSubmit = useCallback(() => {
        setNomeUtenteStorage(nomeUtente);
        nomeImpostato();
    }, [nomeImpostato, nomeUtente]);

    useEffect(() => {
        inputUsername.current?.focus();
    }, [inputUsername]);

    return (
        <div className='account-input'>
            <Typography>Inserisci il tuo nome:</Typography>
            <div style={{ margin: "auto" }}>
                <Input
                    value={nomeUtente}
                    onPressEnter={onSubmit}
                    onChange={e => setNomeUtente(e.target.value)}
                    ref={inputUsername}
                    />
                <Button
                    style={{ marginTop: "15px", width: "100%"}}
                    type="primary"
                    onClick={onSubmit}>
                        Conferma
                </Button>
            </div>
        </div>

    );
};

export default Account;