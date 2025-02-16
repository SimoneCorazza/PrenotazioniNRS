import { Avatar, Popconfirm } from 'antd';
import React, { useCallback } from 'react';
import { getNomeUtente, logout } from 'src/storage';

const CalendarioHeader: React.FC = () => {
    const username = getNomeUtente();

    const onLogout = useCallback(() => {
        logout();
        window.location.reload();
    }, []);


    return <div className='calendario-header'>
        <Popconfirm
          placement="bottom"
          title="Vuoi sloggarti?"
          description={`Al momento sei loggato come '${username}'`}
          okText="Sì, sloggami"
          cancelText="Annulla"
          onConfirm={onLogout}
        >
            <Avatar size="small">
                {username![0].toUpperCase()}
            </Avatar>
        </Popconfirm>
        <div className='calendario-header-giorni'>
            <div className='calendario-header-giorno'>L</div>
            <div className='calendario-header-giorno'>M</div>
            <div className='calendario-header-giorno'>M</div>
            <div className='calendario-header-giorno'>G</div>
            <div className='calendario-header-giorno'>V</div>
            <div className='calendario-header-giorno'>S</div>
            <div className='calendario-header-giorno'>D</div>
        </div>
    </div>;
};

export default CalendarioHeader;