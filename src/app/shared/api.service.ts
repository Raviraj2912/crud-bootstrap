import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import{HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  adduser(data : any): Observable<any>{
    return this.http.post("http://localhost:3000/posts", data);
   }
     
     getuser(): Observable<any>{
     return this.http.get("http://localhost:3000/posts"); 
      }
    
     updateuser(id : number,data : any): Observable<any>{
     return this.http.put("http://localhost:3000/posts/"+id, data);
     
    }
     
      deleteuser(id : number): Observable<any>{
     return this.http.delete(`http://localhost:3000/posts/${id}`);
      }
}
