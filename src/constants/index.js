const baseUrl = process.env.VUE_APP_API_BASE_URL || 'http://localhost:8080';
export const urls = {
	login:`${baseUrl}/login`,
	register:`${baseUrl}/register`,
	balance:`${baseUrl}/balance`,
	stock:`${baseUrl}/stock`,
}

export const constants = {
	modalTypes:{
		BUY:0,
		SELL:1,
		ADDBALANCE:2,
		REMOVEBALANCE:3
	}
}