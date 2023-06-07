import { collection, doc, setDoc,getDocs,getDocFromCache,addDoc,deleteDoc } from "firebase/firestore";
import app,{ firestore,auth }  from '@/utils/firebase/Firebase';
import { UserType }  from "./users.model";

const usersCollection = collection(firestore, "users");


export const getAllUser = async () =>
{
    const data = await getDocs(usersCollection);

    return serializeDataUser(data);
}

export const serializeDataUser = (data:any) : UserType[] => {

    const new_data: UserType[] = [];

    data.forEach((elm:any) => {
        let row:any = elm.data();
        let key = elm.id;
        new_data.push({
          key: key,
          first_name: row.first_name,
          last_name: row.last_name,
          email: row.email,
          company: row.company
        });
    });

    return new_data;
}

export const deleteUser = async (uid:string) => {
    const doc_selected = doc(firestore, "users", uid);
    return await deleteDoc(doc_selected);
}

export const createUser = async (params:UserType) => {
    return await addDoc(usersCollection,params);
}

export const updateUser = async (uid:string|undefined,params:UserType) => {
    if(!uid){
        return;
    }
    const doc_selected = doc(firestore, "users", uid);
    return await setDoc(doc_selected,params);
}