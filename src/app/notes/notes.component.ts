import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../_services/user.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Form } from '@angular/forms';
import { HttpEvent, HttpEventType } from '@angular/common/http';



@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit{

  constructor(private userService:UserService, private snackBar:MatSnackBar) { }

  form:any={};
  isOpenDialog=false;
  isAllNotes=false;
  isSubjectsGot=false;
  uploadFileResult=false;

  isSelectedProgram=false;
  isSelectedSemester=false;
  isSelectedSubject=false;
  isSelectedFile=false;
  successfulUpload=false;
  noteView=false;
  content:any;
  registeredPrograms:any;
  registeredSubjects:any;

  selectedProgram:any;
  selectedSemester:any;
  selectedSubject:any;
  selectedFile:any;
  currentFile:File;

  uploadSuccessfulMessage:any;

  progress = 0;

  noteUploadDir:any;

  retrievedNote:any;

  totalRecords : number;
  page: number = 1;

  searchResult:any;


  popoverTitle:string="Are you sure you want to delete?";
  popoverMessage:string="You can not undo this operation after you confirm to delete.";
  cancelClicked=false;

  ngOnInit(): void {



    this.userService.getAllNotes().subscribe(
      data =>{
        this.isAllNotes=true;
        this.content=data;
        this.totalRecords=this.content.length;

        
       
      },
      err =>{
        console.log(err.error.message);
      }
    );
  }


  openDialog(){

    this.userService.getAllPrograms().subscribe(
      res =>{
        this.registeredPrograms=res;
      },
      err =>{
        console.log(err.error.message);
      }
    ); 
  }

  selectChangeProgramHandler(event:any){

    this.selectedProgram=event.target.value;
    this.isSelectedProgram=true;
  }

  selectChangeSemesterHandler(event:any){

    this.selectedSemester=event.target.value;
    this.userService.getSubjectsAccordingly(this.selectedProgram,this.selectedSemester).subscribe(
      sub =>{
        this.isSubjectsGot=true;
        this.isSelectedSemester=true;
        this.registeredSubjects=sub;
      },
      err =>{
        console.log(err.error.message);
      }
    );
  }

  selectChangeSubjectHandler(event:any){

    this.selectedSubject=event.target.value;
    this.isSelectedSubject=true;

    console.log(this.selectedSubject);
  }

  selectFileHandler(event:any){
    this.selectedFile=event.target.files[0];
    this.isSelectedFile=true;
    console.log(this.selectedFile);
    

  }

  upload(){
   // console.log("i am upload method and i am getting selectedSubject as"+ this.selectedSubject );

    this.currentFile=this.selectedFile
    //this.originalFile=this.selectedFile;
    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadNoteFile:FormData = new FormData();
    uploadNoteFile.append('file',this.selectedFile, this.selectedFile.name);

    this.userService.addNotes(this.selectedSubject,uploadNoteFile).subscribe(
      (res: HttpEvent<any>) =>{
       // console.log("I am inside the caller method");

          switch(res.type){
            case HttpEventType.Sent:
              console.log('Request has been made!');
              break;
            case HttpEventType.ResponseHeader:
              console.log('Response header has been received!');
              break;
            case HttpEventType.UploadProgress:
              this.progress = Math.round(res.loaded / res.total * 100);
              console.log(`Uploaded! ${this.progress}%`);
              break;
            case HttpEventType.Response:
              console.log('Note Added Successfully!', res.body);
              //this.uploadSuccessfulMessage=res.body;
              if(this.progress ==100){
              this.snackBar.open(res.body.message,'Dismiss',{
                duration: 4000,
                verticalPosition: 'top',
                horizontalPosition: 'right',
                panelClass:['success-snackBar'],
       
              });
              //window.location.reload();
              //document.getElementById('add-new-note').style.display="none";
              this.successfulUpload=true;
            }
             
              default:
              console.log(res.type);
          }

          this.userService.getAllNotes().subscribe(
            res =>{
              this.isAllNotes=true;
              this.content=res;
              this.totalRecords=this.content.length;

            },
            err =>{
              console.log(err);
            }
          )
      },
      err =>{
        this.progress = 0;
      this.uploadSuccessfulMessage = 'Could not upload the file!';
      
        console.log(err.error.message);
      }
    );
   
  
  }


  closeDialog(){
    window.location.reload();
  }

  deleteNotes(id){
    this.userService.deleteNote(id).subscribe(
      res =>{
        this.snackBar.open(res.message,'Dismiss',{
       
          duration: 4000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass:['red-snackBar'],
        });
        this.userService.getAllNotes().subscribe(
          res =>{
            this.content=res;
          },
          err =>{
            console.log(err.error.message);
          }
        )
         
        },
        err =>{
          console.log(err.error.message);
        }
      
    );
  }

  viewNotes(id){
    this.userService.getNoteById(id).subscribe(
      res =>{

        this.noteUploadDir=res.uploadDir;
        //  console.log(this.noteUploadDir);

        this.userService.getNoteFile(this.noteUploadDir).subscribe(
          data =>{
            this.createNoteFromBlob(data);
            //console.log(data);
          },
          err =>{
            console.log(err.error.message);
          }
        )
      },
      err =>{
        console.log(err.error.message);
      }
    );
  }

  createNoteFromBlob(file: Blob){
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.noteView=true;
       this.retrievedNote = reader.result;
      
    },false);
    if(file){
      reader.readAsDataURL(file);
    }
  }
  

  search(){
    if(this.searchResult == ""){
      this.ngOnInit();
    }else{
      this.content=this.content.filter(res =>{
        console.log(res);

        if(res.semester.toLocaleLowerCase().match(this.searchResult.toLocaleLowerCase())){
        return res.semester.toLocaleLowerCase().match(this.searchResult.toLocaleLowerCase());
        }
        if(res.program.toLocaleLowerCase().match(this.searchResult.toLocaleLowerCase())){
          return res.program.toLocaleLowerCase().match(this.searchResult.toLocaleLowerCase())
        }
        if(res.addedBy.toLocaleLowerCase().match(this.searchResult.toLocaleLowerCase())){
          return res.addedBy.toLocaleLowerCase().match(this.searchResult.toLocaleLowerCase())
        }
        if(res.fileType.toLocaleLowerCase().match(this.searchResult.toLocaleLowerCase())){
          return res.fileType.toLocaleLowerCase().match(this.searchResult.toLocaleLowerCase())
        }
        if(res.addedTime.toLocaleLowerCase().match(this.searchResult.toLocaleLowerCase())){
          return res.addedTime.toLocaleLowerCase().match(this.searchResult.toLocaleLowerCase())
        }
        if(res.subject.toLocaleLowerCase().match(this.searchResult.toLocaleLowerCase())){
          return res.subject.toLocaleLowerCase().match(this.searchResult.toLocaleLowerCase())
        }
      });
    }
  }

    key:string='id';
    reverse:boolean=false;
    sort(key){
      this.key=key;
      this.reverse= !this.reverse;


    }

}




