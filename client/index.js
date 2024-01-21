const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {

    const merkleTree = new MerkleTree(niceList);
    const name = process.argv[2];
    const index = niceList.findIndex((n) => n === name);
    const proof = merkleTree.getProof(index);

    const data = {proof: proof, name: name};

    try {
        const {data: gift} = await axios.post(`${serverUrl}/gift`, data);
        console.log(gift);
    } catch (error) {
        console.log(error.response.data);
    }
}

main();