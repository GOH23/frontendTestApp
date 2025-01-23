import { AnimatePresence } from "framer-motion"
import { Worker_Type } from "./TableComponent"
import { motion } from "framer-motion"
import { CloseOutlined } from "@ant-design/icons"
import {Image} from "antd"
export type ModalProps = {
    open?: boolean
    OnClose?: () => void,
    Data?: Worker_Type[]
}
export function TestModal({ data }: { data: ModalProps }) {
    return (<AnimatePresence>
        {data.open && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed backdrop-blur-md bg-slate-500/50 z-50 top-0 size-full">
            <AnimatePresence mode="wait">
                {data.open &&
                    <motion.div initial={{ y: 100, opacity: 1 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -100, opacity: 0 }} transition={{ duration: 2 }} className="flex justify-center items-end size-full">
                        <div className="max-w-[500px] w-full relative  rounded-t-xl h-1/2 bg-white shadow-md border border-gray-500">
                            <div className="absolute top-0 right-0 m-3 text-black text-lg cursor-pointer" onClick={() => { if (data.OnClose) data.OnClose() }}>
                                <CloseOutlined />
                            </div>
                            {!data.Data ? <div>

                            </div> :
                                <div className="flex flex-col overflow-y-scroll h-full gap-y-1 mt-10 m-1">
                                    {data.Data?.map((el, key) => <ModalCard key={key} data={el} />)}
                                </div>
                            }

                        </div>
                    </motion.div>
                }
            </AnimatePresence>
        </motion.div >}
    </AnimatePresence>)
}
export function ModalCard({ data }: { data: Worker_Type }) {
    return (<div className="flex flex-col border border-gray-500/50 rounded-md shadow-md p-2 min-h-[200px] items-center justify-center">
        <img src={data.image} className="min-h-[100px]"/>
        <p>{data.name}</p>
        <p className="text-center">Рабочий телефон: <a className="underline text-blue-500" href={`tel:${data.phone}`} >{data.phone}</a></p>
    </div>)
}