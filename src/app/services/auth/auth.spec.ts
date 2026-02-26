import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { Auth, ForgotPasswordResponse } from './auth';

describe('Auth service', () => {
  let service: Auth;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Auth],
    });

    service = TestBed.inject(Auth);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('forgotPassword()', () => {
    const email = 'foo@bar.com';
    const endpoint = '/api/auth/forgot-password';

    it('should POST email and return response', () => {
      const mockResp: ForgotPasswordResponse = {
        success: true,
        message: 'Link sent',
      };

      service.forgotPassword(email).subscribe((res) => {
        expect(res).toEqual(mockResp);
      });

      const req = httpMock.expectOne(endpoint);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ email });
      req.flush(mockResp);
    });

    it('should forward HTTP errors', () => {
      const mockError = { status: 404, statusText: 'Not Found' };

      service.forgotPassword(email).subscribe({
        next: () => fail('should not succeed'),
        error: (err) => {
          expect(err.status).toBe(404);
        },
      });

      const req = httpMock.expectOne(endpoint);
      req.flush({}, mockError);
    });
  });
});
