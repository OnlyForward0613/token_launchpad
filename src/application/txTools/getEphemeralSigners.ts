import useWallet from '@/application/wallet/useWallet'

export async function getEphemeralSigners() {
  const { adapter } = useWallet.getState()
  return adapter &&
    'standard' in adapter &&
    'fuse:getEphemeralSigners' in adapter.wallet.features &&
    // @ts-ignore
    adapter.wallet.features['fuse:getEphemeralSigners'].getEphemeralSigners
}