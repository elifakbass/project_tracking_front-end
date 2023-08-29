import axios from 'axios';
import { useAuth } from './context/AuthContext';

export const apiLogin = async (username,password) => {

    try {
     let  response = await axios.post('http://localhost:8080/api/login', {
        username,
        password
      });
      const result= response.data;
      localStorage.setItem("role",JSON.stringify(result.role));
      return response.data;

    } catch (error) {

      console.error('Login error:', error);
    }
    

  };

  export const getYonetici= async (username,password) =>{
    try{
      const response= await axios.post('http://localhost:8080/api/yonetici',{
        username,
        password
      });
      return response.data;
    }catch(error){
      console.error("Login error",error);
    }
  }

  export const getPersoneller= async (yonetici_id) =>{
    try{
      const response=await axios.get(`http://localhost:8080/api/personel/${yonetici_id}`);
      return response.data;
    }
    catch(error){
      console.error("Personel error",error);
    }

  }

  export const getProjelerByPersonelId =async (personel_id) =>{
    try{
      const response=await axios.get(`http://localhost:8080/api/proje/${personel_id}`);
      return response.data;
    }catch(error){
      console.error("Proje Error",error);
    }
  }

  export const getGorevlerByProjeId= async (proje_id) =>{
    try{
      const response=await axios.get(`http://localhost:8080/api/gorevler/${proje_id}`);
      return response.data;
    }catch(error){
      console.error("gorev Error ",error);
    }
  }

  export const saveProje = async (request) =>{
    try{
      const response=await axios.post('http://localhost:8080/api/proje',request);
      return response.data;
    }
    catch(error){
      console.error("proje kaydetme error",error);
    }
  }

  export const deleteProje = async (proje_id) =>{
    try{
      const response=await axios.delete(`http://localhost:8080/api/proje/${proje_id}`);
      return response.data;
    }
    catch(error){
      console.error("proje silme error",error);
    }

  }

  export const updateProje = async (proje_id,request) =>{
    try{
      const response=await axios.put(`http://localhost:8080/api/proje/${proje_id}`,request);
      return response.data;
    }
    catch(error){
      console.error("proje güncelleme error",error);
    }

  }

  export const saveGorev = async (request) =>{
    try{
      const response=await axios.post('http://localhost:8080/api/gorev',request);
      return response.data;
    }
    catch(error){
      console.error("gorev kaydetme error",error);
    }
  }

  export const deleteGorev = async (gorev_id) =>{
    try{
      const response=await axios.delete(`http://localhost:8080/api/gorev/${gorev_id}`);
      return response.data;
    }
    catch(error){
      console.error("gorev silme error",error);
    }

  }

  export const updateGorev = async (gorev_id,request) =>{
    try{
      const response=await axios.put(`http://localhost:8080/api/gorev/${gorev_id}`,request);
      return response.data;
    }
    catch(error){
      console.error("proje güncelleme error",error);
    }

  }

  export const findProjelerByPersonelId = async (personel_id) =>{

    try{
      const response=await axios.get(`http://localhost:8080/api/proje/${personel_id}`);
      return response.data;
    }catch(error){
      console.error("get projeler error ",error);
    }

  }

  export const findPersonel = async (username,password) =>{
    try{
      const response=await axios.post('http://localhost:8080/api/personel',{
        username,
        password
      });
      return response.data;
    }catch(error){
      console.error("Personel error ",error);
    }

  }

  export const findGorevlerByPersonelId = async (personel_id) =>{

    try{
      const response=await axios.get(`http://localhost:8080/api/gorev/${personel_id}`);
      return response.data;
    }catch(error){
      console.error("get projeler error ",error);
    }

  }

  export const updateDurumproje = async (proje_id,durum) =>{
    try{
      const response=await axios.post(`http://localhost:8080/api/durum/proje/${proje_id}`,durum)
      return response.data;
    }catch(error){
      console.error("Personel error ",error);
    }

  }

  export const updateDurumGorev = async (gorev_id,durum) =>{
    try{
      const response=await axios.post(`http://localhost:8080/api/durum/gorev/${gorev_id}`,durum)
      return response.data;
    }catch(error){
      console.error("Personel error ",error);
    }

  }
  export const getProjectById = async (proje_id) =>{
    try{
      const response=await axios.get(`http://localhost:8080/api/project/${proje_id}`);
      return response.data;
    }catch(error){
      console.error("Personel error ",error);
    }

  }
  export const getYorumlarByProjeId = async (proje_id) =>{
    try{
      const response=await axios.get(`http://localhost:8080/api/yorumlar/${proje_id}`);
      return response.data;
    }catch(error){
      console.error("Personel error ",error);
    }

  }

  export const saveYorum = async (request) =>{
    try{
      const response=await axios.post('http://localhost:8080/api/yorum',request)
      return response.data;
    }catch(error){
      console.error("Personel error ",error);
    }

  }

  export const monthlyProjects= async (request) =>{
    try{
      const response=await axios.post('http://localhost:8080/api/monthly-data',request)
      return response.data;
    }catch(error){
      console.error("Personel error ",error);
    }

  }

  export const savePersonel= async (request) =>{
    try{
      const response=await axios.post('http://localhost:8080/api/personel/add',request)
      return response.data;
    }catch(error){
      console.error("Personel error ",error);
    }

  }

  export const deletePersonel = async (personel_id) =>{
    try{
      const response=await axios.delete(`http://localhost:8080/api/personel/${personel_id}`);
      return response.data;
    }
    catch(error){
      console.error("gorev silme error",error);
    }

  }

  export const updatePersonel = async (personel_id,request) =>{
    try{
      const response=await axios.put(`http://localhost:8080/api/personel/${personel_id}`,request);
      return response.data;
    }
    catch(error){
      console.error("gorev silme error",error);
    }

  }

  export const getAdmin = async (username,password) =>{
    try{
      const response=await axios.post('http://localhost:8080/api/admin',{
        username,
        password
      });
      return response.data;
    }
    catch(error){
      console.error("get admin error",error);
    }

  }

  export const getYoneticilerByAdminId = async (admin_id) =>{
    try{
      const response=await axios.get(`http://localhost:8080/api/yonetici/${admin_id}`);
      return response.data;
    }
    catch(error){
      console.error("get admin error",error);
    }

  }

  export const saveYonetici = async (request) =>{
    try{
      const response=await axios.post('http://localhost:8080/api/yonetici/add',request);
      return response.data;
    }
    catch(error){
      console.error("get admin error",error);
    }

  }

  export const deletYonetici = async (id) =>{
    try{
      const response=await axios.delete(`http://localhost:8080/api/yonetici/${id}`);
      return response.data;
    }
    catch(error){
      console.error("get admin error",error);
    }

  }

  export const updateYonetici = async (id,request) =>{
    try{
      const response=await axios.put(`http://localhost:8080/api/yonetici/${id}`,request);
      return response.data;
    }
    catch(error){
      console.error("get admin error",error);
    }

  }

  export const logs = async () =>{
    try{
      const response=await axios.get('http://localhost:8080/api/logs');
      return response.data;
    }
    catch(error){
      console.error("get admin error",error);
    }

  }

  export const findUser = async () =>{
    try{
      const response=await axios.get('http://localhost:8080/api/kullanicilar');
      return response.data;
    }
    catch(error){
      console.error("get admin error",error);
    }


  }
