import axios from "axios";
import {ITests} from "../interfaces/ITests";

export default async function GetTest(userAuthent: any): Promise<ITests[]>{
    let response:ITests[] = [];

    if(userAuthent){
       await axios.get('http://localhost:3001/tests')
            .then(function (response){
               return response.data;
            })
            .catch(function (error){
                console.log(error)
            })
        return response
    }
    else{
        //переделать под запрос на получение тестов для неавторизованных пользователей
        await axios.get('http://localhost:3001/tests')
            .then(function (response){
                return response.data;
            })
            .catch(function (error){
                console.log(error)
            })
        return response
    }
}