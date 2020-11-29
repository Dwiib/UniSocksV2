import { useActiveWeb3React } from './index'
import { providers } from "ethers"
export default async function useMessageSigner(message: string): Promise<string> {
    console.log(useActiveWeb3React());
    const provider = new providers.Web3Provider(useActiveWeb3React().library.provider);
    const signer = provider.getSigner();
    const msg = await signer.signMessage(message);
    return msg;
}