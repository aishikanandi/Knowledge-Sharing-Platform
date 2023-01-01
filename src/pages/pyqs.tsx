import { useAuth } from '../contexts/auth'
import { useEffect, useMemo, useState } from 'react'
import Head from 'next/head'
import { BsPlus } from 'react-icons/bs'
import { toast } from 'react-hot-toast'
import { Table } from '../components/PYQs/Table'
import { getPyqs } from '../services/db/pyqs/getPyqs'
import { pyqsColumnData } from '../types/pyqsColumnData'
import { Modal } from '../components/Common/Modal'
import { addPyq } from '../services/db/pyqs/addPyq'
import { updatePyq } from '../services/db/pyqs/updatePyq'

export default function PYQs() {
    //? contexts
    const { user, loading }: any = useAuth()

    //? states
    const [isDataFetching, setIsDataFetching] = useState<boolean>(false)
    const [pyqs, setPYQs] = useState<pyqsColumnData[]>([])
    const [selectedPYQ, setSelectedPYQ] = useState<any>(null)
    const [showAddPYQModal, setShowAddPYQModal] = useState<boolean>(false)
    const [showUpdatePYQModal, setShowUpdatePYQModal] = useState<boolean>(false)

    const refetchPYQs = () => {
        setIsDataFetching(true)
        getPyqs().then((res) => {
            setPYQs(res)
            setIsDataFetching(false)
        })
    }

    //? effects
    useEffect(() => {
        setIsDataFetching(true)
        getPyqs().then((res) => {
            console.log(res)
            setPYQs(res)
            setIsDataFetching(false)
        })
    }, [])

    useEffect(() => {
        if (selectedPYQ) setShowUpdatePYQModal(true)
        else setShowUpdatePYQModal(false)
    }, [selectedPYQ])

    return (
        <div className={`w-full bg-white flex flex-col`}>
            {user && (
                <Modal
                    header="Add New PYQ"
                    actionButtonText="Add PYQ"
                    actionFunction={addPyq}
                    refetch={refetchPYQs}
                    showModal={showAddPYQModal}
                    setShowModal={setShowAddPYQModal}
                />
            )}
            {selectedPYQ && (
                <Modal
                    header="Add New PYQ"
                    actionButtonText="Add PYQ"
                    actionFunction={updatePyq}
                    refetch={refetchPYQs}
                    showModal={showAddPYQModal}
                    setShowModal={setShowAddPYQModal}
                />
            )}
            <Head>
                <title>PYQs</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link
                    rel="icon"
                    href="/favicon.ico"
                />
            </Head>
            <div className="grid grid-cols-5 gap-0 justify-center py-48 px-5 md:px-14 space-y-8 min-h-screen">
                <div className="col-span-5 flex flex-row items-center justify-between">
                    <h3 className="font-bold text-xl md:text-3xl">PYQs</h3>
                    <button
                        disabled={loading}
                        onClick={() => {
                            if (user) setShowAddPYQModal(true)
                            else
                                toast('Please login to add new PYQ', {
                                    icon: 'ℹ️',
                                })
                        }}
                        type="button"
                        className="flex items-center space-x-2 px-2 py-1 duration-200 transition-all rounded-md shadow-md hover:shadow-xl bg-primary text-white font-semibold disabled:bg-primary/70 disabled:cursor-wait"
                    >
                        <BsPlus className="h-8 w-8" />
                        <span className="">Add PYQ</span>
                    </button>
                </div>
                <div className="col-span-5 flex w-full h-fit overflow-x-auto">
                    <Table
                        pyqs={pyqs}
                        setSelectedPYQ={setSelectedPYQ}
                        refetchPYQs={refetchPYQs}
                        isDataFetching={isDataFetching}
                    />
                </div>
            </div>
        </div>
    )
}
