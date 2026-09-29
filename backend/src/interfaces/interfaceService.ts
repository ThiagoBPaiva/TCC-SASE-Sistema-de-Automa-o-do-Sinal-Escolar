import { RowDataPacket } from "mysql2"

export interface returnFunction {
    code: number
    message?: string
    token?: string
    error?: string
    group?: RowDataPacket[]
}
