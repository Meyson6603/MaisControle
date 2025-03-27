const sendDataToAPI = async (endpoint, data) => {
    try {
        const response = await fetch(endpoint, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data), 
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Erro ao se comunicar com a API');
        }
        return await response.json();
    } catch (error) {
        console.error('Erro ao enviar dados para a API:', error.message);
    }
};

export { sendDataToAPI };