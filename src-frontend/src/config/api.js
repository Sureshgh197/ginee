import axios from 'axios';
import { fabric } from 'fabric';

export const homepage = {
    pixabay : 'https://pixabay.com/api/?per_page=30&safesearch=true&key=',    
    pixabaykey : '28701053-77bb3ba75e209ee18ae00ab97',
    pexels : 'https://api.pexels.com/v1/curated?per_page=30',
    pexelsearch:"https://api.pexels.com/v1/search?per_page=30&query=",
    pexelskey : '563492ad6f9170000100000116be1b142b274dfe8b03e28dc493ded0',
    unsplash : 'https://api.unsplash.com/photos?per_page=30',
    unsplashsearch : 'https://api.unsplash.com/search/?per_page=30&query=',
    unsplashkey:'KvCq-3r3Y3CfGvdq27kxCLlosp20z0ojLvNDESx1_zw'

}

export const login = 'register/';