import axios from 'axios';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Spin } from 'antd';
import Settimana from 'src/components/Settimana';
import { DateTime } from 'luxon';
import CalendarioType from './Calendario.d';

const Calendario: React.FC = () => {
	const [dati, setDati] = useState<CalendarioType | null>(null);
	const [errore, setErrore] = useState(false);
	const [from, setFrom] = useState(DateTime.local().startOf('week').plus({ weeks: -1 }));
	const [to, setTo] = useState(from.plus({ weeks: 10 }));

	const oggi = useMemo(() => DateTime.local(), []);

	const giorni = useMemo(() => {
		const g: DateTime[] = [];

		let it = from;
		while (it < to) {
			g.push(it);
			it = it.plus({ weeks: 1 });
		}
		return g;
	}, [from, to]);

	const fetchData = useCallback(async (from: DateTime, to: DateTime): Promise<CalendarioType | Error> => {
		try {
			const r = await axios.get<CalendarioType>('http://localhost:5195/api/v1/Calendario', {
				headers: {
					'Content-Type': 'application/json',
					"X-Nome-Utente": "MarioRossi",
				},
				params: {
					from: from.toISODate(),
					to: to.toISODate(),
				}
			});
			return r.data;
		} catch (error) {
			setErrore(true);
			return Error('Errore');
		}
	}, []);

	useEffect(() => {
		async function fetchMyAPI() {
			const res = await fetchData(from, to);
			if (res instanceof Error) {
				setErrore(true);
			} else {
				setDati(res);
			}
		}

		fetchMyAPI();
	}, [fetchData, from, to]);


	if (!dati && !errore) {
		return (
			<Spin size='large' fullscreen delay={200} />
		);
	} else if (errore) {
		return (
			<div className='calendario-error'>
				<h1>Calendario</h1>
				<p>Si è verificato un errore.</p>
			</div>
		);
	}

	return (
		<div className='calendario'>
			<div className='calendario-header'>
				<div className='calendario-header-giorno'>L</div>
				<div className='calendario-header-giorno'>M</div>
				<div className='calendario-header-giorno'>M</div>
				<div className='calendario-header-giorno'>G</div>
				<div className='calendario-header-giorno'>V</div>
				<div className='calendario-header-giorno'>S</div>
				<div className='calendario-header-giorno'>D</div>
			</div>
			{giorni.map(g => (<Settimana
				key={g.year + "-" + g.weekNumber}
				oggi={oggi}
				lunedi={g}
				attivitaOrdinarie={dati?.apertureOrdinarie || []}
				puliziaSede={dati?.pulizieSede?.find(x => x.numeroSettimana === g.weekNumber && x.anno === g.year)}
				/>))}
			
		</div>
		);
};

export default Calendario;