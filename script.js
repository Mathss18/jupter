import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
    vus: 2000, // number of virtual users
    duration: '1h', // test duration
};

export default function () {
    http.get('https://compretcc.com/'); // the website you want to access
    sleep(1);
}

