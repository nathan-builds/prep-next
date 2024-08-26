export class ApiService {

    static baseURL = 'http://localhost:3001';

    static async get<T>(url: string): Promise<T | null> {
        try {
            const response = await fetch(`${ApiService.baseURL}${url}`);
            if (!response.ok) {
                return null;
            }
            return await response.json();
        } catch (e) {
            console.log(e);
            return null;
        }
    }

}