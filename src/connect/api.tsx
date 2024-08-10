
import BaseUrl from './Config';
import secureLocalStorage from 'react-secure-storage';

export function apiCall(){
    const access_token = secureLocalStorage.getItem("app_access_token");
    function call_api(url: any, options: any = {}) {
        document.body.classList.add('loader-active');
        return new Promise((resolve, reject) => {
            fetch(BaseUrl.api_url + url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(options)
            }).then(result => {
                result.json().then((res) => {
                    document.body.classList.remove('loader-active');
                    resolve(res);
                }).catch((error) => {
                    document.body.classList.remove('loader-active');
                    reject(error);
                })
            });
        });
    }
    function call_get_api(url: any) {
        document.body.classList.add('loader-active');
        return new Promise((resolve, reject) => {
            fetch(BaseUrl.api_url + url, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            }).then(result => {
                result.json().then((res) => {
                    document.body.classList.remove('loader-active');
                    resolve(res);
                }).catch((error) => {
                    document.body.classList.remove('loader-active');
                    reject(error);
                })
            });
        });
    }
    function call_secure_api(url: any, options: any = {}) {
        document.body.classList.add('loader-active');
        return new Promise((resolve, reject) => {
            fetch(BaseUrl.api_url + url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': 'Bearer ' + access_token },
                body: JSON.stringify(options)
            }).then(result => {
                result.json().then((res) => {
                    document.body.classList.remove('loader-active');
                    resolve(res);
                }).catch((error) => {
                    document.body.classList.remove('loader-active');
                    reject(error);
                })
            });
        });
    }
    function call_secure_get_api(url: any) {
       
        document.body.classList.add('loader-active');
        return new Promise((resolve, reject) => {
            fetch(BaseUrl.api_url + url, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': 'Bearer ' + access_token }
            }).then(result => {
                result.json().then((res: any) => {
                    document.body.classList.remove('loader-active');
                    resolve(res);
                }).catch((error: any) => {
                    document.body.classList.remove('loader-active');
                    console.log(`HTTP Response Code: ${error?.status}`)
                    reject(error);
                })
            });
        });
}

return{
    call_api, call_secure_api, BaseUrl, call_secure_get_api, call_get_api
}
} 
