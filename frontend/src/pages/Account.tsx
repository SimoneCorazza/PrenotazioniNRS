import { Button, Input, Typography } from 'antd';
import React, { useCallback, useState } from 'react';
import { setNomeUtente as setNomeUtenteStorage } from 'src/storage';

interface AccountProps {
    nomeImpostato: () => void;
}

const Account: React.FC<AccountProps> = ({ nomeImpostato }) => {
    const [nomeUtente, setNomeUtente] = useState('');

    const onSubmit = useCallback(() => {
        setNomeUtenteStorage(nomeUtente);
        nomeImpostato();
    }, [nomeImpostato, nomeUtente]);

    return (
        <div className='account-input'>
            <div>
                <Typography>Inserisci il tuo nome:</Typography>
                <Input
                    value={nomeUtente}
                    onPressEnter={onSubmit}
                    onChange={e => setNomeUtente(e.target.value)}
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