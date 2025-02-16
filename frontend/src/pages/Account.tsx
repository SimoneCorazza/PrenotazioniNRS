import { Button, Input, InputRef, Typography } from 'antd';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { setNomeUtente as setNomeUtenteStorage } from 'src/storage';

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
            <div>
                <Typography>Inserisci il tuo nome:</Typography>
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