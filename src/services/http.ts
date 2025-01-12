interface IData {
    [key: string]: any;
  }
  
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: '',
  };
  
  function joinURL(baseURL: string, customURL: string) {
    return `${baseURL}/${customURL}`;
  }
  
  export default class HTTPService {
    baseURL: string;
    constructor() {
      this.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL + '/api/v1';
      // this.baseURL = "https://pettify-backend.onrender.com/api/v1"
    }
  
    private request(
      url: string,
      method = 'GET',
      data?: IData | undefined | null,
      Authorization?: string | null
    ) {
      url = joinURL(this.baseURL, url);
  
      const options = {
        headers,
        method,
        body: '',
      };
  
      if (data) options.body = JSON.stringify(data);
      if (Authorization) options.headers.Authorization = Authorization;
  
      return fetch(url, options);
    }
  
    async get(url: string, id: string) {
      const method = 'GET';
  
      if (id) {
        url = `${url}/${id}`;
      }
  
      return this.request(url, method).then((res) => res.json());
    }
  
    async post(url: string, data: IData, Authorization?: string | null) {
      const method = 'POST';
  
      return this.request(url, method, data, Authorization).then((res) =>
        res.json()
      );
    }
  
    async patch(url: string, data: IData, Authorization?: string | null) {
      const method = 'PATCH';
  
      return this.request(url, method, data, Authorization).then((res) => res.json());
    }
  
    async patchById(url: string, Authorization?: string | null) {
      const method = 'PATCH';
  
      return this.request(url, method, null, Authorization).then((res) => res.json());
    }
  
    async delete(url: string, id: string, Authorization: string | null) {
      const method = 'DELETE';
  
      if (id) {
        url = `${url}?id=${id}`;
      }
  
      return this.request(url, method, null, Authorization).then((res) =>
        res.json()
      );
    }
  
    async deleteById(url: string, Authorization: string | null) {
      const method = 'DELETE';
  
      return this.request(url, method, null, Authorization).then((res) =>
        res.json()
      );
    }
  
    async deleteLikePatch(url: string, data: IData, Authorization?: string | null) {
      const method = 'DELETE';
  
      return this.request(url, method, data, Authorization).then((res) => res.json());
    }
  }
  