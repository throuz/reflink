'use client'

import { getReflinkProgram, getReflinkProgramId } from '@project/anchor'
import { useConnection } from '@solana/wallet-adapter-react'
import { Cluster, Keypair, PublicKey } from '@solana/web3.js'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import toast from 'react-hot-toast'
import { useCluster } from '../cluster/cluster-data-access'
import { useAnchorProvider } from '../solana/solana-provider'
import { useTransactionToast } from '../ui/ui-layout'

export function useReflinkProgram() {
  const { connection } = useConnection()
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const provider = useAnchorProvider()
  const programId = useMemo(() => getReflinkProgramId(cluster.network as Cluster), [cluster])
  const program = useMemo(() => getReflinkProgram(provider, programId), [provider, programId])

  const accounts = useQuery({
    queryKey: ['reflink', 'all', { cluster }],
    queryFn: () => program.account.reflink.all(),
  })

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  })

  const initialize = useMutation({
    mutationKey: ['reflink', 'initialize', { cluster }],
    mutationFn: (keypair: Keypair) =>
      program.methods.initialize().accounts({ reflink: keypair.publicKey }).signers([keypair]).rpc(),
    onSuccess: (signature) => {
      transactionToast(signature)
      return accounts.refetch()
    },
    onError: () => toast.error('Failed to initialize account'),
  })

  return {
    program,
    programId,
    accounts,
    getProgramAccount,
    initialize,
  }
}

export function useReflinkProgramAccount({ account }: { account: PublicKey }) {
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const { program, accounts } = useReflinkProgram()

  const accountQuery = useQuery({
    queryKey: ['reflink', 'fetch', { cluster, account }],
    queryFn: () => program.account.reflink.fetch(account),
  })

  const closeMutation = useMutation({
    mutationKey: ['reflink', 'close', { cluster, account }],
    mutationFn: () => program.methods.close().accounts({ reflink: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accounts.refetch()
    },
  })

  const decrementMutation = useMutation({
    mutationKey: ['reflink', 'decrement', { cluster, account }],
    mutationFn: () => program.methods.decrement().accounts({ reflink: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const incrementMutation = useMutation({
    mutationKey: ['reflink', 'increment', { cluster, account }],
    mutationFn: () => program.methods.increment().accounts({ reflink: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const setMutation = useMutation({
    mutationKey: ['reflink', 'set', { cluster, account }],
    mutationFn: (value: number) => program.methods.set(value).accounts({ reflink: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  return {
    accountQuery,
    closeMutation,
    decrementMutation,
    incrementMutation,
    setMutation,
  }
}
