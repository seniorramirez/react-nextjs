import { UserType } from "@/api/users/users.model";

export interface ModalNewUserProps {
    open: boolean,
    onOk?: any,
    onCancel: any,
    record?: UserType
}