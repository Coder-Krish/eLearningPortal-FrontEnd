import { Injectable, OnInit} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, ObservableLike } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenStorageService } from './token-storage.service';
import { analyzeAndValidateNgModules, identifierModuleUrl } from '@angular/compiler';
import { env } from 'process';



//const API_URL = 'http://localhost:8080/api/admin/';

// const httpOptions = {
//   headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data;boundary="file"'})
// };

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {

  currentUser:any;
  msg:any;

  constructor(private http:HttpClient,private token: TokenStorageService) { }

  ngOnInit():void{
    this.currentUser=this.token.getUser();
  }




  getPublicContent(): Observable<any> {
    return this.http.get(environment.apiUrls + 'test/all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(environment.apiUrls + 'test/admin', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(environment.apiUrls + 'test/mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(environment.apiUrls + 'admin/getAllUsers', { responseType: 'json' });
  }

  
  getAllUsersCount(): Observable<any> {
    return this.http.get(environment.apiUrls + 'admin/countAllTheUsers', { responseType: 'text' });
  }

  countAllTheActiveUsers():Observable<any>{
    return this.http.get(environment.apiUrls + 'admin/countAllTheActiveUsers', {responseType: 'text'});
  }

  countAllTheInActiveUsers():Observable<any>{
    return this.http.get(environment.apiUrls + 'admin/countAllTheInActiveUsers', {responseType: 'text'});
  }

  countAllThePosts():Observable<any>{
    return this.http.get(environment.apiUrls + 'admin/countAllThePosts', {responseType: 'text'});
  }

  
  countAllTheActivePosts():Observable<any>{
    return this.http.get(environment.apiUrls + 'admin/countAllTheActivePosts', {responseType: 'text'});
  }
  
  countAllTheInActivePosts():Observable<any>{
    return this.http.get(environment.apiUrls + 'admin/countAllTheInActivePosts', {responseType: 'text'});
  }

  countAllTheDiscussion():Observable<any>{
    return this.http.get(environment.apiUrls + 'admin/countAllTheDiscussion', {responseType: 'text'});
  }

  countAllTheActiveDiscussion():Observable<any>{
    return this.http.get(environment.apiUrls + 'admin/countAllTheActiveDiscussion', {responseType: 'text'});
  }

  countAllTheInActiveDiscussion():Observable<any>{

    return this.http.get(environment.apiUrls + 'admin/countAllTheInActiveDiscussion', {responseType: 'text'});
  }

  // getProfilePicture():Observable<any>{
  //   return this.http.get(environment.apiUrls + 'profilePicture/loadProfilePicture/', {responseType: 'text'});
  // }

  deleteUserbyId(id):Observable<any>{

  return this.http.put(environment.apiUrls + 'admin/deleteUserbyId/' + id, {responseType: 'text'});
}

  getActiveUsers():Observable<any>{

    return this.http.get(environment.apiUrls + 'admin/getOnlyActiveUsers', {responseType: 'json'});
  }

  getInActiveUsers():Observable<any>{

    return this.http.get(environment.apiUrls + 'admin/getOnlyInActiveUsers', {responseType: 'json'});
  }

  getAllPosts():Observable<any>{
    return this.http.get(environment.apiUrls + 'admin/listAllThePosts', {responseType: 'json'});
  }

  getAllActivePosts():Observable<any>{
    return this.http.get(environment.apiUrls + 'admin/listAllTheActivePosts', {responseType: 'json'});
  }
  getAllInActivePosts():Observable<any>{
    return this.http.get(environment.apiUrls + 'admin/getTheDeletedPosts', {responseType: 'json'});
  }

  deletePosts(id):Observable<any>{
    return this.http.put(environment.apiUrls + 'admin/deletePostById/' + id, {responseType: "text"});
  }

  getProfilePictureDir(id):Observable<any>{
    
    return this.http.get(environment.apiUrls + 'profilePicture/loadProfilePicture/' + id,{responseType: "json"});
  }

  loadProfilePicture(link):Observable<any>{
    return this.http.get(link, {responseType: 'blob'});
  }

  getAllNotes():Observable<any>{
    return this.http.get(environment.apiUrls + 'notes/listnotes', {responseType: 'json'});
  }

  getAllPrograms():Observable<any>{
    return this.http.get(environment.apiUrls + 'programs/listprograms', {responseType: 'json'});
  }

  getAllSubjects():Observable<any>{
    return this.http.get(environment.apiUrls + 'subjects/listsubjects', {responseType: 'json'});

  }

  getSubjectsAccordingly(program,semester):Observable<any>{

  return this.http.get(environment.apiUrls + 'subjects/listSubjectByProgramAndSemester/' + program + "/" + semester, {responseType: 'json'});

}

  addNotes(subjectId:Number,file:FormData){
    
    return this.http.post(environment.apiUrls + 'notes/addnotes/' + subjectId, file, {
      reportProgress: true,
      observe: 'events'
    });
  }

  deleteNote(id):Observable<any>{
    return this.http.put(environment.apiUrls + 'notes/deletenotes/' + id, {responseType: 'json'});
  }

  getNoteById(id):Observable<any>{
    return this.http.get(environment.apiUrls + 'notes/listnotesbyid/' + id, {responseType: 'json'});
  }
  getNoteFile(noteUploadDir):Observable<any>{
    return this.http.get(noteUploadDir,{responseType: 'blob'} );
  }

  getAllDiscussions():Observable<any>{
    return this.http.get(environment.apiUrls + 'admin/listAllTheForums', {responseType: 'json'});
  }
  getActiveDiscussions():Observable<any>{
    return this.http.get(environment.apiUrls + 'admin/listActiveDiscussions', {responseType:'json'});
  }
  getInActiveDiscussions():Observable<any>{
    return this.http.get(environment.apiUrls + 'admin/listInActiveDiscussions', {responseType:'json'});
  }

  getDiscussionById(id):Observable<any>{
  return this.http.get(environment.apiUrls + 'discussionforum/listdiscussionbyid/' + id, {responseType:'json'});
  }
  getRepliesByDiscussionId(id):Observable<any>{
    return this.http.get(environment.apiUrls + 'reply/listrepliesbydiscussionid/' + id, {responseType:'json'});
  }

  deleteDiscussion(id):Observable<any>{
    return this.http.put(environment.apiUrls + 'admin/deleteDiscussionById/' + id, {responseType:'json'});
  }

  deleteReply(id):Observable<any>{
    return this.http.put(environment.apiUrls + 'admin/deleteRepliesById/' + id, {responseType:'json'});
  }

  getPostById(id):Observable<any>{
    return this.http.get(environment.apiUrls + 'posts/listpostsbyid/' + id, {responseType: 'json'});
  }

  getFile(uploadDir):Observable<any>{
return this.http.get(uploadDir, {responseType: 'blob'});
  }

  getUserById(id):Observable<any>{
    return this.http.get(environment.apiUrls + 'admin/list/users/' + id, {responseType: 'json'});
  }

  getFollowerCount(id):Observable<any>{
    return this.http.get(environment.apiUrls + 'follow/countfollower/' + id, {responseType:'json'});
  }

  getFollowingCount(id):Observable<any>{
    return this.http.get(environment.apiUrls + 'follow/countfollowing/' + id, {responseType:'json'});
  }

  getPostsCount(id):Observable<any>{
    return this.http.get(environment.apiUrls + 'posts/countposts/' + id, {responseType:'json'});
  }
  getDiscussionsCount(id):Observable<any>{
    return this.http.get(environment.apiUrls + 'discussionforum/countDiscussion/' + id, {responseType:'json'});
  }

  getPostsByUserId(id):Observable<any>{
    return this.http.get(environment.apiUrls + 'posts/listpostsbyuserid/' + id, {responseType: 'json'});
  }

  getdiscussionById(id):Observable<any>{
    return this.http.get(environment.apiUrls + 'discussionforum/listdiscussionbyuserid/' + id, {responseType: 'json'});
  }

  getCommentsByPostId(id):Observable<any>{
    return this.http.get(environment.apiUrls + 'comments/listcommentsbypostid/' + id, {responseType: 'json'});
  }

  deleteComments(id):Observable<any>{
    return this.http.put(environment.apiUrls + 'admin/deletePostCommentById/' + id, {responseType:'json'});
  }

  addPrograms(program):Observable<any>{
    return this.http.post(environment.apiUrls + 'programs/addprograms', {programName:program});

  }
  addSubject(programId,subjectDetail):Observable<any>{
    return this.http.post(environment.apiUrls + 'subjects/addsubjects/'+ programId, {subjectsName:subjectDetail.subjectName, semester:subjectDetail.semester});
  }

  deleteProgram(id):Observable<any>{
    return this.http.put(environment.apiUrls + 'programs/deleteprograms/' + id, {responseType:'json'});
  }
  updateProgram(programId,ProgramName):Observable<any>{
    return this.http.put(environment.apiUrls + 'programs/updateprograms/' + programId, {programName: ProgramName}, {responseType:'json'});
  }

  getProgramById(programId):Observable<any>{
    return this.http.get(environment.apiUrls + 'programs/getProgramById/' + programId, {responseType:'json'});

  }

  deletesubject(subjectId):Observable<any>{
    return this.http.put(environment.apiUrls + 'subjects/deletesubjects/' + subjectId, {responseType:'json'});

  }

  getSubjectById(subjectId):Observable<any>{
    return this.http.get(environment.apiUrls + 'subjects/getSubjectById/'+ subjectId, {responseType:'json'});

  }

  updateSubject(subjectId,semester,subjectsName):Observable<any>{
    return this.http.put(environment.apiUrls + 'subjects/updatesubjects/' + subjectId, {semester:semester, subjectsName:subjectsName}, {responseType:'json'});
  }

  findProgramsFromPublicArea():Observable<any>{
    return this.http.get(environment.apiUrls + 'test/listprograms', {responseType:'json'});
  }

  updateUser(id,userfullname,userInstitution,userPhone,userAddress,userGender):Observable<any>{
    return this.http.put(environment.apiUrls + 'admin/updateUser/' + id, {fullname:userfullname,institution:userInstitution,phone:userPhone,address:userAddress,gender:userGender}, {responseType:'json'});
  }

 


}
