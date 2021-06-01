
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-programs-and-subjects',
  templateUrl: './programs-and-subjects.component.html',
  styleUrls: ['./programs-and-subjects.component.css']
})
export class ProgramsAndSubjectsComponent implements OnInit {

  form: any = {};

  subjectform: any ={};
  value:any;
  isCourses=false;
  programs:any;
  programName:string;
  subjects:any;
  programId:any;

  viewingProgram:any;


  selectedProgram:any;
  selectedSemester:any;


  isSubjectsGot=false;
  isSelectedProgram=false;
  isSelectedSemester=false;

  popoverTitle:string="Are you sure you want to delete?";
  popoverMessage:string="You can not undo this operation after you confirm to delete.";
  cancelClicked=false;

  deleteMessage:any;

  programUpdateClicked:any;
  updatingProgramId:any;

  updateSemesterOfSubject:any;
  updatesubjectName:any;
  subject:any;
  programIdFromSubject:any;

  programNameFromsubjectDetail:any;

  constructor(private userService:UserService,private router:ActivatedRoute, private snackBar:MatSnackBar) { }

  ngOnInit(): void {

    this.value=this.router.snapshot.params.id;

    if(this.value=="programs"){

        this.isCourses=true;
        this.userService.getAllPrograms().subscribe(
          res =>{
              this.programs=res;
          },
          err =>{
            console.log(err);
          }
        );

    }
    
  }
 

  openDialog(programName, id:any){
    //console.log(programName, id);
    
    //console.log(this.programId);
    this.viewingProgram=programName;
      this.programId=id;
      
     
    
    
  }

  //Adding program
  onSubmit(): void{
 
    this.userService.addPrograms(this.programName).subscribe(
      reply =>{
        this.snackBar.open(reply.message, 'Dismiss',{
          duration:4000,
          verticalPosition:'top',
          horizontalPosition:'right',
          panelClass:['success-snackBar'],
        });
        this.ngOnInit();
        //console.log(reply);
      },
      err =>{
        console.log(err.message);
      }
    );


  }

  addSubject(){

    this.subjectform.semester=this.selectedSemester;
    console.log(this.subjectform.semester);
    console.log(this.subjectform);
    this.userService.addSubject(this.selectedProgram,this.subjectform).subscribe(
      res =>{

        this.snackBar.open(res.message, 'Dismiss',{
          duration:4000,
          verticalPosition:'top',
          horizontalPosition:'right',
          panelClass:['success-snackBar'],
        });
        this.ngOnInit();

      },
      err =>{
        console.log(err);
      }
    );


    
  }

  deleteProgram(id){

    this.userService.deleteProgram(id).subscribe(
      res =>{
        this.snackBar.open(res.message, 'Dismiss',{
          duration:4000,
          verticalPosition:'top',
          horizontalPosition:'right',
          panelClass:['red-snackBar'],
        });

        this.userService.getAllPrograms().subscribe(
          res =>{
            this.programs = res;
          },
          err =>{
            console.log(err);
          }
        );
      },
      err =>{
        console.log(err);
      }
    );

  }

  updateProgramClicked(programId){

    this.userService.getProgramById(programId).subscribe(
      res =>{
        this.programUpdateClicked = res.programName;
        this.updatingProgramId = res.id;

      },
      err =>{
        console.log(err);
      }

    );



  }
  updateProgram(programId){
    //console.log(programId);

    this.userService.updateProgram(programId,this.programUpdateClicked).subscribe(
      res =>{
        this.snackBar.open(res.message, 'Dismiss',{
          duration:4000,
          verticalPosition:'top',
          horizontalPosition:'right',
          panelClass:['success-snackBar'],
        });
        this.ngOnInit();
      },
      err =>{
        console.log(err);
      }
    );

  }

  deleteSubject(subjectId){
    this.userService.deletesubject(subjectId).subscribe(
      res =>{
        this.snackBar.open(res.message, 'Dismiss',{
          duration:4000,
          verticalPosition:'top',
          horizontalPosition:'right',
          panelClass:['red-snackBar'],
        });
      },
      err =>{
        console.log(err);
      }
    );
  }

  updateSubjectClicked(subjectId){

    this.userService.getSubjectById(subjectId).subscribe(
      res =>{
            this.subject = res.id;
            //console.log("i am from updateSubjecctClicked function "+ this.subject);
            this.updatesubjectName=res.subjectsName;
            this.updateSemesterOfSubject= res.semester;
            this.programIdFromSubject = res.program.id;

            this.userService.getProgramById(this.programIdFromSubject).subscribe(
              reply =>{
                this.programNameFromsubjectDetail = reply.programName;
              },
              err =>{
                console.log(err);
              }
            );
      },
      err =>{
        console.log(err);
      }
    );

  }

  updateSubject(subjectId){
    console.log(subjectId);
    this.userService.updateSubject(subjectId,this.updateSemesterOfSubject,this.updatesubjectName).subscribe(
      res =>{
        this.snackBar.open(res.message, 'Dismiss',{
          duration:4000,
          verticalPosition:'top',
          horizontalPosition:'right',
          panelClass:['success-snackBar'],
        });
        //this.ngOnInit();
      },
      err =>{
        console.log(err);
      }
    );

  }

  closeDialog(){
    //window.location.reload();
    this.ngOnInit();
  }

  selectInputProgramHandler(event:any){

  }

  selectChangeProgramHandler(event:any){

    this.selectedProgram=event.target.value;
    this.isSelectedProgram=true;
  }

  selectChangeSemesterHandler(event:any){

    this.selectedSemester=event.target.value;

    this.userService.getSubjectsAccordingly(this.programId, this.selectedSemester).subscribe(
      res =>{
        this.subjects=res;
      },
      err =>{
        console.log(err);
      }
    );
    //this.isSelectedSemester=true;
   
  }

}
