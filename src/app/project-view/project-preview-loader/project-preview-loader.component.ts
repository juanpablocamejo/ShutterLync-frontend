import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AuthenticationService } from 'src/shared/services/authentication.service';
import { environment } from 'src/environments/environment';
import { Project } from 'src/shared/models/Project';
import { ProjectStates } from 'src/shared/models/enums/ProjectStates';
import { PreviewItem } from 'src/shared/models/PreviewItem';


@Component({
  selector: 'app-project-preview-loader',
  templateUrl: './project-preview-loader.component.html',
  styleUrls: ['./project-preview-loader.component.scss']
})
export class ProjectPreviewLoaderComponent implements OnInit {
  projectId: string;
  cols = 4;
  @Input() project: Project;
  disableConfirmation = false;
  constructor(
    private route: ActivatedRoute,
    private snackbar: MatSnackBar,
    private auth: AuthenticationService) {

  }

  get editable() {
    return this.project.created;
  }
  get uploadUrl() {
    return `${environment.apiUrl}/files`;
  }
  get previewItems() {
    return this.project.previewItems;
  }
  ngOnInit(): void {
    this.projectId = this.route.snapshot.params.projectId;
  }

  imgUrl(fileData: string) {
    return `${environment.apiUrl}/files/${fileData}`;
  }

  get previewLoaded() {
    return this.project.state !== ProjectStates.CREATED;
  }

  onFileUploaded(resp: any) {
    this.project.addPreviewItem(new PreviewItem(resp));
  }

  onItemDeleted({ value, disableConfirmation }: any) {
    this.disableConfirmation = disableConfirmation;
    this.project.previewItems = this.previewItems.filter(itm => itm.id !== value);
  }
}

