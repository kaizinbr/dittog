import { resolve } from 'path';
import { readFileSync } from 'fs';

const c = console

async function getBannerData() {
    const file = resolve(process.cwd(), 'public', 'resources', 'json', 'index-banner-infos.json');
  
    const content = JSON.parse(readFileSync(file));

    return content;
};

export default { getBannerData }