import React, { useEffect, useMemo } from 'react';
import { Spin, Typography } from 'antd';
import Settimana from 'src/components/Settimana';
import { DateTime } from 'luxon';
import CalendarioHeader from 'src/components/CalendarioHeader';
import useCalendarioStore from 'src/hooks/Calendar';
import FetchState from 'src/hooks/FetchState';

const Calendario: React.FC = () => {
	const store = useCalendarioStore();
	const oggi = useMemo(() => DateTime.local(), []);

	const settimane = useMemo(() => {
		if (store.from === null || store.to === null) {
			return [];
		}
		
		const g: DateTime[] = [];

		let it = store.from;
		while (it < store.to) {
			g.push(it);
			it = it.plus({ weeks: 1 });
		}
		return g;
	}, [store.from, store.to]);

	useEffect(() => {
		async function fetchMyAPI() {
			const from = DateTime.local().startOf('week').plus({ weeks: -1 });
			await store.fetch(from, from.plus({ weeks: 10 }));
		}

		fetchMyAPI();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);


	switch (store.stato) {
		case FetchState.Loading:
			return (
				<Spin size='large' fullscreen delay={200} />
			);
		case FetchState.Error:
			return (
				<div className='calendario-error'>
					<Typography>Si è verificato un errore nella comunicazione con il server. Assicurarsi di essere connessi ad internet e riprovare</Typography>
				</div>
			);

		case FetchState.DataAvailable:
			return (
				<div className='calendario'>
					<CalendarioHeader />
					{settimane.map(g => (<Settimana
						key={g.year + "-" + g.weekNumber}
						oggi={oggi}
						lunedi={g}
						attivitaOrdinarie={store.calendario?.apertureOrdinarie || []}
						puliziaSede={store.calendario?.pulizieSede?.find(x => x.numeroSettimana === g.weekNumber && x.anno === g.year)}
						/>))}
					
				</div>
				);

		default: throw Error("Caso non previsto");
	}
};

export default Calendario;