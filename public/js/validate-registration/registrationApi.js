const regitrationAPI = async (data) => {
    try{
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        const json = await response.json();
    
        if(response.ok) {
            return json.message;
        } else if (response.status === 409) {
            return json.message;
        }
    }catch(err){
        return 
    }
        
};