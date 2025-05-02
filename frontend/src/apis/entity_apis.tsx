export class EntityAPI {
    private entityName: string;
    private apiUrl: string;

    constructor(public name: string) {
        this.entityName = name
        this.apiUrl = `${import.meta.env.VITE_API_URL}/${this.entityName}/`
    }

    async getAll() {
        const response = await fetch(this.apiUrl)
        const data = await response.json()
        return data
    }

    async create(entity: any) {
        const response = await fetch(this.apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(entity)
        })

        const data = await response.json()
        return data;
    }

    async getById(id: string) {
        const response = await fetch(`${this.apiUrl}${id}`)
        const data = await response.json()
        return data
    }

    async update(id: string, entity: any) {
        const response = await fetch(`${this.apiUrl}${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(entity)
        })

        const data = await response.json()
        return data;
    }

    async delete(id: string) {
        const response = await fetch(`${this.apiUrl}${id}`, {
            method: 'DELETE',
        });
        const data = await response.json();
        return data;
    }
}
