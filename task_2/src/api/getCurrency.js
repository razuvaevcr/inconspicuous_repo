const APIBASE = 'https://open.er-api.com'
const BASECODE = 'USD';

export async function getCurrency() {
	let data;
//сохраним ответ от сервера в localStorage на час для исключения слишком частых запросов
	if (
		!localStorage.getItem('rates') ||
		!localStorage.getItem('time') ||
		Number(localStorage.getItem('time')) < Date.now() / 1000
	) {
		const response = await fetch(`${APIBASE}/v6/latest/${BASECODE}`);

		if (!response.ok) {
			return {};
		}
		
		data = await response.json();

		localStorage.setItem('time', `${data.time_next_update_unix}`);
		localStorage.setItem('rates', JSON.stringify(data.rates));

		return data

	} else {
		//ts-ignore влючен, так как эта ошибка обработана в блоке if
		// @ts-ignore
		data = JSON.parse(localStorage.getItem('rates'));

		return data;
	}
}
