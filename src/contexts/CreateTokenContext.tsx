import web3 from '@solana/web3.js';
import { createMint } from '@solana/spl-token';

const connection = new web3.Connection(web3.clusterApiUrl('devnet'), 'confirmed');
export function mintNewToken() {

}

// const token = await createMint(
//   connection,
//   wallet,

// )