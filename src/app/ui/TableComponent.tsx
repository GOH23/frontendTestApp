"use client"
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useCallback, useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { TestModal } from "./TestModal"
import {LeftOutlined,RightOutlined} from '@ant-design/icons'
export type TreeViewWorkers = {
    workerListId: string
    workerListName: string
    children?: TreeViewWorkers[]
    parent: TreeViewWorkers
    workers?: Worker_Type[]
}
export type Worker_Type = {
    id: string
    image: string
    name: string
    phone: string
}
export function TableComponent({ data }: { data: TreeViewWorkers[] }) {
    const [OnTreeViewOpened, SetOnTreeViewOpen] = useState<TreeViewWorkers[][]>()
    const [WorkerData, SetWorkerData] = useState<Worker_Type[]>()
    const [ModalOpened, SetModalOpened] = useState(false)
    const OnHandleTreeView = useCallback((state?: TreeViewWorkers[]) => {
        SetOnTreeViewOpen((prev) => {
            if (prev?.find((el) => el == state) || !state || state.length == 0) return prev
            return prev ? [...prev, state] : [state]
        });
    }, [])
    const OnHandleDeleteTreeView = useCallback((state?: TreeViewWorkers[]) => {
        SetOnTreeViewOpen((prev) => {
            if (!state || state.length == 0) return prev
            return prev ? prev.filter((el) => el == state) : undefined
        });
    }, [])
    const OpenModal = (data?: Worker_Type[]) => {

        SetWorkerData(data);
        SetModalOpened(true);

    }
    return (<div>
        <TestModal data={{
            Data: WorkerData,
            open: ModalOpened,
            OnClose() {
                SetModalOpened(false);
                SetWorkerData(undefined);
            },
        }} />
        {data.map((el, ind) => <TableSubComponent ModalState={{
            OpenModal: OpenModal,
            OpenState: ModalOpened
        }} SetOnTreeViewOpen={OnHandleTreeView} key={ind} data={el} />)}
        <div className="flex flex-col">
            <AnimatePresence>
                {OnTreeViewOpened?.map((el, ind) => <TableBlockComponent ModalState={{
                    OpenModal: OpenModal,
                    OpenState: ModalOpened
                }} key={ind} data={el} SetOnTreeViewOpen={OnHandleTreeView} OnHandleDeleteTreeView={OnHandleDeleteTreeView} />)}
            </AnimatePresence>
        </div>
    </div>)
}
export function TableBlockComponent({
    data,
    SetOnTreeViewOpen,
    OnHandleDeleteTreeView,
    ModalState
}: {
    data: TreeViewWorkers[],
    SetOnTreeViewOpen: (data?: TreeViewWorkers[]) => void,
    OnHandleDeleteTreeView: (data?: TreeViewWorkers[]) => void,
    ModalState: {
        OpenModal: (data?: Worker_Type[]) => void,
        OpenState: boolean
    }
}) {
    const [onMouseEntered, SetMouseEntered] = useState(true)
    const timerRef = useRef<NodeJS.Timeout>(null);
    const swiperRef = useRef<SwiperRef>(null)
    useEffect(() => {
        if (!onMouseEntered) {
            timerRef.current = setTimeout(() => {
                OnHandleDeleteTreeView(data)
            }, 5000)
        }
    }, [onMouseEntered])
    const HandleMouseLeave = () => {
        SetMouseEntered(false)
    }
    const HandleMouseHandle = () => {
        SetMouseEntered(true);
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
    }
    return (<>
        <div onMouseEnter={() => HandleMouseHandle()} onMouseLeave={() => HandleMouseLeave()} className="flex flex-col mt-1 gap-y-2 items-center">
            <motion.div initial={{ opacity: 0 }} exit={{ opacity: 0, transition: { delay: .75 } }} animate={{ opacity: 1 }} transition={{ delay: .25 }} className="size-5 rounded-full bg-yellow-500"></motion.div>
            <motion.div initial={{ opacity: 0 }} exit={{ opacity: 0, transition: { delay: .50 } }} animate={{ opacity: 1 }} transition={{ delay: .50 }} className="size-5 rounded-full bg-yellow-500"></motion.div>
            <motion.div initial={{ opacity: 0 }} exit={{ opacity: 0, transition: { delay: .25 } }} animate={{ opacity: 1 }} transition={{ delay: .75 }} className="size-5 rounded-full bg-yellow-500"></motion.div>
        </div>
        <div className="flex justify-end gap-x-1">
            <div className="size-10 flex justify-center cursor-pointer border hover:bg-white duration-700 hover:border-yellow-500 border-transparent rounded-md bg-yellow-500" onClick={() => swiperRef.current?.swiper.slidePrev()}>
                <LeftOutlined />
            </div>
            <div className=" size-10 flex justify-center cursor-pointer rounded-md border hover:bg-white  duration-700 hover:border-yellow-500 border-transparent bg-yellow-500" onClick={() => swiperRef.current?.swiper.slideNext()}>
                <RightOutlined />
            </div>
        </div>
        <Swiper ref={swiperRef} breakpoints={{// when window width is >= 320px
            320: {
                slidesPerView: 1
            },
            // when window width is >= 480px
            480: {
                slidesPerView: 2
            },
            // when window width is >= 640px
            660: {
                slidesPerView: 3
            }
        }} onMouseEnter={() => HandleMouseHandle()} onMouseLeave={() => HandleMouseLeave()} className="flex justify-center mt-3 w-full">
            {data.map((sub_elem, inde) => <SwiperSlide key={inde}>
                <TableSubComponent ModalState={ModalState} data={sub_elem} SetOnTreeViewOpen={SetOnTreeViewOpen} />
            </SwiperSlide>)}
        </Swiper >
    </>)
}
export function TableSubComponent({ data, SetOnTreeViewOpen, ModalState }: {
    data: TreeViewWorkers,
    SetOnTreeViewOpen: (data?: TreeViewWorkers[]) => void,
    ModalState: {
        OpenModal: (data?: Worker_Type[]) => void,
        OpenState: boolean
    }
}) {

    return (
        <div onClick={() => ModalState.OpenModal(data.workers)} className="flex mx-auto justify-center min-w-[190px]">
            <div onMouseEnter={() => SetOnTreeViewOpen(data.children)} className="p-3 bg-yellow-500 min-w-[200px] text-center rounded-md duration-700 hover:bg-white border-transparent hover:text-black hover:border-yellow-500 border text-white font-bold cursor-pointer">
                <p>{data.workerListName}</p>
            </div>
        </div>
    )
}
