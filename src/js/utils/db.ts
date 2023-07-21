export async function getFromDb(): Promise<any> {
    try {
        const res = await fetch('http://localhost:3004/texts', { method: 'GET' });
        return res.json();
    } catch (error) {
        console.error('Some problems with JSON file', error);
    }
}

export async function addToDb(data: any): Promise<void> {
    try {
        await fetch('http://localhost:3004/texts', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify(data)
        });
    } catch (error) {
        console.error('Some problems with adding JSON file', error);
    }
}

export async function deleteFromDb(id: string): Promise<void> {
    try {
        await fetch(`http://localhost:3004/texts/${id}`, { method: 'DELETE' });
    } catch (error) {
        console.error('Some problems with removing from DB', error);
    }
}