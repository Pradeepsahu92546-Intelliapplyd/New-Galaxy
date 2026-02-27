import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ImageCard } from './image-card';
import { NzMessageService } from 'ng-zorro-antd/message';

describe('ImageCard Component (TS logic only)', () => {
  let component: ImageCard;
  let fixture: ComponentFixture<ImageCard>;
  let messageService: jasmine.SpyObj<NzMessageService>;

  beforeEach(async () => {
    const messageSpy = jasmine.createSpyObj('NzMessageService', ['success', 'error']);

    await TestBed.configureTestingModule({
      imports: [ImageCard],
      providers: [{ provide: NzMessageService, useValue: messageSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(ImageCard);
    component = fixture.componentInstance;
    messageService = TestBed.inject(NzMessageService) as jasmine.SpyObj<NzMessageService>;
    fixture.detectChanges();
  });

  // -------- Initialization --------
  it('should create the component_ICCUT_001', () => {
    expect(component).toBeTruthy();
  });

  // -------- File Upload Success --------
  it('should update profile image on successful file upload_ICCUT_002', fakeAsync(() => {
    const mockFile = new File(['dummy content'], 'test.png', { type: 'image/png' });
    const event = { target: { files: [mockFile] } } as any;

    spyOn(FileReader.prototype, 'readAsDataURL').and.callFake(function (this: FileReader) {
      this.onload?.({ target: { result: 'data:image/png;base64,test' } } as ProgressEvent<FileReader>);
    });

    component.onFileSelected(event);
    tick(500);

    expect(component.user.profileImg).toBe('data:image/png;base64,test');
    expect(messageService.success).toHaveBeenCalledWith('Profile image updated successfully!');
    expect(component.isUploading).toBeFalse();
  }));

  // -------- File Upload Failure --------
  it('should show error message on file upload failure_ICCUT_003', fakeAsync(() => {
    const mockFile = new File(['dummy content'], 'test.png', { type: 'image/png' });
    const event = { target: { files: [mockFile] } } as any;

    spyOn(FileReader.prototype, 'readAsDataURL').and.callFake(function (this: FileReader) {
      const errorEvent = new ProgressEvent('error') as ProgressEvent<FileReader>;
      this.onerror?.(errorEvent);
    });

    component.onFileSelected(event);
    tick();

    expect(messageService.error).toHaveBeenCalledWith('Failed to upload image!');
    expect(component.isUploading).toBeFalse();
  }));

  it('should do nothing when no file is selected_ICCUT_004', () => {
    const event = { target: { files: [] } } as any;

    component.onFileSelected(event);

    expect(component.isUploading).toBeFalse();
    expect(messageService.success).not.toHaveBeenCalled();
    expect(messageService.error).not.toHaveBeenCalled();
  });
});
