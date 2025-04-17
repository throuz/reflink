import * as anchor from '@coral-xyz/anchor'
import { Program } from '@coral-xyz/anchor'
import { Keypair } from '@solana/web3.js'
import { Reflink } from '../target/types/reflink'

describe('reflink', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const payer = provider.wallet as anchor.Wallet

  const program = anchor.workspace.Reflink as Program<Reflink>

  const reflinkKeypair = Keypair.generate()

  it('Initialize Reflink', async () => {
    await program.methods
      .initialize()
      .accounts({
        reflink: reflinkKeypair.publicKey,
        payer: payer.publicKey,
      })
      .signers([reflinkKeypair])
      .rpc()

    const currentCount = await program.account.reflink.fetch(reflinkKeypair.publicKey)

    expect(currentCount.count).toEqual(0)
  })

  it('Increment Reflink', async () => {
    await program.methods.increment().accounts({ reflink: reflinkKeypair.publicKey }).rpc()

    const currentCount = await program.account.reflink.fetch(reflinkKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Increment Reflink Again', async () => {
    await program.methods.increment().accounts({ reflink: reflinkKeypair.publicKey }).rpc()

    const currentCount = await program.account.reflink.fetch(reflinkKeypair.publicKey)

    expect(currentCount.count).toEqual(2)
  })

  it('Decrement Reflink', async () => {
    await program.methods.decrement().accounts({ reflink: reflinkKeypair.publicKey }).rpc()

    const currentCount = await program.account.reflink.fetch(reflinkKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Set reflink value', async () => {
    await program.methods.set(42).accounts({ reflink: reflinkKeypair.publicKey }).rpc()

    const currentCount = await program.account.reflink.fetch(reflinkKeypair.publicKey)

    expect(currentCount.count).toEqual(42)
  })

  it('Set close the reflink account', async () => {
    await program.methods
      .close()
      .accounts({
        payer: payer.publicKey,
        reflink: reflinkKeypair.publicKey,
      })
      .rpc()

    // The account should no longer exist, returning null.
    const userAccount = await program.account.reflink.fetchNullable(reflinkKeypair.publicKey)
    expect(userAccount).toBeNull()
  })
})
